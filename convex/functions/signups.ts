import { v } from "convex/values";
import { mutation, query } from "../_generated/server";

// ---------------------------------------------------------------------------
// Submit a new signup
// ---------------------------------------------------------------------------

export const submit = mutation({
  args: {
    track: v.union(v.literal("cohort"), v.literal("corporate")),
    signupType: v.optional(v.union(v.literal("individual"), v.literal("company"), v.literal("department"))),
    plan: v.optional(v.union(v.literal("monthly"), v.literal("full"))),
    name: v.string(),
    email: v.string(),
    company: v.optional(v.string()),
    departmentName: v.optional(v.string()),
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

// SECURITY: disabled 2026-07-10 — this query took no args and had no auth
// check, so it was publicly callable over the Convex API and returned every
// signup's PII (name/email/company) to anyone with the deployment URL.
// Re-enable once Clerk auth is wired into Convex (add convex/auth.config.ts
// + a ctx.auth.getUserIdentity() check here — src/middleware.ts alone does
// NOT cover this, Convex functions bypass Next.js middleware entirely).
// Until then, view signups via the Convex dashboard (dashboard.convex.dev).
export const list = query({
  handler: async (_ctx) => {
    throw new Error("Disabled pending auth — see comment above list().");
  },
});

// ---------------------------------------------------------------------------
// Get signup by ID
// ---------------------------------------------------------------------------

// SECURITY: disabled 2026-07-10 — see list() above.
export const getById = query({
  args: { id: v.id("signups") },
  handler: async (_ctx, _args) => {
    throw new Error("Disabled pending auth — see comment above list().");
  },
});

// ---------------------------------------------------------------------------
// Update signup status
// ---------------------------------------------------------------------------

// SECURITY: disabled 2026-07-10 — see list() above.
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
  handler: async (_ctx, _args) => {
    throw new Error("Disabled pending auth — see comment above list().");
  },
});

