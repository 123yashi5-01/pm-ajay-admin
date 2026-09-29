"use client";

import React, { createContext, useContext, useState } from "react";
import {
  BENEFICIARIES_DATA,
  BeneficiaryRecord,
  BeneficiaryStatus,
} from "@/lib/mock-data";

export type StakeholderRole =
  | "District Officer"
  | "Implementing Agency"
  | "System Admin";

export type PortalLanguage = "en" | "hi";

interface PortalContextType {
  role: StakeholderRole;
  setRole: (role: StakeholderRole) => void;
  language: PortalLanguage;
  setLanguage: (lang: PortalLanguage) => void;
  selectedDistrict: string;
  setSelectedDistrict: (district: string) => void;
  beneficiaries: BeneficiaryRecord[];
  updateBeneficiaryStatus: (
    id: string,
    status: BeneficiaryStatus,
    remarks?: string
  ) => void;
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
}

const PortalContext = createContext<PortalContextType | undefined>(undefined);

export function PortalProvider({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<StakeholderRole>("District Officer");
  const [language, setLanguage] = useState<PortalLanguage>("en");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("All Districts");
  const [beneficiaries, setBeneficiaries] =
    useState<BeneficiaryRecord[]>(BENEFICIARIES_DATA);
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);

  const updateBeneficiaryStatus = (
    id: string,
    status: BeneficiaryStatus,
    remarks?: string
  ) => {
    setBeneficiaries((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        const agencyStatusMap: Record<
          BeneficiaryStatus,
          BeneficiaryRecord["referral"]["agencyStatus"]
        > = {
          Pending: "Awaiting Referral",
          Referred: "Sent to Agency",
          Enrolled: "Batch Assigned",
          Completed: "Training Completed",
        };
        return {
          ...item,
          status,
          referral: {
            ...item.referral,
            agencyStatus: agencyStatusMap[status],
            remarks: remarks ?? item.referral.remarks,
          },
        };
      })
    );
  };

  return (
    <PortalContext.Provider
      value={{
        role,
        setRole,
        language,
        setLanguage,
        selectedDistrict,
        setSelectedDistrict,
        beneficiaries,
        updateBeneficiaryStatus,
        sidebarCollapsed,
        setSidebarCollapsed,
      }}
    >
      {children}
    </PortalContext.Provider>
  );
}

export function usePortal() {
  const context = useContext(PortalContext);
  if (!context) {
    throw new Error("usePortal must be used within a PortalProvider");
  }
  return context;
}
