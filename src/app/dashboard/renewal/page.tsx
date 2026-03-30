"use client";

import { RefreshCw } from "lucide-react";
import StatCard from "@/components/dashboard/StatCard";
import MemberTable from "@/components/dashboard/MemberTable";
import { members, paymentStats } from "@/lib/dummy-data";

export default function RenewalPage() {
  const needRenewal = members.filter((m) => m.status === "Active" || m.status === "Pending");

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          iconName="RefreshCw"
          value={paymentStats.renewal}
          label="Renewal This Month"
          trend="0%"
          trendDirection="neutral"
          color="blue"
        />
      </div>
      <MemberTable data={needRenewal.map((m) => ({
        id: m.id,
        memberId: m.id,
        memberName: m.name,
        chapter: m.chapter,
        status: m.status,
        paymentStatus: m.status === "Active" ? "Paid" : "Pending",
        date: m.joinDate,
      }))} />
    </div>
  );
}