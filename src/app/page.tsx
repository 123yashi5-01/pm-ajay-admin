"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Users,
  Send,
  GraduationCap,
  Award,
  ArrowUpRight,
  MapPin,
  Sparkles,
  FileSpreadsheet,
  Filter,
  CheckCircle2,
  Mic,
  ClipboardCheck,
  Lightbulb,
  Signpost,
  Eye,
  TrendingUp,
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
  KPI_METRICS,
  TOP_SKILL_DEMANDS,
  DISTRICT_DISTRIBUTION,
} from "@/lib/mock-data";
import { usePortal } from "@/context/portal-context";
import { cn } from "@/lib/utils";

export default function DashboardOverviewPage() {
  const {
    language,
    selectedDistrict,
    setSelectedDistrict,
    beneficiaries,
    role,
  } = usePortal();
  const [showPerspectiveCompare, setShowPerspectiveCompare] = useState(false);

  const filteredBeneficiaries =
    selectedDistrict === "All Districts"
      ? beneficiaries
      : beneficiaries.filter((b) => b.district === selectedDistrict);

  const statusBadgeVariant = (status: string) => {
    switch (status) {
      case "Referred":
        return "referred";
      case "Enrolled":
        return "enrolled";
      case "Pending":
        return "pending";
      case "Completed":
        return "completed";
      default:
        return "default";
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Hero Callout Banner inspired by Image 1's pastel sky/mint hero & 3.2 Overview */}
      <div className="relative overflow-hidden rounded-2xl border border-blue-200/80 bg-gradient-to-r from-[#E8F3FF] via-[#F2F9FF] to-[#E9FBF3] p-5 shadow-soft">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-[#0066FF] shadow-sm border border-blue-100">
              <Sparkles className="h-3.5 w-3.5" />
              <span>
                {language === "hi"
                  ? "पीएम-अजय (PM-AJAY) • कौशल प्रशिक्षण एवं आजीविका मैपिंग पोर्टल"
                  : "PM-AJAY (GIA) • AI-Driven Livelihood Mapping & NSQF Skilling Portal"}
              </span>
            </div>
            <h2 className="text-2xl font-extrabold tracking-tight text-[#0F2547]">
              {language === "hi"
                ? "बोलिए, हम बताएँगे आपके लिए सही रास्ता — जिला प्रशासन डैशबोर्ड"
                : "Jeevika Saathi Admin & District Officer Command Center"}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {language === "hi"
                ? "अनुसूचित जाति समुदाय के छात्र, युवा, महिलाएँ और सभी इच्छुक लाभार्थियों के कौशल प्रशिक्षण, रेफरल और रोज़गार की वास्तविक समय निगरानी।"
                : "Real-time monitoring of voice-profiled beneficiaries, NSQF Level 3/4 course referrals, District Skill Agency enrolments, and Annual Perspective Plan targets."}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <Link href="/beneficiaries">
              <Button variant="outline" className="gap-2 bg-white/90">
                <Users className="h-4 w-4 text-[#0066FF]" />
                {language === "hi" ? "लाभार्थी सूची (3.3)" : "Beneficiary List (3.3)"}
              </Button>
            </Link>
            <Link href="/reports">
              <Button className="gap-2 shadow-md">
                <FileSpreadsheet className="h-4 w-4" />
                {language === "hi" ? "रिपोर्ट निर्यात करें (3.5)" : "Reports & Export (3.5)"}
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* 3.2 KPI Cards Row — Exact numbers from Image 4 (1,248 | 892 | 436 | 312) */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {/* Card 1: 1,248 Beneficiaries */}
        <Card className="relative overflow-hidden border-blue-200/80 hover:border-[#0066FF]/50">
          <div className="absolute right-0 top-0 h-24 w-24 translate-x-6 -translate-y-6 rounded-full bg-blue-50/80" />
          <CardContent className="p-5">
            <div className="flex items-start justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EBF4FF] text-[#0066FF] border border-blue-200/60">
                <Users className="h-6 w-6" />
              </div>
              <Badge variant="default" className="text-[11px]">
                {KPI_METRICS.beneficiaries.delta}
              </Badge>
            </div>
            <div className="mt-4">
              <div className="text-3xl font-extrabold tracking-tight text-[#0F2547]">
                {KPI_METRICS.beneficiaries.value}
              </div>
              <div className="mt-0.5 text-sm font-bold text-slate-700">
                {language === "hi"
                  ? KPI_METRICS.beneficiaries.labelHi
                  : KPI_METRICS.beneficiaries.label}
              </div>
              <p className="mt-1 text-xs text-slate-500">
                {KPI_METRICS.beneficiaries.subtext}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Card 2: 892 Referrals */}
        <Card className="relative overflow-hidden border-amber-200/80 hover:border-amber-400/60">
          <div className="absolute right-0 top-0 h-24 w-24 translate-x-6 -translate-y-6 rounded-full bg-amber-50/80" />
          <CardContent className="p-5">
            <div className="flex items-start justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 border border-amber-200/60">
                <Send className="h-6 w-6" />
              </div>
              <Badge variant="referred" className="text-[11px]">
                {KPI_METRICS.referrals.delta}
              </Badge>
            </div>
            <div className="mt-4">
              <div className="text-3xl font-extrabold tracking-tight text-[#0F2547]">
                {KPI_METRICS.referrals.value}
              </div>
              <div className="mt-0.5 text-sm font-bold text-slate-700">
                {language === "hi"
                  ? KPI_METRICS.referrals.labelHi
                  : KPI_METRICS.referrals.label}
              </div>
              <p className="mt-1 text-xs text-slate-500">
                {KPI_METRICS.referrals.subtext}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Card 3: 436 Enrolled */}
        <Card className="relative overflow-hidden border-purple-200/80 hover:border-purple-400/60">
          <div className="absolute right-0 top-0 h-24 w-24 translate-x-6 -translate-y-6 rounded-full bg-purple-50/80" />
          <CardContent className="p-5">
            <div className="flex items-start justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-50 text-[#6D28D9] border border-purple-200/60">
                <GraduationCap className="h-6 w-6" />
              </div>
              <Badge variant="purple" className="text-[11px]">
                {KPI_METRICS.enrolled.delta}
              </Badge>
            </div>
            <div className="mt-4">
              <div className="text-3xl font-extrabold tracking-tight text-[#0F2547]">
                {KPI_METRICS.enrolled.value}
              </div>
              <div className="mt-0.5 text-sm font-bold text-slate-700">
                {language === "hi"
                  ? KPI_METRICS.enrolled.labelHi
                  : KPI_METRICS.enrolled.label}
              </div>
              <p className="mt-1 text-xs text-slate-500">
                {KPI_METRICS.enrolled.subtext}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Card 4: 312 Completed */}
        <Card className="relative overflow-hidden border-emerald-200/80 hover:border-emerald-400/60">
          <div className="absolute right-0 top-0 h-24 w-24 translate-x-6 -translate-y-6 rounded-full bg-emerald-50/80" />
          <CardContent className="p-5">
            <div className="flex items-start justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200/60">
                <Award className="h-6 w-6" />
              </div>
              <Badge variant="enrolled" className="text-[11px]">
                {KPI_METRICS.completed.delta}
              </Badge>
            </div>
            <div className="mt-4">
              <div className="text-3xl font-extrabold tracking-tight text-[#0F2547]">
                {KPI_METRICS.completed.value}
              </div>
              <div className="mt-0.5 text-sm font-bold text-slate-700">
                {language === "hi"
                  ? KPI_METRICS.completed.labelHi
                  : KPI_METRICS.completed.label}
              </div>
              <p className="mt-1 text-xs text-slate-500">
                {KPI_METRICS.completed.subtext}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main 3.2 Visuals: Beneficiaries by District Map + Top Skill Demands Bar Chart */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left 7 Cols: Beneficiaries by District (Interactive Choropleth Map + Legend from 3.2) */}
        <Card className="lg:col-span-7">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <div>
              <div className="flex items-center gap-2">
                <CardTitle>
                  {language === "hi"
                    ? "जिलेवार लाभार्थी वितरण (Beneficiaries by District)"
                    : "Beneficiaries by District"}
                </CardTitle>
                <Badge variant="secondary" className="text-[10px]">
                  3.2 Overview
                </Badge>
              </div>
              <CardDescription>
                {language === "hi"
                  ? "जिले पर क्लिक करके डेटा फ़िल्टर करें • कुल 1,248 पंजीकृत"
                  : "Click any district node to filter portal metrics • Total 1,248 registered"}
              </CardDescription>
            </div>

            {selectedDistrict !== "All Districts" && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedDistrict("All Districts")}
              >
                Reset ({selectedDistrict})
              </Button>
            )}
          </CardHeader>

          <CardContent>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-12 items-center">
              {/* Interactive Choropleth Map Canvas */}
              <div className="md:col-span-7 relative rounded-2xl border border-blue-100 bg-gradient-to-br from-[#F0F7FF] via-[#F8FBFF] to-[#EEFBF5] p-4">
                <svg
                  viewBox="0 0 100 82"
                  className="w-full h-[250px] drop-shadow-sm"
                >
                  {/* Stylized State / India Regional Polygons matching 3.2 Choropleth */}
                  <path
                    d="M14 34 L34 26 L54 28 L78 24 L86 42 L76 66 L52 70 L32 76 L16 62 Z"
                    fill="#DBEAFE"
                    stroke="#93C5FD"
                    strokeWidth="0.9"
                  />
                  {/* Konkan / Western Zone */}
                  <path
                    d="M14 34 L34 26 L38 52 L32 76 L16 62 Z"
                    fill="#93C5FD"
                    stroke="#FFFFFF"
                    strokeWidth="0.8"
                  />
                  {/* Central / Marathwada Zone */}
                  <path
                    d="M34 26 L54 28 L56 56 L32 76 L38 52 Z"
                    fill="#60A5FA"
                    stroke="#FFFFFF"
                    strokeWidth="0.8"
                  />
                  {/* Vidarbha High-Density Zone (Nagpur > 500) */}
                  <path
                    d="M54 28 L78 24 L86 42 L76 66 L56 56 Z"
                    fill="#1D4ED8"
                    stroke="#FFFFFF"
                    strokeWidth="0.8"
                  />

                  {/* Interactive District Pins */}
                  {DISTRICT_DISTRIBUTION.map((d) => {
                    const isSelected = selectedDistrict === d.district;
                    const pinRadius =
                      d.beneficiaries > 500
                        ? 5.5
                        : d.beneficiaries > 150
                        ? 4.5
                        : 3.5;

                    return (
                      <g
                        key={d.district}
                        onClick={() =>
                          setSelectedDistrict(
                            isSelected ? "All Districts" : d.district
                          )
                        }
                        className="cursor-pointer group"
                      >
                        <circle
                          cx={d.coordinates.x}
                          cy={d.coordinates.y}
                          r={pinRadius + 3}
                          fill={isSelected ? "#F59E0B" : "#FFFFFF"}
                          fillOpacity={isSelected ? 0.45 : 0.3}
                        />
                        <circle
                          cx={d.coordinates.x}
                          cy={d.coordinates.y}
                          r={pinRadius}
                          fill={isSelected ? "#F59E0B" : "#0F2547"}
                          stroke="#FFFFFF"
                          strokeWidth="1.2"
                        />
                        <text
                          x={d.coordinates.x}
                          y={d.coordinates.y - pinRadius - 2.2}
                          textAnchor="middle"
                          className="fill-[#0F2547] text-[3.4px] font-extrabold"
                        >
                          {d.district} ({d.beneficiaries})
                        </text>
                      </g>
                    );
                  })}
                </svg>

                {/* Legend Box matching exact 3.2 legend (> 500, 100-500, 50-100, 10-50, < 10) */}
                <div className="mt-2 flex flex-wrap items-center justify-between gap-2 rounded-xl bg-white/90 px-3 py-2 border border-blue-100 text-[11px]">
                  <span className="font-bold text-slate-600">
                    {language === "hi" ? "लाभार्थी घनत्व:" : "Density Scale:"}
                  </span>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="inline-flex items-center gap-1.5 font-semibold text-slate-700">
                      <span className="h-2.5 w-2.5 rounded-full bg-[#1E3A8A]" />
                      &gt; 500
                    </span>
                    <span className="inline-flex items-center gap-1.5 font-semibold text-slate-700">
                      <span className="h-2.5 w-2.5 rounded-full bg-[#2563EB]" />
                      100 – 500
                    </span>
                    <span className="inline-flex items-center gap-1.5 font-semibold text-slate-700">
                      <span className="h-2.5 w-2.5 rounded-full bg-[#60A5FA]" />
                      50 – 100
                    </span>
                    <span className="inline-flex items-center gap-1.5 font-semibold text-slate-700">
                      <span className="h-2.5 w-2.5 rounded-full bg-[#93C5FD]" />
                      10 – 50
                    </span>
                    <span className="inline-flex items-center gap-1.5 font-semibold text-slate-700">
                      <span className="h-2.5 w-2.5 rounded-full bg-[#DBEAFE]" />
                      &lt; 10
                    </span>
                  </div>
                </div>
              </div>

              {/* District Breakdown List */}
              <div className="md:col-span-5 space-y-2">
                {DISTRICT_DISTRIBUTION.slice(0, 6).map((item) => {
                  const active = selectedDistrict === item.district;
                  return (
                    <button
                      key={item.district}
                      onClick={() =>
                        setSelectedDistrict(
                          active ? "All Districts" : item.district
                        )
                      }
                      className={cn(
                        "w-full flex items-center justify-between rounded-xl border p-2.5 text-left transition-all",
                        active
                          ? "border-[#0066FF] bg-blue-50/70 shadow-sm"
                          : "border-slate-200/80 bg-white hover:border-blue-200 hover:bg-slate-50/70"
                      )}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-[#0066FF] font-bold text-xs">
                          <MapPin className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-[#0F2547]">
                            {language === "hi"
                              ? `${item.districtHi} (${item.district})`
                              : item.district}
                          </div>
                          <div className="text-[10px] text-slate-500">
                            Top: {item.topSkill} • {item.tier}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-extrabold text-[#0066FF]">
                          {item.beneficiaries}
                        </div>
                        <div className="text-[10px] font-semibold text-emerald-700">
                          {item.enrolled} enrolled
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Right 5 Cols: Top Skill Demands Horizontal Bar Chart (Exact numbers from 3.2: 320, 210, 180, 130, 90) */}
        <Card className="lg:col-span-5 flex flex-col justify-between">
          <CardHeader className="flex flex-row items-start justify-between pb-3">
            <div>
              <CardTitle>
                {language === "hi"
                  ? "शीर्ष कौशल मांग (Top Skill Demands)"
                  : "Top Skill Demands"}
              </CardTitle>
              <CardDescription>
                {language === "hi"
                  ? "आवाज़ साक्षात्कार से निकाली गई एनएसक्यूएफ कौशल रुचि"
                  : "NSQF-aligned trade preferences extracted via Voice AI"}
              </CardDescription>
            </div>
            <button
              onClick={() => setShowPerspectiveCompare(!showPerspectiveCompare)}
              className={cn(
                "rounded-lg border px-2.5 py-1 text-[11px] font-bold transition-colors",
                showPerspectiveCompare
                  ? "border-[#0066FF] bg-blue-50 text-[#0066FF]"
                  : "border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100"
              )}
            >
              {showPerspectiveCompare
                ? "✓ vs Perspective Plan"
                : "Compare Plan"}
            </button>
          </CardHeader>

          <CardContent className="space-y-4">
            {TOP_SKILL_DEMANDS.map((item) => {
              const widthPercent = Math.round((item.count / 350) * 100);
              const planPercent = Math.round(
                (item.perspectiveTarget / 350) * 100
              );

              return (
                <div key={item.skill} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#0F2547]">
                        {language === "hi" ? item.skillHi : item.skill}
                      </span>
                      <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-semibold text-slate-600">
                        {item.nsqfLevel}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {showPerspectiveCompare && (
                        <span className="text-[11px] text-slate-400">
                          Plan: {item.perspectiveTarget}
                        </span>
                      )}
                      <span className="text-sm font-extrabold text-[#0F2547]">
                        {item.count}
                      </span>
                    </div>
                  </div>

                  <div className="relative h-5 w-full overflow-hidden rounded-lg bg-slate-100 p-0.5">
                    <div
                      className="h-full rounded-md transition-all duration-500 flex items-center justify-end pr-2 text-[10px] font-bold text-white"
                      style={{
                        width: `${widthPercent}%`,
                        backgroundColor: item.color,
                      }}
                    />
                    {showPerspectiveCompare && (
                      <div
                        title={`District Perspective Plan Target: ${item.perspectiveTarget}`}
                        className="absolute top-0 bottom-0 w-0.5 bg-amber-500"
                        style={{ left: `${planPercent}%` }}
                      />
                    )}
                  </div>
                </div>
              );
            })}

            {/* Insight Box at Bottom of Skill Demand Card */}
            <div className="mt-4 rounded-xl border border-emerald-200/80 bg-[#ECFDF5]/70 p-3.5">
              <div className="flex items-start gap-2.5">
                <TrendingUp className="h-4 w-4 shrink-0 text-emerald-700 mt-0.5" />
                <div className="text-xs leading-relaxed text-emerald-950">
                  <span className="font-bold">Perspective Plan Alignment: </span>
                  Demand for{" "}
                  <span className="font-semibold">
                    Electrician (320)
                  </span>{" "}
                  and{" "}
                  <span className="font-semibold">Solar Technician (130)</span>{" "}
                  exceeds annual district targets by{" "}
                  <span className="font-bold">+18%</span> in Nagpur & Vidarbha.
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* "यह कैसे काम करता है? / How the Jeevika Saathi AI Flow Works" — Directly styled after Image 1's 4-step pastel strip */}
      <div className="rounded-2xl border border-emerald-200/60 bg-gradient-to-r from-[#EBF8FF] via-[#F2FBF7] to-[#FEF9EC] p-5 shadow-soft">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <div>
            <h3 className="text-base font-extrabold text-[#0F2547]">
              {language === "hi"
                ? "यह कैसे काम करता है? — एआई आजीविका मैपिंग पाइपलाइन"
                : "How Jeevika Saathi Works — End-to-End Beneficiary to Referral Pipeline"}
            </h3>
            <p className="text-xs text-slate-600">
              {language === "hi"
                ? "आवाज़ साक्षात्कार से लेकर जिला कौशल एजेंसी नामांकन तक का 4-चरणीय प्रवाह"
                : "4-stage voice-first skilling workflow monitored by District Officers & Implementing Agencies"}
            </p>
          </div>
          <Link href="/facilitators">
            <Button variant="secondary" size="sm" className="gap-1.5">
              <Mic className="h-3.5 w-3.5" />
              {language === "hi"
                ? "कियोस्क प्रवाह देखें (2.1-2.5)"
                : "Inspect Voice & Kiosk Flow"}
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          {/* Step 1: Blue */}
          <div className="flex items-start gap-3 rounded-xl bg-white/90 p-3.5 border border-blue-100 shadow-sm">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#0066FF] text-sm font-extrabold text-white">
              1
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-xs font-extrabold text-[#0F2547]">
                <Mic className="h-3.5 w-3.5 text-[#0066FF]" />
                {language === "hi"
                  ? "अपनी जानकारी आवाज़ में बताएं"
                  : "Voice Livelihood Intake"}
              </div>
              <p className="mt-1 text-[11px] text-slate-600">
                Beneficiary speaks in Hindi/Marathi via Web, Kiosk, WhatsApp, or IVR.
              </p>
              <div className="mt-2 text-[11px] font-bold text-[#0066FF]">
                1,248 Profiles Captured
              </div>
            </div>
          </div>

          {/* Step 2: Purple */}
          <div className="flex items-start gap-3 rounded-xl bg-white/90 p-3.5 border border-purple-100 shadow-sm">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#7C3AED] text-sm font-extrabold text-white">
              2
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-xs font-extrabold text-[#0F2547]">
                <ClipboardCheck className="h-3.5 w-3.5 text-[#7C3AED]" />
                {language === "hi"
                  ? "हम आपकी जानकारी समझते हैं"
                  : "AI Profile & Skill Extraction"}
              </div>
              <p className="mt-1 text-[11px] text-slate-600">
                Rule-based state machine + LLM extracts education, work, interest & mobility.
              </p>
              <div className="mt-2 text-[11px] font-bold text-[#7C3AED]">
                96.8% Extraction Accuracy
              </div>
            </div>
          </div>

          {/* Step 3: Amber */}
          <div className="flex items-start gap-3 rounded-xl bg-white/90 p-3.5 border border-amber-100 shadow-sm">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#F59E0B] text-sm font-extrabold text-white">
              3
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-xs font-extrabold text-[#0F2547]">
                <Lightbulb className="h-3.5 w-3.5 text-[#D97706]" />
                {language === "hi"
                  ? "सही कोर्स और रोज़गार विकल्प"
                  : "Top 3 NSQF Recommendations"}
              </div>
              <p className="mt-1 text-[11px] text-slate-600">
                Matched against official NQR qualifications & nearby PM-AJAY GIA centres.
              </p>
              <div className="mt-2 text-[11px] font-bold text-[#D97706]">
                892 Referrals Generated
              </div>
            </div>
          </div>

          {/* Step 4: Emerald */}
          <div className="flex items-start gap-3 rounded-xl bg-white/90 p-3.5 border border-emerald-100 shadow-sm">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#10B981] text-sm font-extrabold text-white">
              4
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-xs font-extrabold text-[#0F2547]">
                <Signpost className="h-3.5 w-3.5 text-emerald-600" />
                {language === "hi"
                  ? "आगे की कार्यवाही एवं नामांकन"
                  : "District Referral & Placement"}
              </div>
              <p className="mt-1 text-[11px] text-slate-600">
                Sent with consent to District Skill Agency for enrolment & livelihood linkage.
              </p>
              <div className="mt-2 text-[11px] font-bold text-emerald-700">
                436 Enrolled • 312 Completed
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3.3 Recent Beneficiary Records Table Preview */}
      <Card>
        <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-4 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <CardTitle>
                {language === "hi"
                  ? "हालिया लाभार्थी रिकॉर्ड (Recent Beneficiary Records)"
                  : "Recent Beneficiary Records"}
              </CardTitle>
              <Badge variant="default" className="text-[10px]">
                3.3 Beneficiary List
              </Badge>
            </div>
            <CardDescription>
              {selectedDistrict === "All Districts"
                ? "Showing latest voice-mapped beneficiary profiles across Maharashtra"
                : `Filtered by District: ${selectedDistrict}`}
            </CardDescription>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/beneficiaries">
              <Button variant="outline" size="sm" className="gap-1.5">
                <Filter className="h-3.5 w-3.5" />
                Full Search & Filter
              </Button>
            </Link>
            <Link href="/referrals">
              <Button size="sm" className="gap-1.5">
                Inspect REF-2026-00124
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Profile ID</TableHead>
                <TableHead>Beneficiary</TableHead>
                <TableHead>District</TableHead>
                <TableHead>Education & Work</TableHead>
                <TableHead>Interest (NSQF Trade)</TableHead>
                <TableHead>Channel</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBeneficiaries.slice(0, 5).map((b) => (
                <TableRow key={b.id}>
                  <TableCell className="font-bold text-[#0F2547]">
                    <div>{b.shortId}</div>
                    <div className="text-[11px] font-normal text-slate-400">
                      {b.referral.referralId}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-semibold text-slate-900">
                      {language === "hi" ? b.nameHi : b.name}
                    </div>
                    <div className="text-xs text-slate-500">
                      Age {b.age} • {b.mobility}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{b.district}</TableCell>
                  <TableCell>
                    <div className="text-xs font-semibold text-slate-700">
                      {b.education}
                    </div>
                    <div className="text-[11px] text-slate-500">
                      {b.currentWork}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-semibold text-[#0066FF]">
                      {b.interest}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-700">
                      {b.channel}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge variant={statusBadgeVariant(b.status) as any}>
                      {b.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Link href={`/referrals?id=${b.id}`}>
                      <Button variant="ghost" size="sm" className="text-[#0066FF] hover:text-[#0052CC] gap-1 font-bold">
                        <Eye className="h-3.5 w-3.5" />
                        View
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
