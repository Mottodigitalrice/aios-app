const signupDict = {
  nav: {
    backToHome: "Back to Home",
    home: "Home",
    privacy: "Privacy",
  },
  badge: "AIOS Program",
  title: "Sign Up for",
  titleHighlight: "AIOS",
  subtitle:
    "Ready to build your AI operating system? Choose your track and let\u2019s get started.",
  chips: ["6-month program", "You own everything", "Ownership Guarantee"],
  common: {
    continue: "Continue",
    back: "Back",
    submit: "Submit Enrollment",
    saving: "Saving...",
    required: "Required",
    optional: "Optional",
    stepOf: "Step {current} of {total}",
  },
  progressBar: {
    1: { text: "Great choice!", timeLeft: "~3 min left" },
    2: { text: "Almost there!", timeLeft: "~2 min left" },
    3: { text: "One more step!", timeLeft: "~1 min left" },
    4: { text: "Just confirm and you\u2019re done!", timeLeft: "< 1 min" },
  },
  steps: {
    1: {
      question: "Choose Your Track",
      description:
        "Select the program that fits your needs. Both include the Ownership Guarantee.",
      cohortLabel: "Group Cohort",
      cohortPrice: "\u00A530,000/person/month",
      cohortDescription:
        "Learn alongside 5\u201310 professionals in a structured 6-month program. 2x weekly sessions, Slack support, and your own GitHub setup.",
      cohortBestFor: "Best for freelancers, solo founders, and small teams",
      corporateLabel: "Corporate Build",
      corporateMonthlyPrice: "\u00A5200,000/month",
      corporateDescription:
        "Dedicated 1-on-1 or group training for your company. Full AI infrastructure build with up to 10 attendees.",
      corporateBestFor: "Best for companies with 5\u201350 employees",
      payInFullLabel: "Pay in Full",
      payInFullPrice: "\u00A51,000,000",
      payInFullSave: "Save \u00A5200,000",
      payInFullDescription:
        "Same Corporate Build program, paid upfront. Save \u00A5200,000 compared to monthly.",
      monthlyPlanLabel: "Monthly",
      fullPlanLabel: "Pay in Full & Save",
      planSelectionLabel: "Billing plan:",
    },
    2: {
      question: "About You",
      description: "Tell us a bit about yourself so we can tailor the program.",
      nameLabel: "Full name",
      namePlaceholder: "Your full name",
      emailLabel: "Email address",
      emailPlaceholder: "you@company.com",
      companyLabel: "Company name",
      companyPlaceholder: "Your company name",
      companyRequired: "Required for Corporate Build",
      roleLabel: "Role / Title",
      rolePlaceholder: "e.g. CEO, CTO, Founder",
    },
    3: {
      question: "Your Goals",
      description: "Help us understand what you want to achieve with AI.",
      goalsLabel: "What do you hope to achieve with AI?",
      goalsPlaceholder:
        "e.g. Automate client reporting, connect our tools, build internal AI agents...",
      painPointsLabel: "What are your biggest operational pain points?",
      painPointsPlaceholder:
        "e.g. Too much manual data entry, information scattered across tools...",
      teamSizeLabel: "How many people on your team would be involved?",
      teamSizePlaceholder: "e.g. 5",
    },
    4: {
      question: "Getting Started",
      description: "A few final details to help us prepare for your enrollment.",
      startLabel: "When would you like to start?",
      startOptions: [
        "April 2026 cohort",
        "As soon as possible",
        "Just exploring",
      ],
      sourceLabel: "How did you hear about AIOS?",
      sourceOptions: ["LinkedIn", "Referral", "Search", "Event", "Other"],
      notesLabel: "Anything else we should know?",
      notesPlaceholder: "Optional \u2014 any questions, context, or special requests...",
    },
    5: {
      question: "Review & Submit",
      description:
        "Take a moment to review your details. When everything looks good, hit submit.",
      summaryTitle: "Your Enrollment Details",
      trackLabel: "Track",
      trackCohort: "Group Cohort",
      trackCorporate: "Corporate Build",
      planLabel: "Plan",
      planMonthly: "Monthly",
      planFull: "Pay in Full",
      nameLabel: "Name",
      emailLabel: "Email",
      companyLabel: "Company",
      roleLabel: "Role",
      goalsLabel: "Goals",
      startLabel: "Start preference",
      referralLabel: "Heard about us",
      guarantee:
        "Backed by the Ownership Guarantee \u2014 if your team can\u2019t manage AI agents by month 6, we keep going free.",
    },
  },
  success: {
    title: "You\u2019re All Set!",
    subtitle:
      "Thank you for signing up for AIOS. Lewis will be in touch with you soon with next steps.",
    steps: [
      {
        title: "Lewis reviews your submission",
        description:
          "He\u2019ll look over your details and prepare a personalized plan.",
      },
      {
        title: "Personal follow-up",
        description:
          "Expect a message from Lewis within 24 hours to discuss next steps and answer any questions.",
      },
      {
        title: "Onboarding & kickoff",
        description:
          "A short call to align on goals, set up your environment, and get started.",
      },
    ],
    contactPrompt: "Questions in the meantime? Reach out anytime:",
    contactEmail: "lewis@mottodigital.jp",
    backHome: "Back to Home",
  },
  sidebar: {
    trustBadge: "Your data is encrypted and never shared with third parties.",
    steps: {
      0: {
        title: "What you\u2019re signing up for",
        items: [
          "6-month hands-on AI operating system build",
          "10 AI agents in production by month 6",
          "Full ownership \u2014 everything runs on your infrastructure",
          "The Ownership Guarantee",
        ],
      },
      1: {
        title: "Why we ask this",
        items: [
          "We tailor the program to your role and company",
          "Corporate builds include dedicated infrastructure setup",
        ],
      },
      2: {
        title: "Your goals shape the program",
        items: [
          "We prioritize your highest-impact opportunities",
          "Your pain points become the first automation targets",
        ],
      },
      3: {
        title: "Almost there!",
        items: [
          "Lewis personally reviews every enrollment",
          "You\u2019ll hear back within 24 hours",
          "No commitment until you speak with Lewis",
        ],
      },
      4: {
        title: "Ready to go!",
        items: [
          "Double-check your details before submitting",
          "Lewis will follow up personally within 24 hours",
          "Backed by the Ownership Guarantee",
        ],
      },
    },
  },
} as const;

export default signupDict;
