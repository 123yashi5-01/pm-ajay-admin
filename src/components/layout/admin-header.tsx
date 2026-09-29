"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Globe,
  MapPin,
  Bell,
  Shield,
  ChevronDown,
  Mic,
  CheckCircle2,
  UserCheck,
} from "lucide-react";
import { IndiaEmblemIcon } from "@/components/layout/brand-marks";
import {
  usePortal,
  StakeholderRole,
} from "@/context/portal-context";
import { cn } from "@/lib/utils";

const PAGE_METADATA: Record<
  string,
  { title: string; titleHi: string; subtitle: string; subtitleHi: string; stepBadge: string }
> = {
  "/": {
    title: "Dashboard Overview",
    titleHi: "डैशबोर्ड अवलोकन (Dashboard Overview)",
    subtitle: "Overview of key metrics, district-wise registrations & NSQF skill demand",
    subtitleHi: "प्रमुख संकेतकों, जिलेवार पंजीकरण और कौशल मांग का विवरण",
    stepBadge: "3.2 Dashboard Overview",
  },
  "/beneficiaries": {
    title: "Beneficiary List & Livelihood Profiles",
    titleHi: "लाभार्थी सूची एवं प्रोफाइल (Beneficiary List)",
    subtitle: "View and manage AI voice-mapped beneficiary records across districts",
    subtitleHi: "आवाज़ सहायक द्वारा तैयार लाभार्थी रिकॉर्ड देखें और प्रबंधित करें",
    stepBadge: "3.3 Beneficiary List",
  },
  "/referrals": {
    title: "Referral Details & Agency Tracking",
    titleHi: "रेफरल विवरण एवं ट्रैकिंग (Referral Details)",
    subtitle: "Detailed view of referrals, consent status, recommendations & timeline",
    subtitleHi: "सहमति के साथ जिला कौशल एजेंसी को भेजे गए रेफरल की स्थिति",
    stepBadge: "3.4 Referral Details",
  },
  "/reports": {
    title: "Reports, Perspective Plan & Analytics",
    titleHi: "रिपोर्ट और विश्लेषण (Reports & Analytics)",
    subtitle: "Compare skill demand vs Perspective Plan, track enrolment & export reports",
    subtitleHi: "योजना-वार रिपोर्ट, नामांकन दर और जिला तुलना निर्यात करें",
    stepBadge: "3.5 Reports & Analytics",
  },
  "/courses": {
    title: "NQR Qualifications & PM-AJAY Centres",
    titleHi: "एनक्यूआर योग्यताएं और प्रशिक्षण केंद्र",
    subtitle: "Official National Qualification Register (NSQF Level 3-4) & GIA Partner Centres",
    subtitleHi: "राष्ट्रीय योग्यता रजिस्टर (NSQF) और अनुमोदित प्रशिक्षण केंद्र",
    stepBadge: "Sec 1.6 & 5 Data Layer",
  },
  "/facilitators": {
    title: "Facilitator Kiosk & Omnichannel Flow",
    titleHi: "सुविधाकर्ता कियोस्क और बहु-चैनल प्रवाह",
    subtitle: "Monitor Field Worker Kiosks, WhatsApp Voice Bot & Toll-Free IVR sessions",
    subtitleHi: "फील्ड वर्कर कियोस्क, व्हाट्सएप बॉट और टोल-फ्री आईवीआर निगरानी",
    stepBadge: "2.1 - 2.5 Facilitator Flow",
  },
  "/system": {
    title: "System Stack & AI Model Telemetry",
    titleHi: "सिस्टम स्टैक और एआई मॉडल निगरानी",
    subtitle: "FastAPI Gateway, Sarvam Saaras ASR / Bulbul TTS, Whisper Fallback & Supabase",
    subtitleHi: "सरवम एआई, व्हिस्पर फॉलबैक और सुपाबेस डेटा लेयर की स्थिति",
    stepBadge: "Sec 6 System Admin View",
  },
  "/login": {
    title: "Department Login Portal",
    titleHi: "विभागीय लॉगिन (Department Login)",
    subtitle: "Government / Implementing Agency / Facilitator authentication preview",
    subtitleHi: "सरकारी अधिकारी एवं क्रियान्वयन एजेंसी प्रमाणीकरण",
    stepBadge: "3.1 Admin Login",
  },
};

const DISTRICTS = [
  "All Districts",
  "Nagpur",
  "Pune",
  "Nashik",
  "Aurangabad",
  "Amravati",
  "Thane",
  "Gadchiroli",
];

const ROLES: StakeholderRole[] = [
  "District Officer",
  "Implementing Agency",
  "System Admin",
];

export function AdminHeader() {
  const pathname = usePathname();
  const {
    role,
    setRole,
    language,
    setLanguage,
    selectedDistrict,
    setSelectedDistrict,
  } = usePortal();

  const meta =
    PAGE_METADATA[pathname] ??
    PAGE_METADATA[
      Object.keys(PAGE_METADATA).find(
        (k) => k !== "/" && pathname.startsWith(k)
      ) ?? "/"
    ];

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200/85 bg-white/90 backdrop-blur-md">
      {/* Top Government Strip + Role Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 bg-gradient-to-r from-[#F8FBFF] via-white to-[#F4FBF7] px-6 py-2">
        {/* Ministry Branding (Matches Top-Right of Images 1-3) */}
        <div className="flex items-center gap-2.5">
          <IndiaEmblemIcon className="h-7 w-6 text-slate-700" />
          <div className="leading-tight">
            <p className="text-xs font-bold text-slate-800">
              Ministry of Social Justice & Empowerment
            </p>
            <p className="text-[10px] font-medium text-slate-500">
              Government of India • PM-AJAY (GIA Skill Development Component)
            </p>
          </div>
        </div>

        {/* Stakeholder View Switcher (Matches Image 5 Section 6: District Officer / Implementing Agency / System Admin) */}
        <div className="flex items-center gap-3">
          <div className="hidden xl:flex items-center gap-1 rounded-xl bg-slate-100/90 p-1 border border-slate-200/70">
            {ROLES.map((r) => (
              <button
                key={r}
                onClick={() => setRole(r)}
                className={cn(
                  "rounded-lg px-2.5 py-1 text-xs font-semibold transition-all",
                  role === r
                    ? "bg-white text-[#0066FF] shadow-sm border border-blue-200/60"
                    : "text-slate-600 hover:text-slate-900"
                )}
              >
                {r} View
              </button>
            ))}
          </div>

          {/* Language Selector Pill — Exact visual match to Images 1, 2, 3 top-right */}
          <button
            onClick={() => setLanguage(language === "en" ? "hi" : "en")}
            className="inline-flex items-center gap-2 rounded-full border border-slate-300/90 bg-white px-3.5 py-1.5 text-xs font-bold text-slate-800 shadow-sm hover:border-[#0066FF] hover:bg-blue-50/40 transition-all"
            title="Switch Portal Language (English / हिंदी)"
          >
            <Globe className="h-3.5 w-3.5 text-[#0066FF]" />
            <span>
              {language === "en"
                ? "भाषा / Language: EN"
                : "भाषा / हिंदी (HI)"}
            </span>
            <ChevronDown className="h-3.5 w-3.5 text-slate-500" />
          </button>
        </div>
      </div>

      {/* Main Page Context Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-3.5">
        {/* Page Title & Flow Reference */}
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-purple-50 px-2.5 py-0.5 text-[11px] font-bold text-[#6D28D9] border border-purple-200/80">
              {meta.stepBadge}
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
              {language === "hi"
                ? "एनक्यूआर एवं पीएम-अजय लाइव"
                : "NSQF & PM-AJAY Verified"}
            </span>
          </div>
          <h1 className="mt-1 text-xl font-extrabold tracking-tight text-[#0F2547]">
            {language === "hi" ? meta.titleHi : meta.title}
          </h1>
          <p className="text-xs text-slate-500">
            {language === "hi" ? meta.subtitleHi : meta.subtitle}
          </p>
        </div>

        {/* Right Controls: District Scope + Voice Assistant Pill + Officer Chip */}
        <div className="flex items-center gap-3">
          {/* District Filter Selector */}
          <div className="relative flex items-center">
            <MapPin className="pointer-events-none absolute left-3 h-4 w-4 text-[#0066FF]" />
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              aria-label="Filter by District"
              className="h-10 appearance-none rounded-xl border border-slate-200 bg-slate-50/70 pl-9 pr-8 text-xs font-bold text-[#0F2547] shadow-sm transition-colors hover:border-blue-300 focus:border-[#0066FF] focus:bg-white focus:outline-none"
            >
              {DISTRICTS.map((d) => (
                <option key={d} value={d}>
                  {d === "All Districts"
                    ? "Maharashtra: All Districts"
                    : `District: ${d}`}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-2.5 h-3.5 w-3.5 text-slate-500" />
          </div>

          {/* Voice Assistant Quick Status Indicator (Echoing Image 1's iconic blue mic) */}
          <Link
            href="/facilitators"
            className="hidden lg:inline-flex items-center gap-2 rounded-xl border border-blue-200 bg-[#EBF4FF]/80 px-3 py-2 text-xs font-bold text-[#0066FF] hover:bg-blue-100/80 transition-colors"
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#0066FF] text-white shadow-sm">
              <Mic className="h-3.5 w-3.5" />
            </span>
            <div className="leading-tight">
              <div className="text-[11px] font-extrabold">
                {language === "hi" ? "आवाज़ सहायक" : "Voice AI Live"}
              </div>
              <div className="text-[10px] font-medium text-blue-700/80">
                18 active interviews
              </div>
            </div>
          </Link>

          {/* Notification Bell */}
          <Link
            href="/referrals"
            title="View Recent Referrals"
            className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 hover:border-blue-200 hover:bg-blue-50/50 hover:text-[#0066FF] transition-colors"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#0066FF] ring-2 ring-white" />
          </Link>

          {/* Officer Profile Badge (Links to 3.1 Department Login) */}
          <Link
            href="/login"
            className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 shadow-sm hover:border-blue-300 transition-colors"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#0066FF] to-[#6D28D9] text-xs font-bold text-white">
              DO
            </div>
            <div className="hidden sm:block text-left leading-tight">
              <div className="flex items-center gap-1 text-xs font-bold text-[#0F2547]">
                <span>district.officer</span>
                <UserCheck className="h-3 w-3 text-emerald-600" />
              </div>
              <div className="text-[10px] font-medium text-slate-500">
                {selectedDistrict === "All Districts"
                  ? "State Nodal Cell, MH"
                  : `${selectedDistrict} Skill Agency`}
              </div>
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
}
