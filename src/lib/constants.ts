export const APP_NAME = "AIOS";
export const APP_DESCRIPTION = "AI Operating System for Business — by MOTTO Digital";
export const APP_AUTHOR = "MOTTO Digital";

// Live metrics — update these when real numbers change.
// Content spec requires these to be easily updatable, not hardcoded in dictionary strings.
export const METRICS = {
  activeProjects: 26,
  tasksInProgress: 63,
  pipelineDeals: 9,
  locationsManaged: 16,
  payingClients: 4,
} as const;

export const ROUTES = {
  home: "/",
  audit: "/audit",
  report: "/report",
  signIn: "/sign-in",
  signUp: "/sign-up",
  dashboard: "/dashboard",
  leads: "/dashboard/leads",
  reports: "/dashboard/reports",
  settings: "/dashboard/settings",
} as const;
