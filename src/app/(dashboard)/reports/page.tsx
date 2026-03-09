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
import { formatDistanceToNow } from "date-fns";

const REPORT_STATUS_COLORS: Record<string, string> = {
  draft: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  published: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  archived: "bg-zinc-500/10 text-zinc-500 border-zinc-500/20",
};

export default function ReportsPage() {
  const reports = useQuery(api.functions.auditReports.list);
  const isLoading = reports === undefined;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Audit Reports</h1>
        <p className="text-muted-foreground">
          Generated AI audit reports
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Reports</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          ) : reports.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Client Name</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reports.map((report) => (
                  <TableRow
                    key={report._id}
                    className="cursor-pointer"
                    onClick={() =>
                      window.open(`/report/${report._id}`, "_blank")
                    }
                  >
                    <TableCell className="font-semibold">
                      {report.clientName}
                    </TableCell>
                    <TableCell>{report.contactName}</TableCell>
                    <TableCell>
                      <span className="font-mono text-sm">
                        {report.score}/{report.maxScore}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          REPORT_STATUS_COLORS[report.status ?? ""] || ""
                        }
                      >
                        {report.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {formatDistanceToNow(new Date(report.createdAt ?? Date.now()), {
                        addSuffix: true,
                      })}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="py-12 text-center">
              <p className="text-muted-foreground">
                No reports generated yet
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
