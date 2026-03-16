import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  auditLeads: defineTable({
    email: v.string(),
    privacyConsent: v.optional(v.boolean()),
    consentDate: v.optional(v.number()),
    name: v.optional(v.string()),
    role: v.optional(v.string()),
    company: v.optional(v.string()),
    website: v.optional(v.string()),
    employees: v.optional(v.string()),
    perspective: v.optional(v.string()),
    industry: v.optional(v.string()),
    revenueRange: v.optional(v.string()),
    teamComposition: v.optional(v.string()),
    departmentName: v.optional(v.string()),
    departmentSize: v.optional(v.string()),
    departmentFunction: v.optional(v.string()),
    typicalDay: v.optional(v.string()),
    dataMaturity: v.optional(v.string()),
    dataConfidence: v.optional(v.number()),
    dataLocation: v.optional(v.array(v.string())),
    dataRestructuringOpenness: v.optional(v.string()),
    processDocumentation: v.optional(v.string()),
    toolAutonomy: v.optional(v.string()),
    aiBudget: v.optional(v.string()),
    tools: v.optional(v.array(v.string())),
    challenge: v.optional(v.array(v.string())),
    challengeOther: v.optional(v.string()),
    bottlenecks: v.optional(v.array(v.string())),
    repetitiveHoursPerWeek: v.optional(v.string()),
    robotTask: v.optional(v.string()),
    onboardingProcess: v.optional(v.string()),
    crossDeptDependency: v.optional(v.string()),
    aiExperience: v.optional(v.string()),
    aiTriedBefore: v.optional(v.string()),
    aiTimeline: v.optional(v.string()),
    decisionMaker: v.optional(v.string()),
    sixMonthVision: v.optional(v.array(v.string())),
    sixMonthVisionOther: v.optional(v.string()),
    source: v.optional(v.string()),
    preferredTime: v.optional(v.string()),
    status: v.string(),
    webhookSent: v.optional(v.boolean()),
    currentStep: v.optional(v.number()),
    createdAt: v.optional(v.number()),
    updatedAt: v.optional(v.number()),
  })
    .index("by_email", ["email"])
    .index("by_created", ["createdAt"])
    .index("by_status", ["status"]),

  auditReports: defineTable({
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
    quickWins: v.optional(v.array(
      v.object({
        action: v.string(),
        impact: v.string(),
        effort: v.string(),
      })
    )),
    roadmap: v.array(
      v.object({
        phase: v.string(),
        months: v.string(),
        items: v.array(v.string()),
      })
    ),
    status: v.optional(v.string()),
    createdAt: v.optional(v.number()),
    updatedAt: v.optional(v.number()),
  }).index("by_lead", ["leadId"]),

  signups: defineTable({
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
    status: v.union(
      v.literal("pending"),
      v.literal("contacted"),
      v.literal("paid"),
      v.literal("enrolled")
    ),
    stripeSessionId: v.optional(v.string()),
    webhookSent: v.optional(v.boolean()),
    createdAt: v.number(),
    updatedAt: v.optional(v.number()),
  })
    .index("by_email", ["email"])
    .index("by_status", ["status"])
    .index("by_created", ["createdAt"]),

  users: defineTable({
    clerkId: v.string(),
    email: v.string(),
    name: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    createdAt: v.optional(v.number()),
  }).index("by_clerk_id", ["clerkId"]),
});
