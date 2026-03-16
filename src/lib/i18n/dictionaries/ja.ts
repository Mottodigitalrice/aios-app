const ja = {
  common: {
    continue: "次へ",
    back: "戻る",
    submit: "送信",
    stepOf: "ステップ {current} / {total}",
    required: "必須",
    optional: "任意",
    other: "その他",
    otherPlaceholder: "具体的にお書きください…",
    loading: "読み込み中…",
  },
  audit: {
    badge: "無料 · 義務なし",
    title: "無料",
    titleHighlight: "AI活用診断",
    subtitle:
      "かんたんな質問に答えるだけで、Lewisが直接AI活用診断レポートを作成します。",
    chips: ["カスタムレポート", "ライブ通話", "完全無料"],
    steps: {
      1: {
        question: "まずはメールアドレスから",
        description:
          "診断レポートの送付に使用します。スパムは送りません。",
        emailLabel: "メールアドレス",
        emailPlaceholder: "you@company.com",
        consentLabel: "同意します",
        consentLink: "プライバシーポリシー",
        consentRequired: "続行するにはプライバシーポリシーに同意する必要があります",
      },
      2: {
        question: "あなたについて教えてください",
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
        companyLabel: "会社名は？",
        companyPlaceholder: "会社名",
        sizeLabel: "チームの規模は？",
        sizeOptions: ["1-5人", "6-20人", "21-50人", "51-100人", "100人以上"],
      },
      4: {
        question: "チームが使用しているツールは？",
        description: "該当するものをすべて選択してください。",
        tools: [
          "Slack",
          "Notion",
          "Google Workspace",
          "HubSpot",
          "Salesforce",
          "Chatwork",
          "kintone",
          "freee",
          "LINE",
          "Microsoft 365",
          "Zoom",
          "Asana",
          "Jira",
        ],
      },
      5: {
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
        ],
      },
      6: {
        question: "AI経験とビジョン",
        experienceLabel: "チームのAI経験は？",
        experienceOptions: ["なし", "実験中", "定期的に使用", "上級"],
        visionLabel: "6ヶ月後、AIに期待することは？",
        visionOptions: [
          "繰り返し作業の自動化",
          "既存ツールの連携",
          "顧客コミュニケーションの改善",
          "レポート / 分析の生成",
          "コスト削減",
          "AIに関するチームトレーニング",
          "カスタムAIエージェントの構築",
        ],
      },
      7: {
        question: "あと少しです。ありがとうございます。",
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
    success: {
      title: "送信完了 — ありがとうございます",
      subtitle:
        "Lewisが直接あなたの回答を確認し、カスタム診断レポートを作成します。",
      steps: [
        {
          title: "Lewisが回答を確認",
          description:
            "あなたが共有した内容を確認し、あなたに合わせたAI活用診断を準備します。",
        },
        {
          title: "一緒に確認",
          description:
            "ビデオ通話で診断レポートを説明し、質問にはすべて答えます。",
        },
        {
          title: "レポートはあなたのもの",
          description:
            "通話後、完全な診断レポートはあなたのものです。義務なし、完全無料。",
        },
      ],
      bookCta: "無料診断通話を予約",
      bookSubtext: "30分 · ビデオ通話 · 営業なし",
      bookDescription:
        "ご都合の良い時間を選んでください。通話までに診断を準備します。",
      backHome: "ホームに戻る",
    },
  },
  privacy: {
    title: "プライバシーポリシー",
    lastUpdated: "最終更新: 2026年2月",
    sections: {
      intro: {
        title: "はじめに",
        content:
          "MOTTO Digital（「わたしたち」）は、あなたのプライバシーを大切にしています。",
      },
      dataCollected: {
        title: "収集する情報",
        content:
          "診断フォームを通じて、お名前、メールアドレス、会社名、役職、チーム規模、使用ツール、課題、AI経験、スケジュール希望を収集します。",
      },
      howUsed: {
        title: "情報の使用目的",
        items: [
          "AI活用診断レポートの作成",
          "診断通話のスケジュール調整",
          "関連サービスのご案内",
          "サービスの改善",
        ],
      },
      sharing: {
        title: "情報の共有",
        content:
          "個人情報を第三者に販売することはありません。サービス提供に必要な信頼できるプロバイダー（ビデオ会議、メール配信など）とのみ、厳格な機密保持契約のもとで共有します。",
      },
      retention: {
        title: "情報の保持",
        content:
          "サービス提供に必要な期間保持します。削除ご希望の場合はrice@mottodigital.jpまで。",
      },
      rights: {
        title: "あなたの権利",
        items: [
          "個人データへのアクセス要求",
          "データの修正要求",
          "データの削除要求",
          "同意の撤回",
        ],
      },
      contact: {
        title: "お問い合わせ",
        content:
          "ご質問がある場合はrice@mottodigital.jpまでご連絡ください。",
      },
    },
  },
  landing: {
    nav: {
      proof: "実績",
      program: "プログラム",
      pricing: "料金",
      cta: "席を確保する",
      skipToContent: "メインコンテンツへ",
    },
    hero: {
      badge: "2026年4月 — 残りわずか",
      title: "あなたがいないと\n止まる会社を、\n卒業しませんか。",
      titleHighlight: "動くAIをつくる。",
      subtitle:
        "6ヶ月プログラム。月額￥30,000から。AIオペレーティングシステムを一緒に構築し、チームが運用できるように訓練します。すべてあなたのものに。",
      cta: "席を確保する",
      ctaTime: "30秒で登録 · まずはLewisと面談、その後ご判断",
      ctaSecondary: "まずは無料AI活用診断",
      ctaSecondaryTime: "所要時間：約5分",
      scarcity: "4月の残り枠：3社。次回コホート：10月（未確定）。",
      stats:
        "\u73FE\u572826\u30D7\u30ED\u30B8\u30A7\u30AF\u30C8\u300163\u30BF\u30B9\u30AF\u30019\u4EF6\u306E\u5546\u8AC7\u3092\u3072\u3068\u3064\u306E\u30B7\u30B9\u30C6\u30E0\u3067\u3001\u4E00\u4EBA\u3067\u7BA1\u7406\u4E2D\u3002",
      guaranteeHint: "6\u30F6\u6708\u5F8CAI\u30A8\u30FC\u30B8\u30A7\u30F3\u30C8\u3092\u7BA1\u7406\u3067\u304D\u306A\u3051\u308C\u3070\u3001\u3067\u304D\u308B\u307E\u3067\u7121\u511F\u3067\u30B5\u30DD\u30FC\u30C8\u3002",
      builtWith: "\u4F7F\u7528\u6280\u8853",
    },
    pricing: {
      badge: "あなたに合うプランを見つける",
      title: "AIオペレーティングシステムを構築する2つの方法",
      subtitle:
        "個人でも企業でも、ゴールは同じです。6ヶ月後に、あなたが所有するAIエージェントが本番稼働していること。",

      cohort: {
        label: "個人向け",
        title: "グループコホート",
        price: "¥30,000",
        pricePer: "/人/月",
        commitment: "6ヶ月プラン · 2026年4月開始",
        spots: "5〜10名 · 英語＆日本語トラック",
        features: [
          "週2回×60分のセッション（録画あり）",
          "Slackチャンネルで随時質問可能",
          "専用GitHubリポジトリ＆フルセットアップ",
          "6ヶ月後に10体のAIエージェントを本番稼働",
          "オーナーシップ保証",
        ],
        cta: "4月の席を確保する",
        guarantee: "6ヶ月後にAIエージェントを構築・管理できない場合、次のコホートに無料で参加できます。",
        bestFor: "フリーランス、個人事業主、少人数チーム（5名未満）の方に最適",
      },

      corporate: {
        label: "企業向け",
        title: "コーポレートビルド",
        monthlyPrice: "¥200,000",
        monthlyPer: "/月",
        monthlyTotal: "×6 = ¥1,200,000 総額",
        payInFull: "¥1,000,000",
        payInFullSave: "¥200,000お得",
        features: [
          "1社あたり最大10名まで参加可能",
          "1対1またはグループトレーニング — 選べます",
          "会社全体のAIインフラ構築",
          "6ヶ月後に10体のAIエージェントを本番稼働",
          "週次の伴走型セッション（全24回）",
          "オーナーシップ保証",
        ],
        monthlyCta: "4月の席を確保する",
        payInFullCta: "4月の席を確保する — 一括払い",
        bestValue: "いちばんお得",
        bestFor: "従業員5〜50名の企業に最適",
        guarantee: "6ヶ月後にチームがAIエージェントを作成・管理できない場合、無償でサポートを継続します。",
      },

      roiComparison: {
        title: "比べてみてください",
        traditional: {
          label: "従来のAIコンサルティング",
          price: "500万円〜",
          detail: "3ヶ月のPoCで終了、その後は自力",
        },
        aios: {
          label: "AIOS 6ヶ月構築",
          price: "120万円",
          detail: "すべてあなたのもの。ずっと。",
        },
      },
      launchNote: "先着5社限定の導入価格です。",

      intake: {
        badge: "2026年4月インテイク",
        title: "全力を尽くすために、人数を限定します。",
        subtitle: "今回のインテイク（2026年4月〜9月）は、企業5社とコホート2クラスに限定します。枠が埋まったら、次の募集は10月以降になります。",
        spotsRemaining: "残り3社",
        nextCohort: "次回: 10月（未確定）",
        corporate: {
          title: "コーポレートビルド",
          filled: 2,
          total: 5,
          label: "5枠中2枠が決定済み",
          clients: "契約中: SkillHunters、Eden",
        },
        cohortEN: {
          title: "April English Cohort",
          filled: 2,
          total: 12,
          label: "12枠中2枠が登録済み",
        },
        cohortJP: {
          title: "4月の日本語コホート",
          filled: 3,
          total: 12,
          label: "12枠中3枠が登録済み",
        },
        commitment: "これはまだ実績のないサービスです。だからこそ、人数を絞ります。MOTTO Digitalの未来は、最初のクライアントを圧倒的に成功させることにかかっています。薄く広くではなく、信じて任せてくれた人たちに全力で向き合います。このサービスが持つインパクトを、まず証明したい。",
        author: "\u2014 ルイス・ライス（創業者）",
        cta: "今すぐ席を確保する",
        ctaNote: "クレジットカード不要・コミットメント不要",
      },
    },
    leadMagnet: {
      title: "まだ迷っていますか？",
      subtitle: "無料のAI活用診断で、あなたや会社のAI活用レベルと、次に取るべきステップを確認できます。",
      detail: "完全無料、義務なし。ルイスが直接レビューした、あなたに合わせたレポートをお届けします。",
      cta: "まずは無料AI活用診断から",
    },
    signup: {
      badge: "AIOS\u30D7\u30ED\u30B0\u30E9\u30E0",
      title: "",
      titleHighlight: "AIOS\u3092\u306F\u3058\u3081\u308B",
      subtitle: "AI\u30AA\u30DA\u30EC\u30FC\u30C6\u30A3\u30F3\u30B0\u30B7\u30B9\u30C6\u30E0\u3092\u69CB\u7BC9\u3059\u308B\u6E96\u5099\u306F\u3067\u304D\u307E\u3057\u305F\u304B\uFF1F\u30C8\u30E9\u30C3\u30AF\u3092\u9078\u3093\u3067\u3001\u59CB\u3081\u307E\u3057\u3087\u3046\u3002",
    },
    // FAQ content lives in faq-section.tsx (self-contained component with categories)
    cta: {
      title: "席を確保する",
      titleSecondary: "まずは無料AI活用診断から",
    },
    beforeAfter: {
      title: "会社に「頭脳」ができると、",
      titleHighlight: "何が変わるか",
      withoutLabel: "AIオペレーティングシステムのない世界",
      withLabel: "AIオペレーティングシステムのある世界",
      without: [
        "業務知識があなたの頭にしかない——あなたが休むと、会社が止まる",
        "朝起きて、昨夜何かが抜けていないか不安になる",
        "新しいスタッフが「全体像を理解する」まで3〜6ヶ月——そして辞める",
        "20のバラバラなツール。どれもつながっていない",
        "ベンダーに縛られていて、乗り換えたら一からやり直し",
        "AIは「使えそう」と思うだけで、実際に動かせていない",
        "何かあったとき、頼れる人が一人しかいない",
        "現場に入れば仕事は回るが、離れると止まる",
      ],
      with: [
        "業務知識がシステムに蓄積され、忘れず、離職しない",
        "朝目が覚めると、今日やることがシステムからスッと届いている",
        "新入社員がシステムに聞けば、初日からすべての文脈を把握できる",
        "つながったひとつのシステムで、26のプロジェクトをひとりで動かせる",
        "すべてを自社で所有——ツールを変えてもデータはそのまま",
        "AIエージェントが実務を担い、あなたは判断と関係づくりだけに集中",
        "あらゆるプロセスが文書化・実行可能な状態で、継続的に改善される",
        "システムが社内を動かし、あなたは会社を前進させる",
      ],
    },
    brainBody: {
      badge: "発想の転換",
      title: "AIにはかつて「頭脳」しかなかった。今は「身体」を持つ。",
      subtitle: "この違いが、可能性のすべてを変える。",
      panels: [
        {
          title: "手のない頭脳",
          body: "質問を入力すると、優れた回答が返ってきます。しかしその後、動くのはあなたです。コピー、ペースト、送信、保存、スケジューリング。AIは待ちます。あなたが動きます。",
        },
        {
          title: "行動できる頭脳",
          body: "同じAIモデル（Claude、GPT）ですが、今は「行動する力」を持ちます。ウェブ検索、ファイル作成、メール送信、データベース更新、ワークフロー実行。すべてこなせます。アドバイスするだけでなく、実行します。",
        },
        {
          title: "あなたの業務につながる",
          body: "あなたのツール、データ、システムへのアクセスを与えると、コンピュータ上でできることは何でも自動で、指示に応じて、あなたが眠っている間にも実行します。これが、AIOSです。",
        },
      ],
      closing: "この変化が、すべてを可能にします。",
    },
    caseStudy: {
      badge: "ケーススタディ #1",
      title: "自社の業務を、すべて",
      titleHighlight: "このシステムで動かしています。",
      subtitle: "デモではありません。これがわたしたちの日常のオペレーティングシステムです。AIOSを使って、ひとりの人間が毎日管理していることをご覧ください。",
      metrics: [
        { value: 26, label: "アクティブプロジェクト", sublabel: "同時進行で管理中" },
        { value: 63, label: "進行中タスク", sublabel: "全プロジェクトにわたって" },
        { value: 9, label: "商談案件", sublabel: "自動追跡中" },
      ],
      howItWorksTitle: "実際の運用方法",
      howItWorks: [
        { title: "完全な業務文脈", description: "AIはすべてのプロジェクト、クライアント、締め切り、約束を把握しています。「今週の遅延タスクは？」と聞けば、即座に正確な答えが返ってきます。" },
        { title: "AIエージェントがタスクを処理", description: "タスクがAIエージェントに割り当てられると、エージェントが拾い上げ、作業を完了し、確認のために戻してきます——自律的に。" },
        { title: "自然言語でコントロール", description: "「完了にして」「明日に移動して」「これをClaudeに割り当てて」。データベースを手動更新する必要はありません。話しかけるだけで、システムがすべてを更新します。" },
        { title: "5つのシステムが連携", description: "Notion、Googleカレンダー、TidyCal、Googleビジネスプロフィール、n8n——ひとつのAPIですべてつながっています。情報が自然に流れます。" },
        { title: "スマートなスケジューリング", description: "タスクには所要時間と期日が設定されています。システムが空き時間を確認し、重複を避け、作業ブロックを自動でスケジュールします。" },
        { title: "一人で、エージェンシー規模の出力。", description: "26のアクティブプロジェクト、4社のクライアント、9件の商談、多言語対応——すべてAIOSをバックボーンに、一人で管理しています。" },
      ],
      testimonial: "AIOSを導入する前は、すべてが私の頭の中にありました。現場を離れると、物事が崩れていました。今は、ビジネスを本当に理解しているオペレーティングシステムがあります——すべてのプロジェクト、すべての約束、すべてのプロセスを把握しています。明日、誰かに引き継いでも、初日からすべての文脈を持てるでしょう。",
      testimonialAuthor: "ルイス・ライス — MOTTO Digital 代表",
    },
    orgChart: {
      title: "MOTTO Digitalを動かすエージェントチーム",
      ceo: "CEO（ルイス・ライス）",
      integrator: "インテグレーターAI",
      csuite: [
        { role: "CPO", domain: "プロダクト・プロジェクト" },
        { role: "CTO", domain: "技術・インフラ" },
        { role: "CMO", domain: "マーケティング・コンテンツ" },
        { role: "COO", domain: "オペレーション・スケジュール" },
        { role: "CFO", domain: "財務・価格設定" },
      ],
      vendors: [
        { name: "notion-ops", description: "プロジェクトDBの読み書き" },
        { name: "researcher", description: "大量コンテンツを解析・要約" },
        { name: "content-writer", description: "LinkedInやドキュメントを執筆" },
        { name: "vps-ops", description: "サーバー管理、デプロイ" },
        { name: "n8n-builder", description: "自動化ワークフローの構築・デバッグ" },
      ],
    },
    howItWorks: {
      badge: "\u3069\u3046\u9032\u3081\u308B\u304B",
      title: "3\u3064\u306E\u30B9\u30C6\u30C3\u30D7\u3002",
      titleHighlight: "6\u30F6\u6708\u3002\u305A\u3063\u3068\u3042\u306A\u305F\u306E\u3082\u306E\u3002",
      steps: [
        {
          num: "1",
          title: "\u7121\u6599\u8A3A\u65AD",
          description: "\u3042\u306A\u305F\u306E\u30D3\u30B8\u30CD\u30B9\u306B\u3064\u3044\u3066\u6559\u3048\u3066\u304F\u3060\u3055\u3044\u3002Lewis\u304C\u76F4\u63A5\u78BA\u8A8D\u3057\u3001\u6D3B\u7528\u306E\u53EF\u80FD\u6027\u3092\u4E00\u7DD2\u306B\u63A2\u308A\u307E\u3059\u3002\u5B8C\u5168\u7121\u6599\u3067\u3059\u3002",
        },
        {
          num: "2",
          title: "6\u30F6\u6708\u306E\u69CB\u7BC9",
          description: "\u696D\u52D9\u3092\u30DE\u30C3\u30D4\u30F3\u30B0\u3057\u3001AI\u30A2\u30FC\u30AD\u30C6\u30AF\u30C1\u30E3\u3092\u8A2D\u8A08\u3057\u3001\u30A8\u30FC\u30B8\u30A7\u30F3\u30C8\u3092\u69CB\u7BC9\u3057\u3001\u30C1\u30FC\u30E0\u3092\u30C8\u30EC\u30FC\u30CB\u30F3\u30B0\u3002\u6BCE\u9031\u306E\u30BB\u30C3\u30B7\u30E7\u30F3\u3067\u3001\u78BA\u5B9F\u306B\u9032\u307F\u307E\u3059\u3002",
        },
        {
          num: "3",
          title: "\u305A\u3063\u3068\u3042\u306A\u305F\u306E\u3082\u306E",
          description: "6\u30F6\u6708\u5F8C\u3001\u30C1\u30FC\u30E0\u304C\u81EA\u529B\u3067\u30B7\u30B9\u30C6\u30E0\u3092\u904B\u7528\u3002\u30A8\u30FC\u30B8\u30A7\u30F3\u30C8\u3082\u3001\u30B3\u30FC\u30C9\u3082\u3001\u30A4\u30F3\u30D5\u30E9\u3082\u3001\u3059\u3079\u3066\u3042\u306A\u305F\u306E\u3082\u306E\u3067\u3059\u3002",
        },
      ],
    },
    midCta: {
      title: "あなたのビジネスではどうなるか、見てみませんか？",
      subtitle: "無料AI活用診断はサクッと5分で完了。Lewisが直接回答を確認して、カスタムレポートを通話で説明します。",
    },
    problems: {
      badge: "\u5FC3\u5F53\u305F\u308A\u3042\u308A\u307E\u305B\u3093\u304B\uFF1F",
      title: "\u3082\u3046\u6C17\u3065\u3044\u3066\u3044\u308B\u306F\u305A\u3067\u3059\u3002",
      titleMuted: "\u4F55\u304B\u3092\u5909\u3048\u306A\u3044\u3068\u3044\u3051\u306A\u3044\u3002",
      subtitle: "",
      items: [
        { title: "\u3042\u306A\u305F\u304C\u3044\u306A\u3044\u3068\u3001\u4F1A\u793E\u304C\u6B62\u307E\u308B", description: "\u3059\u3079\u3066\u306E\u5224\u65AD\u304C\u3042\u306A\u305F\u3092\u901A\u308B\u3002\u3042\u306A\u305F\u304C\u3044\u306A\u3044\u3068\u4F55\u3082\u9032\u307E\u306A\u3044\u3002\u4F1A\u793E\u306F\u3001\u3042\u306A\u305F\u304C\u500B\u4EBA\u7684\u306B\u7BA1\u7406\u3067\u304D\u308B\u7BC4\u56F2\u3092\u8D85\u3048\u3066\u6210\u9577\u3067\u304D\u306A\u3044\u3002" },
        { title: "AI\u3092\u8A66\u3057\u305F\u304C\u3001\u4F55\u3082\u5909\u308F\u3089\u306A\u304B\u3063\u305F", description: "ChatGPT\u3092\u5C0E\u5165\u3057\u305F\u3002\u30C1\u30FC\u30E0\u306F1\u9031\u9593\u89E6\u3063\u3066\u307F\u305F\u3002\u3067\u3082\u4F55\u3082\u5B9A\u7740\u3057\u306A\u304B\u3063\u305F\u3002\u696D\u52D9\u30D7\u30ED\u30BB\u30B9\u306F\u5909\u308F\u3089\u305A\u3001\u307E\u305F\u624B\u4F5C\u696D\u306B\u623B\u3063\u3066\u3044\u308B\u3002" },
        { title: "\u30C4\u30FC\u30EB\u540C\u58EB\u304C\u3064\u306A\u304C\u3063\u3066\u3044\u306A\u3044", description: "5\u3064\u4EE5\u4E0A\u306E\u30C4\u30FC\u30EB\u306B\u304A\u91D1\u3092\u6255\u3063\u3066\u3044\u308B\u306E\u306B\u3001\u3069\u308C\u3082\u9023\u643A\u3057\u3066\u3044\u306A\u3044\u3002\u30C1\u30FC\u30E0\u306F\u30BF\u30D6\u9593\u3067\u30C7\u30FC\u30BF\u3092\u30B3\u30D4\u30DA\u3002\u60C5\u5831\u306F\u4EBA\u306E\u982D\u306E\u4E2D\u306B\u3042\u3063\u3066\u3001\u30B7\u30B9\u30C6\u30E0\u306B\u306F\u306A\u3044\u3002" },
      ],
    },
    stack: {
      badge: "構築のしくみ",
      title: "使えば使うほど、",
      titleHighlight: "グッと賢くなるシステム。",
      subtitle: "AIOSはインストールして終わりの製品ではありません。あなたのビジネスに合わせて構築されたアーキテクチャです。使えば使うほど、価値が高まります。",
      pyramidFraming: "下の3層はあなたが所有します。最上層のAIモデルは交換可能——今日最良のものを使い、明日アップグレードし、必要なら完全に乗り換えられる。データ、ロジック、インフラはすべてあなたのものです。",
      steps: [
        { num: "1", title: "データをつなぐ", desc: "ツール、ドキュメント、業務知識をひとつのアクセス可能なシステムに統合します。" },
        { num: "2", title: "AIエージェントを展開する", desc: "役割、権限、ツールが定義されたエージェントを、あなたのインフラで稼働させます。" },
        { num: "3", title: "システムを所有する", desc: "すべてあなたのサーバー、あなたのアカウントで動作。ツールを変えても、データはそのまま。" },
      ],
      layers: [
        { title: "データレイヤー", badge: "レイヤー 1", description: "あなたのビジネス知識を、構造化してアクセス可能な状態に。CRMデータ、文書、業務プロセス、コミュニケーション——あなたがコントロールするシステムに統合します。ここがしっかりしていれば、すべてのAIインタラクションがより賢くなります。" },
        { title: "エージェントフレームワーク", badge: "レイヤー 2", description: "エージェントを信頼できるものにするスキル、API、構造化されたプロンプト。単に「ChatGPTをつなぐ」だけではありません。明確な役割、権限、ツールアクセス、エスカレーションのパスを定義します。この差が、遊べるAIと動くシステムを分けます。" },
        { title: "環境", badge: "レイヤー 3", description: "エージェントが動作するインフラ。あなたのVPS、GitHubリポジトリ、自動化プラットフォーム。AIエージェントが実際のビジネスシステムと安全にやり取りできる作業環境です。あなたのコントロール下に。共有サーバーなし、プラットフォーム依存なし。" },
        { title: "AIモデル", badge: "レイヤー 4 — 交換可能", description: "Claude、OpenAI、Gemini、オープンソースモデル——タスクに応じて最適なものを使います。より良いものが登場したら、交換できます。システムは特定のAIベンダーに依存しません。下の3層は、最上層が何であっても変わりません。" },
      ],
    },
    program: {
      badge: "6ヶ月プログラム",
      title: "明確な計画。本物のシステム。",
      titleHighlight: "6ヶ月で一緒に構築します。",
      subtitle: "棚に置かれるだけのパワーポイントではありません。伴走型で、チームと一緒に、ずっと所有できるインフラをつくります。",
      month1: {
        title: "調査・計画",
        subtitle: "1ヶ月目",
        items: [
          "現在のツールスタックと業務フローをマッピング",
          "インパクトの高い機会を特定",
          "カスタムAIOSアーキテクチャを設計",
          "エージェントの役割とデータフローを定義",
          "実装ロードマップを作成",
        ],
      },
      month2: {
        title: "インフラ構築",
        subtitle: "2ヶ月目",
        items: [
          "インフラの構築（VPS、GitHub、SaaS連携）",
          "初期データフローと統合の構築",
          "データインフラとセキュリティプロトコルの確立",
        ],
      },
      month3: {
        title: "システム構築",
        subtitle: "3ヶ月目",
        items: [
          "システム構築：ビジネスコンテキスト、エージェント、スキル",
          "実際の業務フローでAIエージェントを展開・テスト",
          "各システムが稼働するたびにチームへのトレーニングを実施",
        ],
      },
      month4: {
        title: "運用・改善・サポート",
        subtitle: "4〜6ヶ月目",
        items: [
          "日々の業務でシステムを活用しながら、継続的なガイダンスを提供",
          "実際の利用データをもとに継続的に改善",
          "完全なドキュメント化と引き継ぎ——すべてあなたのものに",
        ],
      },
      byMonth6: {
        title: "6ヶ月後のあなたの会社:",
        metrics: [
          { value: "あなたが作ったAIエージェント", label: "あなたが作ったAIエージェントが稼働", sublabel: "実際の仕事を毎日実行" },
          { value: "100%", label: "ドキュメント化・所有済み", sublabel: "チームが自分たちで運用・拡張" },
          { value: "ゼロ", label: "ベンダー依存", sublabel: "ツールを変えても、データはそのまま" },
        ],
      },
    },
    guarantee: {
      title: "\u30AA\u30FC\u30CA\u30FC\u30B7\u30C3\u30D7\u4FDD\u8A3C",
      headline: "6\u30F6\u6708\u5F8C\u306B\u3067\u304D\u306A\u3051\u308C\u3070\u3001\n\u3067\u304D\u308B\u307E\u3067\u7121\u511F\u3002",
      description: "\u8A00\u3044\u8A33\u306A\u3057\u3002\u5C0F\u3055\u306A\u6587\u5B57\u306A\u3057\u30026\u30F6\u6708\u306E\u30D7\u30ED\u30B0\u30E9\u30E0\u3092\u5B8C\u8D70\u3057\u3066\u304F\u3060\u3055\u3044\u3002\u30C1\u30FC\u30E0\u304CAI\u30A8\u30FC\u30B8\u30A7\u30F3\u30C8\u3092\u81EA\u529B\u3067\u69CB\u7BC9\u30FB\u7BA1\u7406\u3067\u304D\u306A\u3044\u5834\u5408\u3001\u3067\u304D\u308B\u3088\u3046\u306B\u306A\u308B\u307E\u3067\u7121\u511F\u3067\u30B5\u30DD\u30FC\u30C8\u3092\u7D9A\u3051\u307E\u3059\u3002",
      cohortNote: "\u30B0\u30EB\u30FC\u30D7\u30B3\u30DB\u30FC\u30C8\uFF1A\u3067\u304D\u308B\u3088\u3046\u306B\u306A\u308B\u307E\u3067\u6B21\u306E\u30B3\u30DB\u30FC\u30C8\u306B\u7121\u6599\u53C2\u52A0\u3002",
      corporateNote: "\u30B3\u30FC\u30DD\u30EC\u30FC\u30C8\uFF1A\u30C1\u30FC\u30E0\u304C\u3067\u304D\u308B\u307E\u3067\u7121\u511F\u3067\u30B5\u30DD\u30FC\u30C8\u7D99\u7D9A\u3002",
      meetFirst: "\u307E\u305A\u306F\u9762\u8AC7\u3002\u305D\u308C\u304B\u3089\u5224\u65AD\u3002\u5E2D\u3092\u78BA\u4FDD\u3057\u3066\u3082\u3001Lewis\u3068\u306E\u9762\u8AC7\u5F8C\u306B\u3054\u5224\u65AD\u3044\u305F\u3060\u3051\u307E\u3059\u3002",
    },
    shiryo: {
      buttonText: "資料をダウンロード",
      dialogTitle: "AIOS概要デック",
      dialogSubtitle: "AIOSとは何か、どのように機能するか、何が得られるか——完全なウォークスルーです。",
      viewNow: {
        label: "今すぐ見る",
        body: "すぐにブラウザで資料を開けます。メールアドレスは不要です。",
        cta: "資料を開く",
      },
      getPdf: {
        label: "PDFをダウンロード",
        body: "AIOS概要の完全版をPDFファイルでダウンロードできます。",
        cta: "PDFをダウンロード",
      },
    },
    auditCta: {
      title: "自社に合うかどうか迷っていますか？",
      titleHighlight: "無料で確認できます。",
      subtitle: "あなたのビジネスについて教えてください。ルイスが回答を一つひとつ確認します。最も影響の大きいAIの機会を特定し、通話でカスタム診断レポートを一緒に確認します。レポートはそのままあなたのものです——義務は一切ありません。",
      benefits: [
        "完全無料、義務なし",
        "ルイスが直接確認",
        "通話でのライブウォークスルー",
        "カスタムレポート——あなたのものに",
      ],
    },
    bio: {
      name: "ルイス・ライス（Lewis Rice）",
      title: "MOTTO Digital 代表 · 東京在住",
      bio1: "クライアントのためにAIシステムを構築するだけでなく、自社でも同じシステムで経営しています。26プロジェクト、63タスク、9件の商談——すべてAIOSで、一人で管理しています。",
      bio2: "高価でバラバラなAIツールに企業が依存していくのを何年も見てきました。そこで、このフレームワークを作りました。あなたが所有し、ビジネスとともに成長するAIシステム。チームと一緒に手を動かしながら構築して、教えます。誰にも依存しない状態を目指します。",
      tags: ["AIエージェント", "インフラ設計", "ノーコード / ローコード", "チームトレーニング", "バイリンガル EN/JP"],
    },
    footer: {
      tagline: "ビジネスのためのAIオペレーティングシステム。",
      tagline2: "一緒につくる。あなたが所有する。ビジネスとともに成長する。",
      navigate: "ナビゲーション",
      caseStudyLink: "実績",
      programLink: "プログラム",
      pricingLink: "料金",
      auditLink: "無料AI活用診断",
      privacyLink: "プライバシーポリシー",
      presentationLink: "資料",
      contact: "お問い合わせ",
      contactCta: "気軽に相談してみませんか",
      company: {
        representative: "代表：Lewis Rice",
        location: "所在地：東京",
        founded: "設立：2024年",
      },
      copyright: "MOTTO Digital Inc. All rights reserved.",
    },
  },
} as const;

export default ja;
