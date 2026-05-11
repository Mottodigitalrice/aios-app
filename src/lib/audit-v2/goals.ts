/**
 * 8-goal taxonomy for AI Audit v2 (locked in spec 2026-05-11).
 * Each goal has 6 blockers; user picks top 2 of the #1-ranked goal.
 */

export type GoalId =
  | "grow-revenue"
  | "reduce-costs"
  | "operational-efficiency"
  | "labor-shortage"
  | "person-dependency"
  | "customer-experience"
  | "new-business"
  | "dx-modernization";

export interface Goal {
  id: GoalId;
  ja: string;
  en: string;
  blockers: { ja: string; en: string }[];
}

export const GOALS: Goal[] = [
  {
    id: "grow-revenue",
    ja: "売上拡大",
    en: "Grow revenue",
    blockers: [
      { ja: "リードが足りない", en: "Not enough leads coming in" },
      { ja: "リード→商談の転換率が低い", en: "Low conversion from lead to meeting" },
      { ja: "商談からの成約率が低い", en: "Low close rate on meetings" },
      { ja: "既存顧客のリピート/解約", en: "Existing customers don't repeat / churn" },
      { ja: "営業チームの稼働が限界", en: "Sales team at capacity" },
      { ja: "ブランド認知が弱い", en: "Weak brand awareness" },
    ],
  },
  {
    id: "reduce-costs",
    ja: "コスト削減",
    en: "Reduce costs",
    blockers: [
      { ja: "人件費が利益を圧迫", en: "Labor costs eating margin" },
      { ja: "ツール/SaaSの乱立・重複", en: "Tool / SaaS sprawl & duplication" },
      { ja: "外注費が高い", en: "High outsourcing spend" },
      { ja: "紙・物理書類のコスト", en: "Paper / physical document costs" },
      { ja: "在庫・廃棄ロス", en: "Inventory or waste losses" },
      { ja: "手作業のオーバーヘッド", en: "Manual processes adding overhead" },
    ],
  },
  {
    id: "operational-efficiency",
    ja: "業務効率化",
    en: "Operational efficiency",
    blockers: [
      { ja: "繰り返し作業を手動でやっている", en: "Repetitive tasks done by hand" },
      { ja: "ツール間のデータ入力・転記", en: "Manual data entry / copy-paste between tools" },
      { ja: "承認・レビューがボトルネック", en: "Approval / review bottlenecks" },
      { ja: "データがツール間で分散", en: "Data scattered across disconnected tools" },
      { ja: "会議が多すぎる", en: "Too many meetings" },
      { ja: "資料・レポート作成に時間がかかる", en: "Reports & docs take too long to produce" },
    ],
  },
  {
    id: "labor-shortage",
    ja: "人手不足対応",
    en: "Cope with labor shortage",
    blockers: [
      { ja: "採用が間に合わない", en: "Can't hire fast enough" },
      { ja: "既存スタッフが過重労働", en: "Existing staff overworked" },
      { ja: "新人の立ち上がりが遅い", en: "New hires take too long to ramp up" },
      { ja: "シニアの時間が雑務に取られる", en: "Simple tasks eating senior people's time" },
      { ja: "営業時間外の対応ができない", en: "Can't cover demand outside business hours" },
      { ja: "専門人材が見つからない", en: "Can't find specialists" },
    ],
  },
  {
    id: "person-dependency",
    ja: "属人化解消",
    en: "Eliminate person-dependency",
    blockers: [
      { ja: "業務マニュアルがない/古い", en: "No (or outdated) operating manuals" },
      { ja: "重要な知識が個人の頭の中", en: "Critical knowledge in one person's head" },
      { ja: "引継ぎ・教育に時間がかかる", en: "Handover & training takes forever" },
      { ja: "同じ質問が繰り返される", en: "Same questions asked repeatedly" },
      { ja: "退職と共に情報が消える", en: "Information disappears when staff leave" },
      { ja: "経営が個人に依存している", en: "Leadership too dependent on individuals" },
    ],
  },
  {
    id: "customer-experience",
    ja: "顧客体験向上",
    en: "Improve customer experience",
    blockers: [
      { ja: "問い合わせへの対応が遅い", en: "Slow response to inquiries" },
      { ja: "顧客情報がシステム間で分散", en: "Customer info scattered across systems" },
      { ja: "コミュニケーションを個別化できない", en: "Can't personalize communication" },
      { ja: "アフターフォローが漏れる", en: "After-sales follow-up falls through cracks" },
      { ja: "多言語対応ができない", en: "Can't handle multilingual customers" },
      { ja: "顧客フィードバックが活かされない", en: "Customer feedback never gets acted on" },
    ],
  },
  {
    id: "new-business",
    ja: "新事業・新商品",
    en: "Launch new business / products",
    blockers: [
      { ja: "市場リサーチに時間がかかる", en: "Market research takes too long" },
      { ja: "素早くプロトタイプできない", en: "No way to prototype quickly" },
      { ja: "既存業務で手一杯", en: "No bandwidth — too busy with existing work" },
      { ja: "新領域の社内ノウハウがない", en: "No internal expertise in the new area" },
      { ja: "市場投入のスピードが遅い", en: "Can't get to market fast enough" },
      { ja: "投資判断が難しい", en: "Hard to make the investment decision" },
    ],
  },
  {
    id: "dx-modernization",
    ja: "DX推進",
    en: "General DX modernization",
    blockers: [
      { ja: "どこから手を付けていいか分からない", en: "Don't know where to start" },
      { ja: "経営ビジョンと現場の乖離", en: "Gap between leadership vision & field reality" },
      { ja: "社内にIT/技術人材がいない", en: "No tech-savvy person inside" },
      { ja: "ツール選定ができない", en: "Can't pick the right tools" },
      { ja: "レガシーシステムが足かせ", en: "Legacy systems holding everything back" },
      { ja: "予算承認が取れない", en: "Can't get budget approved" },
    ],
  },
];

export const GOAL_BY_ID: Record<GoalId, Goal> = GOALS.reduce(
  (acc, g) => ({ ...acc, [g.id]: g }),
  {} as Record<GoalId, Goal>
);
