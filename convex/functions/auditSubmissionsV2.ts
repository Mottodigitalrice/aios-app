import { v } from "convex/values";
import { mutation, query } from "../_generated/server";

// -----------------------------------------------------------------------------
// Canonical store for v2 audit submissions. See schema.ts:auditSubmissionsV2.
// -----------------------------------------------------------------------------

export const insertSubmission = mutation({
  args: {
    email: v.string(),
    name: v.string(),
    company: v.string(),
    phone: v.optional(v.string()),
    locale: v.optional(v.string()),
    tier: v.string(),
    referrer: v.optional(v.string()),

    goalsSelected: v.array(v.string()),
    goalsRanked: v.array(v.string()),
    topGoalBlockers: v.array(v.string()),

    companyMeta: v.object({
      industry: v.optional(v.string()),
      teamSize: v.optional(v.string()),
      revenue: v.optional(v.string()),
      role: v.optional(v.string()),
      yearsInBusiness: v.optional(v.string()),
      location: v.optional(v.string()),
      website: v.optional(v.string()),
    }),

    aiExperience: v.optional(v.string()),
    aiTriedDidntStick: v.optional(v.string()),
    aiTriedReasons: v.array(v.string()),

    processGrid: v.any(),
    robotTask: v.string(),

    qualification: v.object({
      budget: v.optional(v.string()),
      timeline: v.optional(v.string()),
      decisionMaker: v.optional(v.string()),
    }),

    toolStack: v.any(),
    toolStackCategoryOther: v.any(),
    toolStackOther: v.string(),

    computed: v.object({
      hoursPerWeek: v.number(),
      annualSavings: v.number(),
      topProcesses: v.any(),
    }),

    rawPayload: v.any(),
    submittedAt: v.number(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("auditSubmissionsV2", {
      ...args,
      notionWriteOk: false,
    });
  },
});

export const updateNotionWriteResult = mutation({
  args: {
    id: v.id("auditSubmissionsV2"),
    notionTaskId: v.optional(v.string()),
    notionAuditRowId: v.optional(v.string()),
    notionWriteOk: v.boolean(),
    notionError: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, ...rest } = args;
    await ctx.db.patch(id, rest);
  },
});

// SECURITY: disabled 2026-07-10 — this query took only an optional limit arg and
// had no auth check, so it was publicly callable over the Convex API and
// returned every submission's PII (name/email/company/phone) to anyone with the
// deployment URL.
// Re-enable once Clerk auth is wired into Convex (add convex/auth.config.ts
// + a ctx.auth.getUserIdentity() check here — src/middleware.ts alone does
// NOT cover this, Convex functions bypass Next.js middleware entirely).
// Until then, view submissions via the Convex dashboard (dashboard.convex.dev).
export const list = query({
  args: {
    limit: v.optional(v.number()),
  },
  handler: async (_ctx, _args) => {
    throw new Error("Disabled pending auth — see comment above list().");
  },
});
