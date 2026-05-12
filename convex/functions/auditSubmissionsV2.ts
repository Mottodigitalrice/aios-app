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
    notionWriteOk: v.boolean(),
    notionError: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, ...rest } = args;
    await ctx.db.patch(id, rest);
  },
});

export const list = query({
  args: {
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const limit = args.limit ?? 100;
    return await ctx.db
      .query("auditSubmissionsV2")
      .withIndex("by_submittedAt")
      .order("desc")
      .take(limit);
  },
});
