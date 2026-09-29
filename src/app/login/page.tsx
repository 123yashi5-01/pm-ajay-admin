"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, ShieldCheck, Lock, UserCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { IndiaEmblemIcon, JeevikaLogoIcon } from "@/components/layout/brand-marks";
import { usePortal, StakeholderRole } from "@/context/portal-context";

export default function DepartmentLoginPage() {
  const router = useRouter();
  const { role, setRole } = usePortal();
  const [username, setUsername] = useState("district.officer");
  const [password, setPassword] = useState("••••••••••••");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/");
  };

  return (
    <div className="mx-auto max-w-4xl py-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-12 items-center">
        {/* Left 6 Cols: Exact 3.1 Admin Login Card from Image 4 */}
        <Card className="md:col-span-6 border-purple-200/90 shadow-soft">
          <CardHeader className="items-center text-center border-b border-slate-100 bg-gradient-to-b from-[#F5F0FF] to-white pb-5">
            <Badge variant="purple" className="mb-2">
              3.1 Admin Login
            </Badge>
            <IndiaEmblemIcon className="h-12 w-10 text-slate-800" />
            <CardTitle className="mt-2 text-xl font-extrabold text-[#0F2547]">
              Department Login
            </CardTitle>
            <CardDescription className="text-xs font-medium text-slate-600">
              Ministry of Social Justice & Empowerment • PM-AJAY Nodal Portal
            </CardDescription>
          </CardHeader>

          <CardContent className="p-6">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">
                  Username / Official ID
                </label>
                <Input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="district.officer"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">
                  Password
                </label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-700"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">
                  Select Stakeholder Role (Section 6)
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(
                    [
                      "District Officer",
                      "Implementing Agency",
                      "System Admin",
                    ] as StakeholderRole[]
                  ).map((r) => (
                    <button
                      type="button"
                      key={r}
                      onClick={() => {
                        setRole(r);
                        if (r === "District Officer")
                          setUsername("district.officer");
                        if (r === "Implementing Agency")
                          setUsername("agency.nagpur");
                        if (r === "System Admin") setUsername("sys.admin");
                      }}
                      className={`rounded-xl border p-2 text-[11px] font-bold transition-all ${
                        role === r
                          ? "border-[#6D28D9] bg-purple-50 text-[#6D28D9]"
                          : "border-slate-200 bg-white text-slate-600"
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              <Button
                type="submit"
                variant="purple"
                className="w-full h-11 text-sm font-extrabold shadow-md"
              >
                Login to Dashboard (3.2)
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Right 6 Cols: Role Capabilities Overview from Image 5 Section 6 */}
        <div className="md:col-span-6 space-y-4">
          <div className="flex items-center gap-3">
            <JeevikaLogoIcon className="h-12 w-12" />
            <div>
              <h2 className="text-lg font-extrabold text-[#0F2547]">
                Jeevika Saathi — Role-Based Access
              </h2>
              <p className="text-xs text-slate-600">
                Unified Next.js 14 Admin Portal for Government Officials & Implementing Agencies
              </p>
            </div>
          </div>

          <Card className="border-blue-200/80">
            <CardContent className="p-4 space-y-2">
              <div className="text-xs font-extrabold text-[#0066FF]">
                1. District Officer View
              </div>
              <p className="text-xs text-slate-600">
                Beneficiary registrations (1,248) • District choropleth analytics • Skill demand vs Perspective Plans • Official MoSJE report exports.
              </p>
            </CardContent>
          </Card>

          <Card className="border-emerald-200/80">
            <CardContent className="p-4 space-y-2">
              <div className="text-xs font-extrabold text-emerald-700">
                2. Implementing Agency View
              </div>
              <p className="text-xs text-slate-600">
                Received referrals (REF-2026-00124) • Beneficiary contact details shared with verified voice consent • Batch enrolment & placement tracking.
              </p>
            </CardContent>
          </Card>

          <Card className="border-purple-200/80">
            <CardContent className="p-4 space-y-2">
              <div className="text-xs font-extrabold text-[#6D28D9]">
                3. System Admin View
              </div>
              <p className="text-xs text-slate-600">
                NQR & PM-AJAY GIA dataset synchronization • Sarvam ASR/TTS & Whisper fallback monitoring • Facilitator & Kiosk user management.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
