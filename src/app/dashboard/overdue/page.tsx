"use client";

import StatCard from "@/components/dashboard/StatCard";
import MemberTable from "@/components/dashboard/MemberTable";
import { paymentRecords, paymentStats } from "@/lib/dummy-data";

export default function OverduePage() {
  const overduePayments = paymentRecords.filter(
    (r) => r.paymentStatus === "Overdue" || r.status === "Overdue"
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          iconName="AlertTriangle"
          value={paymentStats.overdue}
          label="Overdue Payment"
          trend="+3"
          trendDirection="up"
          color="red"
        />
      </div>
      <MemberTable data={overduePayments} />
    </div>
  );
}