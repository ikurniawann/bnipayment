"use client";

import { UserMinus } from "lucide-react";
import StatusBadge from "@/components/dashboard/StatusBadge";
import { members } from "@/lib/dummy-data";

export default function ExMemberPage() {
  const exMembers = members.filter((m) => m.status === "Expired");

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Ex-Member</h2>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Chapter</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Join Date</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {exMembers.map((member) => (
                <tr key={member.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 text-sm font-medium">
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
                    <div className="flex gap-2">
                      <button className="px-3 py-1 text-xs border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50">Restore</button>
                      <button className="px-3 py-1 text-xs border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50">View</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {exMembers.length === 0 && (
          <div className="p-8 text-center text-gray-500">No ex-members found</div>
        )}
      </div>
    </div>
  );
}