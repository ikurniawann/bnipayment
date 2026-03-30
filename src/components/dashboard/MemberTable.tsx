"use client";

import { Eye, Pencil, Trash2 } from "lucide-react";
import StatusBadge from "./StatusBadge";
import { PaymentRecord } from "@/lib/dummy-data";

interface MemberTableProps {
  data: PaymentRecord[];
}

export default function MemberTable({ data }: MemberTableProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-5 border-b border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900">Recent Member Activity</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Chapter
              </th>
              <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Payment
              </th>
              <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data.map((record) => (
              <tr key={record.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-bni-primary/10 flex items-center justify-center text-bni-primary text-sm font-medium">
                      {record.memberName.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {record.memberName}
                      </p>
                      <p className="text-xs text-gray-500">{record.memberId}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4 text-sm text-gray-600">
                  {record.chapter}
                </td>
                <td className="px-5 py-4">
                  <StatusBadge status={record.status} />
                </td>
                <td className="px-5 py-4">
                  <StatusBadge status={record.paymentStatus} />
                </td>
                <td className="px-5 py-4 text-sm text-gray-600">
                  {new Date(record.date).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-1">
                    <button className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-gray-700">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-gray-700">
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-danger">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}