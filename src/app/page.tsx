"use client";

import dynamic from "next/dynamic";
import StatCard from "@/components/dashboard/StatCard";
import MemberTable from "@/components/dashboard/MemberTable";
import { paymentRecords, paymentStats } from "@/lib/dummy-data";

const PaymentDonutChart = dynamic(
  () => import("@/components/dashboard/PaymentDonutChart"),
  { ssr: false, loading: () => <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 h-64 animate-pulse" /> }
);

export default function DashboardPage() {
  const recentRecords = paymentRecords.slice(0, 6);

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          iconName="CreditCard"
          value={paymentStats.outstanding}
          label="Outstanding"
          trend="+12%"
          trendDirection="up"
          color="red"
        />
        <StatCard
          iconName="Clock"
          value={paymentStats.awaiting}
          label="Awaiting Confirmation"
          trend="-5%"
          trendDirection="down"
          color="amber"
        />
        <StatCard
          iconName="RefreshCw"
          value={paymentStats.renewal}
          label="Renewal This Month"
          trend="0%"
          trendDirection="neutral"
          color="blue"
        />
        <StatCard
          iconName="AlertTriangle"
          value={paymentStats.overdue}
          label="Overdue"
          trend="+3"
          trendDirection="up"
          color="red"
        />
      </div>

      {/* Table and Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3">
          <MemberTable data={recentRecords} title="Recent Member Activity" />
        </div>
        <div className="lg:col-span-2">
          <PaymentDonutChart />
        </div>
      </div>
    </div>
  );
}
