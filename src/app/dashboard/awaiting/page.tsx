"use client";

import StatCard from "@/components/dashboard/StatCard";
import MemberTable from "@/components/dashboard/MemberTable";
import { paymentRecords, paymentStats } from "@/lib/dummy-data";

export default function AwaitingPage() {
  const awaitingPayments = paymentRecords.filter((r) => r.paymentStatus === "Awaiting");

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          iconName="Clock"
          value={paymentStats.awaiting}
          label="Awaiting Confirmation"
          trend="-5%"
          trendDirection="down"
          color="amber"
        />
      </div>
      <MemberTable data={awaitingPayments} title="Awaiting Payment" />
    </div>
  );
}