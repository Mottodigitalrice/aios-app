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

