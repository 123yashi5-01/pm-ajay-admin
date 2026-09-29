"use client";

import React, { useState } from "react";
import {
  FileText,
  BarChart3,
  TrendingUp,
  Map,
  Download,
  CheckCircle2,
  Printer,
  FileSpreadsheet,
  ArrowUpRight,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  TOP_SKILL_DEMANDS,
  DISTRICT_DISTRIBUTION,
  BENEFICIARIES_DATA,
} from "@/lib/mock-data";
import { usePortal } from "@/context/portal-context";
import { cn } from "@/lib/utils";

type ReportTab =
  | "scheme"
  | "perspective"
  | "enrolment"
  | "district"
  | "export";

const REPORT_MODULES: Array<{
  id: ReportTab;
  title: string;
  titleHi: string;
  subtitle: string;
  icon: React.ElementType;
}> = [
  {
    id: "scheme",
    title: "Scheme-wise Report",
    titleHi: "योजना-वार रिपोर्ट (Scheme-wise Report)",
    subtitle: "PM-AJAY (GIA) vs State Skill Convergence & Tool-kit Subsidy",
    icon: FileText,
  },
  {
    id: "perspective",
    title: "Skill Demand vs Perspective Plan",
    titleHi: "कौशल मांग बनाम परिप्रेक्ष्य योजना",
    subtitle: "Compare AI voice-captured demand against District Annual Action Plan",
    icon: BarChart3,
  },
  {
    id: "enrolment",
    title: "Enrolment & Completion Rate",
    titleHi: "नामांकन और पूर्णता दर",
    subtitle: "Conversion funnel from Voice Profile (1,248) to Certified (312)",
    icon: TrendingUp,
  },
  {
    id: "district",
    title: "District Comparison",
    titleHi: "जिला तुलना (District Comparison)",
    subtitle: "Performance benchmarks across Nagpur, Pune, Nashik, Aurangabad & Amravati",
    icon: Map,
  },
  {
    id: "export",
    title: "Export Reports (PDF/Excel)",
    titleHi: "रिपोर्ट निर्यात करें (PDF/Excel)",
    subtitle: "Download official Ministry & District Nodal Officer audit sheets",
    icon: Download,
  },
];

export default function ReportsAnalyticsPage() {
  const { language } = usePortal();
  const [activeModule, setActiveModule] = useState<ReportTab>("perspective");
  const [exportNotice, setExportNotice] = useState<string | null>(null);

  const triggerCsvDownload = () => {
    const headers = [
      "Profile ID",
      "Name",
      "District",
      "Education",
      "Interest",
      "Status",
      "Referral ID",
      "Agency",
    ];
    const rows = BENEFICIARIES_DATA.map((b) => [
      b.id,
      b.name,
      b.district,
      b.education,
      b.interest,
      b.status,
      b.referral.referralId,
      b.referral.sharedTo,
    ]);
    const csv = [headers, ...rows]
      .map((r) => r.map((v) => `"${v}"`).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "PM-AJAY-District-Report-2026.csv";
    a.click();
    URL.revokeObjectURL(url);
    setExportNotice("PM-AJAY-District-Report-2026.csv downloaded successfully!");
    setTimeout(() => setExportNotice(null), 3500);
  };

  return (
    <div className="space-y-6">
      {/* Top 3.5 Module Selector matching the 5 exact cards from Image 4 Section 3.5 */}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-5">
        {REPORT_MODULES.map((mod) => {
          const Icon = mod.icon;
          const isActive = activeModule === mod.id;
          return (
            <button
              key={mod.id}
              onClick={() => setActiveModule(mod.id)}
              className={cn(
                "flex flex-col justify-between rounded-2xl border p-4 text-left transition-all",
                isActive
                  ? "border-[#0066FF] bg-gradient-to-br from-[#EBF4FF] to-white shadow-md"
                  : "border-slate-200/85 bg-white hover:border-blue-200 hover:bg-slate-50/70"
              )}
            >
              <div className="flex items-center justify-between">
                <div
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-xl",
                    isActive
                      ? "bg-[#0066FF] text-white"
                      : "bg-blue-50 text-[#0066FF]"
                  )}
                >
                  <Icon className="h-4 w-4" />
                </div>
                <Badge
                  variant={isActive ? "default" : "secondary"}
                  className="text-[10px]"
                >
                  3.5
                </Badge>
              </div>
              <div className="mt-3">
                <div className="text-xs font-extrabold text-[#0F2547]">
                  {language === "hi" ? mod.titleHi : mod.title}
                </div>
                <p className="mt-1 text-[11px] text-slate-500 line-clamp-2">
                  {mod.subtitle}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {exportNotice && (
        <div className="flex items-center gap-2 rounded-xl border border-emerald-300 bg-emerald-50 px-4 py-3 text-xs font-bold text-emerald-800">
          <CheckCircle2 className="h-4 w-4 text-emerald-600" />
          {exportNotice}
        </div>
      )}

      {/* Active Report Workspace */}
      {activeModule === "perspective" && (
        <Card>
          <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-4">
            <div>
              <Badge variant="default">3.5 Skill Demand vs Perspective Plan</Badge>
              <CardTitle className="mt-1.5 text-lg">
                AI Voice-Mapped Skill Demand vs District Annual Perspective Plan (FY 2026-27)
              </CardTitle>
              <CardDescription>
                Identifies real-time beneficiary demand gaps so District Officers can reallocate batch seats under PM-AJAY GIA
              </CardDescription>
            </div>
            <Button onClick={triggerCsvDownload} className="gap-2">
              <FileSpreadsheet className="h-4 w-4" />
              Export Comparison (CSV/Excel)
            </Button>
          </CardHeader>

          <CardContent className="space-y-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>NSQF Trade / Qualification</TableHead>
                  <TableHead>NSQF Level</TableHead>
                  <TableHead>Voice AI Demand</TableHead>
                  <TableHead>Perspective Plan Target</TableHead>
                  <TableHead>Variance / Gap</TableHead>
                  <TableHead>Policy Recommendation</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {TOP_SKILL_DEMANDS.map((item) => {
                  const diff = item.count - item.perspectiveTarget;
                  return (
                    <TableRow key={item.skill}>
                      <TableCell className="font-bold text-[#0F2547]">
                        {item.skill}
                        <div className="text-xs font-normal text-slate-500">
                          {item.skillHi}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{item.nsqfLevel}</Badge>
                      </TableCell>
                      <TableCell className="font-extrabold text-[#0066FF]">
                        {item.count} Beneficiaries
                      </TableCell>
                      <TableCell className="font-semibold text-slate-700">
                        {item.perspectiveTarget} Seats
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={diff >= 0 ? "enrolled" : "referred"}
                        >
                          {diff >= 0 ? `+${diff} Surplus Demand` : `${diff} Seats Available`}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-xs text-slate-600">
                        {diff > 0
                          ? "Sanction +1 additional batch at Govt ITI / PM-AJAY Centre"
                          : "Promote via WhatsApp Voice Bot in rural blocks"}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {activeModule === "scheme" && (
        <Card>
          <CardHeader>
            <Badge variant="purple">3.5 Scheme-wise Report</Badge>
            <CardTitle className="mt-1.5 text-lg">
              PM-AJAY (GIA Component) & Convergent Skill Schemes Performance
            </CardTitle>
            <CardDescription>
              Breakdown of beneficiary referrals across PM-AJAY Grant-in-Aid, Surya Ghar Solar Mission, and NSFDC Self-Employment
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Scheme Component</TableHead>
                  <TableHead>Target Group</TableHead>
                  <TableHead>Beneficiaries Profiled</TableHead>
                  <TableHead>Referrals</TableHead>
                  <TableHead>Enrolled</TableHead>
                  <TableHead>Completed & Placed</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-bold text-[#0F2547]">
                    PM-AJAY (GIA Skill Development)
                  </TableCell>
                  <TableCell>SC Youth & Women</TableCell>
                  <TableCell className="font-bold">780</TableCell>
                  <TableCell>564</TableCell>
                  <TableCell className="text-emerald-700 font-bold">284</TableCell>
                  <TableCell className="font-bold">206 (72.5%)</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-bold text-[#0F2547]">
                    PM-AJAY + Tool-Kit & Self-Employment Grant
                  </TableCell>
                  <TableCell>Women SHGs & Rural Artisans</TableCell>
                  <TableCell className="font-bold">298</TableCell>
                  <TableCell>210</TableCell>
                  <TableCell className="text-emerald-700 font-bold">98</TableCell>
                  <TableCell className="font-bold">68 (69.4%)</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-bold text-[#0F2547]">
                    PM-AJAY + Green Jobs (Suryamitra Solar)
                  </TableCell>
                  <TableCell>10th/12th Pass Youth</TableCell>
                  <TableCell className="font-bold">170</TableCell>
                  <TableCell>118</TableCell>
                  <TableCell className="text-emerald-700 font-bold">54</TableCell>
                  <TableCell className="font-bold">38 (70.3%)</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {activeModule === "enrolment" && (
        <Card>
          <CardHeader>
            <Badge variant="enrolled">3.5 Enrolment & Completion Rate</Badge>
            <CardTitle className="mt-1.5 text-lg">
              End-to-End Skilling Conversion Funnel
            </CardTitle>
            <CardDescription>
              Tracking progression from Jeevika Saathi voice onboarding to NSQF certification
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-4">
            {[
              {
                stage: "Stage 1: Voice Profiled",
                count: "1,248",
                pct: "100%",
                desc: "Completed 8-question voice/kiosk profile with consent",
                color: "bg-[#0066FF]",
              },
              {
                stage: "Stage 2: Referral Generated",
                count: "892",
                pct: "71.5%",
                desc: "Matched to Top 3 NSQF courses & sent to District Agency",
                color: "bg-[#6D28D9]",
              },
              {
                stage: "Stage 3: Batch Enrolled",
                count: "436",
                pct: "48.9% of Referrals",
                desc: "Documents verified & seat allocated at training centre",
                color: "bg-[#F59E0B]",
              },
              {
                stage: "Stage 4: Certified & Placed",
                count: "312",
                pct: "71.6% of Enrolled",
                desc: "Cleared NSQF Level 3/4 assessment & linked to job/credit",
                color: "bg-[#10B981]",
              },
            ].map((item) => (
              <div
                key={item.stage}
                className="rounded-2xl border border-slate-200/90 bg-slate-50/60 p-4"
              >
                <div className="text-xs font-bold text-slate-500">
                  {item.stage}
                </div>
                <div className="mt-2 text-3xl font-extrabold text-[#0F2547]">
                  {item.count}
                </div>
                <div className="mt-1 inline-block rounded-md bg-white px-2 py-0.5 text-xs font-bold text-[#0066FF] border border-blue-100">
                  {item.pct}
                </div>
                <p className="mt-2 text-xs text-slate-600">{item.desc}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {activeModule === "district" && (
        <Card>
          <CardHeader>
            <Badge variant="default">3.5 District Comparison</Badge>
            <CardTitle className="mt-1.5 text-lg">
              District-wise Nodal Agency Performance Matrix
            </CardTitle>
            <CardDescription>
              Comparative view across all participating districts in Maharashtra
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>District</TableHead>
                  <TableHead>Implementing Agency</TableHead>
                  <TableHead>Beneficiaries</TableHead>
                  <TableHead>Referrals</TableHead>
                  <TableHead>Enrolled</TableHead>
                  <TableHead>Completed</TableHead>
                  <TableHead>Top NSQF Trade</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {DISTRICT_DISTRIBUTION.map((d) => (
                  <TableRow key={d.district}>
                    <TableCell className="font-bold text-[#0F2547]">
                      {d.district} ({d.districtHi})
                    </TableCell>
                    <TableCell className="text-xs text-slate-600">
                      {d.agency}
                    </TableCell>
                    <TableCell className="font-extrabold text-[#0066FF]">
                      {d.beneficiaries}
                    </TableCell>
                    <TableCell>{d.referrals}</TableCell>
                    <TableCell className="font-bold text-emerald-700">
                      {d.enrolled}
                    </TableCell>
                    <TableCell className="font-bold">{d.completed}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{d.topSkill}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {activeModule === "export" && (
        <Card>
          <CardHeader>
            <Badge variant="enrolled">3.5 Export Reports (PDF / Excel)</Badge>
            <CardTitle className="mt-1.5 text-lg">
              Generate & Download Official Ministry Reports
            </CardTitle>
            <CardDescription>
              One-click export in CSV/Excel and Printable PDF formats for District Collectors & MoSJE review
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-blue-200 bg-[#EBF4FF]/50 p-5 flex flex-col justify-between">
              <div>
                <h4 className="text-base font-extrabold text-[#0F2547]">
                  Beneficiary & Referral Master Register (Excel / CSV)
                </h4>
                <p className="mt-1 text-xs text-slate-600">
                  Includes Profile IDs (PMAJAY-2026-00124+), consent audit timestamps, NQR codes, and agency status.
                </p>
              </div>
              <Button onClick={triggerCsvDownload} className="mt-4 w-fit gap-2">
                <FileSpreadsheet className="h-4 w-4" />
                Download Excel / CSV Register
              </Button>
            </div>

            <div className="rounded-2xl border border-emerald-200 bg-[#ECFDF5]/60 p-5 flex flex-col justify-between">
              <div>
                <h4 className="text-base font-extrabold text-[#0F2547]">
                  District Perspective Plan & Outcome Summary (PDF)
                </h4>
                <p className="mt-1 text-xs text-slate-600">
                  Formatted executive brief with KPI summary (1,248 Beneficiaries, 892 Referrals, 436 Enrolled, 312 Completed).
                </p>
              </div>
              <Button
                variant="success"
                onClick={() => window.print()}
                className="mt-4 w-fit gap-2"
              >
                <Printer className="h-4 w-4" />
                Print / Save as PDF
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
