const en = {
  common: {
    continue: "Continue",
    back: "Back",
    submit: "Submit",
    stepOf: "Step {current} of {total}",
    required: "Required",
    optional: "Optional",
    other: "Other",
    otherPlaceholder: "Please specify...",
    loading: "Loading...",
  },
  audit: {
    badge: "Free \u00B7 No Obligation",
    title: "Get Your Free",
    titleHighlight: "AI Audit",
    subtitle:
      "Answer a few quick questions and Lewis will personally put together a custom AI readiness audit \u2014 then walk you through it on a call. The full report is yours to keep, completely free.",
    chips: ["Custom report", "Live walkthrough call", "Yours to keep, free"],
    steps: {
      1: {
        question: "Let\u2019s start with your email",
        description:
          "We\u2019ll use this to send you the audit report. No spam, ever.",
        emailLabel: "Work email",
        emailPlaceholder: "you@company.com",
        consentLabel: "I agree to the",
        consentLink: "privacy policy",
        consentRequired: "You must agree to the privacy policy to continue",
      },
      2: {
        question: "Tell us about yourself",
        nameLabel: "What\u2019s your name?",
        namePlaceholder: "Your full name",
        roleLabel: "What\u2019s your role?",
        roleOptions: [
          "CEO / Founder",
          "CTO / Technical Lead",
          "COO / Operations",
          "VP / Director",
          "Product Manager",
          "Department Manager",
        ],
      },
      3: {
        question: "Tell us about your company",
        companyLabel: "What company are you with?",
        companyPlaceholder: "Company name",
        sizeLabel: "How big is your team?",
        sizeOptions: ["1-5", "6-20", "21-50", "51-100", "100+"],
      },
      4: {
        question: "What tools does your team use?",
        description: "Select all that apply \u2014 this helps us understand your current stack.",
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
      5: {
        question: "What are your biggest operational challenges?",
        description: "Select all that apply.",
        challenges: [
          "Manual data entry / repetitive tasks",
          "Information scattered across tools",
          "Slow internal communication",
          "No clear AI strategy",
          "Team resistance to new tools",
          "Security / compliance concerns",
          "Too many disconnected SaaS subscriptions",
          "Difficulty scaling operations",
        ],
      },
      6: {
        question: "AI experience & vision",
        experienceLabel: "How much AI experience does your team have?",
        experienceOptions: [
          "None yet",
          "Experimenting",
          "Using regularly",
          "Advanced",
        ],
        visionLabel: "What would you want AI to do in 6 months?",
        visionOptions: [
          "Automate repetitive tasks",
          "Connect existing tools",
          "Improve customer communication",
          "Generate reports / analytics",
          "Reduce costs",
          "Train team on AI",
          "Build custom AI agents",
        ],
      },
      7: {
        question: "Almost done \u2014 just a few logistics",
        sourceLabel: "How did you find us?",
        sourceOptions: [
          "LinkedIn",
          "Referral",
          "Google Search",
          "Social Media",
          "Event",
        ],
        timeLabel: "When\u2019s a good time for a call?",
        timeOptions: [
          "Morning (9-12 JST)",
          "Afternoon (13-17 JST)",
          "Evening (18-21 JST)",
        ],
        websiteLabel: "Got a website?",
        websitePlaceholder: "https://example.com",
      },
    },
    success: {
      title: "You\u2019re In \u2014 Thank You",
      subtitle:
        "Lewis will personally review your answers and put together a custom audit report for your business. No templates, no AI-generated fluff \u2014 a real analysis from someone who builds these systems every day.",
      steps: [
        {
          title: "Lewis reviews your answers",
          description:
            "He\u2019ll go through everything you shared \u2014 your tools, challenges, and vision \u2014 and prepare a personalized AI readiness audit.",
        },
        {
          title: "You meet to walk through it together",
          description:
            "Lewis will share the full audit report with you on a video call, explain every recommendation, and answer all your questions.",
        },
        {
          title: "You keep the full report",
          description:
            "After the call, the complete audit report is yours. No obligations, totally free of charge \u2014 as promised.",
        },
      ],
      bookCta: "Book Your Free Audit Call",
      bookSubtext: "30 minutes \u00B7 Video call \u00B7 No sales pressure",
      bookDescription:
        "Go ahead and pick a time that works for you. Lewis will have your audit ready by the call.",
      backHome: "Back to Home",
    },
  },
  privacy: {
    title: "Privacy Policy",
    lastUpdated: "Last updated: February 2026",
    sections: {
      intro: {
        title: "Introduction",
        content:
          "MOTTO Digital (\u201Cwe\u201D, \u201Cour\u201D, \u201Cus\u201D) is committed to protecting your privacy. This policy explains how we collect, use, and safeguard information provided through our free AI audit form and related services.",
      },
      dataCollected: {
        title: "What We Collect",
        content:
          "When you complete our audit intake form, we collect: your name, email address, company name, job title, team size, current software tools, business challenges, AI experience level, and scheduling preferences. We also record your consent to this privacy policy and the date of that consent.",
      },
      howUsed: {
        title: "How We Use Your Data",
        items: [
          "To prepare your personalized AI readiness audit report",
          "To schedule and conduct your audit walkthrough call",
          "To contact you about MOTTO Digital\u2019s services that may be relevant to your business needs",
          "To improve our audit process and service offerings",
        ],
      },
      sharing: {
        title: "Data Sharing",
        content:
          "We will never sell your personal information to third parties. We may share your data with trusted service providers who help us deliver our services (e.g., video conferencing, email delivery), but only as necessary and under strict confidentiality agreements.",
      },
      retention: {
        title: "Data Retention",
        content:
          "We retain your information for as long as necessary to provide our services and maintain our business relationship. You may request deletion of your data at any time by contacting us at hello@mottodigital.com.",
      },
      rights: {
        title: "Your Rights",
        items: [
          "Request access to the personal data we hold about you",
          "Request correction of inaccurate data",
          "Request deletion of your data",
          "Withdraw your consent at any time",
        ],
      },
      contact: {
        title: "Contact Us",
        content:
          "If you have questions about this privacy policy or wish to exercise your rights, please contact us at hello@mottodigital.com.",
      },
    },
  },
  landing: {
    nav: {
      proof: "Proof",
      program: "Program",
      pricing: "Pricing",
      cta: "Free AI Audit",
    },
    hero: {
      badge: "Only 3 companies at a time",
      title: "Stop Managing 20 Tools.",
      titleHighlight: "Start Running One System.",
      subtitle:
        "One AI operating system that knows every project, every client, every promise \u2014 owned by you and getting smarter every day.",
      cta: "Get Your Free AI Audit",
      ctaSecondary: "See It In Action",
      stats:
        "Currently running 26 projects, 63 tasks, and 9 pipeline deals \u2014 on one system, managed by one person.",
      trust: "Trusted by companies across Japan",
      testimonial:
        "\u201CThis system changed how we operate. We went from chaos to clarity in 60 days.\u201D",
    },
    pricing: {
      badge: "Launch Pricing \u2014 First 3 Clients Only",
      title: "Invest in infrastructure you'll own forever",
      subtitle:
        "Two ways to get started. Both include the full program, all bonuses, and the Ownership Guarantee.",
      spotsLeft: "Only 2 spots remaining this quarter",
      monthly: "Monthly",
      monthlyPrice: "\u00A5500,000",
      monthlyPer: "/mo",
      monthlyTotal: "\u00A5500,000 \u00D7 6 = \u00A53,000,000 total",
      monthlyCta: "Start with Monthly",
      payInFull: "Pay in Full",
      payInFullPrice: "\u00A52,500,000",
      payInFullSave: "Save \u00A5500,000 vs monthly",
      payInFullCta: "Pay in Full & Save \u00A5500,000",
      bestValue: "Best Value",
      launchNote:
        "Launch pricing for the first 3 clients only. Standard rate: \u00A5800,000/month.",
      ceoNote: "Designed for CEOs and executive leadership teams.",
    },
    faq: {
      badge: "Common Questions",
      title: "Frequently asked questions",
      stillQuestions: "Still have questions?",
      bookCall: "Book a free call",
    },
    cta: {
      title: "Get Your Free AI Audit",
    },
    beforeAfter: {
      title: "What changes when your business",
      titleHighlight: "has a brain",
      withoutLabel: "Without an AI Operating System",
      withLabel: "With your AI Operating System",
      without: [
        "Your business knowledge lives in your head",
        "You wake up wondering what you forgot",
        "New hire takes 3-6 months to \"get it\"",
        "20 disconnected tools, nothing talks to each other",
        "Locked into vendors \u2014 switching means starting over",
        "AI feels like hype you can't act on",
        "Every process lives in someone's head",
        "You're always in the weeds or things fall apart",
      ],
      with: [
        "Your business knowledge lives in a system that never forgets",
        "You wake up and the system tells you what matters today",
        "New hire asks the system and has full context on day one",
        "One connected system \u2014 26 projects managed by one person",
        "You own everything \u2014 swap any tool, keep your data",
        "AI agents execute tasks while you focus on strategy",
        "Every process is documented, executable, and improving",
        "Work on your business while the system works in it",
      ],
    },
    caseStudy: {
      badge: "Case Study #1",
      title: "We Run Our Entire Company",
      titleHighlight: "On This System.",
      subtitle: "This isn\u2019t a demo \u2014 it\u2019s our daily operating system. Here\u2019s what one person manages every day with AIOS.",
      metrics: [
        { value: 26, label: "Active Projects", sublabel: "managed simultaneously" },
        { value: 63, label: "Tasks In Progress", sublabel: "across all projects" },
        { value: 9, label: "Pipeline Deals", sublabel: "tracked automatically" },
        { value: 16, label: "Locations Managed", sublabel: "automated GBP posting" },
      ],
      howItWorksTitle: "How it works in practice",
      howItWorks: [
        { title: "Full business context", description: "The AI knows every project, every client, every deadline, every promise. Ask \"what's overdue?\" and get a real answer \u2014 instantly." },
        { title: "AI agent handles tasks", description: "Tasks get assigned to the AI agent. It picks them up, does the work, and hands back for review \u2014 autonomously. Currently 5 tasks in the AI queue." },
        { title: "Natural language control", description: "\"Mark it done.\" \"Move to tomorrow.\" \"Assign that to Claude.\" No manual database entry. Just talk to the system and it updates everything." },
        { title: "5 systems connected", description: "Notion, Google Calendar, TidyCal, Google Business Profile, and n8n automation \u2014 all connected through one API. Everything flows." },
        { title: "Smart scheduling", description: "Tasks carry time estimates and deadlines. The system checks availability, avoids double-booking, and schedules work blocks automatically." },
        { title: "One person, agency output", description: "26 active projects, 4 paying clients, 9 pipeline deals, multi-language operations \u2014 all managed by one person with AIOS as the backbone." },
      ],
      testimonial: "\u201CBefore AIOS, everything lived in my head. If I wasn\u2019t in the weeds, things would fall apart. Now I have an operating system that truly understands my business \u2014 every project, every promise, every process. I could hand this to someone else tomorrow and they\u2019d have full context on day one.\u201D",
      testimonialAuthor: "\u2014 Lewis Rice, Founder, MOTTO Digital",
    },
    midCta: {
      title: "Ready to see what this looks like for your business?",
      subtitle: "The free AI audit takes 5 minutes. Lewis personally reviews every response and walks you through a custom report on a call.",
    },
    problems: {
      badge: "The Problem",
      title: "Why most AI adoption",
      titleMuted: "fails",
      subtitle: "Everyone knows AI is powerful. The question isn\u2019t whether to adopt it \u2014 it\u2019s how. Here\u2019s what the traditional approach gets wrong.",
      items: [
        { title: "Tool-first, not system-first", description: "Companies buy ChatGPT seats, a chatbot plugin, an automation tool \u2014 each solving one problem in isolation. Six months later: 8 subscriptions, zero integration, and AI that knows nothing about your business." },
        { title: "Vendor lock-in by default", description: "Your prompts, workflows, and business logic live inside platforms you don\u2019t own. Switch providers and you start from scratch. Your AI doesn\u2019t learn \u2014 it resets." },
        { title: "No compounding value", description: "Disconnected tools can\u2019t share context. Every AI interaction starts from zero. You\u2019re paying for intelligence that forgets everything between sessions." },
        { title: "Consultants build, then leave", description: "Traditional consultancies deliver a PDF and walk away. Or worse \u2014 build something only they can maintain, creating permanent dependency. Your team never learns to operate it." },
        { title: "Expensive pilots that don\u2019t scale", description: "You pay \u00A55M for a 3-month PoC that proves AI \u201Cworks\u201D in a sandbox. Then it sits there. No one knows how to expand it, and the consulting firm quotes another \u00A55M to try." },
        { title: "Data stays siloed", description: "Sales data in HubSpot, accounting in Freee, communication in Chatwork, files on Google Drive. AI can only be as smart as the data it can access \u2014 and right now it can\u2019t see across systems." },
      ],
    },
    stack: {
      badge: "How It\u2019s Built",
      title: "One system that gets",
      titleHighlight: "smarter every month.",
      subtitle: "AIOS isn\u2019t a product you install \u2014 it\u2019s an architecture built around YOUR business, getting more valuable the longer you use it.",
      steps: [
        { num: "1", title: "Connect Your Data", desc: "We unify your tools, docs, and business knowledge into one accessible system." },
        { num: "2", title: "Deploy AI Agents", desc: "Agents with defined roles, permissions, and tools \u2014 working on your infrastructure." },
        { num: "3", title: "Own the System", desc: "Everything runs on your servers, your accounts. Swap any tool, keep all your data." },
      ],
      layers: [
        { title: "Data Layer", badge: "Layer 1", description: "Your business knowledge, structured and accessible. CRM data, documents, processes, communications \u2014 unified in systems you control. This is the foundation everything else builds on." },
        { title: "Agent Framework", badge: "Layer 2", description: "Skills, APIs, and structured prompts that make agents reliable. Not just \u201Cplug in ChatGPT\u201D \u2014 defined roles, permissions, tool access, and escalation paths." },
        { title: "Environment", badge: "Layer 3", description: "The infrastructure where agents operate. Your VPS, your GitHub, your automation platform \u2014 the workspace that lets AI agents interact with real business systems, safely and under your control." },
        { title: "AI Models (Swappable)", badge: "Layer 4", description: "Claude, OpenAI, Gemini, open-source models \u2014 use the best for each task. When something better comes along, swap it in. Your system never depends on a single AI vendor." },
      ],
    },
    program: {
      badge: "6-Month Program",
      title: "AI running in your business",
      titleHighlight: "in the first 2 weeks",
      subtitle: "We don\u2019t make you wait 3 months for results. Your first automation goes live in Week 1 \u2014 then we build the full system around it.",
      quickWin: {
        title: "Quick Win Sprint",
        subtitle: "Week 1\u20132 \u2014 See AI working in YOUR business",
        items: [
          "Deploy your first live automation within the first week",
          "Connect to your existing tools \u2014 see real data flowing",
          "Prove the concept with a tangible, working result",
          "Build momentum and confidence before the big build",
        ],
      },
      phase1: {
        title: "Audit & Architecture",
        subtitle: "Month 1",
        items: [
          "Map your current tech stack and workflows",
          "Identify highest-impact automation opportunities",
          "Design your custom AIOS architecture",
          "Define agent roles and data flows",
          "Create implementation roadmap",
        ],
      },
      phase2: {
        title: "Build, Train & Handoff",
        subtitle: "Months 2 \u2013 6",
        items: [
          "Build and deploy agents incrementally",
          "Weekly strategy and build sessions",
          "Train your team on each system as it goes live",
          "Iterate based on real usage data",
          "Full documentation and handoff \u2014 you own it all",
        ],
      },
      byMonth6: {
        title: "By month 6, you have:",
        metrics: [
          { value: "3+", label: "AI agents running", sublabel: "Executing real work daily" },
          { value: "100%", label: "Documented & owned", sublabel: "Your team operates it all" },
          { value: "Zero", label: "Vendor dependency", sublabel: "Swap any tool, keep your data" },
        ],
      },
    },
    valueStack: {
      title: "Everything included in the program",
      subtitle: "Not a course. Not a strategy deck. A complete AI operating system, built with you, owned by you.",
      items: [
        { title: "Unified Data Infrastructure", description: "All your business data connected and accessible to your AI agents. No more information silos between departments or tools.", value: "\u00A5500,000" },
        { title: "Automation Platform", description: "n8n workflows, API integrations, and triggers that keep your agents connected to real business systems 24/7.", value: "\u00A5800,000" },
        { title: "Team Training Program", description: "Your team learns to maintain, modify, and extend the system. No dependency on external consultants after handoff.", value: "\u00A5600,000" },
        { title: "Full Documentation & Playbooks", description: "Architecture docs, agent playbooks, runbooks, and maintenance guides. Everything your team needs to operate independently.", value: "\u00A5400,000" },
        { title: "Zero Lock-In Architecture", description: "You own every piece. Swap models, change platforms, modify agents \u2014 it\u2019s your infrastructure, running on your servers.", value: "\u00A5300,000" },
        { title: "Weekly Strategy Sessions", description: "24 sessions over 6 months. Strategic planning, live building, problem solving, and training \u2014 all in one call per week.", value: "\u00A51,200,000" },
      ],
    },
    bonuses: {
      badge: "Included Free",
      title: "Plus these bonuses with every engagement",
      items: [
        { title: "AI Security Audit & Protocol", description: "Full security review of your AI implementation \u2014 data handling, access controls, and compliance documentation.", value: "\u00A5300,000", solves: "\"Is our data safe?\"" },
        { title: "90-Day Post-Handoff Support", description: "After the 6-month program ends, you get 3 more months of async support. Questions, troubleshooting, guidance \u2014 we don\u2019t disappear.", value: "\u00A5600,000", solves: "\"What if something breaks after you leave?\"" },
        { title: "Executive AI Dashboard", description: "Custom dashboard showing system health, automation ROI, task throughput, and team adoption metrics \u2014 so you can see the impact.", value: "\u00A5200,000", solves: "\"How do I know it\u2019s actually working?\"" },
        { title: "Team Onboarding Video Library", description: "Recorded walkthroughs of every system we build. New hires can get up to speed without waiting for a training session.", value: "\u00A5250,000", solves: "\"What about future hires?\"" },
      ],
      totalLabel: "Total bonus value:",
      totalAmount: "\u00A51,350,000",
      totalSuffix: "\u2014 included free with every engagement.",
    },
    guarantee: {
      title: "The Ownership Guarantee",
      description: "Complete the full 6-month program with us. If by Month 6 your team can\u2019t independently operate and modify at least 3 AI-powered systems without our help, we\u2019ll extend the engagement at zero cost until they can.",
      refund: "Plus: if you\u2019re not satisfied with the architecture by Month 2, we\u2019ll refund Months 1 and 2 in full \u2014 no questions asked.",
    },
    pricingDetails: {
      whatsIncluded: "What\u2019s included",
      totalValueLabel: "Total Value",
      totalValueAmount: "\u00A55,850,000",
      valueItems: [
        { item: "6-Month AI Infrastructure Build", value: "\u00A51,800,000" },
        { item: "24 Weekly Strategy & Build Sessions", value: "\u00A51,200,000" },
        { item: "Custom Architecture & Roadmap", value: "\u00A5500,000" },
        { item: "Team Training Program", value: "\u00A5600,000" },
        { item: "Full Documentation & Playbooks", value: "\u00A5400,000" },
        { item: "Bonuses (Security, Support, Dashboard, Videos)", value: "\u00A51,350,000" },
      ],
      monthlyFeatures: [
        "Full 6-month AIOS program",
        "Weekly strategy & build sessions",
        "All bonuses included",
        "The Ownership Guarantee",
        "Quick Win Sprint in Week 1",
      ],
      upfrontFeatures: [
        "Everything in Monthly",
        "Priority scheduling",
        "Extended async support",
        "90-day post-handoff extended to 6 months",
        "Save \u00A5500,000",
      ],
    },
    auditCta: {
      title: "Not sure if this is right for you?",
      titleHighlight: "Let\u2019s find out \u2014 free.",
      subtitle: "Tell us about your business and Lewis will personally review your answers, identify your highest-impact AI opportunities, and walk you through a custom audit on a call. You keep the full report \u2014 no obligations.",
      benefits: [
        "100% free, no obligations",
        "Personally reviewed by Lewis",
        "Live walkthrough on a call",
        "Custom report \u2014 yours to keep",
      ],
    },
    bio: {
      name: "Lewis Rice",
      title: "Founder, MOTTO Digital \u00B7 Tokyo, Japan",
      bio1: "I don\u2019t just build AI systems for clients \u2014 I run my own company on the same system I\u2019ll build for you. 26 active projects, 63 in-progress tasks, 4 clients, 9 pipeline deals, and 16 locations \u2014 all managed through the AIOS I built for myself.",
      bio2: "After years of watching companies get locked into expensive, fragmented AI tools, I created this framework \u2014 a systematic approach to building connected AI systems that you own and that grow with your business. I work hands-on with your team, teaching as we build, so you\u2019re never dependent on anyone.",
      tags: ["AI Agents", "Infrastructure Design", "No-Code / Low-Code", "Team Training", "Bilingual EN/JP"],
    },
    footer: {
      tagline: "AI Operating System for Business.",
      tagline2: "Build it. Own it. Scale it.",
      navigate: "Navigate",
      caseStudyLink: "Case Study",
      programLink: "Program",
      pricingLink: "Pricing",
      auditLink: "Free AI Audit",
      contact: "Contact",
      copyright: "MOTTO Digital Inc. All rights reserved.",
    },
  },
} as const;

export default en;
