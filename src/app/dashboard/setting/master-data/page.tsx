"use client";

import { useState } from "react";
import { Plus, Search, Database } from "lucide-react";

export default function MasterDataPage() {
  const [activeTab, setActiveTab] = useState("chapters");

  const chapters = [
    { id: "c001", name: "Jakarta Utara", code: "JKU", region: "Jakarta", members: 45, status: "Active" },
    { id: "c002", name: "Jakarta Selatan", code: "JKS", region: "Jakarta", members: 52, status: "Active" },
    { id: "c003", name: "BSD", code: "BSD", region: "Tangerang", members: 38, status: "Active" },
    { id: "c004", name: "Surabaya", code: "SBY", region: "Jawa Timur", members: 41, status: "Active" },
    { id: "c005", name: "Bandung", code: "BDG", region: "Jawa Barat", members: 35, status: "Active" },
  ];

  const subscriptionPlans = [
    { id: "p001", name: "Basic", price: 1500000, duration: "12 months", features: ["Basic Support", "Member Directory"], status: "Active" },
    { id: "p002", name: "Premium", price: 2500000, duration: "12 months", features: ["Priority Support", "Member Directory", "Event Access", "Training"], status: "Active" },
  ];

  const regions = [
    { id: "r001", name: "Jakarta", code: "JKT", chapters: 5, members: 120 },
    { id: "r002", name: "Jawa Barat", code: "JBR", chapters: 3, members: 85 },
    { id: "r003", name: "Jawa Timur", code: "JTM", chapters: 2, members: 65 },
    { id: "r004", name: "Tangerang", code: "TGR", chapters: 1, members: 38 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Master Data</h2>
        <button className="flex items-center gap-2 bg-bni-primary hover:bg-bni-dark text-white px-4 py-2 rounded-lg text-sm font-medium">
          <Plus className="w-4 h-4" />
          Add New
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-200">
        <button
          onClick={() => setActiveTab("chapters")}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === "chapters"
              ? "border-bni-primary text-bni-primary"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          Chapters
        </button>
        <button
          onClick={() => setActiveTab("plans")}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === "plans"
              ? "border-bni-primary text-bni-primary"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          Subscription Plans
        </button>
        <button
          onClick={() => setActiveTab("regions")}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === "regions"
              ? "border-bni-primary text-bni-primary"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          Regions
        </button>
      </div>

      {/* Content */}
      {activeTab === "chapters" && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Code</th>
                  <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Chapter Name</th>
                  <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Region</th>
                  <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Members</th>
                  <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {chapters.map((chapter) => (
                  <tr key={chapter.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-4 text-sm font-medium text-gray-900">{chapter.code}</td>
                    <td className="px-5 py-4 text-sm font-medium text-gray-900">{chapter.name}</td>
                    <td className="px-5 py-4 text-sm text-gray-600">{chapter.region}</td>
                    <td className="px-5 py-4 text-sm text-gray-600">{chapter.members}</td>
                    <td className="px-5 py-4">
                      <span className="px-2.5 py-1 text-xs bg-success/10 text-success rounded-full">{chapter.status}</span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex gap-2">
                        <button className="px-3 py-1 text-xs border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50">Edit</button>
                        <button className="px-3 py-1 text-xs border border-gray-200 rounded-lg text-danger hover:bg-red-50">Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === "plans" && (
        <div className="space-y-4">
          {subscriptionPlans.map((plan) => (
            <div key={plan.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{plan.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">IDR {plan.price.toLocaleString()} / {plan.duration}</p>
                </div>
                <span className="px-2.5 py-1 text-xs bg-success/10 text-success rounded-full">{plan.status}</span>
              </div>
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-500 mb-2">Features:</p>
                <ul className="space-y-1">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="text-sm text-gray-600 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-bni-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-4 flex gap-2">
                <button className="px-3 py-1 text-xs border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50">Edit</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "regions" && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Code</th>
                  <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Region Name</th>
                  <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Chapters</th>
                  <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Members</th>
                  <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {regions.map((region) => (
                  <tr key={region.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-4 text-sm font-medium text-gray-900">{region.code}</td>
                    <td className="px-5 py-4 text-sm font-medium text-gray-900">{region.name}</td>
                    <td className="px-5 py-4 text-sm text-gray-600">{region.chapters}</td>
                    <td className="px-5 py-4 text-sm text-gray-600">{region.members}</td>
                    <td className="px-5 py-4">
                      <button className="px-3 py-1 text-xs border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50">Edit</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}