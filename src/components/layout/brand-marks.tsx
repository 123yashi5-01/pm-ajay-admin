import React from "react";
import { cn } from "@/lib/utils";

export function JeevikaLogoIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-10 w-10 shrink-0", className)}
    >
      {/* Soft sky background halo */}
      <circle cx="32" cy="32" r="30" fill="#EBF5FF" />
      {/* Upper sky arc */}
      <path
        d="M17 24C21 15 43 15 47 24"
        stroke="#60A5FA"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      {/* Central figure head */}
      <circle cx="32" cy="17.5" r="5.5" fill="#0066FF" />
      {/* Central figure torso reaching upward */}
      <path
        d="M21 26C25.5 29.5 38.5 29.5 43 26L37.5 40.5C35.5 45 28.5 45 26.5 40.5L21 26Z"
        fill="#0066FF"
      />
      {/* Left emerald/teal leaf */}
      <path
        d="M12 36C12 29 21 30 28 40C29.5 42.5 30 47.5 28 50C20 49 12 43 12 36Z"
        fill="#10B981"
      />
      <path
        d="M15 47C19 46 24 48 28 52C22 54 15 52 15 47Z"
        fill="#059669"
      />
      {/* Right warm saffron/orange leaf */}
      <path
        d="M52 36C52 29 43 30 36 40C34.5 42.5 34 47.5 36 50C44 49 52 43 52 36Z"
        fill="#F59E0B"
      />
      <path
        d="M49 47C45 46 40 48 36 52C42 54 49 52 49 47Z"
        fill="#D97706"
      />
    </svg>
  );
}

export function IndiaEmblemIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-9 w-8 shrink-0 text-slate-700", className)}
    >
      {/* Stylized Lion Capital Silhouette */}
      <path
        d="M24 4C21.5 4 19.5 6 19.5 8.5V13H15C13 13 11.5 14.5 11.5 16.5V23C11.5 25.5 13.5 27.5 16 27.5H17.5L16 36H32L30.5 27.5H32C34.5 27.5 36.5 25.5 36.5 23V16.5C36.5 14.5 35 13 33 13H28.5V8.5C28.5 6 26.5 4 24 4Z"
        fill="currentColor"
        fillOpacity="0.82"
      />
      {/* Pedestal / Abacus with Dharma Chakra */}
      <rect
        x="11"
        y="37"
        width="26"
        height="6"
        rx="1.5"
        fill="currentColor"
      />
      <circle cx="24" cy="40" r="2.2" fill="#FFFFFF" />
      <path
        d="M9 44.5H39L37 48.5H11L9 44.5Z"
        fill="currentColor"
        fillOpacity="0.75"
      />
      {/* Satyameva Jayate base */}
      <rect
        x="14"
        y="50.5"
        width="20"
        height="2.2"
        rx="1"
        fill="currentColor"
        fillOpacity="0.55"
      />
    </svg>
  );
}
