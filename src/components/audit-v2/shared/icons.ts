/**
 * Icon registries — lucide icons for each domain enum.
 * Keeps data files (goals.ts, constants.ts) free of JSX/component deps.
 */

import {
  TrendingUp,
  PiggyBank,
  Zap,
  Users,
  Brain,
  Heart,
  Rocket,
  Settings,
  Factory,
  HardHat,
  Building2,
  ShoppingBag,
  UtensilsCrossed,
  Code2,
  Briefcase,
  Stethoscope,
  GraduationCap,
  Scissors,
  FileText,
  Sparkles,
  PowerOff,
  Sprout,
  Leaf,
  TreePine,
  Network,
  type LucideIcon,
} from "lucide-react";
import type { GoalId } from "@/lib/audit-v2/goals";
import type { AiExperienceId, IndustryId } from "@/lib/audit-v2/constants";

export const GOAL_ICONS: Record<GoalId, LucideIcon> = {
  "grow-revenue": TrendingUp,
  "reduce-costs": PiggyBank,
  "operational-efficiency": Zap,
  "labor-shortage": Users,
  "person-dependency": Brain,
  "customer-experience": Heart,
  "new-business": Rocket,
  "dx-modernization": Settings,
};

export const INDUSTRY_ICONS: Record<IndustryId, LucideIcon> = {
  manufacturing: Factory,
  construction: HardHat,
  "real-estate": Building2,
  retail: ShoppingBag,
  hospitality: UtensilsCrossed,
  "it-software": Code2,
  consulting: Briefcase,
  healthcare: Stethoscope,
  education: GraduationCap,
  beauty: Scissors,
  professional: FileText,
  other: Sparkles,
};

export const AI_EXP_ICONS: Record<AiExperienceId, LucideIcon> = {
  none: PowerOff,
  dabbled: Sprout,
  "daily-personal": Leaf,
  "biz-spreading": TreePine,
  "biz-integrated": Network,
};
