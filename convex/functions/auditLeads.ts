import { v } from "convex/values";
import { mutation, query } from "../_generated/server";

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
    dataConfidence: v.optional(v.number()),
    dataLocation: v.optional(v.array(v.string())),
    dataRestructuringOpenness: v.optional(v.string()),
    aiBudget: v.optional(v.string()),
    tools: v.optional(v.array(v.string())),
    challenge: v.optional(v.array(v.string())),
    challengeOther: v.optional(v.string()),
    bottlenecks: v.optional(v.array(v.string())),
    repetitiveHoursPerWeek: v.optional(v.string()),
    aiExperience: v.optional(v.string()),
    aiTriedBefore: v.optional(v.string()),
    aiTimeline: v.optional(v.string()),
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

