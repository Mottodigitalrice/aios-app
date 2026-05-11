import type { AuditV2Dictionary } from "./audit-v2-en";

const auditV2DictJa: AuditV2Dictionary = {
  nav: {
    backToHome: "ホームに戻る",
    home: "ホーム",
    privacy: "プライバシー",
  },
  badge: "AI監査 v2 · 無料",
  title: "あなたの目標を教えてください。",
  titleHighlight: "AIでどう実現するかをお伝えします。",
  subtitle:
    "無料で2タイプ — クイック(5分)/フル(15分)からお選びください。代表のLewisが直接ご回答を分析し、2営業日以内にあなた専用のAI活用プランをお送りします。",
  chips: ["目標起点で設計", "Lewisが直接レビュー", "営業ゼロ相談付き"],
  common: {
    back: "戻る",
    continue: "次へ",
    submit: "送信する",
    saving: "送信中...",
    optional: "(任意)",
    selected: "選択中",
    stepOf: "{current} / {total}",
  },
  tier: {
    question: "どちらの監査を受けますか?",
    description: "どちらも無料です。今お持ちの時間に合わせて選んでください。",
    quick: {
      title: "クイック監査",
      eyebrow: "5分",
      blurb: "7画面。目標・課題・役職・AI習熟度。目標に沿った方向性が分かります。",
    },
    full: {
      title: "フル監査",
      eyebrow: "15分",
      blurb: "11画面。ツールスタック、ROI試算、予算、自由記述まで深掘り。",
    },
  },
  goals: {
    select: {
      question: "今、御社にとって最も重要な目標は何ですか?",
      description: "当てはまるものをすべて選択。次の画面で順位付けします。",
      hint: "1〜8個選択",
    },
    rank: {
      question: "重要度の高い順にドラッグして並べ替えてください。",
      description: "1位の目標を次の画面で深掘りします。",
    },
    blockers: {
      question: "「{goal}」を妨げているのは何ですか?",
      description: "当てはまるものをすべて選択してください。",
      hint: "1つ以上選択",
    },
  },
  company: {
    question: "御社について教えてください。",
    description: "7つの簡単な質問。提案の精度が上がります。",
    industry: "業種",
    teamSize: "従業員規模",
    revenue: "年商",
    role: "ご自身の役職",
    yearsInBusiness: "創業年数",
    location: "本社所在地",
    website: "ウェブサイト (任意)",
    websitePlaceholder: "https://...",
  },
  tools: {
    question: "現在使っているツールはどれですか?",
    description: "たまにしか使わないものも含めて、すべてチェックしてください。該当なしの場合は「なし」を選択。",
    none: "なし",
    otherInCategory: "その他...",
    otherInCategoryPlaceholder: "ツール名をご記入ください",
    other: "その他のツール — 上記カテゴリにないもの (任意)",
    otherPlaceholder: "例: Airtable、Zapier、自社開発ツール...",
  },
  ai: {
    question: "今、御社のAI活用はどの段階ですか?",
    description: "最も近いものを1つ選んでください。",
    triedQuestion: "過去にAIツールを試したが定着しなかったことはありますか?",
    triedYes: "はい — 理由を選択",
    triedNo: "いいえ",
  },
  process: {
    question: "これらの業務をどのくらいの頻度で行っていますか?",
    description: "頻度を選ぶと、削減可能な時間と年間コストをリアルタイムで試算します。",
    summaryHours: "削減可能な時間: 週 {hours} 時間",
    summaryYen: "≈ 年間 {yen} 削減 (業種: {industry})",
    summaryEmpty: "頻度を選択すると試算が表示されます。",
    headers: {
      process: "業務",
      never: "行わない",
      monthly: "月数回",
      weekly: "週1-2回",
      "daily-1-2": "毎日1-2回",
      "daily-multi": "毎日複数回",
    },
  },
  robotTask: {
    question: "もし1つだけタスクをAIに任せられるなら、何を任せたいですか?",
    description: "200文字まで。具体的に書いてもらえると、レポートが格段に良くなります。",
    placeholder: "例: 「営業問い合わせメールを読んで、価格表を含む返信草案を作成し、私の承認待ちにする」",
    counter: "{count} / 200",
    sidebarTitle: "ここが一番大事です",
    sidebarBody:
      "監査全体で唯一の自由記述です。具体的に書いていただくほど、Lewisがあなた専用のレポートに反映できます。",
  },
  qualification: {
    question: "最後に、いくつかビジネス面の質問です。",
    description: "私たちがお力になれるかどうか判断するためです。未定でも構いません。",
    budget: "AI関連の月間予算",
    budgetNote: "研修・ツール・サブスクリプションを含む。",
    timeline: "いつ頃から始めたいですか?",
    decisionMaker: "意思決定者は誰ですか?",
  },
  contact: {
    question: "監査結果はどちらにお送りすればよろしいですか?",
    description: "2営業日以内にメールでお送りします。スパムは一切ありません。",
    name: "お名前",
    email: "メールアドレス",
    company: "会社名",
    phone: "電話番号 (任意)",
  },
  popup: {
    title: "ありがとうございます、{name}さん。",
    body:
      "Mottodigital代表のLewisが直接、お客様のご回答を分析し、**2営業日以内**にあなた専用のAI活用レポートをお送りします。",
    bodyConsult:
      "次に、レポートについて一緒にお話しする**無料相談**をご予約ください。",
    promise:
      "私たちの約束: 相談の場で営業はいたしません。レポートの内容を一緒に読み解き、ご質問にお答えするだけです。",
    cta: "無料相談を予約する",
    maybeLater: "あとで — メールから予約します",
    close: "閉じる",
  },
  sidebar: {
    trustBadge: "ご回答内容は暗号化され、第三者には共有されません。",
    steps: {
      tier: {
        title: "深さを選択",
        items: ["クイック = 5分、目標と課題のみ", "フル = 15分、ROI試算と質問付き"],
      },
      goals: {
        title: "目標起点の監査",
        items: [
          "提案はすべて、ランク付けされた目標に紐付きます",
          "8つの目標がJP SMEの典型的な課題をカバー",
        ],
      },
      rank: {
        title: "1位の目標を深掘り",
        items: ["1位の目標のみ深掘りします", "ドラッグで順番を入れ替え"],
      },
      blockers: {
        title: "実際の障害は何か",
        items: ["6つから2つ選択", "これが提案内容を決定します"],
      },
      company: {
        title: "提案のキャリブレーション",
        items: ["業種が時給単価を決定", "従業員規模が施策のスケールを決定"],
      },
      tools: {
        title: "連携対象",
        items: ["使っているツールはすべて自動化対象になり得ます", "完璧でなくて大丈夫です"],
      },
      ai: {
        title: "現状に合わせた提案",
        items: ["レベルは問いません", "過去の失敗も提案に活かします"],
      },
      process: {
        title: "リアルタイムROI試算",
        items: ["業務ごとに現実的なAI代替率", "業種別の時給単価で計算"],
      },
      robotTask: {
        title: "最重要フィールド",
        items: ["レポート全体がここに紐付きます", "具体的に — Lewisが必ず読みます"],
      },
      qualification: {
        title: "適合度の確認",
        items: ["お力になれるかの判断材料です", "未定でもOK"],
      },
      contact: {
        title: "最後のステップ",
        items: ["Lewisが直接レビュー", "2営業日以内にご返信"],
      },
    },
  },
};

export default auditV2DictJa;
