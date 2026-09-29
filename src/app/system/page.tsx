"use client";

import React from "react";
import {
  Cpu,
  Database,
  Server,
  Mic,
  CheckCircle2,
  ShieldCheck,
  Cloud,
  Layers,
  Activity,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const STACK_LAYERS = [
  {
    number: "1",
    title: "User Channels (Frontend — Next.js + TypeScript + Tailwind)",
    color: "border-blue-200 bg-blue-50/40",
    badge: "99.9% Uptime",
    items: [
      "Web / Mobile App (Beneficiary): Voice or text input, Simple UI, Local language support (Hindi P0)",
      "Facilitator / Kiosk Mode: Used by field workers at skill centres / panchayat, large buttons & audio prompts",
      "WhatsApp (Voice/Text - P1): Voice notes, automated chatbot, multilingual",
      "IVR (Phone Call - P1): Toll-free number, voice-based interaction, DTMF fallback",
    ],
  },
  {
    number: "2",
    title: "Backend Services (FastAPI - Python)",
    color: "border-rose-200 bg-rose-50/30",
    badge: "142ms Avg Latency",
    items: [
      "API Gateway (FastAPI): REST APIs, Authentication, Rate limiting, Request routing",
      "Speech Processing (Speech ↔ Text): ASR (Sarvam / Bhashini), Whisper (fallback), TTS (Sarvam Bulbul)",
      "Conversation Engine (Rule-Based State Machine): Welcome & consent, Ask profile questions, Handle clarifications",
      "Skill Processing & Recommendation Engine: Skill normalisation, Eligibility & validity filters, Transparent Top-3 ranking",
      "Output & Workflow: Top 3 recommendations, Course details, Local opportunities, Referral generation",
    ],
  },
  {
    number: "3",
    title: "AI / External Services (Primary + Fallback)",
    color: "border-amber-200 bg-amber-50/40",
    badge: "Sarvam + Whisper Ready",
    items: [
      "Sarvam AI: Saaras (ASR) & Bulbul (TTS) for Indian languages (Hindi, Marathi, etc.)",
      "OpenAI Whisper (Fallback): Open-source ASR used automatically if primary fails",
      "LLM (Chat Model): Structured extraction, Skill classification, Simple Hindi explanations",
      "Other APIs (P1): Twilio (WhatsApp), Exotel (IVR), Google Maps (Training Centre Locations)",
    ],
  },
  {
    number: "4",
    title: "Data Layer (PostgreSQL via Supabase)",
    color: "border-emerald-200 bg-emerald-50/40",
    badge: "RLS & Consent Audited",
    items: [
      "PostgreSQL (Supabase): Users & roles, Beneficiary profiles, Recommendations, Referrals, Consent records, Facilitator logs",
      "File Storage (Supabase Storage): Audio files (voice notes), Generated documents, Course brochures, Referral letters",
      "Skill & Qualification DB: NQR qualifications, Skill taxonomy, Training centres, Employment data",
      "Analytics Data Store: Usage metrics, District-wise demand, Skills gap analytics, Referral outcomes",
    ],
  },
  {
    number: "5",
    title: "External Data Sources (Official & Verified)",
    color: "border-sky-200 bg-sky-50/40",
    badge: "Daily Sync",
    items: [
      "NQR (National Qualification Register): NSQF-aligned qualifications, Eligibility criteria, Validity dates, NOS modules",
      "PM-AJAY (GIA Component): Approved programmes, Implementing agencies, Scheme guidelines, State/district info",
      "Training Centres (State/Partner): Centre locations, Course schedules, Contact details",
      "Employment Opportunities: NCS (National Career Service), State job portals, Local SME & Self-employment data",
    ],
  },
  {
    number: "6 & 7",
    title: "Admin & Stakeholder Dashboard + Deployment Infrastructure",
    color: "border-purple-200 bg-purple-50/40",
    badge: "Vercel • Render • Docker • Supabase",
    items: [
      "District Officer View: Beneficiary registrations, Skill demand analytics, Compare with Perspective Plans, Export reports",
      "Implementing Agency View: Received referrals, Beneficiary details (with consent), Enrolment & completion status",
      "System Admin View: User management, Data management, Content updates, Model performance metrics",
    ],
  },
];

export default function SystemStackPage() {
  return (
    <div className="space-y-6">
      {/* Telemetry KPI Strip */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-xs font-bold text-slate-500">
              Sarvam Saaras ASR + Bulbul TTS
            </div>
            <div className="mt-1 text-2xl font-extrabold text-[#0066FF]">
              98.7% WER Pass
            </div>
            <div className="mt-1 text-xs text-emerald-700 font-semibold">
              ✓ Hindi & Marathi Voice Models Online
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="text-xs font-bold text-slate-500">
              Whisper Fallback Invocations
            </div>
            <div className="mt-1 text-2xl font-extrabold text-[#0F2547]">
              1.3% Traffic
            </div>
            <div className="mt-1 text-xs text-slate-500 font-semibold">
              Zero dropped voice interviews
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="text-xs font-bold text-slate-500">
              Supabase PostgreSQL & Storage
            </div>
            <div className="mt-1 text-2xl font-extrabold text-emerald-700">
              Healthy
            </div>
            <div className="mt-1 text-xs text-slate-500 font-semibold">
              1,248 Profiles • 892 Consent Logs
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="text-xs font-bold text-slate-500">
              NQR & PM-AJAY GIA Sync
            </div>
            <div className="mt-1 text-2xl font-extrabold text-[#6D28D9]">
              100% Valid
            </div>
            <div className="mt-1 text-xs text-slate-500 font-semibold">
              Expired NSQF courses auto-filtered
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Complete 7-Layer System Stack matching Image 5 */}
      <div className="space-y-4">
        {STACK_LAYERS.map((layer) => (
          <Card key={layer.number} className={layer.color}>
            <CardHeader className="pb-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#0F2547] text-xs font-extrabold text-white">
                    {layer.number}
                  </span>
                  <CardTitle className="text-base">{layer.title}</CardTitle>
                </div>
                <Badge variant="enrolled">{layer.badge}</Badge>
              </div>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-2.5 md:grid-cols-2 pt-2">
              {layer.items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2 rounded-xl border border-slate-200/80 bg-white/90 p-3 text-xs text-slate-700"
                >
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-[#0066FF] mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
