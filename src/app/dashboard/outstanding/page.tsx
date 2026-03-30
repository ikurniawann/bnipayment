"use client";

import { CreditCard } from "lucide-react";
import StatCard from "@/components/dashboard/StatCard";
import MemberTable from "@/components/dashboard/MemberTable";
import { paymentRecords, paymentStats } from "@/lib/dummy-data";

export default function OutstandingPage() {
  const outstandingPayments = paymentRecords.filter(
    (r) => r.paymentStatus === "Outstanding" || r.status === "Pending"
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          iconName="CreditCard"
          value={paymentStats.outstanding}
          label="Outstanding Payment"
          trend="+12%"
          trendDirection="up"
          color="red"
        />
      </div>
      <MemberTable data={outstandingPayments} />
    </div>
  );
}