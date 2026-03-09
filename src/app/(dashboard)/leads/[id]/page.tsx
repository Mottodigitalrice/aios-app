"use client";

import { use } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { Id } from "../../../../../convex/_generated/dataModel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { ROUTES } from "@/lib/constants";
import { format } from "date-fns";

const STATUS_COLORS: Record<string, string> = {
  partial: "bg-orange-500/10 text-orange-500 border-orange-500/20",
  new: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  reviewed: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  scheduled: "bg-violet-500/10 text-violet-500 border-violet-500/20",
  completed: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  archived: "bg-zinc-500/10 text-zinc-500 border-zinc-500/20",
};

const STATUSES = ["partial", "new", "reviewed", "scheduled", "completed", "archived"] as const;

type LeadStatus = (typeof STATUSES)[number];

export default function LeadDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const leadId = id as Id<"auditLeads">;

  const lead = useQuery(api.functions.auditLeads.getById, { id: leadId });
  const updateStatus = useMutation(api.functions.auditLeads.updateStatus);

  const isLoading = lead === undefined;

  const handleStatusChange = async (newStatus: string) => {
    await updateStatus({
      id: leadId,
      status: newStatus as LeadStatus,
    });
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <div className="grid gap-4 md:grid-cols-2">
          <Skeleton className="h-40 w-full" />
          <Skeleton className="h-40 w-full" />
          <Skeleton className="h-40 w-full" />
          <Skeleton className="h-40 w-full" />
        </div>
      </div>
    );
  }

  // Not found
  if (!lead) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="text-muted-foreground mb-4">Lead not found</p>
        <Link href={ROUTES.leads}>
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Leads
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <Link
            href={ROUTES.leads}
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-2"
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to Leads
          </Link>
          <h1 className="text-3xl font-bold">{lead.company || "Partial Lead"}</h1>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <Badge
            variant="outline"
            className={STATUS_COLORS[lead.status] || ""}
          >
            {lead.status}
          </Badge>
          <Select value={lead.status} onValueChange={handleStatusChange}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Change status" />
            </SelectTrigger>
            <SelectContent>
              {STATUSES.map((s) => (
                <SelectItem key={s} value={s}>
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Contact Info */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Contact Info</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Name</span>
              <span className="font-medium">{lead.name || "—"}</span>
            </div>
            {lead.role && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Role</span>
                <span className="font-medium">{lead.role}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-muted-foreground">Email</span>
              <a
                href={`mailto:${lead.email}`}
                className="font-medium text-primary hover:underline"
              >
                {lead.email}
              </a>
            </div>
          </CardContent>
        </Card>

        {/* Company Info */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Company Info</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Company</span>
              <span className="font-medium">{lead.company || "—"}</span>
            </div>
            {lead.website && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Website</span>
                <a
                  href={
                    lead.website.startsWith("http")
                      ? lead.website
                      : `https://${lead.website}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-primary hover:underline"
                >
                  {lead.website}
                </a>
              </div>
            )}
            {lead.employees && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Team Size</span>
                <span className="font-medium">{lead.employees}</span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Business Details */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Business Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            {lead.tools && lead.tools.length > 0 && (
              <div>
                <p className="text-muted-foreground mb-1">Current Tools</p>
                <div className="flex flex-wrap gap-1.5">
                  {(Array.isArray(lead.tools) ? lead.tools : [lead.tools]).map((tool) => (
                    <span
                      key={tool}
                      className="inline-flex rounded-md bg-muted px-2 py-0.5 text-xs font-medium"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {lead.challenge && (Array.isArray(lead.challenge) ? lead.challenge.length > 0 : true) && (
              <div>
                <p className="text-muted-foreground mb-1">Biggest Challenge</p>
                {Array.isArray(lead.challenge) ? (
                  <div className="flex flex-wrap gap-1.5">
                    {lead.challenge.map((c) => (
                      <span
                        key={c}
                        className="inline-flex rounded-md bg-muted px-2 py-0.5 text-xs font-medium"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="font-medium">{lead.challenge}</p>
                )}
                {lead.challengeOther && (
                  <p className="font-medium mt-1 text-muted-foreground">
                    Other: {lead.challengeOther}
                  </p>
                )}
              </div>
            )}
            {lead.aiExperience && (
              <div>
                <p className="text-muted-foreground mb-1">AI Experience</p>
                <p className="font-medium">{lead.aiExperience}</p>
              </div>
            )}
            {lead.sixMonthVision && (Array.isArray(lead.sixMonthVision) ? lead.sixMonthVision.length > 0 : true) && (
              <div>
                <p className="text-muted-foreground mb-1">6-Month Vision</p>
                {Array.isArray(lead.sixMonthVision) ? (
                  <div className="flex flex-wrap gap-1.5">
                    {lead.sixMonthVision.map((v) => (
                      <span
                        key={v}
                        className="inline-flex rounded-md bg-muted px-2 py-0.5 text-xs font-medium"
                      >
                        {v}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="font-medium">{lead.sixMonthVision}</p>
                )}
                {lead.sixMonthVisionOther && (
                  <p className="font-medium mt-1 text-muted-foreground">
                    Other: {lead.sixMonthVisionOther}
                  </p>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Logistics */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Logistics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            {lead.source && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">How they found us</span>
                <span className="font-medium">{lead.source}</span>
              </div>
            )}
            {lead.preferredTime && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Preferred call time</span>
                <span className="font-medium">{lead.preferredTime}</span>
              </div>
            )}
            {!lead.source && !lead.preferredTime && (
              <p className="text-muted-foreground">No logistics info provided</p>
            )}
          </CardContent>
        </Card>

        {/* Meta */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Meta</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Submitted</span>
              <span className="font-medium">
                {lead.createdAt ? format(new Date(lead.createdAt), "PPP 'at' p") : "—"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Webhook</span>
              <Badge
                variant="outline"
                className={
                  lead.webhookSent
                    ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                    : "bg-zinc-500/10 text-zinc-500 border-zinc-500/20"
                }
              >
                {lead.webhookSent ? "Sent" : "Pending"}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
