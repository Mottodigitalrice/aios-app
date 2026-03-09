# Content Writer Agent Memory

## Key File Paths

- Lewis's voice: `/workspaces/Exectuive/business-context/lewis.md`
- Company identity: `/workspaces/Exectuive/business-context/motto-digital.md`
- Marketing philosophy: `/workspaces/Exectuive/business-context/marketing/philosophy.md`
- Marketing rules: `/workspaces/Exectuive/business-context/marketing/dos-and-donts.md`
- AIOS PRD (canonical product source): `/workspaces/Exectuive/projects/aios/context/prd-aios.md`
- AIOS landing page spec: `/workspaces/Exectuive/projects/aios/context/lp-content-spec.md`
- EN copy dictionary: `/workspaces/Exectuive/DEVELOPMENT/aios-app/src/lib/i18n/dictionaries/en.ts`
- JP copy dictionary: `/workspaces/Exectuive/DEVELOPMENT/aios-app/src/lib/i18n/dictionaries/ja.ts`
- Landing page component: `/workspaces/Exectuive/DEVELOPMENT/aios-app/src/app/page.tsx`

## Lewis's Voice Rules (Confirmed)

- Short sentences. Punchy. Then a longer one for contrast.
- First-person: "I built", "I noticed", "Here's what happened"
- Specific numbers always beat vague claims
- No "digital transformation" — say what you mean
- No ROI promises — ranges only ("potential to 2x-10x")
- No hype words: "revolutionary", "game-changing", "10x your business"
- "Amplify, Not Replace" is the philosophy — weave it in once, don't repeat as a slogan

## Japanese Copy Rules (Confirmed)

- Target reader: Tanaka-shacho, late 50s, tired, skeptical, reading at 7pm
- Proper keigo but warm — not stiff bureaucratic Japanese
- Avoid English loanwords unless unavoidable
- Short sentences work even better in JP than EN
- Bilingual EN/JP is the brand identity — don't neutralise it

## AIOS Pricing (As of 2026-03-08)

Per PRD (canonical):
- Monthly: ¥500,000/month x 6 = ¥3,000,000 total
- Pay in Full: ¥2,500,000 (save ¥500,000)
- Launch pricing for first 3 clients only. Standard: ¥800,000/month.
- Note: Lewis's brief mentioned ¥200,000/month — PRD overrides this. PRD is source of truth.

## LP Content Spec Decisions

- Value stack with line-item yen values: REMOVED (Lewis's direction)
- Bonuses section with individual yen prices: REMOVED
- Brain & Body section: NEW section, component `BrainBodySection`
- Agent Org Chart: NEW component `AgentOrgChart`
- Shiryo dialog: NEW component `ShiryoDialog`
- HeroVisual: Replace with animated pyramid (4 layers building on load)
- Pyramid is interactive on desktop, stacked cards on mobile

## Document Generation

- All generated files go to `/workspaces/Exectuive/working-files/`
- DOCX, PDF, PPTX, XLSX skills available in `.claude/skills/`
