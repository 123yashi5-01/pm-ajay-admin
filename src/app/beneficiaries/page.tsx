"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Search,
  Filter,
  Eye,
  CheckCircle2,
  MapPin,
  Mic,
  GraduationCap,
  Briefcase,
  Sparkles,
  Download,
  RefreshCw,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { usePortal } from "@/context/portal-context";
import { BeneficiaryRecord, BeneficiaryStatus } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const STATUS_FILTERS: Array<"All" | BeneficiaryStatus> = [
  "All",
  "Referred",
  "Enrolled",
  "Pending",
  "Completed",
];

const INTEREST_FILTERS = [
  "All",
  "Electrical",
  "Tailoring",
  "Computer",
  "Solar",
  "Driving",
];

export default function BeneficiaryListPage() {
  const {
    language,
    selectedDistrict,
    setSelectedDistrict,
    beneficiaries,
    updateBeneficiaryStatus,
  } = usePortal();

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | BeneficiaryStatus>(
    "All"
  );
  const [interestFilter, setInterestFilter] = useState<string>("All");
  const [selectedRecord, setSelectedRecord] = useState<BeneficiaryRecord>(
    beneficiaries[0]
  );

  const filtered = beneficiaries.filter((b) => {
    const matchesDistrict =
      selectedDistrict === "All Districts" || b.district === selectedDistrict;
    const matchesStatus = statusFilter === "All" || b.status === statusFilter;
    const matchesInterest =
      interestFilter === "All" ||
      b.interest.toLowerCase() === interestFilter.toLowerCase();
    const q = searchQuery.trim().toLowerCase();
    const matchesQuery =
      !q ||
      b.name.toLowerCase().includes(q) ||
      b.shortId.toLowerCase().includes(q) ||
      b.id.toLowerCase().includes(q) ||
      b.district.toLowerCase().includes(q) ||
      b.interest.toLowerCase().includes(q);

    return matchesDistrict && matchesStatus && matchesInterest && matchesQuery;
  });

  const statusBadgeVariant = (status: BeneficiaryStatus) => {
    switch (status) {
      case "Referred":
        return "referred";
      case "Enrolled":
        return "enrolled";
      case "Pending":
        return "pending";
      case "Completed":
        return "completed";
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Search & Filter Bar — Exact replica of 3.3 Beneficiary List search + Filter button */}
      <Card className="border-blue-200/80">
        <CardContent className="p-5 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="relative flex-1 min-w-[280px]">
              <Search className="pointer-events-none absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  language === "hi"
                    ? "नाम, प्रोफ़ाइल आईडी (PMAJAY-00124), जिला या कौशल से खोजें..."
                    : "Search by name, profile ID (e.g. PMAJAY-00124), district..."
                }
                className="pl-10 h-10 bg-slate-50/70 focus:bg-white"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Button
                onClick={() => {
                  setSearchQuery("");
                  setStatusFilter("All");
                  setInterestFilter("All");
                  setSelectedDistrict("All Districts");
                }}
                variant="outline"
                className="gap-1.5"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                Reset
              </Button>
              <Button className="gap-2 px-5">
                <Filter className="h-4 w-4" />
                Filter ({filtered.length})
              </Button>
            </div>
          </div>

          {/* Pill Filters Row */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 pt-3">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="mr-1 text-xs font-bold text-slate-500">
                Status:
              </span>
              {STATUS_FILTERS.map((st) => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={cn(
                    "rounded-full px-3 py-1 text-xs font-semibold transition-all",
                    statusFilter === st
                      ? "bg-[#0066FF] text-white shadow-sm"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200/70"
                  )}
                >
                  {st}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-1.5">
              <span className="mr-1 text-xs font-bold text-slate-500">
                Skill Interest:
              </span>
              {INTEREST_FILTERS.map((interest) => (
                <button
                  key={interest}
                  onClick={() => setInterestFilter(interest)}
                  className={cn(
                    "rounded-lg border px-2.5 py-1 text-xs font-semibold transition-all",
                    interestFilter === interest
                      ? "border-[#0066FF] bg-blue-50 text-[#0066FF]"
                      : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                  )}
                >
                  {interest}
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Split View: 3.3 Beneficiary Table (Left 8 Cols) + Live Profile Inspector (Right 4 Cols) */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
        {/* Left 8 Cols: 3.3 Beneficiary Table */}
        <Card className="xl:col-span-8">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <div>
              <div className="flex items-center gap-2">
                <CardTitle>
                  {language === "hi"
                    ? "3.3 लाभार्थी सूची (Beneficiary List)"
                    : "3.3 Beneficiary List"}
                </CardTitle>
                <Badge variant="default">{filtered.length} Records</Badge>
              </div>
              <CardDescription>
                View and manage beneficiary records captured via Voice Assistant, Facilitator Kiosk, WhatsApp & IVR
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Profile ID</TableHead>
                  <TableHead>Beneficiary Name</TableHead>
                  <TableHead>District</TableHead>
                  <TableHead>Interest</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((item) => {
                  const isSelected = selectedRecord?.id === item.id;
                  return (
                    <TableRow
                      key={item.id}
                      onClick={() => setSelectedRecord(item)}
                      className={cn(
                        "cursor-pointer",
                        isSelected && "bg-blue-50/75"
                      )}
                    >
                      <TableCell className="font-extrabold text-[#0F2547]">
                        <div>{item.shortId}</div>
                        <div className="text-[10px] font-medium text-slate-400">
                          {item.channel}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-bold text-slate-900">
                          {language === "hi" ? item.nameHi : item.name}
                        </div>
                        <div className="text-xs text-slate-500">
                          {item.education} • {item.currentWork}
                        </div>
                      </TableCell>
                      <TableCell className="font-semibold text-slate-700">
                        {item.district}
                      </TableCell>
                      <TableCell>
                        <span className="font-bold text-[#0066FF]">
                          {item.interest}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge variant={statusBadgeVariant(item.status) as any}>
                          {item.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="inline-flex items-center gap-1.5">
                          <Link
                            href={`/referrals?id=${item.id}`}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Button
                              variant="link"
                              size="sm"
                              className="h-8 px-2 font-bold text-[#0066FF]"
                            >
                              View
                            </Button>
                          </Link>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Right 4 Cols: Quick Beneficiary Summary Card (Matching 1.4 & 2.4 Profile Summary) */}
        {selectedRecord && (
          <Card className="xl:col-span-4 border-blue-200/90 bg-gradient-to-b from-white to-[#F8FBFF]">
            <CardHeader className="border-b border-slate-100 pb-4">
              <div className="flex items-center justify-between">
                <Badge variant="default" className="font-bold">
                  1.4 / 2.4 Extracted Profile
                </Badge>
                <Badge
                  variant={statusBadgeVariant(selectedRecord.status) as any}
                >
                  {selectedRecord.status}
                </Badge>
              </div>
              <CardTitle className="mt-2 text-lg">
                {language === "hi"
                  ? selectedRecord.nameHi
                  : selectedRecord.name}
              </CardTitle>
              <CardDescription className="font-semibold text-[#0066FF]">
                Profile ID: {selectedRecord.id}
              </CardDescription>
            </CardHeader>

            <CardContent className="p-5 space-y-4">
              {/* Structured Profile Fields matching 1.4 "Kripya apni jankari ki pushti karein" */}
              <div className="space-y-2.5 rounded-xl border border-slate-200/80 bg-white p-3.5 text-xs">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <span className="text-slate-500 font-medium">
                    🎓 Shiksha (Education):
                  </span>
                  <span className="font-bold text-[#0F2547]">
                    {selectedRecord.education}
                  </span>
                </div>
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <span className="text-slate-500 font-medium">
                    💼 Vartamaan Kaam (Work):
                  </span>
                  <span className="font-bold text-[#0F2547]">
                    {selectedRecord.currentWork}
                  </span>
                </div>
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <span className="text-slate-500 font-medium">
                    ⚙️ Ruchi (Skill Interest):
                  </span>
                  <span className="font-bold text-[#0066FF]">
                    {selectedRecord.interest} work
                  </span>
                </div>
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <span className="text-slate-500 font-medium">
                    📍 Sthan (Location):
                  </span>
                  <span className="font-bold text-[#0F2547]">
                    {selectedRecord.district}, {selectedRecord.state}
                  </span>
                </div>
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <span className="text-slate-500 font-medium">
                    🚌 Yatra (Mobility):
                  </span>
                  <span className="font-bold text-[#0F2547]">
                    {selectedRecord.mobility}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-medium">
                    🎯 Prathmikta (Goal):
                  </span>
                  <span className="font-bold text-emerald-700">
                    {selectedRecord.preferenceHi}
                  </span>
                </div>
              </div>

              {/* Quick Status Update for District Officer / Implementing Agency */}
              <div className="rounded-xl border border-blue-100 bg-[#EBF4FF]/60 p-3.5">
                <div className="text-xs font-bold text-[#0F2547] mb-2">
                  Update Beneficiary Status:
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {(
                    [
                      "Pending",
                      "Referred",
                      "Enrolled",
                      "Completed",
                    ] as BeneficiaryStatus[]
                  ).map((st) => (
                    <button
                      key={st}
                      onClick={() => {
                        updateBeneficiaryStatus(selectedRecord.id, st);
                        setSelectedRecord({ ...selectedRecord, status: st });
                      }}
                      className={cn(
                        "rounded-lg border px-2.5 py-1.5 text-xs font-bold transition-all",
                        selectedRecord.status === st
                          ? "border-[#0066FF] bg-[#0066FF] text-white shadow-sm"
                          : "border-slate-200 bg-white text-slate-700 hover:border-blue-300"
                      )}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Open 3.4 Referral Details CTA */}
              <Link
                href={`/referrals?id=${selectedRecord.id}`}
                className="block"
              >
                <Button className="w-full gap-2">
                  <Eye className="h-4 w-4" />
                  Open Full Referral Details (3.4)
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
