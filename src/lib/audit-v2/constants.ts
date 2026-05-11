/**
 * Static option lists for AI Audit v2.
 * JP is canonical; EN labels follow.
 */

export type Tier = "quick" | "full";

export interface Option {
  id: string;
  ja: string;
  en: string;
  emoji?: string;
}

// S5 — Industry (12 options)
export type IndustryId =
  | "manufacturing"
  | "construction"
  | "real-estate"
  | "retail"
  | "hospitality"
  | "it-software"
  | "consulting"
  | "healthcare"
  | "education"
  | "beauty"
  | "professional"
  | "other";

export const INDUSTRIES: (Option & { id: IndustryId; hourlyRate: number })[] = [
  { id: "manufacturing", ja: "製造", en: "Manufacturing", hourlyRate: 4000 },
  { id: "construction", ja: "建設", en: "Construction", hourlyRate: 4500 },
  { id: "real-estate", ja: "不動産", en: "Real estate", hourlyRate: 5000 },
  { id: "retail", ja: "小売", en: "Retail", hourlyRate: 3500 },
  { id: "hospitality", ja: "飲食", en: "Hospitality / Restaurant", hourlyRate: 3000 },
  { id: "it-software", ja: "IT・ソフトウェア", en: "IT / Software", hourlyRate: 5500 },
  { id: "consulting", ja: "コンサル", en: "Consulting", hourlyRate: 6000 },
  { id: "healthcare", ja: "医療・介護", en: "Healthcare / Care", hourlyRate: 4000 },
  { id: "education", ja: "教育", en: "Education", hourlyRate: 4000 },
  { id: "beauty", ja: "理美容", en: "Beauty / Personal care", hourlyRate: 3500 },
  { id: "professional", ja: "専門サービス", en: "Professional services", hourlyRate: 6000 },
  { id: "other", ja: "その他", en: "Other", hourlyRate: 4500 },
];

export const TEAM_SIZES: Option[] = [
  { id: "1", ja: "1人", en: "1" },
  { id: "2-9", ja: "2-9人", en: "2-9" },
  { id: "10-29", ja: "10-29人", en: "10-29" },
  { id: "30-99", ja: "30-99人", en: "30-99" },
  { id: "100-299", ja: "100-299人", en: "100-299" },
  { id: "300+", ja: "300人以上", en: "300+" },
];

export const REVENUE_BANDS: Option[] = [
  { id: "<100M", ja: "1億円未満", en: "<¥100M" },
  { id: "100-500M", ja: "1〜5億円", en: "¥100-500M" },
  { id: "500M-1B", ja: "5〜10億円", en: "¥500M-1B" },
  { id: "1B-5B", ja: "10〜50億円", en: "¥1B-5B" },
  { id: "5B+", ja: "50億円以上", en: "¥5B+" },
  { id: "skip", ja: "答えたくない", en: "Prefer not to say" },
];

export const ROLES: Option[] = [
  { id: "ceo", ja: "代表取締役・社長", en: "CEO" },
  { id: "executive", ja: "役員", en: "Executive" },
  { id: "director", ja: "部長", en: "Director" },
  { id: "manager", ja: "マネージャー", en: "Manager" },
  { id: "staff", ja: "一般職", en: "Staff" },
  { id: "other", ja: "その他", en: "Other" },
];

export const YEARS_IN_BUSINESS: Option[] = [
  { id: "pre", ja: "創業前", en: "Pre-founding" },
  { id: "1-3", ja: "1〜3年", en: "1-3 years" },
  { id: "4-10", ja: "4〜10年", en: "4-10 years" },
  { id: "10+", ja: "10年以上", en: "10+ years" },
];

export const LOCATIONS: Option[] = [
  { id: "kanto", ja: "関東", en: "Kanto" },
  { id: "kansai", ja: "関西", en: "Kansai" },
  { id: "chubu", ja: "中部", en: "Chubu" },
  { id: "hokkaido-tohoku", ja: "北海道・東北", en: "Hokkaido / Tohoku" },
  { id: "chugoku-shikoku", ja: "中国・四国", en: "Chugoku / Shikoku" },
  { id: "kyushu-okinawa", ja: "九州・沖縄", en: "Kyushu / Okinawa" },
  { id: "overseas", ja: "海外", en: "Overseas" },
];

// S6 — Categorized tool stack
export type ToolCategoryId =
  | "communication"
  | "office"
  | "crm-sales"
  | "accounting"
  | "project-mgmt"
  | "hr"
  | "ecommerce"
  | "ai-tools";

export interface ToolCategory {
  id: ToolCategoryId;
  ja: string;
  en: string;
  tools: string[];
}

export const TOOL_CATEGORIES: ToolCategory[] = [
  {
    id: "communication",
    ja: "コミュニケーション",
    en: "Communication",
    tools: ["Slack", "Chatwork", "LINE WORKS", "Microsoft Teams", "Discord"],
  },
  {
    id: "office",
    ja: "オフィス・ドキュメント",
    en: "Office / Documents",
    tools: ["Google Workspace", "Microsoft 365", "Notion", "Dropbox", "Box"],
  },
  {
    id: "crm-sales",
    ja: "CRM・営業",
    en: "CRM / Sales",
    tools: ["Salesforce", "HubSpot", "kintone", "Sansan", "Eight"],
  },
  {
    id: "accounting",
    ja: "会計・経理",
    en: "Accounting",
    tools: ["freee", "マネーフォワード", "弥生", "勘定奉行", "SAP"],
  },
  {
    id: "project-mgmt",
    ja: "プロジェクト管理",
    en: "Project management",
    tools: ["Asana", "Trello", "Backlog", "Jira", "Monday"],
  },
  {
    id: "hr",
    ja: "HR・労務",
    en: "HR / Labor",
    tools: ["SmartHR", "jinjer", "KING OF TIME", "freee人事労務"],
  },
  {
    id: "ecommerce",
    ja: "EC・販売",
    en: "EC / Sales",
    tools: ["Shopify", "BASE", "STORES", "EC-Cube", "楽天"],
  },
  {
    id: "ai-tools",
    ja: "AIツール (試したことがあるもの)",
    en: "AI tools (tried before)",
    tools: ["ChatGPT", "Claude", "Gemini", "Microsoft Copilot", "Notion AI", "Perplexity"],
  },
];

// S7 — AI Experience scenarios
export type AiExperienceId =
  | "none"
  | "dabbled"
  | "daily-personal"
  | "biz-spreading"
  | "biz-integrated";

export const AI_EXPERIENCE: (Option & { id: AiExperienceId })[] = [
  { id: "none", ja: "まだAIを使ったことがない", en: "Haven't tried AI yet" },
  { id: "dabbled", ja: "ChatGPTを少し試した程度", en: "Dabbled with ChatGPT" },
  { id: "daily-personal", ja: "個人的に日常的に使っている", en: "Use AI daily, personally" },
  { id: "biz-spreading", ja: "業務で活用、社内に広めようとしている", en: "Using it in business, trying to spread it" },
  { id: "biz-integrated", ja: "複数のAIツールを組み込んでいる", en: "Multiple AI tools integrated in business" },
];

export const AI_TRIED_REASONS: Option[] = [
  { id: "no-results", ja: "期待した結果が得られなかった", en: "Didn't get expected results" },
  { id: "couldnt-use", ja: "使いこなせなかった", en: "Couldn't use it well" },
  { id: "didnt-fit", ja: "業務に合わなかった", en: "Didn't fit our work" },
  { id: "other-priorities", ja: "他の優先課題で後回しに", en: "Other priorities took over" },
  { id: "internal-resistance", ja: "社内の抵抗があった", en: "Internal resistance" },
  { id: "other", ja: "その他", en: "Other" },
];

// S8 — Process frequency grid
export type ProcessId =
  | "email"
  | "meeting-notes"
  | "reports"
  | "proposals"
  | "data-entry"
  | "invoices"
  | "customer-inquiry"
  | "translation"
  | "research"
  | "social-content";

export type FrequencyId = "never" | "monthly" | "weekly" | "daily-1-2" | "daily-multi";

export const PROCESSES: (Option & { id: ProcessId; captureRate: number })[] = [
  { id: "email", ja: "メール対応・返信作成", en: "Email response writing", captureRate: 0.55 },
  { id: "meeting-notes", ja: "議事録・会議メモ作成", en: "Meeting notes / minutes", captureRate: 0.90 },
  { id: "reports", ja: "報告書・レポート作成", en: "Reports / reporting", captureRate: 0.50 },
  { id: "proposals", ja: "提案書・資料作成", en: "Proposals / presentations", captureRate: 0.40 },
  { id: "data-entry", ja: "データ入力・転記", en: "Data entry / copy-paste", captureRate: 0.85 },
  { id: "invoices", ja: "請求書・見積書作成", en: "Invoices / quotes", captureRate: 0.70 },
  { id: "customer-inquiry", ja: "問い合わせ対応", en: "Customer inquiry response", captureRate: 0.60 },
  { id: "translation", ja: "翻訳・多言語対応", en: "Translation / multilingual", captureRate: 0.90 },
  { id: "research", ja: "リサーチ・情報収集", en: "Research / info gathering", captureRate: 0.65 },
  { id: "social-content", ja: "SNS・コンテンツ作成", en: "Social / content creation", captureRate: 0.70 },
];

export const FREQUENCIES: (Option & { id: FrequencyId; hoursPerWeek: number })[] = [
  { id: "never", ja: "行わない", en: "Don't do this", hoursPerWeek: 0 },
  { id: "monthly", ja: "月に数回", en: "A few times / month", hoursPerWeek: 0.25 },
  { id: "weekly", ja: "週に1-2回", en: "1-2× / week", hoursPerWeek: 1.5 },
  { id: "daily-1-2", ja: "毎日1-2回", en: "1-2× / day", hoursPerWeek: 7.5 },
  { id: "daily-multi", ja: "毎日複数回", en: "Many times / day", hoursPerWeek: 15 },
];

// S10 — Qualification
export const BUDGET_OPTIONS: Option[] = [
  { id: "undecided", ja: "まだ未定", en: "Undecided" },
  { id: "lt-50k", ja: "〜¥50K/月", en: "Under ¥50K/mo" },
  { id: "50-200k", ja: "¥50K-200K/月", en: "¥50-200K/mo" },
  { id: "200-500k", ja: "¥200K-500K/月", en: "¥200-500K/mo" },
  { id: "500k-1m", ja: "¥500K-1M/月", en: "¥500K-1M/mo" },
  { id: "1m+", ja: "¥1M+/月", en: "¥1M+/mo" },
];

export const TIMELINE_OPTIONS: Option[] = [
  { id: "now", ja: "今すぐ", en: "Right now" },
  { id: "this-month", ja: "今月中", en: "This month" },
  { id: "this-quarter", ja: "今四半期", en: "This quarter" },
  { id: "6-months", ja: "半年以内", en: "Within 6 months" },
  { id: "researching", ja: "まだ情報収集中", en: "Still researching" },
];

export const DECISION_MAKER_OPTIONS: Option[] = [
  { id: "solo", ja: "自分一人で決められる", en: "I decide alone" },
  { id: "team", ja: "チームと相談して決める", en: "Decide with team" },
  { id: "board", ja: "役員会で決定", en: "Board decision" },
  { id: "parent", ja: "親会社・本社の承認が必要", en: "Parent / HQ approval needed" },
];
