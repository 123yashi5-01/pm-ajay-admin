import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { PortalProvider } from "@/context/portal-context";
import { AdminShell } from "@/components/layout/admin-shell";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  title: "PM-AJAY Admin Portal | Jeevika Saathi — Ministry of Social Justice & Empowerment",
  description:
    "AI-Driven Voice Assistant for Livelihood Mapping and NSQF-Aligned Skilling Recommendations — Admin & District Officer Portal (SIH 26097)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${jakarta.className} min-h-screen`}>
        <PortalProvider>
          <AdminShell>{children}</AdminShell>
        </PortalProvider>
      </body>
    </html>
  );
}
