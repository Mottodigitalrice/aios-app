"use client";

import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

const STATUS_COLORS: Record<string, string> = {
  partial: "bg-orange-500/10 text-orange-500 border-orange-500/20",
  new: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  reviewed: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  scheduled: "bg-violet-500/10 text-violet-500 border-violet-500/20",
  completed: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  archived: "bg-zinc-500/10 text-zinc-500 border-zinc-500/20",
};

export default function LeadsPage() {
  const leads = useQuery(api.functions.auditLeads.list);
  const isLoading = leads === undefined;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Audit Leads</h1>
        <p className="text-muted-foreground">
          Manage incoming audit requests
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Leads</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          ) : leads.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Company</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Submitted</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leads.map((lead) => (
                  <TableRow key={lead._id} className="cursor-pointer">
                    <TableCell>
                      <Link
                        href={`/dashboard/leads/${lead._id}`}
                        className="block font-semibold hover:underline"
                      >
                        {lead.company || "No company"}
                      </Link>
                    </TableCell>
                    <TableCell>{lead.name || "—"}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {lead.email}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={STATUS_COLORS[lead.status] || ""}
                      >
                        {lead.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {formatDistanceToNow(new Date(lead.createdAt), {
                        addSuffix: true,
                      })}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="py-12 text-center">
              <p className="text-muted-foreground mb-4">No leads yet</p>
              <Link
                href="/audit"
                className="text-sm text-primary underline hover:no-underline"
              >
                Share your audit form to start collecting leads
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
