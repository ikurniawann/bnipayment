"use client";

import { useState } from "react";
import { Plus, Download, Search } from "lucide-react";
import StatusBadge from "@/components/dashboard/StatusBadge";
import { members } from "@/lib/dummy-data";

export default function MemberDataPage() {
  const [search, setSearch] = useState("");
  const [chapter, setChapter] = useState("All");
  const [status, setStatus] = useState("All");

  const filteredMembers = members.filter((m) => {
    const matchesSearch = m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase());
    const matchesChapter = chapter === "All" || m.chapter === chapter;
    const matchesStatus = status === "All" || m.status === status;
    return matchesSearch && matchesChapter && matchesStatus;
  });

  const chapters = ["All", "Grow", "Rise", "Amplify", "Glorify", "Magnify", "Garuda"];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <h2 className="text-xl font-semibold text-gray-900">All Member</h2>
        <button className="flex items-center gap-2 bg-bni-primary hover:bg-bni-dark text-white px-4 py-2 rounded-lg text-sm font-medium">
          <Plus className="w-4 h-4" />
          Add New Member
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-bni-primary/20"
            />
          </div>
          <select
            value={chapter}
            onChange={(e) => setChapter(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-bni-primary/20"
          >
            {chapters.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-bni-primary/20"
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Pending">Pending</option>
            <option value="Overdue">Overdue</option>
            <option value="Expired">Expired</option>
          </select>
          <button className="flex items-center gap-2 border border-gray-200 px-4 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-50">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Table */}
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
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Subscription</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredMembers.map((member) => (
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
                  <td className="px-5 py-4 text-sm text-gray-600">{member.subscription}</td>
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
        <div className="px-5 py-4 border-t border-gray-100 flex justify-between items-center">
          <span className="text-sm text-gray-500">Showing {filteredMembers.length} of {members.length} members</span>
          <div className="flex gap-1">
            <button className="px-3 py-1 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50" disabled>Previous</button>
            <button className="px-3 py-1 text-sm bg-bni-primary text-white rounded-lg">1</button>
            <button className="px-3 py-1 text-sm border border-gray-200 rounded-lg hover:bg-gray-50">2</button>
            <button className="px-3 py-1 text-sm border border-gray-200 rounded-lg hover:bg-gray-50">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}