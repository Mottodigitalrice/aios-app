const auditDict = {
  nav: {
    backToHome: "Back to Home",
    home: "Home",
    privacy: "Privacy",
  },
  badge: "Agentic AI Audit \u00B7 Free",
  title: "Agentic AI",
  titleHighlight: "Readiness Audit",
  subtitle:
    "Beyond chatbots. Find out how ready your business is to hand work over to autonomous AI agents. Lewis personally builds your audit — in ~10 minutes of input you'll get an automation map, the infrastructure you need, and a 90-day deployment roadmap.",
  chips: ["Agent fit map", "Live call with Lewis", "90-day roadmap"],
  sidebar: {
    trustBadge: "Your data is encrypted and never shared with third parties.",
    steps: {
      0: {
        title: "What you'll get",
        items: [
          "Your personal agent-readiness score",
          "Automation candidate map + recommended stack",
          "90-day deployment roadmap",
          "30-min live call with Lewis",
          "100% free, no strings attached",
        ],
      },
      1: {
        title: "Personalized agent design",
        items: [
          "We need to know whose work the agent will actually run",
          "Lewis personally reviews every submission",
          "Tailored to your industry, data, tools, and budget",
        ],
      },
      2: {
        title: "Where the agent will operate",
        items: [
          "Your industry, role and department shape which workflows can run autonomously",
          "Your answers drive the specific agent architecture we recommend",
        ],
      },
      3: {
        title: "Data is the agent's fuel",
        items: [
          "Agents need structured, accessible data to act on",
          "This tells us how agent-ready your data really is today",
        ],
      },
      4: {
        title: "What the agent will operate",
        items: [
          "Your tools become the agent's integration targets",
          "Every tool you use is a potential automation surface",
        ],
      },
      5: {
        title: "The work to hand off",
        items: [
          "The repetitive work eating your week — that's the first thing to delegate",
          "Every challenge maps to a specific agent design",
        ],
      },
      6: {
        title: "Assessing agentic readiness",
        items: [
          "Moving from 'using AI' to 'delegating to AI' — where are you today?",
          "The report meets you where you are, not where you should be",
        ],
      },
      7: {
        title: "Final briefing for your agent design",
        items: [
          "Your custom blueprint arrives within 48 hours",
          "No sales pressure, no obligations",
          "The full report is yours to keep forever",
        ],
      },
    },
  },
  steps: {
    1: {
      question: "Where should we send the report?",
      description:
        "We'll use this to send your audit and a custom agent blueprint. No spam, ever.",
      emailLabel: "Work email",
      emailPlaceholder: "you@company.com",
      consentLabel: "I agree to the",
      consentLink: "privacy policy",
    },
    2: {
      question: "Who is this agent for?",
      perspectiveLabel: "Whose work will this agent run?",
      perspectiveIndividual: "Individual",
      perspectiveIndividualDesc:
        "I'm a solo practitioner, freelancer, or business owner without a team",
      perspectiveCompany: "Company",
      perspectiveCompanyDesc:
        "I want an agent strategy for our whole organization",
      perspectiveDepartment: "Department",
      perspectiveDepartmentDesc:
        "I want an agent for a specific department or team",
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
      question: "Where will the agent operate?",
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
      question: "What data will the agent touch?",
      questionIndividual: "Your workflow & data",
      description:
        "Agents need structured, accessible data to act on. Let's see how agent-ready yours is.",
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
      dataLocationLabel: "Where does the agent's most important data live?",
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
      question: "What tools will the agent operate?",
      questionIndividual: "What tools do you use?",
      description:
        "These become the agent's integration targets. Select all that apply.",
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
      question: "What work do you want the agent to take over?",
      questionIndividual: "What work do you want to hand off?",
      description:
        "The repetitive work eating your week \u2014 that's exactly where an agent starts.",
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
        "Where are the biggest bottlenecks the agent should solve?",
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
        "If you could hand off one task to an agent right now, what would it be?",
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
      question: "Readiness for autonomous AI",
      experienceLabel: "How much AI experience does your team have?",
      experienceLabelIndividual: "How much AI experience do you have?",
      experienceOptions: [
        "None yet",
        "Experimenting",
        "Using regularly",
        "Running agents in production",
      ],
      triedBeforeLabel: "Have you tried AI before? What happened?",
      triedBeforePlaceholder:
        "Tell us about your experience (or leave blank if none)...",
      visionLabel: "In 6 months, what do you want agents doing for you?",
      visionOptions: [
        "Running repetitive tasks autonomously",
        "Operating and connecting existing tools",
        "Handling customer communication",
        "Generating reports / analytics",
        "Reducing costs",
        "Training the team on agents",
        "Building custom AI agents",
      ],
      timelineLabel: "How soon would you move forward?",
      timelineOptions: [
        "This week",
        "This month",
        "This quarter",
        "Just exploring",
      ],
      budgetLabel:
        "What\u2019s your approximate monthly budget for agents & infrastructure?",
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
      question: "Final briefing for your agent design",
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
    stepOf: "Agent briefing {current} of {total}",
  },
  progressBar: {
    1: { text: "Mapping the ground...", timeLeft: "~3 min left" },
    2: { text: "Reading your data...", timeLeft: "~2 min left" },
    3: { text: "Scanning integration targets...", timeLeft: "~2 min left" },
    4: { text: "Extracting automation candidates...", timeLeft: "~1 min left" },
    5: { text: "Assembling your blueprint...", timeLeft: "~1 min left" },
    6: { text: "Agent design ready", timeLeft: "Less than 1 min" },
  },
  success: {
    title: "Building your agent blueprint",
    subtitle:
      "Within 48 hours Lewis will personally send you your custom agent architecture and a 90-day deployment roadmap.",
    reachOut: "Lewis will reach out within 48 hours.",
    timelineTitle: "What happens next",
    timeline: {
      submitted: {
        title: "Briefing received",
        description:
          "Your answers are in. The first step of your agent design is done.",
      },
      review: {
        title: "Lewis drafts your blueprint",
        description:
          "He\u2019ll design the right agent architecture from your workflows, data, and tools.",
        statusLabel: "In progress",
      },
      call: {
        title: "Walk-through call",
        description:
          "Lewis shares the full blueprint on a video call and answers every question.",
      },
      report: {
        title: "Blueprint is yours to keep",
        description:
          "After the call, the complete blueprint and 90-day roadmap are yours. No obligations, completely free.",
      },
    },
    bookEmbedTitle: "Pick a time that works for you",
    bookFallback: "Or open scheduler in new tab",
    bookCta: "Book Your Free Agent Design Call",
    bookCtaPersonal: "Join the May Cohort",
    bookSubtext: "30 minutes \u00B7 Video call \u00B7 No sales pressure",
    bookSubtextPersonal:
      "Small group \u00B7 Hands-on workshop \u00B7 Free",
    bookDescription:
      "Go ahead and pick a time that works for you. Lewis will have your agent blueprint ready by the call.",
    bookDescriptionPersonal:
      "Join the next cohort and learn how to apply agents to your personal workflow with a small group of professionals.",
    sharePrompt: "Know someone who would benefit?",
    copyLink: "Copy link",
    copied: "Copied!",
    shareText:
      "I just signed up for a free Agentic AI audit from MOTTO Digital. Check it out!",
    shareEmailSubject: "Agentic AI Readiness Audit",
    backHome: "Back to Home",
    manifesto: "The era of learning AI is over. Now we delegate to it.",
  },
} as const;

export default auditDict;
