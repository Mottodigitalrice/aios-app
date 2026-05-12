const auditV2Dict = {
  nav: {
    backToHome: "Back to Home",
    home: "Home",
    privacy: "Privacy",
  },
  badge: "AI Audit · Free",
  title: "Tell us your goals.",
  titleHighlight: "We'll show you how AI gets you there.",
  subtitle:
    "Free, ~5 minutes. Lewis personally reviews every submission and replies within 2 business days with a custom AI playbook.",
  chips: ["Goal-anchored", "Personally reviewed", "No-sell consult"],
  common: {
    back: "Back",
    continue: "Continue",
    submit: "Submit",
    saving: "Submitting...",
    optional: "(optional)",
    selected: "selected",
    stepOf: "Step {current} of {total}",
  },
  email: {
    question: "What's your email?",
    description: "We'll send your audit report here. ~5 minutes to fill out.",
    label: "Email",
    placeholder: "you@company.com",
    hint: "Lewis personally reviews every audit and replies within 2 business days. No spam, ever.",
  },
  goals: {
    select: {
      question: "Which goals matter most to your business right now?",
      description: "Pick all that apply. We'll have you rank them next.",
      hint: "Select 1-8",
    },
    rank: {
      question: "Now rank them — most important on top.",
      description: "Drag to reorder. The #1 goal is what we'll deep-dive next.",
    },
    blockers: {
      question: "What's blocking {goal} the most right now?",
      description: "Pick all that apply.",
      hint: "Select 1 or more",
    },
  },
  company: {
    question: "Tell us about your company.",
    description: "7 quick fields — helps us calibrate the recommendations.",
    industry: "Industry",
    teamSize: "Team size",
    revenue: "Annual revenue",
    role: "Your role",
    yearsInBusiness: "Years in business",
    location: "Location",
    website: "Website (optional)",
    websitePlaceholder: "https://...",
  },
  tools: {
    question: "Which tools are already in your stack?",
    description: "Check everything you use, even occasionally. Pick None if a category doesn't apply.",
    none: "None",
    otherInCategory: "Other...",
    otherInCategoryPlaceholder: "Name the tool(s)",
    other: "Other tools — categories not listed above (optional)",
    otherPlaceholder: "e.g. Airtable, Zapier, custom internal tools...",
  },
  ai: {
    question: "Where are you on AI right now?",
    description: "Pick the one that sounds most like you.",
    triedQuestion: "Have you tried AI tools that didn't stick?",
    triedYes: "Yes — pick the reasons",
    triedNo: "No",
  },
  process: {
    question: "How often does your team do these?",
    description: "Pick a frequency for each. We'll compute hours and yen savings live.",
    summaryHours: "Estimated savings: {hours} hours / week",
    summaryYen: "≈ {yen} / year (industry: {industry})",
    summaryEmpty: "Pick frequencies above to see your savings projection.",
    headers: {
      process: "Process",
      never: "Never",
      monthly: "Monthly",
      weekly: "Weekly",
      "daily-1-2": "1-2× day",
      "daily-multi": "Many×/day",
    },
  },
  robotTask: {
    question: "If you could hand ONE task to AI tomorrow, what would it be?",
    description: "200 characters. Specific beats vague — this is the highest-signal field on the form.",
    placeholder: "e.g. 'Read incoming sales inquiries, draft reply with our pricing, queue for my approval'",
    counter: "{count} / 200",
    sidebarTitle: "Why this one matters",
    sidebarBody:
      "This is the only free-text in the audit. The more concrete you are, the better Lewis can tailor your report.",
  },
  qualification: {
    question: "A few last business questions.",
    description: "Helps us know if and when we can help — totally fine if you don't know yet.",
    budget: "Monthly AI budget",
    budgetNote: "Including training, tools, and subscriptions.",
    timeline: "When would you want to start?",
    decisionMaker: "Who decides on this?",
  },
  contact: {
    question: "Last step — your details.",
    description: "Lewis personally reviews and replies within 2 business days.",
    name: "Your name",
    company: "Company",
    phone: "Phone (optional)",
  },
  popup: {
    title: "Thank you, {name}.",
    body:
      "Lewis (Mottodigital's CEO) will personally analyze your responses and send a custom AI playbook within **2 business days**.",
    bodyConsult:
      "Next, book a **free consult** to walk through your report together.",
    promise:
      "Our promise: We will not sell to you on the call. We just walk through your report and answer questions.",
    cta: "Book a free consult",
    maybeLater: "Maybe later — I'll book from the email",
    close: "Close",
  },
  sidebar: {
    trustBadge: "Your data is encrypted and never shared with third parties.",
    steps: {
      email: {
        title: "Start with your email",
        items: ["~5 min to complete", "Lewis personally reviews every audit"],
      },
      goals: {
        title: "Goal-anchored audit",
        items: [
          "Every recommendation maps to a goal you ranked",
          "8 goals cover the JP SME landscape",
        ],
      },
      rank: {
        title: "Top goal = focus",
        items: ["We deep-dive only the #1 goal", "Drag to reorder, top is most important"],
      },
      blockers: {
        title: "What's actually in the way",
        items: ["Pick 2 from 6 blockers", "These shape the recommendations"],
      },
      company: {
        title: "Calibration",
        items: ["Industry sets the hourly rate", "Team size shapes the playbook scale"],
      },
      tools: {
        title: "Integration surface",
        items: ["Every tool you use is a potential automation surface", "Don't worry about completeness"],
      },
      ai: {
        title: "Meet you where you are",
        items: ["No judgement on level", "Past failures inform what to recommend"],
      },
      process: {
        title: "Live ROI",
        items: ["Realistic capture rates per process", "Industry-specific hourly rate"],
      },
      robotTask: {
        title: "Highest-signal field",
        items: ["This anchors the entire report", "Be concrete — Lewis will read it"],
      },
      qualification: {
        title: "Fit check",
        items: ["Helps us flag if we can actually help", "Totally fine to be unsure"],
      },
      contact: {
        title: "Final step",
        items: ["Lewis personally reviews", "Reply within 2 business days"],
      },
    },
  },
};

export default auditV2Dict;
export type AuditV2Dictionary = typeof auditV2Dict;
