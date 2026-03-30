"use client";

import { useState } from "react";
import { Eye, Pencil, Trash2, Search, X } from "lucide-react";
import StatusBadge from "./StatusBadge";
import ViewModal from "./ViewModal";
import { PaymentRecord } from "@/lib/dummy-data";

interface MemberTableProps {
  data: PaymentRecord[];
  title?: string;
}

export default function MemberTable({ data, title = "Recent Member Activity" }: MemberTableProps) {
  const [search, setSearch] = useState("");
  const [selectedRecord, setSelectedRecord] = useState<PaymentRecord | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredData = data.filter((record) =>
    record.memberName.toLowerCase().includes(search.toLowerCase()) ||
    record.chapter.toLowerCase().includes(search.toLowerCase()) ||
    record.status.toLowerCase().includes(search.toLowerCase())
  );

  const handleView = (record: PaymentRecord) => {
    setSelectedRecord(record);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRecord(null);
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-10 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-bni-primary/20"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
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
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-5 py-8 text-center text-gray-500">
                    No data found
                  </td>
                </tr>
              ) : (
                filteredData.map((record) => (
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
                        <button
                          onClick={() => handleView(record)}
                          className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-gray-700"
                          title="View"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-gray-700" title="Edit">
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-danger" title="Delete">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="px-5 py-4 border-t border-gray-100">
          <span className="text-sm text-gray-500">Showing {filteredData.length} of {data.length} records</span>
        </div>
      </div>

      <ViewModal data={selectedRecord} isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
}