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
    submit: "Save your spot",
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
      question: "How would you like to use AIOS?",
      description:
        "Choose the option that best fits your situation. All include the Ownership Guarantee.",
      // 3-card options
      cohortLabel: "Group Cohort",
      cohortPrice: "\u00A520,000/month",
      cohortDescription:
        "Learn alongside other professionals in a structured 6-month program. 2x weekly group sessions, Slack support, and your own GitHub setup.",
      cohortBestFor: "Best for collaborative learners exploring AI\u2019s potential",
      individualLabel: "One-on-One",
      individualPrice: "\u00A550,000/month",
      individualDescription:
        "Dedicated 1-on-1 coaching tailored to your specific business and workflows. Weekly sessions with Lewis.",
      individualBestFor: "Best for CEOs, executives, and solopreneurs",
      companyLabel: "Company Build",
      companyPrice: "\u00A5200,000/month",
      companyDescription:
        "Custom AI build for your entire company. Up to 10 participants with a tailored program for your needs.",
      companyBestFor: "Best for companies building an internal AI team",
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
      companyRequired: "Required for Company Build",
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
      teamSizeLabelCompany: "How many people are in your company?",
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
      trackCohort: "Group Cohort (\u00A520,000/mo)",
      trackIndividual: "One-on-One (\u00A550,000/mo)",
      trackCompany: "Company Build (\u00A5200,000/mo)",
      nameLabel: "Name",
      emailLabel: "Email",
      companyLabel: "Company",
      roleLabel: "Role",
      goalsLabel: "Goals",
      startLabel: "Start preference",
      referralLabel: "Heard about us",
      guarantee:
        "Backed by the Ownership Guarantee \u2014 if your team can\u2019t manage AI agents by month 6, we keep going free.",
      whatHappensNextTitle: "What happens next",
      whatHappensNext1: "Lewis reviews your submission within 24 hours",
      whatHappensNext2: "You'll get a personal email to discuss",
      whatHappensNext3: "Book a free call — no pressure, no obligation",
      guaranteeReinforcement: "Backed by our Ownership Guarantee",
    },
  },
  success: {
    title: "Your Spot Is Saved!",
    subtitle:
      "You\u2019ll receive an email to schedule a meeting with Lewis. After that meeting, you have 3 days to decide. No pressure.",
    steps: [
      {
        title: "Schedule your meeting with Lewis",
        description:
          "You\u2019ll receive an email with a link to book a time that works for you.",
      },
      {
        title: "Meet Lewis and discuss the program",
        description:
          "A relaxed conversation about your business, goals, and how AIOS can help. No sales pressure.",
      },
      {
        title: "3 days to decide",
        description:
          "After the meeting, you have 3 days to decide if it\u2019s right for you. If not, your spot goes to the next person. No hard feelings.",
      },
    ],
    contactPrompt: "Questions in the meantime? Reach out anytime:",
    contactEmail: "rice@mottodigital.jp",
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
