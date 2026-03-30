"use client";

import StatusBadge from "@/components/dashboard/StatusBadge";
import { members } from "@/lib/dummy-data";

export default function NeedRenewalPage() {
  const needRenewal = members.filter((m) => m.status === "Active" || m.status === "Pending");

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Members Need Renewal</h2>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Chapter</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Join Date</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Renewal Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {needRenewal.map((member) => (
                <tr key={member.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-bni-primary/10 flex items-center justify-center text-bni-primary text-sm font-medium">
                        {member.name.charAt(0)}
                      </div>
                      <span className="text-sm font-medium text-gray-900">{member.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-600">{member.email}</td>
                  <td className="px-5 py-4 text-sm text-gray-600">{member.chapter}</td>
                  <td className="px-5 py-4 text-sm text-gray-600">
                    {new Date(member.joinDate).toLocaleDateString("id-ID")}
                  </td>
                  <td className="px-5 py-4">
                    <StatusBadge status={member.status} />
                  </td>
                  <td className="px-5 py-4">
                    <span className="px-3 py-1 text-xs bg-warning/10 text-warning rounded-full">Needs Renewal</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden divide-y divide-gray-100">
          {needRenewal.map((member) => (
            <div key={member.id} className="p-4">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-bni-primary/10 flex items-center justify-center text-bni-primary text-sm font-medium flex-shrink-0">
                  {member.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{member.name}</p>
                  <p className="text-xs text-gray-500">{member.email}</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-xs text-gray-500 uppercase">Chapter</span>
                  <span className="text-sm text-gray-900">{member.chapter}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-gray-500 uppercase">Join Date</span>
                  <span className="text-sm text-gray-900">{new Date(member.joinDate).toLocaleDateString("id-ID")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-gray-500 uppercase">Status</span>
                  <StatusBadge status={member.status} />
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-gray-500 uppercase">Renewal Status</span>
                  <span className="px-2 py-1 text-xs bg-warning/10 text-warning rounded-full">Needs Renewal</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
