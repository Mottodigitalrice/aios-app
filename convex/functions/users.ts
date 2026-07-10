import { v } from "convex/values";
import { mutation, query } from "../_generated/server";

// Get user by Clerk ID
// SECURITY: disabled 2026-07-10 — this query took only a clerkId arg and had
// no auth check, so it was publicly callable over the Convex API and returned
// any user's PII (name/email) to anyone with the deployment URL and a clerkId.
// Re-enable once Clerk auth is wired into Convex (add convex/auth.config.ts
// + a ctx.auth.getUserIdentity() check here — src/middleware.ts alone does
// NOT cover this, Convex functions bypass Next.js middleware entirely).
// Until then, view users via the Convex dashboard (dashboard.convex.dev).
export const getByClerkId = query({
  args: { clerkId: v.string() },
  handler: async (_ctx, _args) => {
    throw new Error("Disabled pending auth — see comment above getByClerkId().");
  },
});

// Get current user (requires clerkId from client)
// SECURITY: disabled 2026-07-10 — see getByClerkId() above.
export const getCurrent = query({
  args: { clerkId: v.optional(v.string()) },
  handler: async (_ctx, _args) => {
    throw new Error("Disabled pending auth — see comment above getByClerkId().");
  },
});

// Create or update user from Clerk
export const upsertFromClerk = mutation({
  args: {
    clerkId: v.string(),
    email: v.string(),
    name: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .unique();

    if (existingUser) {
      await ctx.db.patch(existingUser._id, {
        email: args.email,
        name: args.name,
        imageUrl: args.imageUrl,
      });
      return existingUser._id;
    } else {
      return await ctx.db.insert("users", {
        clerkId: args.clerkId,
        email: args.email,
        name: args.name,
        imageUrl: args.imageUrl,
        createdAt: Date.now(),
      });
    }
  },
});
