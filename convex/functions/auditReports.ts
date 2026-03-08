import { v } from "convex/values";
import { mutation, query } from "../_generated/server";

// List all reports
export const list = query({
  handler: async (ctx) => {
    return await ctx.db
      .query("auditReports")
      .order("desc")
      .collect();
  },
});

// Get report by lead ID
export const getByLead = query({
  args: { leadId: v.id("auditLeads") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("auditReports")
      .withIndex("by_lead", (q) => q.eq("leadId", args.leadId))
      .unique();
  },
});

// Get report by ID
export const getById = query({
  args: { id: v.id("auditReports") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

// Create a new report
export const create = mutation({
  args: {
    leadId: v.id("auditLeads"),
    clientName: v.string(),
    contactName: v.string(),
    contactRole: v.string(),
    reportDate: v.string(),
    score: v.number(),
    maxScore: v.number(),
    verdict: v.string(),
    summary: v.string(),
    tools: v.array(
      v.object({
        name: v.string(),
        status: v.union(
          v.literal("active"),
          v.literal("risk"),
          v.literal("none")
        ),
        notes: v.string(),
      })
    ),
    strengths: v.array(v.string()),
    gaps: v.array(v.string()),
    opportunities: v.array(
      v.object({
        area: v.string(),
        impact: v.string(),
        effort: v.string(),
        timeSaved: v.string(),
        description: v.string(),
      })
    ),
    roadmap: v.array(
      v.object({
        phase: v.string(),
        months: v.string(),
        items: v.array(v.string()),
      })
    ),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("auditReports", {
      ...args,
      status: "draft",
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
  },
});

// Update report
export const update = mutation({
  args: {
    id: v.id("auditReports"),
    score: v.optional(v.number()),
    verdict: v.optional(v.string()),
    summary: v.optional(v.string()),
    tools: v.optional(
      v.array(
        v.object({
          name: v.string(),
          status: v.union(
            v.literal("active"),
            v.literal("risk"),
            v.literal("none")
          ),
          notes: v.string(),
        })
      )
    ),
    strengths: v.optional(v.array(v.string())),
    gaps: v.optional(v.array(v.string())),
    opportunities: v.optional(
      v.array(
        v.object({
          area: v.string(),
          impact: v.string(),
          effort: v.string(),
          timeSaved: v.string(),
          description: v.string(),
        })
      )
    ),
    roadmap: v.optional(
      v.array(
        v.object({
          phase: v.string(),
          months: v.string(),
          items: v.array(v.string()),
        })
      )
    ),
    status: v.optional(
      v.union(
        v.literal("draft"),
        v.literal("published"),
        v.literal("archived")
      )
    ),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    const filteredUpdates = Object.fromEntries(
      Object.entries(updates).filter(([, value]) => value !== undefined)
    );
    await ctx.db.patch(id, {
      ...filteredUpdates,
      updatedAt: Date.now(),
    });
  },
});
