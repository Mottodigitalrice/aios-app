const auditDict = {
  nav: {
    backToHome: "ホームに戻る",
    home: "ホーム",
    privacy: "プライバシー",
  },
  badge: "無料 · 義務なし",
  title: "無料",
  titleHighlight: "AI活用診断",
  subtitle:
    "かんたんな質問に答えるだけで、Lewisが直接AI活用診断レポートを作成します。通話で内容を説明し、レポートは完全無料であなたのものです。",
  chips: ["カスタムレポート", "ライブ通話", "完全無料"],
  sidebar: {
    trustBadge: "データは暗号化され、第三者と共有されることはありません。",
    steps: {
      0: {
        title: "届ける内容",
        items: [
          "あなたの会社に合わせたAI活用度レポート",
          "Lewisとの30分のライブ通話",
          "すぐに実行できる具体的な提案",
          "100%無料、義務なし",
        ],
      },
      1: {
        title: "あなたに合わせた診断",
        items: [
          "個人または法人の観点を選んで、最適な質問を受けましょう",
          "50社以上の企業・専門家が診断を受けました",
          "導入後約40%の効率向上",
        ],
        testimonial: {
          quote:
            "診断のおかげで、考えもしなかった自動化の機会に気づきました。ぜひ試してみてください。",
          author: "T.M.",
          role: "CEO、テックスタートアップ",
        },
      },
      2: {
        title: "なぜこの質問をするのか",
        items: [
          "会社の規模によって最適なAI戦略が変わります",
          "チーム規模に合わせた提案をします",
        ],
        testimonial: {
          quote:
            "Lewisは最初から当社の課題を理解してくれました。レポートは的確でした。",
          author: "Y.S.",
          role: "COO、製造業",
        },
      },
      3: {
        title: "データがAI成功の鍵",
        items: [
          "データ管理の状態がAIの可能性を決めます",
          "提案する前にデータのギャップを特定します",
        ],
        highlight:
          "データが整理されている企業は、AI導入成果が3倍速く出ます。",
      },
      4: {
        title: "順調です",
        items: [
          "ツールスタックからすぐできる改善を特定します",
          "ツール間の連携機会をマッピングします",
        ],
        highlight:
          "ほとんどの企業には、現在のスタックに3〜5つの自動化機会が隠れています。",
      },
      5: {
        title: "大切な情報です",
        items: [
          "課題を理解することで優先順位をつけられます",
          "各課題には具体的なAI活用法があります",
        ],
        highlight:
          "上位3つの課題に対処すると、週15〜20時間の節約が可能です。",
      },
      6: {
        title: "準備状況を評価中",
        items: [
          "AI経験が提案のレベルを決めます",
          "チームの現在の能力に合わせた提案をします",
        ],
        highlight:
          "診断を受けた約85%が初月から導入を開始しています。",
      },
      7: {
        title: "もう少しで完了",
        items: [
          "48時間以内にカスタム診断レポートを届けます",
          "営業なし、義務なし",
          "完全なレポートはずっとあなたのものです",
        ],
      },
    },
  },
  steps: {
    1: {
      question: "まずはメールアドレスから",
      description:
        "診断レポートの送付に使用します。スパムは送りません。",
      emailLabel: "メールアドレス",
      emailPlaceholder: "you@company.com",
      consentLabel: "同意します",
      consentLink: "プライバシーポリシー",
    },
    2: {
      question: "あなたについて教えてください",
      perspectiveLabel: "この診断はどの観点で行いますか？",
      perspectivePersonal: "個人",
      perspectivePersonalDesc: "自分の業務と役割にAIを活用したい",
      perspectiveCorporate: "法人",
      perspectiveCorporateDesc: "会社やチームにAIを導入したい",
      nameLabel: "お名前は？",
      namePlaceholder: "フルネーム",
      roleLabel: "役職は？",
      roleOptions: [
        "CEO / 創業者",
        "CTO / 技術リード",
        "COO / 運営",
        "VP / ディレクター",
        "プロダクトマネージャー",
        "部門マネージャー",
      ],
    },
    3: {
      question: "会社について教えてください",
      questionPersonal: "お仕事について教えてください",
      companyLabel: "会社名は？",
      companyPlaceholder: "会社名",
      companyOptionalLabel: "会社名 / 組織名（任意）",
      sizeLabel: "チームの規模は？",
      sizeOptions: ["1-5人", "6-20人", "21-50人", "51-100人", "100人以上"],
      workTypeLabel: "どのようなお仕事をされていますか？",
      workTypeOptions: [
        "コンサルティング",
        "デザイン / クリエイティブ",
        "マーケティング",
        "ソフトウェア開発",
        "財務 / 会計",
        "営業",
        "教育 / トレーニング",
        "その他",
      ],
      useCaseLabel: "これは何のためですか？",
      useCasePersonal: "個人の生産性向上のみ",
      useCaseBusiness: "自分のビジネス / クライアント向け",
      useCaseBoth: "個人とビジネスの両方",
    },
    4: {
      question: "ビジネスデータの管理状況は？",
      description:
        "AI導入の準備状況を把握するための質問です。",
      maturityLabel: "現在のデータ管理状況は？",
      maturityOptions: [
        "主に個人の頭の中や散らばったファイル",
        "一部文書化されているが一貫性がない",
        "いくつかのシステムで整理されている",
        "一元管理され定期的に更新されている",
      ],
      confidenceLabel: "データの状態にどの程度自信がありますか？",
      confidenceMin: "データがどこにあるか分からない",
      confidenceMax: "全プロセスが文書化され、データは一元管理されている",
      dataLocationLabel: "最も重要なデータはどこにありますか？",
      dataLocationOptions: [
        "スプレッドシート",
        "メール",
        "クラウドドライブ",
        "プロジェクト管理ツール",
        "CRM",
        "紙 / 物理的な書類",
        "その他",
      ],
      restructuringLabel: "データの保管・管理方法を再編成することに、チームはどの程度オープンですか？",
      restructuringOptions: [
        "非常に消極的 — 変えたくない",
        "慎重 — ROIが明確ならオープン",
        "準備ができている — データの整理が必要だと認識している",
        "既に再編成中 — 方向性だけ必要",
      ],
    },
    5: {
      question: "チームが使用しているツールは？",
      description: "該当するものをすべて選択してください。",
      tools: [
        "Slack",
        "Notion",
        "Google Workspace",
        "HubSpot",
        "Salesforce",
        "Chatwork",
        "Kintone",
        "Freee",
        "LINE",
        "Microsoft 365",
        "Zoom",
        "Asana",
        "Jira",
      ],
    },
    6: {
      question: "最大の運営課題は？",
      description: "該当するものをすべて選択してください。",
      challenges: [
        "手作業データ入力 / 繰り返し作業",
        "ツール間で情報が分散",
        "社内コミュニケーションが遅い",
        "明確なAI戦略がない",
        "新ツールへのチームの抵抗",
        "セキュリティ / コンプライアンスの懸念",
        "SaaSサブスクリプションが多すぎる",
        "オペレーションの拡大が困難",
        "レポート作成に時間がかかりすぎる",
        "従業員が退職すると知識が失われる",
      ],
      bottlenecksLabel: "業務の最大のボトルネックはどこですか？",
      bottlenecksDescription: "該当するものをすべて選択してください。",
      bottlenecks: [
        "リード / パイプライン",
        "成約率",
        "納品時間",
        "手作業プロセス",
        "人員配置",
        "知識の属人化",
        "ツールの分断",
        "新人オンボーディング",
      ],
      repetitiveHoursLabel: "チームが繰り返し作業に費やす週間時間は？",
      repetitiveHoursPlaceholder: "例: 15",
    },
    7: {
      question: "AI経験と準備状況",
      experienceLabel: "チームのAI経験は？",
      experienceOptions: ["なし", "実験中", "定期的に使用", "上級"],
      triedBeforeLabel: "AIを試したことはありますか？その結果は？",
      triedBeforePlaceholder: "経験を教えてください（なければ空白でOK）...",
      visionLabel: "6ヶ月後にAIに何をしてほしい？",
      visionOptions: [
        "繰り返し作業の自動化",
        "既存ツールの連携",
        "顧客コミュニケーションの改善",
        "レポート / 分析の生成",
        "コスト削減",
        "AIに関するチームトレーニング",
        "カスタムAIエージェントの構築",
      ],
      timelineLabel: "どのくらいの時期に進めたいですか？",
      timelineOptions: [
        "今週",
        "今月",
        "今四半期",
        "まずは情報収集",
      ],
      budgetLabel: "AIツール・インフラの月額予算は？",
      budgetOptions: [
        "まだ決めていない",
        "￥5万未満",
        "￥5万 〜 ￥20万",
        "￥20万 〜 ￥50万",
        "￥50万以上",
      ],
    },
    8: {
      question: "もう少しで完了です",
      sourceLabel: "どこで知りましたか？",
      sourceOptions: [
        "LinkedIn",
        "紹介",
        "Google検索",
        "SNS",
        "イベント",
      ],
      timeLabel: "通話のご都合は？",
      timeOptions: [
        "午前 (9-12 JST)",
        "午後 (13-17 JST)",
        "夕方 (18-21 JST)",
      ],
      websiteLabel: "ウェブサイトはありますか？",
      websitePlaceholder: "https://example.com",
    },
  },
  common: {
    continue: "次へ",
    back: "戻る",
    submit: "送信",
    saving: "保存中...",
    other: "その他",
    otherPlaceholder: "具体的にお書きください…",
    required: "必須",
    optional: "任意",
    stepOf: "ステップ {current} / {total}",
  },
  progressBar: {
    1: { text: "良い調子です", timeLeft: "残り約3分" },
    2: { text: "順調に進んでいます", timeLeft: "残り約2分" },
    3: { text: "折り返し地点です", timeLeft: "残り約2分" },
    4: { text: "もう少しです", timeLeft: "残り約1分" },
    5: { text: "ほぼ完了です", timeLeft: "残り約1分" },
    6: { text: "最後のステップです", timeLeft: "1分以内" },
  },
  success: {
    title: "送信完了 — ありがとうございます",
    subtitle:
      "Lewisが直接あなたの回答を確認し、カスタム診断レポートを作成します。",
    reachOut: "Lewisが48時間以内に連絡します。",
    timelineTitle: "次のステップ",
    timeline: {
      submitted: {
        title: "送信完了",
        description:
          "回答を受け付けました。AI活用診断への一歩を踏み出しました。",
      },
      review: {
        title: "Lewisが回答を確認",
        description:
          "あなたが共有した内容を確認し、あなたに合わせたAI活用診断を準備します。",
        statusLabel: "進行中",
      },
      call: {
        title: "一緒に確認",
        description:
          "ビデオ通話で診断レポートを説明し、質問にはすべて答えます。",
      },
      report: {
        title: "レポートはあなたのもの",
        description:
          "通話後、完全な診断レポートはあなたのものです。義務なし、完全無料。",
      },
    },
    bookEmbedTitle: "都合の良い時間を選んでください",
    bookFallback: "新しいタブで予約ページを開く",
    bookCta: "無料診断通話を予約",
    bookCtaPersonal: "4月コホートに参加",
    bookSubtext: "30分 · ビデオ通話 · 営業なし",
    bookSubtextPersonal: "少人数グループ · 実践ワークショップ · 無料",
    bookDescription:
      "都合の良い時間を選んでください。通話までに診断を準備します。",
    bookDescriptionPersonal:
      "次のコホートに参加して、少人数のプロフェッショナルと一緒にAIを自分のワークフローに活用する方法を学びましょう。",
    sharePrompt: "知り合いにもおすすめしませんか？",
    copyLink: "リンクをコピー",
    copied: "コピーしました",
    shareText:
      "MOTTO Digitalの無料AI活用診断に登録しました。ぜひチェックしてください。",
    shareEmailSubject: "無料AI活用診断",
    backHome: "ホームに戻る",
  },
} as const;

export default auditDict;
