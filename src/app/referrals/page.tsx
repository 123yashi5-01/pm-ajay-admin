"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  CheckCircle2,
  MapPin,
  Clock,
  GraduationCap,
  ShieldCheck,
  Printer,
  Send,
  Sparkles,
  FileCheck2,
  User,
  Award,
  Phone,
  Building2,
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
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { usePortal } from "@/context/portal-context";
import { BeneficiaryStatus } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

function ReferralDetailsContent() {
  const searchParams = useSearchParams();
  const requestedId = searchParams.get("id");
  const { beneficiaries, updateBeneficiaryStatus, language } = usePortal();

  const [selectedId, setSelectedId] = useState<string>(
    requestedId && beneficiaries.some((b) => b.id === requestedId)
      ? requestedId
      : "PMAJAY-2026-00124"
  );
  const [remarksText, setRemarksText] = useState<string>("");
  const [savedToast, setSavedToast] = useState<string | null>(null);

  const activeRecord =
    beneficiaries.find((b) => b.id === selectedId) ?? beneficiaries[0];

  const handleStatusChange = (newStatus: BeneficiaryStatus) => {
    updateBeneficiaryStatus(
      activeRecord.id,
      newStatus,
      remarksText.trim() ? remarksText : activeRecord.referral.remarks
    );
    setSavedToast(`Referral ${activeRecord.referral.referralId} updated to ${newStatus}`);
    setTimeout(() => setSavedToast(null), 3500);
  };

  return (
    <div className="space-y-6">
      {/* Top Referral Selector Strip */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-blue-200/80 bg-white p-4 shadow-soft">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Select Beneficiary Profile:
          </span>
          <div className="flex flex-wrap gap-2">
            {beneficiaries.slice(0, 5).map((b) => (
              <button
                key={b.id}
                onClick={() => {
                  setSelectedId(b.id);
                  setRemarksText(b.referral.remarks);
                }}
                className={cn(
                  "rounded-xl border px-3 py-1.5 text-xs font-bold transition-all",
                  activeRecord.id === b.id
                    ? "border-[#0066FF] bg-[#0066FF] text-white shadow-sm"
                    : "border-slate-200 bg-slate-50 text-slate-700 hover:border-blue-300"
                )}
              >
                {b.shortId} • {b.district}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.print()}
            className="gap-1.5"
          >
            <Printer className="h-3.5 w-3.5" />
            Print / Download Slip (2.5)
          </Button>
        </div>
      </div>

      {savedToast && (
        <div className="flex items-center gap-2 rounded-xl border border-emerald-300 bg-emerald-50 px-4 py-3 text-xs font-bold text-emerald-800 shadow-sm">
          <CheckCircle2 className="h-4 w-4 text-emerald-600" />
          {savedToast}
        </div>
      )}

      {/* Main 3.4 Referral Details Card — Exact match to Image 4 Section 3.4 */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <Card className="lg:col-span-8 border-blue-200/90">
          <CardHeader className="border-b border-slate-100 bg-gradient-to-r from-[#F8FBFF] to-white">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <Badge variant="purple">3.4 Referral Details</Badge>
                  <Badge variant="enrolled">
                    {activeRecord.referral.contactShared}
                  </Badge>
                </div>
                <CardTitle className="mt-2 text-xl font-extrabold text-[#0F2547]">
                  Profile ID: {activeRecord.id}
                </CardTitle>
                <CardDescription className="text-xs font-medium text-slate-600">
                  Beneficiary:{" "}
                  <span className="font-bold text-slate-900">
                    {language === "hi"
                      ? activeRecord.nameHi
                      : activeRecord.name}
                  </span>{" "}
                  ({activeRecord.age} yrs, {activeRecord.district},{" "}
                  {activeRecord.state})
                </CardDescription>
              </div>

              <div className="text-right">
                <div className="text-xs font-semibold text-slate-400">
                  Current Agency Status
                </div>
                <div className="mt-1 inline-flex items-center gap-1.5 rounded-xl bg-blue-50 px-3 py-1.5 text-xs font-extrabold text-[#0066FF] border border-blue-200">
                  <Send className="h-3.5 w-3.5" />
                  {activeRecord.referral.agencyStatus}
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-6">
            {/* Exact 4 Tabs from 3.4: Profile | Recommendation | Referral | Timeline */}
            <Tabs defaultValue="referral" className="w-full">
              <TabsList className="grid w-full grid-cols-4 h-11">
                <TabsTrigger value="profile">Profile (1.4)</TabsTrigger>
                <TabsTrigger value="recommendation">
                  Recommendation (1.5)
                </TabsTrigger>
                <TabsTrigger value="referral">Referral (3.4)</TabsTrigger>
                <TabsTrigger value="timeline">Timeline</TabsTrigger>
              </TabsList>

              {/* TAB 3 (Default Active as in 3.4): Referral */}
              <TabsContent value="referral" className="mt-5 space-y-5">
                <div className="rounded-2xl border border-slate-200/90 bg-slate-50/50 p-5">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="rounded-xl bg-white p-4 border border-slate-200/70">
                      <div className="text-xs font-semibold text-slate-400">
                        Referral ID
                      </div>
                      <div className="mt-1 text-base font-extrabold text-[#0F2547]">
                        {activeRecord.referral.referralId}
                      </div>
                    </div>

                    <div className="rounded-xl bg-white p-4 border border-slate-200/70">
                      <div className="text-xs font-semibold text-slate-400">
                        Generated On
                      </div>
                      <div className="mt-1 text-base font-extrabold text-[#0F2547]">
                        {activeRecord.referral.generatedOn}
                      </div>
                    </div>

                    <div className="rounded-xl bg-white p-4 border border-slate-200/70">
                      <div className="text-xs font-semibold text-slate-400">
                        Shared To (Implementing Agency)
                      </div>
                      <div className="mt-1 text-sm font-extrabold text-[#0066FF] flex items-center gap-1.5">
                        <Building2 className="h-4 w-4" />
                        {activeRecord.referral.sharedTo}
                      </div>
                    </div>

                    <div className="rounded-xl bg-white p-4 border border-slate-200/70">
                      <div className="text-xs font-semibold text-slate-400">
                        Contact Shared
                      </div>
                      <div className="mt-1">
                        <span className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-100/90 px-3 py-1 text-xs font-extrabold text-emerald-800 border border-emerald-300">
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                          {activeRecord.referral.contactShared}
                        </span>
                      </div>
                    </div>

                    <div className="rounded-xl bg-white p-4 border border-slate-200/70">
                      <div className="text-xs font-semibold text-slate-400">
                        Status
                      </div>
                      <div className="mt-1 text-sm font-extrabold text-[#0F2547]">
                        {activeRecord.referral.agencyStatus} (
                        {activeRecord.status})
                      </div>
                    </div>

                    <div className="rounded-xl bg-white p-4 border border-slate-200/70">
                      <div className="text-xs font-semibold text-slate-400">
                        Remarks
                      </div>
                      <div className="mt-1 text-sm font-semibold text-slate-700">
                        {activeRecord.referral.remarks}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Next Steps Checklist from 1.7 ("Aage kya karein?") */}
                <div className="rounded-2xl border border-blue-100 bg-gradient-to-r from-[#EBF4FF]/70 to-[#ECFDF5]/70 p-4">
                  <div className="text-xs font-extrabold uppercase tracking-wider text-[#0F2547] mb-3">
                    1.7 Beneficiary & Agency Next Steps (आगे क्या करें?)
                  </div>
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-5">
                    {[
                      "1. Referral generate karein",
                      "2. Training centre se sampark",
                      "3. Panjikaran (by agency)",
                      "4. Training shuru karein",
                      "5. Rozgar / Swayam-rozgar",
                    ].map((step, idx) => (
                      <div
                        key={step}
                        className={cn(
                          "rounded-xl border p-2.5 text-xs font-semibold",
                          idx < 2
                            ? "border-emerald-200 bg-white text-emerald-800"
                            : idx === 2
                            ? "border-[#0066FF] bg-blue-50 text-[#0066FF]"
                            : "border-slate-200 bg-white/80 text-slate-500"
                        )}
                      >
                        {step}
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              {/* TAB 1: Profile (Matches 1.4 & 2.4 Profile Summary) */}
              <TabsContent value="profile" className="mt-5 space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="rounded-xl border border-slate-200 p-4">
                    <div className="text-xs text-slate-400 font-semibold">
                      🎓 Shiksha (Education)
                    </div>
                    <div className="mt-1 text-base font-bold text-[#0F2547]">
                      {activeRecord.educationHi}
                    </div>
                  </div>
                  <div className="rounded-xl border border-slate-200 p-4">
                    <div className="text-xs text-slate-400 font-semibold">
                      💼 Vartamaan Kaam (Current Occupation)
                    </div>
                    <div className="mt-1 text-base font-bold text-[#0F2547]">
                      {activeRecord.currentWorkHi}
                    </div>
                  </div>
                  <div className="rounded-xl border border-slate-200 p-4">
                    <div className="text-xs text-slate-400 font-semibold">
                      ⚙️ Ruchi (Skill Interest)
                    </div>
                    <div className="mt-1 text-base font-bold text-[#0066FF]">
                      {activeRecord.interestHi}
                    </div>
                  </div>
                  <div className="rounded-xl border border-slate-200 p-4">
                    <div className="text-xs text-slate-400 font-semibold">
                      📍 Sthan & Yatra (Location & Mobility)
                    </div>
                    <div className="mt-1 text-base font-bold text-[#0F2547]">
                      {activeRecord.district}, {activeRecord.state} (
                      {activeRecord.mobility})
                    </div>
                  </div>
                  <div className="rounded-xl border border-slate-200 p-4">
                    <div className="text-xs text-slate-400 font-semibold">
                      🎯 Prathmikta (Livelihood Preference)
                    </div>
                    <div className="mt-1 text-base font-bold text-emerald-700">
                      {activeRecord.preferenceHi}
                    </div>
                  </div>
                  <div className="rounded-xl border border-slate-200 p-4">
                    <div className="text-xs text-slate-400 font-semibold">
                      🎙️ Voice Consent & Channel
                    </div>
                    <div className="mt-1 text-sm font-bold text-[#0F2547]">
                      {activeRecord.channel} • {activeRecord.consentTimestamp}
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* TAB 2: Recommendation (Matches 1.5 Top 3 Recommendations & 1.6 Course Details) */}
              <TabsContent value="recommendation" className="mt-5 space-y-4">
                {activeRecord.recommendations.length > 0 ? (
                  activeRecord.recommendations.map((rec, index) => (
                    <div
                      key={rec.id}
                      className="rounded-2xl border border-blue-200/80 bg-white p-4 shadow-sm"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0066FF] text-sm font-extrabold text-white">
                            {index + 1}
                          </div>
                          <div>
                            <div className="text-base font-extrabold text-[#0F2547]">
                              {rec.title}
                            </div>
                            <div className="text-xs font-medium text-slate-500">
                              {rec.titleHi} • NQR Code: {rec.nqrCode}
                            </div>
                          </div>
                        </div>
                        <Badge
                          variant={
                            rec.matchTag === "High Match"
                              ? "enrolled"
                              : "default"
                          }
                        >
                          {rec.matchTag}
                        </Badge>
                      </div>

                      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4 rounded-xl bg-slate-50 p-3 text-xs">
                        <div>
                          <span className="text-slate-400 block">Duration</span>
                          <span className="font-bold text-slate-800">
                            {rec.duration}
                          </span>
                        </div>
                        <div>
                          <span className="text-slate-400 block">
                            Eligibility
                          </span>
                          <span className="font-bold text-slate-800">
                            {rec.eligibility}
                          </span>
                        </div>
                        <div>
                          <span className="text-slate-400 block">Location</span>
                          <span className="font-bold text-slate-800">
                            {rec.distance}
                          </span>
                        </div>
                        <div>
                          <span className="text-slate-400 block">Mode</span>
                          <span className="font-bold text-slate-800">
                            {rec.mode}
                          </span>
                        </div>
                      </div>

                      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs">
                        <span className="font-semibold text-slate-600">
                          Training Centre:{" "}
                          <strong className="text-[#0F2547]">
                            {rec.centreName}
                          </strong>
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {rec.benefits.map((b) => (
                            <span
                              key={b}
                              className="rounded-md bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700 border border-emerald-200"
                            >
                              ✓ {b}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="rounded-xl border border-slate-200 p-6 text-center text-sm text-slate-500">
                    NSQF Level 3/4 course recommendations linked to{" "}
                    {activeRecord.interest}.
                  </div>
                )}
              </TabsContent>

              {/* TAB 4: Timeline */}
              <TabsContent value="timeline" className="mt-5 space-y-3">
                {(activeRecord.timeline.length > 0
                  ? activeRecord.timeline
                  : [
                      {
                        step: "1.1 - 1.4",
                        title: "Voice Profile & Consent Captured",
                        date: activeRecord.consentTimestamp,
                        actor: activeRecord.channel,
                        status: "done",
                        note: `Verified ${activeRecord.interest} trade preference.`,
                      },
                      {
                        step: "3.4",
                        title: `Referral ${activeRecord.referral.referralId} Active`,
                        date: activeRecord.referral.generatedOn,
                        actor: activeRecord.referral.sharedTo,
                        status: "current",
                        note: activeRecord.referral.remarks,
                      },
                    ]
                ).map((ev, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3.5 rounded-xl border border-slate-200/80 bg-white p-4"
                  >
                    <div
                      className={cn(
                        "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-extrabold",
                        ev.status === "done"
                          ? "bg-emerald-100 text-emerald-700"
                          : ev.status === "current"
                          ? "bg-[#0066FF] text-white"
                          : "bg-slate-100 text-slate-500"
                      )}
                    >
                      {i + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="text-sm font-bold text-[#0F2547]">
                          {ev.title}
                        </span>
                        <span className="text-xs font-semibold text-slate-400">
                          {ev.date}
                        </span>
                      </div>
                      <div className="text-xs font-semibold text-[#0066FF] mt-0.5">
                        {ev.actor} • Flow {ev.step}
                      </div>
                      <p className="mt-1 text-xs text-slate-600">{ev.note}</p>
                    </div>
                  </div>
                ))}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Right 4 Cols: Officer & Agency Action Panel (2.5 & 3.4 Actions) */}
        <Card className="lg:col-span-4 border-emerald-200/90 bg-gradient-to-b from-white to-[#F2FBF7]">
          <CardHeader>
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-emerald-600" />
              <CardTitle>District / Agency Action</CardTitle>
            </div>
            <CardDescription>
              Update enrolment status or dispatch referral via WhatsApp/SMS with consent
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="rounded-xl border border-emerald-200 bg-white p-4">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-800">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                Consent Audit Verified
              </div>
              <p className="mt-1 text-xs text-slate-600">
                Beneficiary granted voice & digital consent on{" "}
                <strong>{activeRecord.consentTimestamp}</strong> to share
                phone (<strong>{activeRecord.phone}</strong>) with{" "}
                <strong>{activeRecord.referral.sharedTo}</strong>.
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-[#0F2547]">
                Officer / Agency Remarks:
              </label>
              <textarea
                rows={3}
                value={remarksText || activeRecord.referral.remarks}
                onChange={(e) => setRemarksText(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white p-3 text-xs text-slate-800 focus:border-[#0066FF] focus:outline-none"
              />
            </div>

            <div className="space-y-2">
              <div className="text-xs font-bold text-[#0F2547]">
                Set Workflow Status:
              </div>
              <div className="grid grid-cols-2 gap-2">
                {(
                  [
                    "Referred",
                    "Enrolled",
                    "Completed",
                    "Pending",
                  ] as BeneficiaryStatus[]
                ).map((st) => (
                  <Button
                    key={st}
                    variant={activeRecord.status === st ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleStatusChange(st)}
                    className="justify-center"
                  >
                    Mark {st}
                  </Button>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-slate-200/70 space-y-2">
              <Button
                variant="success"
                className="w-full gap-2"
                onClick={() =>
                  handleStatusChange(
                    activeRecord.status === "Referred"
                      ? "Enrolled"
                      : activeRecord.status
                  )
                }
              >
                <Send className="h-4 w-4" />
                Send to District Agency (2.5)
              </Button>
              <Button
                variant="outline"
                className="w-full gap-2"
                onClick={() =>
                  setSavedToast(
                    `Course & Referral details sent to ${activeRecord.phone} on WhatsApp`
                  )
                }
              >
                <Phone className="h-4 w-4 text-emerald-600" />
                WhatsApp par bhejein (1.7)
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function ReferralDetailsPage() {
  return (
    <Suspense
      fallback={
        <div className="p-8 text-sm font-semibold text-slate-500">
          Loading Referral Details...
        </div>
      }
    >
      <ReferralDetailsContent />
    </Suspense>
  );
}
