import { v } from "convex/values";
import { mutation, query, action } from "../_generated/server";

// ---------------------------------------------------------------------------
// Submit a new signup
// ---------------------------------------------------------------------------

export const submit = mutation({
  args: {
    track: v.union(v.literal("cohort"), v.literal("corporate")),
    plan: v.optional(v.union(v.literal("monthly"), v.literal("full"))),
    name: v.string(),
    email: v.string(),
    company: v.optional(v.string()),
    role: v.optional(v.string()),
    goals: v.string(),
    painPoints: v.optional(v.string()),
    teamSize: v.optional(v.number()),
    startPreference: v.string(),
    referralSource: v.string(),
    notes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("signups", {
      ...args,
      status: "pending",
      webhookSent: false,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
  },
});

// ---------------------------------------------------------------------------
// List all signups (for dashboard)
// ---------------------------------------------------------------------------

export const list = query({
  handler: async (ctx) => {
    return await ctx.db
      .query("signups")
      .withIndex("by_created")
      .order("desc")
      .collect();
  },
});

// ---------------------------------------------------------------------------
// Get signup by ID
// ---------------------------------------------------------------------------

export const getById = query({
  args: { id: v.id("signups") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

// ---------------------------------------------------------------------------
// Update signup status
// ---------------------------------------------------------------------------

export const updateStatus = mutation({
  args: {
    id: v.id("signups"),
    status: v.union(
      v.literal("pending"),
      v.literal("contacted"),
      v.literal("paid"),
      v.literal("enrolled")
    ),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      status: args.status,
      updatedAt: Date.now(),
    });
  },
});

// ---------------------------------------------------------------------------
// Mark webhook as sent
// ---------------------------------------------------------------------------

export const markWebhookSent = mutation({
  args: { id: v.id("signups") },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { webhookSent: true });
  },
});

// ---------------------------------------------------------------------------
// Forward signup to n8n webhook + MOTTO API (same pattern as audit leads)
// ---------------------------------------------------------------------------

export const forwardToWebhook = action({
  args: { signupId: v.id("signups") },
  handler: async (ctx, args) => {
    const signup = await ctx.runQuery(
      // @ts-expect-error -- internal reference
      "functions/signups:getById",
      { id: args.signupId }
    );
    if (!signup) throw new Error("Signup not found");

    const payload = {
      type: "signup",
      track: signup.track,
      plan: signup.plan,
      name: signup.name,
      email: signup.email,
      company: signup.company,
      role: signup.role,
      goals: signup.goals,
      painPoints: signup.painPoints,
      teamSize: signup.teamSize,
      startPreference: signup.startPreference,
      referralSource: signup.referralSource,
      notes: signup.notes,
      convexSignupId: args.signupId,
    };

    // --- 1. Forward to n8n webhook (primary) ---
    const webhookUrl =
      "https://n8n.mottodigital.jp/webhook/aios-signup";

    let n8nSuccess = false;
    try {
      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      n8nSuccess = res.ok;
      if (!res.ok) {
        console.error(
          `[forwardSignupWebhook] n8n webhook failed: ${res.status} ${res.statusText}`
        );
      } else {
        console.log(
          `[forwardSignupWebhook] n8n webhook succeeded for signup ${args.signupId}`
        );
      }
    } catch (err) {
      console.error("[forwardSignupWebhook] n8n webhook error:", err);
    }

    // --- 2. Forward to MOTTO API (secondary -- Notion integration) ---
    const mottoApiKey = process.env.MOTTO_API_KEY;
    let mottoSuccess = false;

    if (mottoApiKey) {
      try {
        const trackLabel =
          signup.track === "cohort" ? "Group Cohort" : "Corporate Build";
        const mottoRes = await fetch(
          "https://vps.mottodigital.jp/resources",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-API-Key": mottoApiKey,
            },
            body: JSON.stringify({
              description: `AIOS Signup: ${signup.name} (${signup.email}) - ${trackLabel}${signup.plan ? ` [${signup.plan}]` : ""}`,
              categories: ["Signup"],
              types: ["Lead"],
              projectId: undefined,
            }),
          }
        );
        mottoSuccess = mottoRes.ok;
        if (!mottoRes.ok) {
          console.error(
            `[forwardSignupWebhook] MOTTO API failed: ${mottoRes.status} ${mottoRes.statusText}`
          );
        } else {
          console.log(
            `[forwardSignupWebhook] MOTTO API succeeded for signup ${args.signupId}`
          );
        }
      } catch (err) {
        console.error("[forwardSignupWebhook] MOTTO API error:", err);
      }
    } else {
      console.warn(
        "[forwardSignupWebhook] MOTTO_API_KEY not set -- skipping Notion integration"
      );
    }

    // Mark webhook sent if at least one channel succeeded
    if (n8nSuccess || mottoSuccess) {
      await ctx.runMutation(
        // @ts-expect-error -- internal reference
        "functions/signups:markWebhookSent",
        { id: args.signupId }
      );
    }

    return {
      success: n8nSuccess || mottoSuccess,
      n8n: n8nSuccess,
      motto: mottoSuccess,
    };
  },
});
