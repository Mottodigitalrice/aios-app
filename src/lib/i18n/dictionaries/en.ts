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
      title: "One AI system that helps you run your business.",
      titleHighlight: "Yours to own. Yours to grow.",
      subtitle:
        "Every project. Every client. Every promise \u2014 organized, connected, and working for you. Not locked into any vendor. Built with you, owned by you entirely.",
      cta: "Get Your Free AI Audit",
      ctaSecondary: "See It In Action",
      stats:
        "Currently running 26 projects, 63 tasks, and 9 pipeline deals \u2014 on one system, managed by one person.",
      guaranteeHint: "Backed by the Ownership Guarantee \u2014 if your team can\u2019t manage AI agents by month 6, we keep going free.",
      trust: "Trusted by companies across Japan",
      testimonial:
        "\u201CThis changed how we operate. Chaos to clarity in 60 days.\u201D",
    },
    pricing: {
      badge: "Choose Your Path",
      title: "Two ways to build your AI operating system",
      subtitle:
        "Whether you\u2019re building for yourself or your company, the outcome is the same: AI agents you own, running in production by month 6.",

      cohort: {
        label: "For Individuals",
        title: "Group Cohort",
        price: "\u00A530,000",
        pricePer: "/person/month",
        commitment: "6-month commitment \u00B7 Starts April 2026",
        spots: "5\u201310 per cohort \u00B7 English & Japanese tracks",
        features: [
          "2\u00D7 60-minute sessions per week (recorded)",
          "Active Slack channel for async support",
          "Your own GitHub repo & full setup",
          "10 AI agents in production by month 6",
          "The Ownership Guarantee",
        ],
        cta: "Join the April Cohort",
        guarantee: "Can\u2019t build & manage agents by month 6? Join the next cohort free.",
        bestFor: "Best for freelancers, solo founders, and small teams (<5 people)",
      },

      corporate: {
        label: "For Companies",
        title: "Corporate Build",
        monthlyPrice: "\u00A5200,000",
        monthlyPer: "/month",
        monthlyTotal: "\u00D76 = \u00A51,200,000 total",
        payInFull: "\u00A51,000,000",
        payInFullSave: "Save \u00A5200,000",
        features: [
          "Up to 10 attendees per engagement",
          "1-on-1 or group training \u2014 your choice",
          "Full company AI infrastructure",
          "10 AI agents in production by month 6",
          "24 weekly strategy & build sessions",
          "The Ownership Guarantee",
        ],
        monthlyCta: "Start Monthly",
        payInFullCta: "Pay in Full & Save \u00A5200,000",
        bestValue: "Best Value",
        bestFor: "Best for companies with 5\u201350 employees",
        guarantee: "Team can\u2019t create & manage agents by month 6? We continue free.",
      },

      launchNote: "Early pricing \u2014 increases after 5 clients.",
    },
    faq: {
      badge: "Common Questions",
      title: "Frequently asked questions.",
      stillQuestions: "Still have questions?",
      bookCall: "Book a free call",
      items: [
        {
          question: "My team isn\u2019t technical at all. Can we still do this?",
          answer: "Yes \u2014 this is specifically designed for non-technical teams. Every system we build gets documented in plain language, with video walkthroughs your team can reference. We train your people to use and maintain the system, not to become developers. If your team can use LINE and Excel, they can operate an AIOS.",
        },
        {
          question: "What if AI doesn\u2019t work for our specific business?",
          answer: "That\u2019s exactly what the free audit is for. Before we take any money, we analyze your business, your tools, and your workflows. If AI isn\u2019t going to deliver real value for you, I\u2019ll tell you that clearly \u2014 and you keep the audit report either way. I don\u2019t take on engagements I don\u2019t believe in.",
        },
        {
          question: "How is this different from hiring an AI consultant?",
          answer: "Most consultants deliver a strategy document and leave. We build a working system with you \u2014 and train your team to run it independently. By the end, you don\u2019t need us. That\u2019s the whole point. The Ownership Guarantee makes it contractual.",
        },
        {
          question: "What do we actually own at the end?",
          answer: "Everything. Your data stays in your systems. Your agents run on your infrastructure. Your workflows run on your automation platform (n8n, self-hosted). Your documentation lives wherever you store files. You could end the engagement tomorrow and everything keeps running.",
        },
        {
          question: "What if we want to start with just one department?",
          answer: "Completely fine. Most engagements start with the highest-impact area \u2014 often operations or sales \u2014 and expand from there. AIOS is designed to grow incrementally. You don\u2019t need to transform the whole company at once.",
        },
        {
          question: "What happens after the 6 months?",
          answer: "You own a fully documented, running AI operating system. Your team can operate and extend it independently. If you want ongoing strategic guidance, we offer an AI Koumon (Advisor) service starting at \u00A550,000/month \u2014 but there\u2019s no pressure and no automatic renewal.",
        },
        {
          question: "We\u2019ve been burned by IT projects that went over budget and over time. How is this different?",
          answer: "Fixed scope, fixed price, fixed timeline. \u00A5200,000/month \u00D7 6 months. No scope creep because we work together weekly \u2014 if something needs to change, we talk about it openly. The Ownership Guarantee means I\u2019m personally committed to delivery.",
        },
        {
          question: "\u00A51,200,000 is a significant investment. How do I justify it internally?",
          answer: "Think about what the problem costs. If one senior team member spends 3 hours a day on tasks that should be automated, that\u2019s 15+ hours a week of high-salary time on repetitive work. Over 6 months, that easily exceeds what you invest in AIOS \u2014 before accounting for errors, delays, or missed opportunities. AIOS pays for itself when it works. And the free audit will tell you honestly whether it will.",
        },
        {
          question: "Will this work with the tools we already use?",
          answer: "Yes. We start from where you are \u2014 Kintone, Freee, Chatwork, Google Workspace, LINE, whatever your team uses. We don\u2019t ask you to replace your stack. We connect it.",
        },
        {
          question: "Can I see this in action before committing?",
          answer: "The free AI Audit is the right first step. You\u2019ll see how I think, how I analyze a business, and whether my approach fits your situation. That 30-minute call is the demo.",
        },
      ],
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
        "Your business knowledge lives in your head \u2014 if you\u2019re sick, things fall apart",
        "You wake up wondering what slipped through the cracks last night",
        "New hire takes 3-6 months to \u201Cget it\u201D \u2014 and then they leave",
        "20 disconnected tools, nothing talks to each other",
        "Locked into vendors \u2014 switching means starting from scratch",
        "AI feels like hype you can\u2019t act on",
        "Every process lives in someone\u2019s head, not on paper",
        "You\u2019re either in the weeds or things fall apart",
      ],
      with: [
        "Your business knowledge lives in a system that never forgets and never leaves",
        "You wake up and the system tells you exactly what matters today",
        "New hire asks the system and has full context on day one",
        "One connected system \u2014 26 projects managed by one person",
        "You own everything \u2014 swap any tool, keep all your data",
        "AI agents execute real tasks while you focus on what only you can do",
        "Every process is documented, executable, and improving automatically",
        "Work on your business while the system works in it",
      ],
    },
    brainBody: {
      badge: "The Paradigm Shift",
      title: "AI used to have a brain. Now it has a body.",
      subtitle: "This changes everything about what\u2019s possible.",
      panels: [
        {
          title: "A brain with no hands",
          body: "You type a question. It gives you a great answer. Then you have to go do something with it \u2014 copy it, paste it, send it, file it, schedule it. The AI waits. You do the work.",
        },
        {
          title: "A brain that can act",
          body: "The same AI models \u2014 Claude, GPT \u2014 but now with the ability to take action. Browse the web, write files, send emails, update databases, trigger workflows. It doesn\u2019t just advise. It executes.",
        },
        {
          title: "Plugged into your operation",
          body: "Give it access to your tools, your data, your systems. Now it can do anything you can do on a computer \u2014 automatically, on command, while you sleep. That\u2019s what AIOS deploys for your business.",
        },
      ],
      closing: "This is the shift that makes the rest of the page possible.",
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
        { title: "Full business context", description: "The AI knows every project, every client, every deadline, every promise. Ask \u201Cwhat\u2019s overdue?\u201D and get a real answer \u2014 instantly." },
        { title: "AI agents handle tasks", description: "Tasks get assigned to the AI agent. It picks them up, does the work, and hands back for review \u2014 autonomously." },
        { title: "Natural language control", description: "\u201CMark it done.\u201D \u201CMove to tomorrow.\u201D \u201CAssign that to Claude.\u201D No manual database entry. Just talk to the system and it updates everything." },
        { title: "5 systems connected", description: "Notion, Google Calendar, TidyCal, Google Business Profile, and n8n \u2014 all connected through one API. Everything flows." },
        { title: "Smart scheduling", description: "Tasks carry time estimates and deadlines. The system checks availability, avoids double-booking, and schedules work blocks automatically." },
        { title: "One person. Agency output.", description: "26 active projects, 4 paying clients, 9 pipeline deals, multi-language operations \u2014 all managed by one person with AIOS as the backbone." },
      ],
      testimonial: "\u201CBefore AIOS, everything lived in my head. If I wasn\u2019t in the weeds, things would fall apart. Now I have an operating system that truly understands my business \u2014 every project, every promise, every process. I could hand this to someone else tomorrow and they\u2019d have full context on day one.\u201D",
      testimonialAuthor: "\u2014 Lewis Rice, Founder, MOTTO Digital",
    },
    orgChart: {
      title: "The agent team running MOTTO Digital",
      ceo: "CEO (Lewis Rice)",
      integrator: "Integrator AI",
      csuite: [
        { role: "CPO", domain: "Product & Projects" },
        { role: "CTO", domain: "Tech & Infrastructure" },
        { role: "CMO", domain: "Marketing & Content" },
        { role: "COO", domain: "Operations & Scheduling" },
        { role: "CFO", domain: "Finance & Pricing" },
      ],
      vendors: [
        { name: "notion-ops", description: "Reads & writes to project database" },
        { name: "researcher", description: "Ingests large content, returns summaries" },
        { name: "content-writer", description: "LinkedIn posts, documents in Lewis\u2019s voice" },
        { name: "vps-ops", description: "Server management, deploys, logs" },
        { name: "n8n-builder", description: "Builds and debugs automation workflows" },
      ],
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
      subtitle: "AIOS isn\u2019t a product you install \u2014 it\u2019s an architecture built around your business, getting more valuable the longer you use it.",
      pyramidFraming: "Three layers at the bottom. You own them. The AI model on top is swappable \u2014 use whatever\u2019s best today, upgrade tomorrow, change providers entirely if you want. Your data, your logic, your infrastructure stays.",
      steps: [
        { num: "1", title: "Connect Your Data", desc: "We unify your tools, docs, and business knowledge into one accessible system." },
        { num: "2", title: "Deploy AI Agents", desc: "Agents with defined roles, permissions, and tools \u2014 working on your infrastructure." },
        { num: "3", title: "Own the System", desc: "Everything runs on your servers, your accounts. Swap any tool, keep all your data." },
      ],
      layers: [
        { title: "Data Layer", badge: "Layer 1", description: "Your business knowledge, structured and accessible. CRM data, documents, processes, communications \u2014 unified in systems you control. This is the foundation everything else builds on. If the data layer is solid, every AI interaction is smarter." },
        { title: "Agent Framework", badge: "Layer 2", description: "Skills, APIs, and structured prompts that make agents reliable. Not just \u201Cplug in ChatGPT\u201D \u2014 defined roles, permissions, tool access, and escalation paths. This is what separates a toy from a system." },
        { title: "Environment", badge: "Layer 3", description: "The infrastructure where agents operate. Your VPS, your GitHub, your automation platform \u2014 the workspace that lets AI agents interact with real business systems, safely and under your control. No shared servers, no platform dependency." },
        { title: "AI Models", badge: "Layer 4 \u2014 Swappable", description: "Claude, OpenAI, Gemini, open-source models \u2014 use the best for each task. When something better comes along, swap it in. Your system never depends on a single AI vendor. The three layers below stay intact regardless of what\u2019s on top." },
      ],
    },
    program: {
      badge: "6-Month Program",
      title: "A clear plan. A real system.",
      titleHighlight: "Built with you in 6 months.",
      subtitle: "No PowerPoints that sit on a shelf. We work alongside your team to build infrastructure you\u2019ll own forever.",
      month1: {
        title: "Mapping & Planning",
        subtitle: "Month 1",
        items: [
          "Map your current tech stack and workflows",
          "Identify highest-impact opportunities",
          "Design your custom AIOS architecture",
          "Define agent roles and data flows",
          "Create your implementation roadmap",
        ],
      },
      month2: {
        title: "Infrastructure Setup",
        subtitle: "Month 2",
        items: [
          "Set up all infrastructure (VPS, GitHub, SaaS connections)",
          "Build initial data flows and integrations",
          "Establish data infrastructure and security protocols",
        ],
      },
      month3: {
        title: "System Build",
        subtitle: "Month 3",
        items: [
          "Build the system: business context, agents, skills",
          "Deploy and test AI agents in your real workflows",
          "Train your team on each system as it goes live",
        ],
      },
      month4: {
        title: "Use, Iteration & Support",
        subtitle: "Months 4\u20136",
        items: [
          "Use the system daily with ongoing guidance",
          "Iterate based on real usage data",
          "Full documentation and handoff \u2014 you own it all",
        ],
      },
      byMonth6: {
        title: "By Month 6, you have:",
        metrics: [
          { value: "AI agents you built", label: "AI agents you built", sublabel: "Creating and managing real work daily" },
          { value: "100%", label: "Documented & owned", sublabel: "Your team operates and extends it" },
          { value: "Zero", label: "Vendor dependency", sublabel: "Swap any tool, keep your data" },
        ],
      },
    },
    guarantee: {
      title: "The Ownership Guarantee",
      description: "Complete the full 6-month program. If you can\u2019t independently create and manage AI agents by the end, we\u2019ll keep going until you can \u2014 at zero additional cost.",
      cohortNote: "Group cohort: join the next cohort free until you\u2019re there.",
      corporateNote: "Corporate: we continue working with your team at no charge.",
      refund: "",
    },
    shiryo: {
      buttonText: "Download Presentation",
      dialogTitle: "The AIOS Overview Deck",
      dialogSubtitle: "A complete walkthrough of what AIOS is, how it works, and what you get.",
      viewNow: {
        label: "View Now",
        body: "Open the presentation in your browser immediately. No email required.",
        cta: "Open Presentation",
      },
      getPdf: {
        label: "Get the PDF",
        body: "Get a downloadable PDF sent to your email. Takes 30 seconds.",
        emailPlaceholder: "Your work email",
        cta: "Send Me the PDF",
        successMessage: "Done. Check your inbox \u2014 the PDF is on its way.",
      },
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
      privacyLink: "Privacy Policy",
      presentationLink: "Presentation",
      contact: "Contact",
      contactCta: "Feel free to reach out",
      company: {
        representative: "Lewis Rice",
        location: "Tokyo, Japan",
        founded: "Est. 2024",
      },
      copyright: "MOTTO Digital Inc. All rights reserved.",
    },
  },
} as const;

export default en;
