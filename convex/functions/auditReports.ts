import { v } from "convex/values";
import { mutation, query, action } from "../_generated/server";

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

// ---------------------------------------------------------------------------
// AI Report Generation
// ---------------------------------------------------------------------------

const REPORT_SYSTEM_PROMPT = [
  "You are Lewis Rice's AI audit analyst at MOTTO Digital. You analyze business data from free AI audit submissions and generate comprehensive, honest AI readiness reports.",
  "",
  "MOTTO Digital builds custom AI Operating Systems (AIOS) for Japanese SMBs. The 6-month program costs ¥200,000/month (corporate) or ¥30,000/person/month (group cohort).",
  "",
  "Your report must be:",
  "- Honest and specific — never inflate scores or fabricate opportunities",
  "- Based ONLY on the data provided — if information is missing, note it as a gap",
  "- Practical — focus on what's achievable in 6 months",
  "- Professional but warm — this is Lewis's voice, not corporate jargon",
  "",
  "SCORING GUIDE (out of 100):",
  "- 80-100: Strong foundation, ready for advanced AI deployment",
  "- 60-79: Good base with clear opportunities for improvement",
  "- 40-59: Moderate readiness, significant gaps to address first",
  "- 20-39: Early stage, needs foundational work before AI deployment",
  "- 0-19: Not ready for AI — recommend focusing on digital basics first",
  "",
  'TOOL STATUS RULES:',
  '- "active": Tool is in use and can be integrated with AI',
  '- "risk": Tool is in use but has integration challenges or vendor lock-in risk',
  '- "none": Tool category is missing and represents a gap',
  "",
  "OPPORTUNITY IMPACT/EFFORT:",
  '- Impact: "High", "Medium", or "Low"',
  '- Effort: "Low" (< 1 month), "Medium" (1-3 months), or "High" (3+ months)',
  '- timeSaved: Estimate weekly hours saved, e.g. "5-8 hours/week"',
  "",
  "ROADMAP: Always 4 phases matching our 6-month program:",
  '- Phase 1: "Discovery & Planning" (Month 1)',
  '- Phase 2: "Infrastructure & Integration" (Month 2)',
  '- Phase 3: "Agent Development" (Month 3)',
  '- Phase 4: "Optimization & Handoff" (Months 4-6)',
  "",
  "Respond with ONLY valid JSON matching the exact schema. No markdown, no explanation, just JSON.",
].join("\n");

const REPORT_JSON_SCHEMA = JSON.stringify({
  clientName: "Company name or individual name",
  contactName: "Contact person name",
  contactRole: "Their role",
  score: "<number 0-100>",
  maxScore: 100,
  verdict: "One-line verdict",
  summary: "2-3 sentence executive summary",
  tools: [{ name: "Tool Name", status: "active|risk|none", notes: "Brief assessment" }],
  strengths: ["Strength 1", "Strength 2", "Strength 3"],
  gaps: ["Gap 1", "Gap 2", "Gap 3", "Gap 4"],
  opportunities: [
    { area: "Area name", impact: "High|Medium|Low", effort: "Low|Medium|High", timeSaved: "X-Y hours/week", description: "Brief description" },
  ],
  roadmap: [
    { phase: "Phase 1: Discovery & Planning", months: "Month 1", items: ["Item 1", "Item 2", "Item 3"] },
    { phase: "Phase 2: Infrastructure & Integration", months: "Month 2", items: ["Item 1", "Item 2", "Item 3"] },
    { phase: "Phase 3: Agent Development", months: "Month 3", items: ["Item 1", "Item 2", "Item 3"] },
    { phase: "Phase 4: Optimization & Handoff", months: "Months 4-6", items: ["Item 1", "Item 2", "Item 3"] },
  ],
}, null, 2);

function buildUserPrompt(lead: Record<string, unknown>): string {
  const lines: string[] = ["# AI Audit Intake Data", ""];

  const addField = (label: string, key: string) => {
    if (lead[key]) lines.push("**" + label + ":** " + String(lead[key]));
  };

  addField("Contact", "name");
  addField("Role", "role");
  addField("Type", "perspective");
  addField("Company", "company");
  addField("Website", "website");
  addField("Team Size", "employees");
  addField("Work Type", "workType");
  addField("Use Case", "useCase");

  if (lead.dataMaturity) {
    lines.push("", "## Data Maturity");
    addField("Level", "dataMaturity");
    addField("Data Confidence", "dataConfidence");
    if (lead.dataLocation) {
      const loc = Array.isArray(lead.dataLocation) ? lead.dataLocation.join(", ") : String(lead.dataLocation);
      lines.push("**Data Location:** " + loc);
    }
    addField("Openness to Restructuring", "dataRestructuringOpenness");
  }

  if (lead.tools) {
    const toolList = Array.isArray(lead.tools) ? lead.tools.join(", ") : String(lead.tools);
    lines.push("", "## Current Tools", toolList);
  }

  if (lead.challenge) {
    const challenges = Array.isArray(lead.challenge) ? lead.challenge.join(", ") : String(lead.challenge);
    lines.push("", "## Challenges", challenges);
    if (lead.challengeOther) lines.push("**Other:** " + String(lead.challengeOther));
  }

  if (lead.bottlenecks) {
    const bots = Array.isArray(lead.bottlenecks) ? lead.bottlenecks.join(", ") : String(lead.bottlenecks);
    lines.push("", "## Operational Bottlenecks", bots);
  }
  addField("Repetitive Hours/Week", "repetitiveHoursPerWeek");

  if (lead.aiExperience) {
    lines.push("", "## AI Experience");
    addField("Level", "aiExperience");
    addField("Previously Tried", "aiTriedBefore");
    addField("Implementation Timeline", "aiTimeline");
    addField("Budget", "aiBudget");
  }

  if (lead.sixMonthVision) {
    const vision = Array.isArray(lead.sixMonthVision) ? lead.sixMonthVision.join(", ") : String(lead.sixMonthVision);
    lines.push("", "## 6-Month Vision", vision);
    if (lead.sixMonthVisionOther) lines.push("**Other:** " + String(lead.sixMonthVisionOther));
  }

  lines.push("", "---", "", "Generate the AI audit report as JSON with this exact structure:", REPORT_JSON_SCHEMA);

  return lines.join("\n");
}

// Generate an AI audit report for a lead
export const generateReport = action({
  args: { leadId: v.id("auditLeads") },
  handler: async (ctx, args) => {
    // 1. Check for existing report
    const existingReport = await ctx.runQuery(
      // @ts-expect-error -- internal reference
      "functions/auditReports:getByLead",
      { leadId: args.leadId }
    );
    if (existingReport) {
      throw new Error("Report already exists for this lead");
    }

    // 2. Fetch the lead data
    const leadData = await ctx.runQuery(
      // @ts-expect-error -- internal reference
      "functions/auditLeads:getById",
      { id: args.leadId }
    );
    if (!leadData) throw new Error("Lead not found");

    // 3. Call OpenRouter API
    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) throw new Error("OPENROUTER_API_KEY not configured in Convex environment");

    const userPrompt = buildUserPrompt(leadData as Record<string, unknown>);

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + apiKey,
        "HTTP-Referer": "https://aios.mottodigital.jp",
        "X-Title": "AIOS Audit Report Generator",
      },
      body: JSON.stringify({
        model: "anthropic/claude-sonnet-4-20250514",
        messages: [
          { role: "system", content: REPORT_SYSTEM_PROMPT },
          { role: "user", content: userPrompt },
        ],
        temperature: 0.3,
        max_tokens: 4000,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error("OpenRouter API error (" + response.status + "): " + errorText);
    }

    const result = await response.json();
    const content = result.choices?.[0]?.message?.content;
    if (!content) throw new Error("Empty response from OpenRouter");

    // 4. Parse JSON from response (handle markdown code blocks)
    let reportJson: string = content.trim();
    if (reportJson.startsWith("```")) {
      reportJson = reportJson.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "");
    }

    let parsed;
    try {
      parsed = JSON.parse(reportJson);
    } catch {
      throw new Error("Failed to parse report JSON: " + reportJson.slice(0, 200));
    }

    // 5. Validate required fields
    if (!parsed.score || !parsed.verdict || !parsed.summary) {
      throw new Error("Report missing required fields (score, verdict, summary)");
    }

    // Ensure tool statuses are valid
    const validStatuses = ["active", "risk", "none"];
    const tools = (parsed.tools || []).map((t: { name: string; status: string; notes: string }) => ({
      name: t.name,
      status: validStatuses.includes(t.status) ? t.status : "none",
      notes: t.notes || "",
    }));

    // Ensure impact/effort values are valid
    const validLevels = ["High", "Medium", "Low"];
    const opportunities = (parsed.opportunities || []).map(
      (o: { area: string; impact: string; effort: string; timeSaved: string; description: string }) => ({
        area: o.area,
        impact: validLevels.includes(o.impact) ? o.impact : "Medium",
        effort: validLevels.includes(o.effort) ? o.effort : "Medium",
        timeSaved: o.timeSaved || "TBD",
        description: o.description || "",
      })
    );

    // 6. Create the report
    const reportDate = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const reportId = await ctx.runMutation(
      // @ts-expect-error -- internal reference
      "functions/auditReports:create",
      {
        leadId: args.leadId,
        clientName: parsed.clientName || leadData.company || leadData.name || "Unknown",
        contactName: parsed.contactName || leadData.name || "Unknown",
        contactRole: parsed.contactRole || leadData.role || "Unknown",
        reportDate,
        score: Math.min(100, Math.max(0, Number(parsed.score) || 0)),
        maxScore: 100,
        verdict: parsed.verdict,
        summary: parsed.summary,
        tools,
        strengths: parsed.strengths || [],
        gaps: parsed.gaps || [],
        opportunities,
        roadmap: (parsed.roadmap || []).map(
          (r: { phase: string; months: string; items: string[] }) => ({
            phase: r.phase,
            months: r.months,
            items: r.items || [],
          })
        ),
      }
    );

    return { reportId, score: parsed.score };
  },
});
