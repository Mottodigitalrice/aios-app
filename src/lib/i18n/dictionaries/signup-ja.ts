const signupDict = {
  nav: {
    backToHome: "ホームに戻る",
    home: "ホーム",
    privacy: "プライバシー",
  },
  badge: "AIOSプログラム",
  title: "",
  titleHighlight: "AIOSをはじめる",
  subtitle:
    "AIオペレーティングシステムを構築する準備はできましたか？トラックを選んで、始めましょう。",
  chips: ["6ヶ月プログラム", "すべてあなたのもの", "オーナーシップ保証"],
  common: {
    continue: "次へ",
    back: "戻る",
    submit: "席を確保する",
    saving: "保存中...",
    required: "必須",
    optional: "任意",
    stepOf: "ステップ {current} / {total}",
  },
  progressBar: {
    1: { text: "良い選択です！", timeLeft: "残り約5分" },
    2: { text: "あなたについて教えてください", timeLeft: "残り約4分" },
    3: { text: "目標がプログラムを形作ります", timeLeft: "残り約3分" },
    4: { text: "もう少しです！", timeLeft: "残り約2分" },
    5: { text: "セッション時間を選択", timeLeft: "残り約2分" },
    6: { text: "お支払いプランを確定", timeLeft: "残り約1分" },
    7: { text: "確認して完了です！", timeLeft: "1分以内" },
  },
  steps: {
    1: {
      question: "AIOSの利用方法を選択",
      description:
        "あなたの状況に最適なオプションを選んでください。すべてオーナーシップ保証付きです。",
      cohortLabel: "グループコホート",
      cohortPrice: "¥20,000/月",
      cohortDescription:
        "他のプロフェッショナルと一緒に、6ヶ月の構造化プログラムで学びます。週2回のグループセッション、Slackサポート、専用GitHubセットアップ付き。",
      cohortBestFor: "AIの可能性を探りたい方、共同学習を好む方に最適",
      individualLabel: "マンツーマン",
      individualPrice: "¥50,000/月",
      individualDescription:
        "あなたのビジネスとワークフローに特化した1対1の専属コーチング。Lewisとの週次セッション。",
      individualBestFor: "CEO、経営者、個人事業主の方に最適",
      companyLabel: "カンパニービルド",
      companyPrice: "¥200,000/月",
      companyDescription:
        "御社のための専用AIビルド。最大10名参加の、ニーズに合わせたカスタムプログラム。",
      companyBestFor: "社内AIチームを育成したい企業に最適",
    },
    2: {
      question: "あなたについて",
      description: "プログラムをカスタマイズするため、少し教えてください。",
      nameLabel: "氏名",
      namePlaceholder: "フルネーム",
      emailLabel: "メールアドレス",
      emailPlaceholder: "you@company.com",
      companyLabel: "会社名",
      companyPlaceholder: "会社名",
      companyRequired: "必須",
      roleLabel: "役職",
      rolePlaceholder: "例：CEO、CTO、創業者",
    },
    3: {
      question: "あなたの目標",
      description: "AIで何を達成したいか教えてください。",
      goalsLabel: "AIで何を達成したいですか？",
      goalsPlaceholder:
        "例：クライアントレポートの自動化、ツールの連携、社内AIエージェントの構築...",
      painPointsLabel: "最大の運営課題は？",
      painPointsPlaceholder:
        "例：手作業が多すぎる、情報がツール間で分散している...",
      teamSizeLabel: "参加予定のチーム人数は？",
      teamSizeLabelCompany: "会社の従業員数は？",
      teamSizePlaceholder: "例：5",
    },
    4: {
      question: "開始について",
      description: "お申し込みの準備のため、最後の質問です。",
      startLabel: "いつから始めたいですか？",
      startOptionsCompany: ["できるだけ早く", "まだ未定"],
      startOptionsIndividual: ["できるだけ早く", "まだ未定"],
      startOptionsCohort: ["2026年5月コホート", "まずは情報収集"],
      sourceLabel: "AIOSをどこで知りましたか？",
      sourceOptions: ["LinkedIn", "紹介", "検索", "イベント", "その他"],
      notesLabel: "その他、何かありますか？",
      notesPlaceholder: "任意 — 質問、背景、特別なリクエストなど...",
    },
    5: {
      question: "週次セッションの希望時間",
      description: "セッション時間の決め方：",
      descriptionBullets: [
        "Lewisの都合とコホート全員の都合を基準に時間を決定します",
        "全員の都合が合う時間があれば、週1回のセッションを実施",
        "合わない場合は、同じ内容のセッションを週2回実施（都合の良い方に参加、両方でも可）",
        "すべてのセッションは録画されるため、後から視聴可能です",
      ],
      helperNote:
        "5月の一般的な空き時間を基準にお答えください。これがそのまま継続スケジュールになる可能性が高いですが、毎月チーム全体で確認し、必要に応じて調整します。全員が無理なく参加できるよう工夫します。",
      legendCommit: "毎週参加可能",
      legendMaybe: "ときどき / 補欠",
      legendNo: "参加不可",
      dayMon: "月曜日",
      dayWed: "水曜日",
      dayThu: "木曜日",
      timezoneNote: "すべての時間はJST（日本標準時）で表示しています。",
      validationHint:
        "「毎週参加可能」を2つ以上、または「ときどき」を3つ以上お選びください。",
    },
    6: {
      question: "お申し込みの確認",
      description:
        "本プログラムは6ヶ月間のコミットメントです。6ヶ月を通して参加する覚悟がある方のみお申し込みください。エージェンティックAIに習熟し、ご自身で運用・拡張・維持できるシステムを構築するには、6ヶ月という期間が必要です。それこそが本コースの目的です。",
      refundTitle: "返金ポリシー",
      refundBody:
        "原則として返金は行いません。ただし、Lewisは柔軟に対応します — 予期せぬ事情が発生した場合は、ぜひご相談ください。何らかの形で対応させていただきます。",
      paymentTitle: "お支払い方法",
      paymentBody:
        "銀行振込。請求書をメールでお送りします。お支払いはすべて前払いとなります。",
      planLabel: "お支払いプランを選択",
      upfrontLabel: "一括払い — ¥100,000（税抜）",
      upfrontSubtitle: "¥20,000の割引。請求・振込は1回のみ。",
      upfrontBadge: "おすすめ",
      monthlyLabel: "月額 — ¥20,000/月 × 6ヶ月（税抜）",
      monthlySubtitle:
        "合計¥120,000。請求書は一括発行、お支払いは毎月前払い。",
    },
    7: {
      question: "連絡手段について",
      description:
        "2つのチャンネルをご用意します：公式連絡用のLINEと、コミュニティ用のSlackです。",
      lineTitle: "MOTTO Digital公式LINEを追加（必須）",
      lineBody:
        "コース運営に関する公式連絡はすべてこちらで行います：セッションのリマインダー、スケジュール変更、重要なお知らせ、リソースの共有など。次へ進む前に、公式LINEアカウントを必ずご追加ください。",
      lineQrCaption: "QRコードをスキャン — または、モバイルではボタンをタップ。",
      lineAddButton: "LINEで追加",
      lineConfirmLabel: "公式LINEアカウントを追加しました",
      slackTitle: "コホートSlackチャンネルに参加（任意）",
      slackBody:
        "公式連絡とは別に、コホート用のSlackチャンネルをご用意します — メンバー同士で質問し合ったり、成果を共有したり、セッションの合間に学び合うスペースです。Lewisも参加します。重要なコース情報はLINEで届きます。Slack参加は任意です。",
      slackOptInYes: "はい — サインアップ後に招待を送ってください",
      slackOptInNo: "いいえ — LINEのみで十分です",
    },
    8: {
      question: "内容確認・送信",
      description:
        "入力内容をご確認ください。問題なければ「席を確保する」を押してください。",
      summaryTitle: "お申し込み内容",
      trackLabel: "トラック",
      trackCohort: "グループコホート（¥20,000/月）",
      trackIndividual: "マンツーマン（¥50,000/月）",
      trackCompany: "カンパニービルド（¥200,000/月）",
      nameLabel: "氏名",
      emailLabel: "メール",
      companyLabel: "会社名",
      roleLabel: "役職",
      goalsLabel: "目標",
      startLabel: "開始希望",
      referralLabel: "きっかけ",
      availabilityLabel: "参加可能なセッション時間",
      availabilityMaybeLabel: "補欠時間",
      availabilityNone: "— 未選択 —",
      paymentLabel: "お支払いプラン",
      paymentUpfront: "一括払い — ¥100,000（税抜）",
      paymentMonthly: "月額 — ¥20,000/月 × 6",
      communicationLabel: "連絡手段",
      lineConfirmed: "公式LINE追加済み",
      slackYes: "Slackコミュニティ：参加",
      slackNo: "Slackコミュニティ：不参加",
      guarantee:
        "オーナーシップ保証付き — 6ヶ月後にAIエージェントを管理できない場合、無償でサポートを継続します。",
      whatHappensNextTitle: "次のステップ",
      whatHappensNext1:
        "Lewisが24時間以内に内容を確認し、お席を確定します",
      whatHappensNext2:
        "初回の請求書とウェルカムパックをメールでお送りします",
      whatHappensNext3:
        "ライブセッションは5月開始 — コホートメンバーが揃い次第、週次スケジュールを確定します",
      guaranteeReinforcement: "オーナーシップ保証付き",
    },
  },
  success: {
    title: "席を確保しました！",
    subtitle:
      "まもなく次のステップをご案内するメールをお送りします。ライブセッションは5月に開始します。プレッシャーはありません — ここから一緒に進めていきましょう。",
    steps: [
      {
        title: "確認メール",
        description:
          "希望時間とお支払い情報を含む確認メールが届きます。",
      },
      {
        title: "請求書発行",
        description:
          "初回の請求書がメールで届きます — 毎月前払いにて銀行振込をお願いします。",
      },
      {
        title: "5月キックオフ",
        description:
          "コホートメンバーが揃い次第、週次セッション時間を確定し、カレンダー招待をお送りします。",
      },
    ],
    optionalBookingTitle: "任意：Lewisとの面談予約",
    optionalBookingBody:
      "コース開始前に確認したいことがあれば、お気軽にLewisとの面談をご予約いただくか、メールでもお問い合わせいただけます。どちらでも構いません。",
    optionalBookingCta: "Lewisと面談を予約",
    contactPrompt: "メールでのお問い合わせはこちら：",
    contactEmail: "rice@mottodigital.jp",
    backHome: "ホームに戻る",
  },
  sidebar: {
    trustBadge: "データは暗号化され、第三者と共有されることはありません。",
    steps: {
      0: {
        title: "申し込み内容",
        items: [
          "6ヶ月の実践的なAIオペレーティングシステム構築",
          "6ヶ月後に10体のAIエージェントが本番稼働",
          "完全所有 — すべてがあなたのインフラで稼働",
          "オーナーシップ保証",
        ],
      },
      1: {
        title: "なぜこの質問をするのか",
        items: [
          "役職と会社に合わせてプログラムをカスタマイズします",
          "コーポレートビルドには専用インフラセットアップが含まれます",
        ],
      },
      2: {
        title: "目標がプログラムを形作る",
        items: [
          "最もインパクトの高い機会を優先します",
          "課題が最初の自動化ターゲットになります",
        ],
      },
      3: {
        title: "もう少しです！",
        items: [
          "ルイスがすべての申し込みを直接確認します",
          "24時間以内にご連絡します",
          "ルイスとお話しするまで、約束はありません",
        ],
      },
      4: {
        title: "あなたの希望時間",
        items: [
          "全員の都合を踏まえて時間を決めます",
          "必要なら週2回、同じ内容で実施します",
          "すべて録画されます",
        ],
      },
      5: {
        title: "お申し込み内容",
        items: [
          "6ヶ月が成果の出る最短期間です",
          "一括払いで¥20,000割引",
          "銀行振込 — 請求書はメールでお送りします",
        ],
      },
      6: {
        title: "2つのチャンネル、1つの目的",
        items: [
          "公式LINE：リマインダーと公式連絡",
          "Slack：任意のピアコミュニティ",
          "Lewisとは常に直接つながっています",
        ],
      },
      7: {
        title: "準備完了！",
        items: [
          "送信前に内容をご確認ください",
          "Lewisが24時間以内に個別にご連絡します",
          "オーナーシップ保証付き",
        ],
      },
    },
  },
} as const;

export default signupDict;
