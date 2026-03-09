const auditDict = {
  nav: {
    backToHome: "Back to Home",
  },
  badge: "Free \u00B7 No Obligation",
  title: "Get Your Free",
  titleHighlight: "AI Audit",
  subtitle:
    "Answer a few quick questions and Lewis will personally put together a custom AI readiness audit \u2014 then walk you through it on a call. The full report is yours to keep, completely free.",
  chips: ["Custom report", "Live walkthrough call", "Yours to keep, free"],
  sidebar: {
    trustBadge: "Your data is encrypted and never shared with third parties.",
    steps: {
      0: {
        title: "What you'll get",
        items: [
          "Custom AI readiness report tailored to your business",
          "30-min live walkthrough call with Lewis",
          "Actionable recommendations you can implement immediately",
          "100% free, no strings attached",
        ],
      },
      1: {
        title: "Personalized for you",
        items: [
          "Choose personal or corporate perspective for tailored questions",
          "50+ companies and professionals have taken the audit",
          "Average 40% efficiency gain after implementation",
        ],
        testimonial: {
          quote:
            "The audit opened our eyes to automation opportunities we never considered. Highly recommended.",
          author: "Takeshi M.",
          role: "CEO, Tech Startup",
        },
      },
      2: {
        title: "Why we ask this",
        items: [
          "Company size determines the right AI strategy",
          "We tailor recommendations to your team's scale",
        ],
        testimonial: {
          quote:
            "Lewis understood our company's unique challenges from the start. The report was spot-on.",
          author: "Yuki S.",
          role: "COO, Manufacturing",
        },
      },
      3: {
        title: "Data drives AI success",
        items: [
          "How you manage data determines your AI ceiling",
          "We'll identify data gaps before recommending solutions",
        ],
        highlight:
          "Companies with organized data see 3x faster AI adoption results.",
      },
      4: {
        title: "Making progress!",
        items: [
          "Your tool stack helps us identify quick wins",
          "We'll map integration opportunities across your tools",
        ],
        highlight:
          "Most companies have 3-5 automation opportunities hiding in their current stack.",
      },
      5: {
        title: "Great insights!",
        items: [
          "Understanding your pain points helps us prioritize",
          "Each challenge maps to a specific AI solution",
        ],
        highlight:
          "Companies typically save 15-20 hours per week after addressing their top 3 challenges.",
      },
      6: {
        title: "Assessing readiness",
        items: [
          "Your AI experience shapes our recommendation level",
          "We match solutions to your team's current capabilities",
        ],
        highlight:
          "85% of audit recipients start implementing within the first month.",
      },
      7: {
        title: "One click away!",
        items: [
          "Your custom audit report will be ready within 48 hours",
          "No sales pressure, no obligations",
          "The full report is yours to keep forever",
        ],
      },
    },
  },
  steps: {
    1: {
      question: "Let\u2019s start with your email",
      description:
        "We\u2019ll use this to send you the audit report. No spam, ever.",
      emailLabel: "Work email",
      emailPlaceholder: "you@company.com",
      consentLabel: "I agree to the",
      consentLink: "privacy policy",
    },
    2: {
      question: "Tell us about yourself",
      perspectiveLabel: "What perspective should this audit take?",
      perspectivePersonal: "Personal",
      perspectivePersonalDesc: "AI for my own workflow and role",
      perspectiveCorporate: "Corporate",
      perspectiveCorporateDesc: "AI for my company or team",
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
      questionPersonal: "Tell us about your work",
      companyLabel: "What company are you with?",
      companyPlaceholder: "Company name",
      companyOptionalLabel: "Company / Organization (optional)",
      sizeLabel: "How big is your team?",
      sizeOptions: ["1-5", "6-20", "21-50", "51-100", "100+"],
      workTypeLabel: "What kind of work do you do?",
      workTypeOptions: [
        "Consulting",
        "Design / Creative",
        "Marketing",
        "Software Development",
        "Finance / Accounting",
        "Sales",
        "Education / Training",
        "Other",
      ],
      useCaseLabel: "Is this for...",
      useCasePersonal: "Personal productivity only",
      useCaseBusiness: "My business / clients",
      useCaseBoth: "Both personal and business",
    },
    4: {
      question: "How is your business data organized?",
      description:
        "This helps us understand your AI readiness foundation.",
      maturityLabel: "Which best describes your current data situation?",
      maturityOptions: [
        "Mostly in people\u2019s heads or scattered files",
        "Some documentation, but inconsistent",
        "Well-documented in a few systems",
        "Centralized and regularly maintained",
      ],
      confidenceLabel: "How confident are you in the state of your data?",
      confidenceMin: "We don\u2019t know where our data lives",
      confidenceMax: "Every process is documented and data is centralized",
      dataLocationLabel: "Where does your most important data live?",
      dataLocationOptions: [
        "Spreadsheets",
        "Email",
        "Cloud drives",
        "Project management tools",
        "CRM",
        "Paper / physical",
        "Other",
      ],
      restructuringLabel: "How open is your team to reorganizing how you store and manage data?",
      restructuringOptions: [
        "Very resistant \u2014 we\u2019d rather not change",
        "Cautious \u2014 open if the ROI is clear",
        "Ready \u2014 we know our data needs work",
        "Already restructuring \u2014 just need direction",
      ],
    },
    5: {
      question: "What tools does your team use?",
      description:
        "Select all that apply \u2014 this helps us understand your current stack.",
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
        "Reporting takes too long",
        "Knowledge lost when employees leave",
      ],
      bottlenecksLabel: "Where are the biggest bottlenecks in your operations?",
      bottlenecksDescription: "Select all that apply.",
      bottlenecks: [
        "Leads / pipeline",
        "Conversion",
        "Delivery time",
        "Manual processes",
        "Staffing",
        "Knowledge silos",
        "Disconnected tools",
        "Onboarding new staff",
      ],
      repetitiveHoursLabel: "How many hours per week does your team spend on repetitive tasks?",
      repetitiveHoursPlaceholder: "e.g. 15",
    },
    7: {
      question: "AI experience & readiness",
      experienceLabel: "How much AI experience does your team have?",
      experienceOptions: ["None yet", "Experimenting", "Using regularly", "Advanced"],
      triedBeforeLabel: "Have you tried AI before? What happened?",
      triedBeforePlaceholder: "Tell us about your experience (or leave blank if none)...",
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
      timelineLabel: "How soon would you move forward?",
      timelineOptions: [
        "This week",
        "This month",
        "This quarter",
        "Just exploring",
      ],
      budgetLabel: "What\u2019s your approximate monthly budget for AI tools & infrastructure?",
      budgetOptions: [
        "Not sure yet",
        "Under \u00A550,000",
        "\u00A550,000 \u2013 \u00A5200,000",
        "\u00A5200,000 \u2013 \u00A5500,000",
        "\u00A5500,000+",
      ],
    },
    8: {
      question: "Almost done \u2014 just a few logistics",
      sourceLabel: "How did you find us?",
      sourceOptions: ["LinkedIn", "Referral", "Google Search", "Social Media", "Event"],
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
  common: {
    continue: "Continue",
    back: "Back",
    submit: "Submit",
    saving: "Saving...",
    other: "Other",
    otherPlaceholder: "Please specify...",
    required: "Required",
    optional: "Optional",
    stepOf: "Step {current} of {total}",
  },
  success: {
    title: "You\u2019re In \u2014 Thank You",
    subtitle:
      "Lewis will personally review your answers and put together a custom audit report for your business.",
    reachOut: "Lewis will reach out within 48 hours.",
    timelineTitle: "What happens next",
    timeline: {
      submitted: {
        title: "Submission received",
        description:
          "Your answers are in. You\u2019re already ahead of 90% of companies.",
      },
      review: {
        title: "Lewis reviews your answers",
        description:
          "He\u2019ll go through your tools, challenges, and vision to prepare a personalized AI readiness audit.",
        statusLabel: "In progress",
      },
      call: {
        title: "Walk-through call",
        description:
          "Lewis shares the full audit report on a video call, explains every recommendation, and answers your questions.",
      },
      report: {
        title: "Report is yours to keep",
        description:
          "After the call, the complete audit report is yours. No obligations, completely free.",
      },
    },
    bookCta: "Book Your Free Audit Call",
    bookCtaPersonal: "Join the April Cohort",
    bookSubtext: "30 minutes \u00B7 Video call \u00B7 No sales pressure",
    bookSubtextPersonal: "Small group \u00B7 Hands-on workshop \u00B7 Free",
    bookDescription:
      "Go ahead and pick a time that works for you. Lewis will have your audit ready by the call.",
    bookDescriptionPersonal:
      "Join the next cohort and learn how to apply AI to your personal workflow with a small group of professionals.",
    sharePrompt: "Know someone who would benefit?",
    copyLink: "Copy link",
    copied: "Copied!",
    shareText:
      "I just signed up for a free AI readiness audit from MOTTO Digital. Check it out!",
    shareEmailSubject: "Free AI Readiness Audit",
    backHome: "Back to Home",
  },
} as const;

export default auditDict;
