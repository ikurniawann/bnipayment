"use client";

import { useState } from "react";
import { Plus, Download, Search, FileText } from "lucide-react";
import StatusBadge from "@/components/dashboard/StatusBadge";

export default function SubscriptionDataPage() {
  const [search, setSearch] = useState("");

  const subscriptions = [
    { id: "s001", memberId: "m001", memberName: "Ahmad Wijaya", plan: "Premium", amount: 2500000, status: "Active", startDate: "2024-01-15", endDate: "2025-01-15" },
    { id: "s002", memberId: "m002", memberName: "Siti Nurhaliza", plan: "Basic", amount: 1500000, status: "Active", startDate: "2024-02-20", endDate: "2025-02-20" },
    { id: "s003", memberId: "m003", memberName: "Budi Santoso", plan: "Premium", amount: 2500000, status: "Pending", startDate: "2024-03-10", endDate: "2025-03-10" },
    { id: "s004", memberId: "m004", memberName: "Dewi Lestari", plan: "Basic", amount: 1500000, status: "Active", startDate: "2024-01-05", endDate: "2025-01-05" },
    { id: "s005", memberId: "m005", memberName: "Hendra Pratama", plan: "Premium", amount: 2500000, status: "Expired", startDate: "2023-12-01", endDate: "2024-12-01" },
    { id: "s006", memberId: "m006", memberName: "Rina Kusuma", plan: "Basic", amount: 1500000, status: "Active", startDate: "2024-04-15", endDate: "2025-04-15" },
    { id: "s007", memberId: "m007", memberName: "Joko Widodo", plan: "Premium", amount: 2500000, status: "Expired", startDate: "2023-11-20", endDate: "2024-11-20" },
    { id: "s008", memberId: "m008", memberName: "Lina Marlina", plan: "Basic", amount: 1500000, status: "Active", startDate: "2024-05-01", endDate: "2025-05-01" },
  ];

  const filtered = subscriptions.filter((s) =>
    s.memberName.toLowerCase().includes(search.toLowerCase()) ||
    s.plan.toLowerCase().includes(search.toLowerCase())
  );

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(amount);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Subscription Data</h2>
        <button className="flex items-center gap-2 bg-bni-primary hover:bg-bni-dark text-white px-4 py-2 rounded-lg text-sm font-medium">
          <Plus className="w-4 h-4" />
          New Subscription
        </button>
      </div>

      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search subscription..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-bni-primary/20"
            />
          </div>
          <button className="flex items-center gap-2 border border-gray-200 px-4 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-50">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Member</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Plan</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Start Date</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">End Date</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((sub) => (
                <tr key={sub.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-bni-primary/10 flex items-center justify-center text-bni-primary text-sm font-medium">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{sub.memberName}</p>
                        <p className="text-xs text-gray-500">{sub.memberId}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-sm font-medium text-gray-900">{sub.plan}</td>
                  <td className="px-5 py-4 text-sm text-gray-600">{formatCurrency(sub.amount)}</td>
                  <td className="px-5 py-4 text-sm text-gray-600">{new Date(sub.startDate).toLocaleDateString("id-ID")}</td>
                  <td className="px-5 py-4 text-sm text-gray-600">{new Date(sub.endDate).toLocaleDateString("id-ID")}</td>
                  <td className="px-5 py-4">
                    <StatusBadge status={sub.status} />
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex gap-2">
                      <button className="px-3 py-1 text-xs border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50">View</button>
                      <button className="px-3 py-1 text-xs border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50">Edit</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}