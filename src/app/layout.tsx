import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import DashboardLayoutClient from "@/components/dashboard/DashboardLayoutClient";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BNI Indonesia - Dashboard",
  description: "BNI Indonesia Membership & Visitor Dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className={inter.className}>
        <DashboardLayoutClient>{children}</DashboardLayoutClient>
      </body>
    </html>
  );
}