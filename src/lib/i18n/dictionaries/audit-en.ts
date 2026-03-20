const auditDict = {
  nav: {
    backToHome: "Back to Home",
    home: "Home",
    privacy: "Privacy",
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
          "Choose your perspective for tailored questions",
          "Lewis personally reviews every submission",
          "Tailored to your specific tools, team, and goals",
        ],
      },
      2: {
        title: "Why we ask this",
        items: [
          "Your context determines the right AI strategy",
          "Your answers shape the specific recommendations in your report",
        ],
      },
      3: {
        title: "Data drives AI success",
        items: [
          "How you manage data determines your AI ceiling",
          "This helps Lewis identify your quick wins",
        ],
      },
      4: {
        title: "Making progress!",
        items: [
          "Your tool stack helps Lewis identify integration opportunities",
          "Every tool you use becomes a potential automation target",
        ],
      },
      5: {
        title: "Great insights!",
        items: [
          "Understanding your pain points helps prioritize recommendations",
          "Each challenge maps to specific, actionable next steps",
        ],
      },
      6: {
        title: "Assessing readiness",
        items: [
          "Your AI experience shapes the recommendation level",
          "The report meets you where you are, not where you should be",
        ],
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
      question: "A bit about you",
      perspectiveLabel: "What perspective should this audit take?",
      perspectiveIndividual: "Individual",
      perspectiveIndividualDesc:
        "I\u2019m a solo practitioner, freelancer, or business owner without a team",
      perspectiveCompany: "Company",
      perspectiveCompanyDesc:
        "I\u2019m filling this out for our whole organization",
      perspectiveDepartment: "Department",
      perspectiveDepartmentDesc:
        "I\u2019m filling this out for a specific department or team",
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
      question: "About your company",
      questionIndividual: "About your work",
      questionDepartment: "About your department",
      companyLabel: "What company are you with?",
      companyPlaceholder: "Company name",
      companyOptionalLabel: "Company / Organization (optional)",
      sizeLabel: "How big is your company?",
      sizeOptions: ["1-5", "6-20", "21-50", "51-100", "101-500", "500+"],
      industryLabel: "What industry are you in?",
      industryOptions: [
        "Consulting",
        "Design / Creative",
        "Marketing",
        "Software Development",
        "Finance / Accounting",
        "Sales",
        "Education / Training",
        "Healthcare",
        "Legal",
        "Real Estate",
        "Other",
      ],
      revenueLabel: "Revenue range (optional)",
      revenueOptions: [
        "Pre-revenue",
        "Under \u00A55M",
        "\u00A55M\u2013\u00A525M",
        "\u00A525M\u2013\u00A5100M",
        "\u00A5100M+",
      ],
      teamCompositionLabel: "What does your team look like?",
      teamCompositionOptions: [
        "Completely solo",
        "1-2 contractors",
        "Small team (3-5)",
      ],
      departmentNameLabel: "Department name",
      departmentNamePlaceholder: "e.g. Marketing",
      departmentSizeLabel: "How big is your department?",
      departmentSizeOptions: ["1-3", "4-10", "11-25", "26-50", "50+"],
      departmentFunctionLabel: "Department function",
      departmentFunctionOptions: [
        "Marketing",
        "Sales",
        "Operations",
        "Finance",
        "HR",
        "Engineering",
        "Customer Success",
        "Legal",
        "Other",
      ],
    },
    4: {
      question: "How is your data organized?",
      questionIndividual: "Your workflow & data",
      description:
        "This helps us understand your AI readiness foundation.",
      typicalDayLabel:
        "Walk me through a typical workday \u2014 what does a normal day look like?",
      typicalDayPlaceholder:
        "e.g. I start by checking emails, then work on client proposals for a few hours, followed by meetings in the afternoon...",
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
      restructuringLabel:
        "How open is your team to reorganizing how you store and manage data?",
      restructuringOptions: [
        "Very resistant \u2014 we\u2019d rather not change",
        "Cautious \u2014 open if the ROI is clear",
        "Ready \u2014 we know our data needs work",
        "Already restructuring \u2014 just need direction",
      ],
      processDocLabel: "How are your processes documented?",
      processDocOptions: [
        "Not at all",
        "Some SOPs but outdated",
        "Well-documented for key processes",
        "Comprehensive and current",
      ],
      toolAutonomyLabel: "Does your department choose its own tools?",
      toolAutonomyOptions: [
        "We pick our own",
        "IT decides but we have input",
        "IT decides everything",
      ],
    },
    5: {
      question: "What tools does your team use?",
      questionIndividual: "What tools do you use?",
      description:
        "Select all that apply \u2014 this helps us understand your current stack.",
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
    6: {
      question: "What are your biggest operational challenges?",
      questionIndividual: "What are your biggest challenges?",
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
      challengesIndividual: [
        "Manual data entry / repetitive tasks",
        "Information scattered across tools",
        "Client communication takes too long",
        "No clear AI strategy",
        "Too many disconnected subscriptions",
        "Difficulty scaling my business",
        "Reporting / invoicing takes too long",
        "Hard to stay organized",
      ],
      bottlenecksLabel:
        "Where are the biggest bottlenecks in your operations?",
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
      repetitiveHoursLabel:
        "How many hours per week do you spend on repetitive tasks?",
      repetitiveHoursLabelTeam:
        "How many hours per week does your team spend on repetitive tasks?",
      repetitiveHoursPlaceholder: "e.g. 15",
      robotTaskLabel:
        "What\u2019s the single task you wish you could hand off to a robot?",
      robotTaskPlaceholder:
        "e.g. Formatting invoices and chasing late payments...",
      onboardingLabel: "What does onboarding look like for new employees?",
      onboardingOptions: [
        "No formal process",
        "Basic docs",
        "Structured program",
        "We struggle with this",
      ],
      crossDeptLabel:
        "How much does your department depend on other departments?",
      crossDeptOptions: [
        "Very independent",
        "Some dependencies",
        "Heavily dependent",
      ],
    },
    7: {
      question: "AI experience & readiness",
      experienceLabel: "How much AI experience does your team have?",
      experienceLabelIndividual: "How much AI experience do you have?",
      experienceOptions: [
        "None yet",
        "Experimenting",
        "Using regularly",
        "Advanced",
      ],
      triedBeforeLabel: "Have you tried AI before? What happened?",
      triedBeforePlaceholder:
        "Tell us about your experience (or leave blank if none)...",
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
      budgetLabel:
        "What\u2019s your approximate monthly budget for AI tools & infrastructure?",
      budgetOptions: [
        "Not sure yet",
        "Under \u00A550,000",
        "\u00A550,000 \u2013 \u00A5200,000",
        "\u00A5200,000 \u2013 \u00A5500,000",
        "\u00A5500,000+",
      ],
      decisionMakerLabel: "Who makes the final call on new technology?",
      decisionMakerOptions: [
        "I do",
        "My manager",
        "IT / CTO",
        "Committee",
        "Not sure",
      ],
    },
    8: {
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
  progressBar: {
    1: { text: "Great start!", timeLeft: "~3 min left" },
    2: { text: "You're doing great!", timeLeft: "~2 min left" },
    3: { text: "Halfway there!", timeLeft: "~2 min left" },
    4: { text: "Keep going!", timeLeft: "~1 min left" },
    5: { text: "Almost there!", timeLeft: "~1 min left" },
    6: { text: "Last step!", timeLeft: "Less than 1 min" },
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
          "Your answers are in. Lewis will start reviewing them shortly.",
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
    bookEmbedTitle: "Pick a time that works for you",
    bookFallback: "Or open scheduler in new tab",
    bookCta: "Book Your Free Audit Call",
    bookCtaPersonal: "Join the May Cohort",
    bookSubtext: "30 minutes \u00B7 Video call \u00B7 No sales pressure",
    bookSubtextPersonal:
      "Small group \u00B7 Hands-on workshop \u00B7 Free",
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
