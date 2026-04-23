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
    "Ready to build your AI operating system? Choose your track and let's get started.",
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
    1: { text: "Great choice!", timeLeft: "~5 min left" },
    2: { text: "Nice — tell us about you", timeLeft: "~4 min left" },
    3: { text: "Your goals shape the program", timeLeft: "~3 min left" },
    4: { text: "Almost there!", timeLeft: "~2 min left" },
    5: { text: "Pick your weekly times", timeLeft: "~2 min left" },
    6: { text: "Lock in your plan", timeLeft: "~1 min left" },
    7: { text: "Just confirm and you're done!", timeLeft: "< 1 min" },
  },
  steps: {
    1: {
      question: "How would you like to use AIOS?",
      description:
        "Choose the option that best fits your situation. All include the Ownership Guarantee.",
      cohortLabel: "Group Cohort",
      cohortPrice: "¥20,000/month",
      cohortDescription:
        "Learn alongside other professionals in a structured 6-month program. 2x weekly group sessions, Slack support, and your own GitHub setup.",
      cohortBestFor: "Best for collaborative learners exploring AI's potential",
      individualLabel: "One-on-One",
      individualPrice: "¥50,000/month",
      individualDescription:
        "Dedicated 1-on-1 coaching tailored to your specific business and workflows. Weekly sessions with Lewis.",
      individualBestFor: "Best for CEOs, executives, and solopreneurs",
      companyLabel: "Company Build",
      companyPrice: "¥200,000/month",
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
      companyRequired: "Required",
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
      startOptionsCompany: ["As soon as possible", "Not sure yet"],
      startOptionsIndividual: ["As soon as possible", "Not sure yet"],
      startOptionsCohort: ["May 2026 cohort", "Just exploring for now"],
      sourceLabel: "How did you hear about AIOS?",
      sourceOptions: ["LinkedIn", "Referral", "Search", "Event", "Other"],
      notesLabel: "Anything else we should know?",
      notesPlaceholder:
        "Optional — any questions, context, or special requests...",
    },
    5: {
      question: "Pick your weekly session times",
      description: "How we pick the weekly session times:",
      descriptionBullets: [
        "Times are chosen based on Lewis's availability and what works for the whole cohort",
        "If one time works for everyone, we run one weekly session",
        "If not, we run two sessions per week with identical content — attend whichever fits, or both",
        "All sessions are recorded for catch-up",
      ],
      helperNote:
        "Please answer based on your general May availability. This will likely be the ongoing schedule, but we check in monthly and adjust together. We want to make this work for everyone.",
      legendCommit: "Can commit weekly",
      legendMaybe: "Sometimes / backup",
      legendNo: "Can't make it",
      dayMon: "Monday",
      dayWed: "Wednesday",
      dayThu: "Thursday",
      timezoneNote: "All times shown in JST (Japan Standard Time).",
      validationHint:
        "Mark at least 2 slots as 'Can commit', or at least 3 as 'Sometimes'.",
    },
    6: {
      question: "Confirm your commitment",
      description:
        "This is a 6-month program. Please only sign up if you're prepared to commit to the full 6 months — it takes that long to become confident with agentic AI and to build a system you can operate, extend, and maintain on your own. That's the whole point.",
      refundTitle: "Refund policy",
      refundBody:
        "We don't offer refunds as a rule. That said, Lewis is reasonable — if something unexpected happens, reach out and we'll work something out.",
      paymentTitle: "Payment method",
      paymentBody:
        "Bank transfer. You'll receive invoices by email. All payments are made in advance.",
      planLabel: "Choose your payment plan",
      upfrontLabel: "Pay upfront — ¥100,000 (before tax)",
      upfrontSubtitle: "Save ¥20,000. One invoice, one transfer.",
      upfrontBadge: "Recommended",
      monthlyLabel: "Pay monthly — ¥20,000/month × 6 (before tax)",
      monthlySubtitle:
        "Total ¥120,000. Invoices issued in one batch; paid monthly in advance.",
    },
    7: {
      question: "Staying in touch",
      description:
        "Two channels: one for official course comms (LINE), one for community (Slack).",
      lineTitle: "Add MOTTO Digital on LINE Official (required)",
      lineBody:
        "All official course communication happens here: session reminders, schedule changes, important announcements, and resources. Please add our LINE Official account before continuing.",
      lineQrCaption: "Scan the QR code — or tap the button on mobile.",
      lineAddButton: "Add on LINE",
      lineConfirmLabel: "I have added the LINE Official account",
      slackTitle: "Join the cohort Slack channel (optional)",
      slackBody:
        "Separate from official course comms, we're setting up a Slack channel for the cohort — a space to ask each other questions, share wins, and keep learning between sessions. Lewis will be there too. Important course info stays on LINE. Joining is optional.",
      slackOptInYes: "Yes — send me the invite after signup",
      slackOptInNo: "No thanks — LINE is enough for me",
    },
    8: {
      question: "Review & Submit",
      description:
        "Take a moment to review your details. When everything looks good, hit submit.",
      summaryTitle: "Your Enrollment Details",
      trackLabel: "Track",
      trackCohort: "Group Cohort (¥20,000/mo)",
      trackIndividual: "One-on-One (¥50,000/mo)",
      trackCompany: "Company Build (¥200,000/mo)",
      nameLabel: "Name",
      emailLabel: "Email",
      companyLabel: "Company",
      roleLabel: "Role",
      goalsLabel: "Goals",
      startLabel: "Start preference",
      referralLabel: "Heard about us",
      availabilityLabel: "Committed session slots",
      availabilityMaybeLabel: "Backup session slots",
      availabilityNone: "— none marked —",
      paymentLabel: "Payment plan",
      paymentUpfront: "Upfront — ¥100,000 (before tax)",
      paymentMonthly: "Monthly — ¥20,000/mo × 6",
      communicationLabel: "Communication",
      lineConfirmed: "LINE Official added",
      slackYes: "Slack community: yes",
      slackNo: "Slack community: no",
      guarantee:
        "Backed by the Ownership Guarantee — if you can't manage AI agents by month 6, we keep going free.",
      whatHappensNextTitle: "What happens next",
      whatHappensNext1:
        "Lewis reviews your submission and confirms your spot within 24 hours",
      whatHappensNext2:
        "You'll receive your first invoice and a welcome pack by email",
      whatHappensNext3:
        "Live sessions start in May — we lock the schedule once all cohort members have signed up",
      guaranteeReinforcement: "Backed by our Ownership Guarantee",
    },
  },
  success: {
    title: "Your Spot Is Saved!",
    subtitle:
      "You'll receive an email shortly confirming next steps. Live sessions start in May. No pressure — we'll guide you from here.",
    steps: [
      {
        title: "Confirmation email",
        description:
          "You'll receive a confirmation with your schedule preferences and payment details.",
      },
      {
        title: "Invoice issued",
        description:
          "Your first invoice arrives by email — pay via bank transfer in advance of each month.",
      },
      {
        title: "May kickoff",
        description:
          "Once all cohort members are locked in, we finalize weekly session times and send calendar invites.",
      },
    ],
    optionalBookingTitle: "Optional: Book a call with Lewis",
    optionalBookingBody:
      "If you have questions you'd like answered before the course starts, feel free to book a time to talk with Lewis — or just drop him an email. Either works.",
    optionalBookingCta: "Book a time with Lewis",
    contactPrompt: "Prefer email? Reach out anytime:",
    contactEmail: "rice@mottodigital.jp",
    backHome: "Back to Home",
  },
  sidebar: {
    trustBadge: "Your data is encrypted and never shared with third parties.",
    steps: {
      0: {
        title: "What you're signing up for",
        items: [
          "6-month hands-on AI operating system build",
          "10 AI agents in production by month 6",
          "Full ownership — everything runs on your infrastructure",
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
          "You'll hear back within 24 hours",
          "No commitment until you speak with Lewis",
        ],
      },
      4: {
        title: "Your availability",
        items: [
          "We schedule around what works for all members",
          "Two sessions per week with identical content if needed",
          "All sessions are recorded",
        ],
      },
      5: {
        title: "Commitment",
        items: [
          "6 months is the minimum for meaningful results",
          "Save ¥20,000 by paying upfront",
          "Bank transfer — invoices by email",
        ],
      },
      6: {
        title: "Two channels, one purpose",
        items: [
          "LINE Official: reminders and official comms",
          "Slack: optional peer community",
          "You always have Lewis directly",
        ],
      },
      7: {
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
