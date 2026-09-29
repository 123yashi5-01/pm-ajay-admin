"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Mic,
  Volume2,
  Check,
  UserPlus,
  Search,
  CheckCircle2,
  Send,
  Printer,
  PhoneCall,
  MessageSquare,
  ArrowRight,
  ArrowLeft,
  Clock,
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
import { cn } from "@/lib/utils";

const Q3_INTEREST_OPTIONS = [
  { id: "electrical", titleHi: "बिजली का काम", titleEn: "Electrical Work", emoji: "⚡" },
  { id: "carpentry", titleHi: "बढ़ईगिरी (लकड़ी का काम)", titleEn: "Carpentry", emoji: "🪚" },
  { id: "mechanic", titleHi: "मशीन / वाहन मरम्मत", titleEn: "Machine / Vehicle Repair", emoji: "🔧" },
  { id: "tailoring", titleHi: "सिलाई / फैशन", titleEn: "Tailoring / Fashion", emoji: "🧵" },
  { id: "computer", titleHi: "कंप्यूटर / डिजिटल काम", titleEn: "Computer / Digital", emoji: "💻" },
  { id: "farming", titleHi: "खेती और पशुपालन", titleEn: "Farming & Dairy", emoji: "🌾" },
  { id: "cooking", titleHi: "खाना बनाना", titleEn: "Cooking & Food", emoji: "👨‍🍳" },
  { id: "construction", titleHi: "निर्माण कार्य", titleEn: "Construction", emoji: "🧱" },
  { id: "beauty", titleHi: "ब्यूटी और व्यक्तिगत देखभाल", titleEn: "Beauty & Wellness", emoji: "💇‍♀️" },
  { id: "other", titleHi: "अन्य", titleEn: "Other", emoji: "•••" },
];

const Q5_WORK_OPTIONS = [
  { id: "studying", titleHi: "पढ़ाई कर रहा हूँ", titleEn: "Studying", emoji: "🎒" },
  { id: "working", titleHi: "कहीं काम कर रहा हूँ", titleEn: "Currently Working", emoji: "💼" },
  { id: "looking", titleHi: "काम की तलाश में हूँ", titleEn: "Looking for Work", emoji: "📄" },
  { id: "homemaker", titleHi: "गृहिणी हूँ", titleEn: "Homemaker", emoji: "🏠" },
  { id: "farmer", titleHi: "खेती करता हूँ", titleEn: "Farming", emoji: "🌱" },
  { id: "business", titleHi: "अपना छोटा व्यवसाय है", titleEn: "Small Business", emoji: "🏪" },
  { id: "other_work", titleHi: "अन्य", titleEn: "Other", emoji: "❓" },
];

export default function FacilitatorsAndKioskFlowPage() {
  const [questionStep, setQuestionStep] = useState<"q3" | "q5">("q3");
  const [selectedInterests, setSelectedInterests] = useState<string[]>([
    "electrical",
  ]);
  const [selectedWork, setSelectedWork] = useState<string>("studying");
  const [voiceActive, setVoiceActive] = useState<boolean>(false);

  const toggleInterest = (id: string) => {
    setSelectedInterests((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-6">
      {/* Omnichannel Intake Metrics (Section 1 & Section 2 of Image 4 & Image 5) */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <Card className="border-blue-200/80">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-slate-500">
                1.1 Web / Mobile Voice
              </div>
              <div className="mt-1 text-2xl font-extrabold text-[#0F2547]">
                614
              </div>
              <div className="text-[11px] font-semibold text-[#0066FF]">
                Hindi & Marathi Voice UI
              </div>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#EBF4FF] text-[#0066FF]">
              <Mic className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-emerald-200/80">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-slate-500">
                2.1 Facilitator / Kiosk Mode
              </div>
              <div className="mt-1 text-2xl font-extrabold text-[#0F2547]">
                382
              </div>
              <div className="text-[11px] font-semibold text-emerald-700">
                42 Field Workers Active
              </div>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
              <UserPlus className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-teal-200/80">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-slate-500">
                WhatsApp Voice Flow (P1)
              </div>
              <div className="mt-1 text-2xl font-extrabold text-[#0F2547]">
                164
              </div>
              <div className="text-[11px] font-semibold text-teal-700">
                Voice Notes & Audio Links
              </div>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-teal-50 text-teal-600">
              <MessageSquare className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-amber-200/80">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-slate-500">
                Toll-Free IVR Call (P1)
              </div>
              <div className="mt-1 text-2xl font-extrabold text-[#0F2547]">
                88
              </div>
              <div className="text-[11px] font-semibold text-amber-700">
                Voice + SMS Recommendations
              </div>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
              <PhoneCall className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Interactive Preview of Images 2 & 3 (Jeevika Saathi 4-Step Progress + Question 3/8 & Question 5/8) */}
      <Card className="border-blue-200/90 overflow-hidden bg-gradient-to-b from-[#F4F9FF] via-white to-[#EEFBF3]">
        <CardHeader className="border-b border-blue-100 bg-white/90">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <Badge variant="default">
                Interactive Beneficiary & Kiosk Questionnaire Preview (Images 2 & 3)
              </Badge>
              <CardTitle className="mt-1.5 text-lg">
                Jeevika Saathi — Interactive Voice & Visual Questionnaire
              </CardTitle>
              <CardDescription>
                Switch between Question 3/8 (Skill Interest) and Question 5/8 (Current Occupation) exactly as designed in your UI screens
              </CardDescription>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant={questionStep === "q3" ? "default" : "outline"}
                size="sm"
                onClick={() => setQuestionStep("q3")}
              >
                प्रश्न 3 / 8 (Skill Interest)
              </Button>
              <Button
                variant={questionStep === "q5" ? "default" : "outline"}
                size="sm"
                onClick={() => setQuestionStep("q5")}
              >
                प्रश्न 5 / 8 (Current Work)
              </Button>
            </div>
          </div>

          {/* Exact 4-Step Stepper from Top of Images 2 & 3 */}
          <div className="mx-auto mt-5 flex max-w-2xl items-center justify-between pt-2">
            {[
              { step: 1, label: "भाषा चुनी", done: true },
              { step: 2, label: "अपनी जानकारी दें", done: true },
              { step: 3, label: "सुझाव देखें", active: true },
              { step: 4, label: "आगे की कार्रवाई", done: false },
            ].map((s, idx) => (
              <React.Fragment key={s.step}>
                <div className="flex flex-col items-center gap-1">
                  <div
                    className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-full text-xs font-extrabold",
                      s.done
                        ? "bg-[#10B981] text-white"
                        : s.active
                        ? "bg-[#0066FF] text-white ring-4 ring-blue-100"
                        : "bg-slate-200 text-slate-600"
                    )}
                  >
                    {s.done ? <Check className="h-4 w-4" /> : s.step}
                  </div>
                  <span
                    className={cn(
                      "text-xs font-bold",
                      s.active ? "text-[#0F2547]" : "text-slate-600"
                    )}
                  >
                    {s.label}
                  </span>
                </div>
                {idx < 3 && (
                  <div
                    className={cn(
                      "h-1 flex-1 mx-2 rounded-full -mt-5",
                      idx === 0
                        ? "bg-[#10B981]"
                        : idx === 1
                        ? "bg-[#0066FF]"
                        : "bg-slate-200"
                    )}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </CardHeader>

        <CardContent className="p-6 space-y-6">
          {/* Didi Avatar + Speech Bubble + Speaker Button (Exact match to Images 2 & 3) */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-amber-100 to-blue-100 border-2 border-white shadow-md text-3xl">
              👩🏽‍🏫
            </div>
            <div className="flex flex-1 items-center justify-between gap-4 rounded-2xl bg-[#E8F2FF] px-5 py-4 border border-blue-200/70 max-w-xl">
              <div>
                <h3 className="text-xl font-extrabold text-[#0F2547]">
                  {questionStep === "q3"
                    ? "आप किस काम में अधिक रुचि रखते हैं?"
                    : "आप इस समय क्या कर रहे हैं?"}
                </h3>
                <p className="mt-0.5 text-xs font-semibold text-slate-600">
                  {questionStep === "q3"
                    ? "एक या एक से अधिक विकल्प चुन सकते हैं।"
                    : "एक विकल्प चुनें या बोलकर बताएं।"}
                </p>
              </div>
              <button
                onClick={() => setVoiceActive(!voiceActive)}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#CCE2FF] text-[#0066FF] hover:bg-[#0066FF] hover:text-white transition-colors"
                title="Play Sarvam Bulbul TTS Voice Prompt"
              >
                <Volume2 className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Selectable Grid Cards matching Image 2 (5x2 grid) and Image 3 (4+3 grid) */}
          {questionStep === "q3" ? (
            <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 lg:grid-cols-5">
              {Q3_INTEREST_OPTIONS.map((opt) => {
                const selected = selectedInterests.includes(opt.id);
                return (
                  <button
                    key={opt.id}
                    onClick={() => toggleInterest(opt.id)}
                    className={cn(
                      "relative flex flex-col items-center justify-center rounded-2xl border-2 p-4 text-center transition-all",
                      selected
                        ? "border-[#0066FF] bg-[#EBF4FF]/90 shadow-md"
                        : "border-slate-200/80 bg-white/95 hover:border-blue-300"
                    )}
                  >
                    <div
                      className={cn(
                        "absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full border",
                        selected
                          ? "border-[#0066FF] bg-[#0066FF] text-white"
                          : "border-slate-300 bg-white"
                      )}
                    >
                      {selected && <Check className="h-3 w-3" />}
                    </div>
                    <div className="my-2 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100/90 text-2xl">
                      {opt.emoji}
                    </div>
                    <div className="text-sm font-extrabold text-[#0F2547]">
                      {opt.titleHi}
                    </div>
                    <div className="text-[11px] font-medium text-slate-500">
                      {opt.titleEn}
                    </div>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-4">
              {Q5_WORK_OPTIONS.map((opt) => {
                const selected = selectedWork === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => setSelectedWork(opt.id)}
                    className={cn(
                      "relative flex flex-col items-center justify-center rounded-2xl border-2 p-4 text-center transition-all",
                      selected
                        ? "border-[#0066FF] bg-[#EBF4FF]/90 shadow-md"
                        : "border-slate-200/80 bg-white/95 hover:border-blue-300"
                    )}
                  >
                    <div
                      className={cn(
                        "absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full border",
                        selected
                          ? "border-[#0066FF] bg-[#0066FF] text-white"
                          : "border-slate-300 bg-white"
                      )}
                    >
                      {selected && <Check className="h-3 w-3" />}
                    </div>
                    <div className="my-2 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100/90 text-2xl">
                      {opt.emoji}
                    </div>
                    <div className="text-sm font-extrabold text-[#0F2547]">
                      {opt.titleHi}
                    </div>
                    <div className="text-[11px] font-medium text-slate-500">
                      {opt.titleEn}
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {/* Bottom Questionnaire Footer Bar matching Images 2 & 3 */}
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200/80 bg-white px-4 py-3">
            <Button
              variant="outline"
              onClick={() =>
                setQuestionStep(questionStep === "q5" ? "q3" : "q5")
              }
              className="gap-1.5"
            >
              <ArrowLeft className="h-4 w-4" />
              पिछला (Previous)
            </Button>

            <div className="text-center">
              <div className="text-xs font-bold text-slate-700">
                {questionStep === "q3" ? "प्रश्न 3 / 8" : "प्रश्न 5 / 8"}
              </div>
              <div className="mt-1.5 flex items-center gap-1.5">
                {Array.from({ length: 8 }).map((_, i) => {
                  const activeCount = questionStep === "q3" ? 3 : 5;
                  return (
                    <span
                      key={i}
                      className={cn(
                        "h-1.5 w-6 rounded-full",
                        i < activeCount ? "bg-[#0066FF]" : "bg-slate-200"
                      )}
                    />
                  );
                })}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" className="gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                बाद में बताऊँ
              </Button>
              <Button
                onClick={() =>
                  setQuestionStep(questionStep === "q3" ? "q5" : "q3")
                }
                className="gap-1.5 px-5"
              >
                आगे बढ़ें
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Section 2 Facilitator / Kiosk Flow Steps (2.1 to 2.5 from Image 4) */}
      <Card>
        <CardHeader>
          <Badge variant="enrolled" className="w-fit">
            Section 2: Facilitator / Kiosk Flow (2.1 – 2.5)
          </Badge>
          <CardTitle className="mt-1.5 text-lg">
            Field Worker & Skill Centre Kiosk Workflow
          </CardTitle>
          <CardDescription>
            Standard operating flow for field facilitators conducting assisted voice interviews on behalf of beneficiaries
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-5">
          {[
            {
              code: "2.1 Facilitator Login",
              title: "Centre Operator Auth",
              detail: "Mobile (+91 9876543210) + Password login for verified field workers.",
            },
            {
              code: "2.2 Select Mode",
              title: "Naya vs Existing",
              detail: "'Naya Beneficiary' or 'Pehle se Juda Beneficiary' lookup.",
            },
            {
              code: "2.3 Conduct Interview",
              title: "Voice / Assisted Input",
              detail: "'Aap abhi kya kaam karte hain?' recorded with Stop / Skip controls.",
            },
            {
              code: "2.4 Profile & Courses",
              title: "PMAJAY-2026-00124",
              detail: "Displays Age 22, 12th pass, Farming, Top 3 Courses + 'Generate Referral'.",
            },
            {
              code: "2.5 Submit / Share",
              title: "Referral Generated!",
              detail: "'Send to District Agency' or 'Print / Download' slip with consent.",
            },
          ].map((step) => (
            <div
              key={step.code}
              className="rounded-2xl border border-emerald-200/80 bg-emerald-50/30 p-4 flex flex-col justify-between"
            >
              <div>
                <span className="inline-block rounded-md bg-emerald-100 px-2 py-0.5 text-[10px] font-extrabold text-emerald-800">
                  {step.code}
                </span>
                <h4 className="mt-2 text-sm font-extrabold text-[#0F2547]">
                  {step.title}
                </h4>
                <p className="mt-1 text-xs text-slate-600">{step.detail}</p>
              </div>
              <Link href="/referrals?id=PMAJAY-2026-00124" className="mt-3">
                <span className="text-xs font-bold text-[#0066FF] hover:underline">
                  Inspect Output →
                </span>
              </Link>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
