"use client";

import React from "react";
import Link from "next/link";
import { AdminSidebar } from "@/components/layout/admin-sidebar";
import { AdminHeader } from "@/components/layout/admin-header";
import { JeevikaLogoIcon, IndiaEmblemIcon } from "@/components/layout/brand-marks";
import { usePortal } from "@/context/portal-context";

export function AdminShell({ children }: { children: React.ReactNode }) {
  const { language } = usePortal();

  return (
    <div className="flex min-h-screen w-full">
      {/* Persistent Desktop Sidebar */}
      <AdminSidebar />

      {/* Main Content Area */}
      <div className="flex min-w-0 flex-1 flex-col">
        <AdminHeader />

        <main className="flex-1 px-6 py-6">
          <div className="mx-auto max-w-[1440px] space-y-6">{children}</div>
        </main>

        {/* Footer matching exact Jeevika Saathi footer from Image 1 */}
        <footer className="mt-auto border-t border-slate-200/80 bg-white/85 px-6 py-4 backdrop-blur-sm">
          <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <JeevikaLogoIcon className="h-8 w-8" />
              <div>
                <div className="text-sm font-extrabold text-[#0F2547]">
                  Jeevika Saathi
                </div>
                <div className="text-[10px] text-slate-500">
                  Aapka Skill, Aapka Bhavishya • PM-AJAY Admin Portal
                </div>
              </div>
              <span className="mx-2 h-5 w-px bg-slate-200" />
              <div className="hidden md:flex items-center gap-4 text-xs font-semibold text-slate-600">
                <Link href="/" className="hover:text-[#0066FF]">
                  {language === "hi" ? "हमारे बारे में" : "Overview"}
                </Link>
                <Link href="/courses" className="hover:text-[#0066FF]">
                  {language === "hi" ? "योजनाएँ (PM-AJAY)" : "PM-AJAY Schemes"}
                </Link>
                <Link href="/facilitators" className="hover:text-[#0066FF]">
                  {language === "hi" ? "सहायता" : "Facilitator Help"}
                </Link>
                <Link href="/reports" className="hover:text-[#0066FF]">
                  {language === "hi" ? "रिपोर्ट" : "Reports"}
                </Link>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <IndiaEmblemIcon className="h-6 w-5 text-slate-700" />
                <div className="text-[10px] leading-tight text-slate-600">
                  <div className="font-bold text-slate-800">
                    Ministry of Social Justice & Empowerment
                  </div>
                  <div>Government of India</div>
                </div>
              </div>
              <span className="hidden sm:inline text-slate-300">|</span>
              <div className="hidden sm:flex items-center gap-3 text-[11px] text-slate-500">
                <span>
                  {language === "hi" ? "गोपनीयता नीति" : "Privacy Policy"}
                </span>
                <span>•</span>
                <span>
                  {language === "hi" ? "उपयोग की शर्तें" : "Terms of Use"}
                </span>
                <span>•</span>
                <span>
                  {language === "hi" ? "पहुँचयोग्यता" : "Accessibility"}
                </span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
