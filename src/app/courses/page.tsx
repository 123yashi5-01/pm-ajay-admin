"use client";

import React, { useState } from "react";
import {
  GraduationCap,
  CheckCircle2,
  MapPin,
  Clock,
  Award,
  Building2,
  Search,
  ShieldCheck,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { NQR_COURSES } from "@/lib/mock-data";
import { usePortal } from "@/context/portal-context";

export default function CoursesNqrPage() {
  const { language } = usePortal();
  const [query, setQuery] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(NQR_COURSES[0]);

  const filtered = NQR_COURSES.filter(
    (c) =>
      !query ||
      c.title.toLowerCase().includes(query.toLowerCase()) ||
      c.code.toLowerCase().includes(query.toLowerCase()) ||
      c.sector.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Top Banner matching Section 5 External Data Sources (NQR + PM-AJAY GIA + Training Centres) */}
      <div className="rounded-2xl border border-blue-200/80 bg-gradient-to-r from-[#EBF4FF] via-white to-[#ECFDF5] p-5 shadow-soft">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Badge variant="default">Section 5: Official Data Sources</Badge>
              <Badge variant="enrolled">NQR Verified</Badge>
            </div>
            <h2 className="mt-1.5 text-lg font-extrabold text-[#0F2547]">
              National Qualification Register (NQR) & PM-AJAY GIA Training Catalog
            </h2>
            <p className="text-xs text-slate-600">
              Only valid NSQF Level 3 & Level 4 qualifications approved under PM-AJAY (GIA Component) are recommended by the AI engine.
            </p>
          </div>
          <div className="w-full sm:w-72 relative">
            <Search className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-slate-400" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search NQR code or trade..."
              className="pl-9 bg-white"
            />
          </div>
        </div>
      </div>

      {/* Course Cards + 1.6 Course Details Preview */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="lg:col-span-7 space-y-3">
          {filtered.map((course) => {
            const active = selectedCourse.code === course.code;
            return (
              <Card
                key={course.code}
                onClick={() => setSelectedCourse(course)}
                className={`cursor-pointer transition-all ${
                  active
                    ? "border-[#0066FF] ring-2 ring-[#0066FF]/15 bg-blue-50/30"
                    : "hover:border-blue-200"
                }`}
              >
                <CardContent className="p-5">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="rounded-md bg-blue-100/80 px-2 py-0.5 text-[11px] font-extrabold text-[#0066FF]">
                          {course.code}
                        </span>
                        <Badge variant="enrolled">
                          NSQF Level {course.nsqfLevel}
                        </Badge>
                      </div>
                      <h3 className="mt-2 text-base font-extrabold text-[#0F2547]">
                        {language === "hi" ? course.titleHi : course.title}
                      </h3>
                      <p className="text-xs text-slate-500">{course.sector}</p>
                    </div>

                    <div className="text-right">
                      <div className="text-lg font-extrabold text-[#0066FF]">
                        {course.activeBeneficiaries}
                      </div>
                      <div className="text-[10px] font-semibold text-slate-500">
                        Active Demand
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-3 text-xs text-slate-600">
                    <span>
                      ⏱️ Duration: <strong>{course.durationMonths}</strong> (
                      {course.durationHours} hrs)
                    </span>
                    <span>
                      🎓 Eligibility: <strong>{course.minEducation}</strong>
                    </span>
                    <span>
                      🏛️ Centres: <strong>{course.centresCount} Active</strong>
                    </span>
                    <span className="font-bold text-emerald-700">
                      Placement: {course.placementRate}
                    </span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Right 5 Cols: 1.6 Course Details Inspector */}
        <Card className="lg:col-span-5 border-blue-200/90 h-fit sticky top-28">
          <CardHeader className="border-b border-slate-100 bg-gradient-to-r from-[#F8FBFF] to-white">
            <Badge variant="default" className="w-fit">
              1.6 Course Details Specification
            </Badge>
            <CardTitle className="mt-2 text-lg">
              {selectedCourse.title}
            </CardTitle>
            <CardDescription>{selectedCourse.titleHi}</CardDescription>
          </CardHeader>

          <CardContent className="p-5 space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-slate-200 p-3">
                <span className="text-slate-400 block">Duration</span>
                <span className="text-sm font-extrabold text-[#0F2547]">
                  {selectedCourse.durationMonths} ({selectedCourse.durationHours}{" "}
                  hrs)
                </span>
              </div>
              <div className="rounded-xl border border-slate-200 p-3">
                <span className="text-slate-400 block">NSQF Level</span>
                <span className="text-sm font-extrabold text-[#0066FF]">
                  Level {selectedCourse.nsqfLevel}
                </span>
              </div>
              <div className="rounded-xl border border-slate-200 p-3">
                <span className="text-slate-400 block">Eligibility</span>
                <span className="text-sm font-extrabold text-[#0F2547]">
                  {selectedCourse.minEducation}
                </span>
              </div>
              <div className="rounded-xl border border-slate-200 p-3">
                <span className="text-slate-400 block">NQR Validity</span>
                <span className="text-sm font-extrabold text-emerald-700">
                  {selectedCourse.validTill}
                </span>
              </div>
            </div>

            <div className="rounded-xl border border-blue-100 bg-[#EBF4FF]/50 p-3.5 space-y-1.5">
              <div className="font-extrabold text-[#0F2547]">
                PM-AJAY Scheme Convergence:
              </div>
              <p className="text-slate-600">{selectedCourse.schemeComponent}</p>
              <div className="pt-1 flex flex-wrap gap-1.5">
                <Badge variant="enrolled">Free Training & Assessment</Badge>
                <Badge variant="default">NSQF Certificate</Badge>
                <Badge variant="purple">Placement / Self-Employment Link</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
