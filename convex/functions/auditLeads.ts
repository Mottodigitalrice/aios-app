import { v } from "convex/values";
import { mutation, query, action } from "../_generated/server";

// ---------------------------------------------------------------------------
// Wizard mutations (multi-step form)
// ---------------------------------------------------------------------------

// Create a partial lead on Step 1 (email + consent)
export const createPartialLead = mutation({
  args: {
    email: v.string(),
    privacyConsent: v.boolean(),
  },
  handler: async (ctx, args) => {
    // Check for existing partial lead by email
    const existing = await ctx.db
      .query("auditLeads")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .filter((q) => q.eq(q.field("status"), "partial"))
      .first();

    if (existing) {
      // Upsert: update existing partial lead
      await ctx.db.patch(existing._id, {
        privacyConsent: args.privacyConsent,
        consentDate: Date.now(),
        currentStep: 1,
        updatedAt: Date.now(),
      });
      return existing._id;
    }

    // Create new partial lead
    return await ctx.db.insert("auditLeads", {
      email: args.email,
      privacyConsent: args.privacyConsent,
      consentDate: Date.now(),
      currentStep: 1,
      status: "partial",
      webhookSent: false,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
  },
});

// Update a partial lead on Steps 2-7
export const updatePartialLead = mutation({
  args: {
    id: v.id("auditLeads"),
    currentStep: v.number(),
    name: v.optional(v.string()),
    role: v.optional(v.string()),
    perspective: v.optional(v.string()),
    company: v.optional(v.string()),
    website: v.optional(v.string()),
    employees: v.optional(v.string()),
    workType: v.optional(v.string()),
    useCase: v.optional(v.string()),
    dataMaturity: v.optional(v.string()),
    dataLocation: v.optional(v.array(v.string())),
    aiBudget: v.optional(v.string()),
    tools: v.optional(v.array(v.string())),
    challenge: v.optional(v.array(v.string())),
    challengeOther: v.optional(v.string()),
    aiExperience: v.optional(v.string()),
    sixMonthVision: v.optional(v.array(v.string())),
    sixMonthVisionOther: v.optional(v.string()),
    source: v.optional(v.string()),
    preferredTime: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, ...fields } = args;
    // Remove undefined fields so we only patch what's provided
    const patch: Record<string, unknown> = { updatedAt: Date.now() };
    for (const [key, value] of Object.entries(fields)) {
      if (value !== undefined) {
        patch[key] = value;
      }
    }
    await ctx.db.patch(id, patch);
  },
});

// Finalize a partial lead → status "new" + trigger webhook
export const finalizeLead = mutation({
  args: {
    id: v.id("auditLeads"),
    // Allow passing final step fields
    source: v.optional(v.string()),
    preferredTime: v.optional(v.string()),
    website: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, ...fields } = args;
    const patch: Record<string, unknown> = {
      status: "new",
      currentStep: 7,
      updatedAt: Date.now(),
    };
    for (const [key, value] of Object.entries(fields)) {
      if (value !== undefined) {
        patch[key] = value;
      }
    }
    await ctx.db.patch(id, patch);
  },
});

// Get partial lead by email (for resume)
export const getPartialByEmail = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("auditLeads")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .filter((q) => q.eq(q.field("status"), "partial"))
      .first();
  },
});

// ---------------------------------------------------------------------------
// Original mutations (kept for backward compatibility)
// ---------------------------------------------------------------------------

// Submit a new audit lead (from the public form — legacy single-page)
export const submit = mutation({
  args: {
    name: v.string(),
    role: v.optional(v.string()),
    company: v.string(),
    website: v.optional(v.string()),
    email: v.string(),
    employees: v.optional(v.string()),
    tools: v.optional(v.array(v.string())),
    challenge: v.optional(v.array(v.string())),
    aiExperience: v.optional(v.string()),
    sixMonthVision: v.optional(v.array(v.string())),
    source: v.optional(v.string()),
    preferredTime: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("auditLeads", {
      ...args,
      status: "new",
      webhookSent: false,
      createdAt: Date.now(),
    });
  },
});

// Get all leads (for dashboard)
export const list = query({
  handler: async (ctx) => {
    return await ctx.db
      .query("auditLeads")
      .withIndex("by_created")
      .order("desc")
      .collect();
  },
});

// Get lead by ID
export const getById = query({
  args: { id: v.id("auditLeads") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

// Update lead status
export const updateStatus = mutation({
  args: {
    id: v.id("auditLeads"),
    status: v.union(
      v.literal("partial"),
      v.literal("new"),
      v.literal("reviewed"),
      v.literal("scheduled"),
      v.literal("completed"),
      v.literal("archived")
    ),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { status: args.status });
  },
});

// Mark webhook as sent
export const markWebhookSent = mutation({
  args: { id: v.id("auditLeads") },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { webhookSent: true });
  },
});

// Get lead counts by status (for dashboard stats)
export const stats = query({
  handler: async (ctx) => {
    const all = await ctx.db.query("auditLeads").collect();
    const counts: Record<string, number> = {
      partial: 0,
      new: 0,
      reviewed: 0,
      scheduled: 0,
      completed: 0,
      archived: 0,
      total: all.length,
    };
    for (const lead of all) {
      counts[lead.status] = (counts[lead.status] || 0) + 1;
    }
    return counts;
  },
});

// Forward lead to n8n webhook (action — can make HTTP calls)
// Also attempts to forward to MOTTO API for Notion integration.
// n8n webhook: primary channel (may also forward to Notion internally)
// MOTTO API: secondary channel, ensures Notion record creation
export const forwardToWebhook = action({
  args: { leadId: v.id("auditLeads") },
  handler: async (ctx, args) => {
    const lead = await ctx.runQuery(
      // @ts-expect-error -- internal reference
      "functions/auditLeads:getById",
      { id: args.leadId }
    );
    if (!lead) throw new Error("Lead not found");

    const payload = {
      name: lead.name,
      role: lead.role,
      perspective: lead.perspective,
      company: lead.company,
      website: lead.website,
      email: lead.email,
      employees: lead.employees,
      workType: lead.workType,
      useCase: lead.useCase,
      tools: Array.isArray(lead.tools) ? lead.tools.join(", ") : lead.tools,
      challenge: Array.isArray(lead.challenge)
        ? lead.challenge.join(", ")
        : lead.challenge,
      challengeOther: lead.challengeOther,
      aiExperience: lead.aiExperience,
      sixMonthVision: Array.isArray(lead.sixMonthVision)
        ? lead.sixMonthVision.join(", ")
        : lead.sixMonthVision,
      sixMonthVisionOther: lead.sixMonthVisionOther,
      source: lead.source,
      preferredTime: lead.preferredTime,
      convexLeadId: args.leadId,
    };

    // --- 1. Forward to n8n webhook (primary) ---
    const webhookUrl =
      "https://n8n.mottodigital.jp/webhook/free-audit-intake";

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
          `[forwardToWebhook] n8n webhook failed: ${res.status} ${res.statusText}`
        );
      } else {
        console.log(
          `[forwardToWebhook] n8n webhook succeeded for lead ${args.leadId}`
        );
      }
    } catch (err) {
      console.error("[forwardToWebhook] n8n webhook error:", err);
    }

    // --- 2. Forward to MOTTO API (secondary — Notion integration) ---
    // Uses MOTTO_API_KEY env var. If not set, this step is skipped gracefully.
    const mottoApiKey = process.env.MOTTO_API_KEY;
    let mottoSuccess = false;

    if (mottoApiKey) {
      try {
        const mottoRes = await fetch(
          "https://vps.mottodigital.jp/resources",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-API-Key": mottoApiKey,
            },
            body: JSON.stringify({
              description: `AIOS Audit Lead: ${lead.name || lead.email} — ${lead.company || "No company"}`,
              categories: ["Audit Lead"],
              types: ["Lead"],
              projectId: undefined, // Will go to inbox
            }),
          }
        );
        mottoSuccess = mottoRes.ok;
        if (!mottoRes.ok) {
          console.error(
            `[forwardToWebhook] MOTTO API failed: ${mottoRes.status} ${mottoRes.statusText}`
          );
        } else {
          console.log(
            `[forwardToWebhook] MOTTO API succeeded for lead ${args.leadId}`
          );
        }
      } catch (err) {
        console.error("[forwardToWebhook] MOTTO API error:", err);
      }
    } else {
      console.warn(
        "[forwardToWebhook] MOTTO_API_KEY not set — skipping Notion integration"
      );
    }

    // Mark webhook sent if at least one channel succeeded
    if (n8nSuccess || mottoSuccess) {
      await ctx.runMutation(
        // @ts-expect-error -- internal reference
        "functions/auditLeads:markWebhookSent",
        { id: args.leadId }
      );
    }

    return {
      success: n8nSuccess || mottoSuccess,
      n8n: n8nSuccess,
      motto: mottoSuccess,
    };
  },
});
