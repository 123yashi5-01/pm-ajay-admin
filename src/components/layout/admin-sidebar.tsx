"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  FileCheck2,
  BarChart3,
  GraduationCap,
  Mic,
  Cpu,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { JeevikaLogoIcon } from "@/components/layout/brand-marks";
import { usePortal } from "@/context/portal-context";

interface NavItem {
  href: string;
  label: string;
  labelHi: string;
  flowRef: string;
  icon: React.ElementType;
  badge?: string;
  badgeTone?: "blue" | "amber" | "green" | "purple";
}

const PRIMARY_NAV: NavItem[] = [
  {
    href: "/",
    label: "Dashboard Overview",
    labelHi: "डैशबोर्ड अवलोकन",
    flowRef: "3.2",
    icon: LayoutDashboard,
  },
  {
    href: "/beneficiaries",
    label: "Beneficiary List",
    labelHi: "लाभार्थी सूची",
    flowRef: "3.3",
    icon: Users,
    badge: "1,248",
    badgeTone: "blue",
  },
  {
    href: "/referrals",
    label: "Referral Details",
    labelHi: "रेफरल विवरण",
    flowRef: "3.4",
    icon: FileCheck2,
    badge: "892",
    badgeTone: "amber",
  },
  {
    href: "/reports",
    label: "Reports & Analytics",
    labelHi: "रिपोर्ट और विश्लेषण",
    flowRef: "3.5",
    icon: BarChart3,
  },
];

const ECOSYSTEM_NAV: NavItem[] = [
  {
    href: "/courses",
    label: "NQR & PM-AJAY Courses",
    labelHi: "एनक्यूआर और कौशल कोर्स",
    flowRef: "1.6 / 5",
    icon: GraduationCap,
    badge: "NSQF",
    badgeTone: "green",
  },
  {
    href: "/facilitators",
    label: "Facilitator & Kiosk Flow",
    labelHi: "सुविधाकर्ता और कियोस्क",
    flowRef: "2.1-2.5",
    icon: Mic,
  },
  {
    href: "/system",
    label: "AI & System Stack",
    labelHi: "एआई और सिस्टम स्टैक",
    flowRef: "Sec 6",
    icon: Cpu,
    badge: "Live",
    badgeTone: "purple",
  },
  {
    href: "/login",
    label: "Department Login",
    labelHi: "विभागीय लॉगिन (3.1)",
    flowRef: "3.1",
    icon: ShieldCheck,
  },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const { language, sidebarCollapsed, setSidebarCollapsed, role } = usePortal();

  const renderNavLink = (item: NavItem) => {
    const Icon = item.icon;
    const isActive =
      item.href === "/"
        ? pathname === "/"
        : pathname.startsWith(item.href);

    const badgeClasses = {
      blue: "bg-blue-50 text-[#0066FF] border-blue-200",
      amber: "bg-amber-50 text-amber-700 border-amber-200",
      green: "bg-emerald-50 text-emerald-700 border-emerald-200",
      purple: "bg-purple-50 text-purple-700 border-purple-200",
    }[item.badgeTone ?? "blue"];

    return (
      <Link
        key={item.href}
        href={item.href}
        title={`${item.label} (${item.flowRef})`}
        className={cn(
          "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all",
          isActive
            ? "bg-gradient-to-r from-[#EBF4FF] to-[#F3F8FF] text-[#0066FF] font-semibold shadow-sm border border-blue-200/80"
            : "text-slate-600 hover:bg-slate-100/80 hover:text-[#0F2547]"
        )}
      >
        {isActive && (
          <span className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-[#0066FF]" />
        )}
        <div
          className={cn(
            "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors",
            isActive
              ? "bg-[#0066FF] text-white shadow-sm"
              : "bg-slate-100 text-slate-600 group-hover:bg-blue-50 group-hover:text-[#0066FF]"
          )}
        >
          <Icon className="h-4 w-4" />
        </div>

        {!sidebarCollapsed && (
          <div className="flex flex-1 items-center justify-between overflow-hidden">
            <div className="truncate">
              <div className="truncate leading-tight">
                {language === "hi" ? item.labelHi : item.label}
              </div>
              <div className="text-[10px] font-normal text-slate-400">
                Flow {item.flowRef}
              </div>
            </div>
            {item.badge && (
              <span
                className={cn(
                  "ml-2 rounded-full border px-2 py-0.5 text-[10px] font-bold",
                  isActive
                    ? "bg-white text-[#0066FF] border-blue-200"
                    : badgeClasses
                )}
              >
                {item.badge}
              </span>
            )}
          </div>
        )}
      </Link>
    );
  };

  return (
    <aside
      className={cn(
        "sticky top-0 z-30 flex h-screen flex-col border-r border-slate-200/85 bg-white/95 backdrop-blur-md transition-all duration-200 select-none",
        sidebarCollapsed ? "w-[80px]" : "w-[276px]"
      )}
    >
      {/* Brand Header matching Jeevika Saathi top-left header */}
      <div className="flex items-center justify-between border-b border-slate-100 px-4 py-4">
        <Link href="/" className="flex items-center gap-3 overflow-hidden">
          <JeevikaLogoIcon className="h-11 w-11" />
          {!sidebarCollapsed && (
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-extrabold tracking-tight text-[#0F2547]">
                  Jeevika Saathi
                </span>
              </div>
              <p className="truncate text-[11px] font-medium text-slate-500">
                Aapka Skill, Aapka Bhavishya
              </p>
              <div className="mt-1 inline-flex items-center gap-1 rounded-md bg-blue-50 px-1.5 py-0.5 text-[10px] font-bold tracking-wide text-[#0066FF] border border-blue-200/60">
                PM-AJAY ADMIN PORTAL
              </div>
            </div>
          )}
        </Link>

        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          aria-label="Toggle Sidebar"
          className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-slate-500 hover:bg-blue-50 hover:text-[#0066FF] hover:border-blue-200 transition-colors"
        >
          {sidebarCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </button>
      </div>

      {/* Active Stakeholder Role Banner */}
      {!sidebarCollapsed && (
        <div className="mx-3.5 mt-3.5 rounded-xl bg-gradient-to-r from-purple-50 via-blue-50 to-emerald-50 p-2.5 border border-blue-100">
          <div className="flex items-center justify-between text-[11px] font-bold text-[#0F2547]">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-[#6D28D9]" />
              {language === "hi" ? "सक्रिय भूमिका" : "Active Portal Lens"}
            </span>
            <span className="rounded bg-white/90 px-1.5 py-0.5 text-[10px] font-semibold text-[#6D28D9] shadow-sm">
              SIH 26097
            </span>
          </div>
          <p className="mt-0.5 text-xs font-bold text-[#0066FF]">{role} View</p>
        </div>
      )}

      {/* Navigation Links */}
      <div className="flex-1 space-y-5 overflow-y-auto px-3 py-4">
        <div>
          {!sidebarCollapsed && (
            <div className="mb-2 px-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              {language === "hi"
                ? "3. प्रशासन एवं जिला प्रवाह"
                : "3. Admin & District Flow"}
            </div>
          )}
          <nav className="space-y-1">{PRIMARY_NAV.map(renderNavLink)}</nav>
        </div>

        <div>
          {!sidebarCollapsed && (
            <div className="mb-2 px-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              {language === "hi"
                ? "कौशल इकोसिस्टम एवं चैनल"
                : "Ecosystem & Channels"}
            </div>
          )}
          <nav className="space-y-1">{ECOSYSTEM_NAV.map(renderNavLink)}</nav>
        </div>
      </div>

      {/* Bottom Voice Assistant & NQR Status Card (matching Image 1 & Image 5) */}
      <div className="border-t border-slate-100 p-3">
        {sidebarCollapsed ? (
          <div
            title="Sarvam Voice AI & NQR Sync Active"
            className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200"
          >
            <Sparkles className="h-5 w-5" />
          </div>
        ) : (
          <div className="rounded-2xl bg-gradient-to-br from-[#EBF5FF] via-[#F0FDF4] to-[#FEF9EC] p-3.5 border border-blue-100/80">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0F2547]">
                <Sparkles className="h-3.5 w-3.5 text-[#0066FF]" />
                {language === "hi"
                  ? "आवाज़ सहायक सक्रिय"
                  : "AI Voice Engine Active"}
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100/90 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
                <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                99.4%
              </span>
            </div>
            <p className="mt-1 text-[11px] leading-relaxed text-slate-600">
              {language === "hi"
                ? "सरवम ASR/TTS • NQR और PM-AJAY GIA डेटा सिंक"
                : "Sarvam ASR/TTS • NQR & PM-AJAY GIA synced"}
            </p>
            <div className="mt-2.5 flex items-center justify-between text-[10px] font-semibold text-slate-500 border-t border-slate-200/60 pt-2">
              <span>Web • Kiosk • WhatsApp • IVR</span>
              <span className="text-[#0066FF]">v2.6</span>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
