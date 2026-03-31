"use client";

import { useState, useRef } from "react";
import { Download, Upload, FileSpreadsheet, CheckCircle, AlertCircle, Eye, Trash2 } from "lucide-react";

// Dummy data untuk preview import results - chapter sesuai dataset BNI
const importedData = [
  { id: "imp001", name: "John Doe", email: "john@example.com", chapter: "Rise", status: "Success", importDate: "2024-03-31" },
  { id: "imp002", name: "Jane Smith", email: "jane@example.com", chapter: "Grow", status: "Success", importDate: "2024-03-31" },
  { id: "imp003", name: "Bob Johnson", email: "bob@example.com", chapter: "Amplify", status: "Failed", importDate: "2024-03-31" },
  { id: "imp004", name: "Alice Brown", email: "alice@example.com", chapter: "Glorify", status: "Success", importDate: "2024-03-31" },
  { id: "imp005", name: "Charlie Davis", email: "charlie@example.com", chapter: "Magnify", status: "Success", importDate: "2024-03-31" },
  { id: "imp006", name: "Diana Evans", email: "diana@example.com", chapter: "Garuda", status: "Success", importDate: "2024-03-31" },
];

export default function ImportExportPage() {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<"idle" | "success" | "error">("idle");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDownloadTemplate = () => {
    // Create a simple CSV template dengan chapter BNI
    const csvContent = "Name,Email,Chapter,Phone,Address\nAhmad Wijaya,ahmad@email.com,Rise,08123456789,Jl. Sudirman No. 123\nSiti Nurhaliza,siti@email.com,Grow,08198765432,Jl. Thamrin No. 456\nBudi Santoso,budi@email.com,Amplify,08123456780,Jl. Gatot Subroto No. 789\nDewi Lestari,dewi@email.com,Glorify,08199887766,Jl. Rasuna Said No. 101\nHendra Pratama,hendra@email.com,Magnify,08123456999,Jl. MH Thamrin No. 55\nRina Kusuma,rina@email.com,Garuda,08198881234,Jl. Asia Afrika No. 88";
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "bnipayment_import_template.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    // Simulate upload delay
    setTimeout(() => {
      setIsUploading(false);
      setUploadStatus("success");
      // Reset after 3 seconds
      setTimeout(() => setUploadStatus("idle"), 3000);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Export / Import</h2>
      </div>

      {/* Upload Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Import Data Member</h3>
        <p className="text-sm text-gray-500 mb-6">
          Upload file Excel/CSV untuk mengimport data member. Pastikan format sesuai template.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          {/* Download Template Button */}
          <button
            onClick={handleDownloadTemplate}
            className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-3 rounded-lg text-sm font-medium transition-colors"
          >
            <Download className="w-4 h-4" />
            Download Format Template
          </button>

          {/* Upload Button */}
          <input
            type="file"
            ref={fileInputRef}
            accept=".xlsx,.xls,.csv"
            className="hidden"
            onChange={handleFileUpload}
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="flex items-center justify-center gap-2 bg-bni-primary hover:bg-bni-dark disabled:opacity-50 text-white px-4 py-3 rounded-lg text-sm font-medium transition-colors"
          >
            {isUploading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="w-4 h-4" />
                Upload File Excel
              </>
            )}
          </button>
        </div>

        {/* Upload Status */}
        {uploadStatus === "success" && (
          <div className="mt-4 flex items-center gap-2 text-success bg-success/10 px-4 py-3 rounded-lg">
            <CheckCircle className="w-5 h-5" />
            <span className="text-sm font-medium">File berhasil diupload! Data sedang diproses.</span>
          </div>
        )}

        {uploadStatus === "error" && (
          <div className="mt-4 flex items-center gap-2 text-danger bg-danger/10 px-4 py-3 rounded-lg">
            <AlertCircle className="w-5 h-5" />
            <span className="text-sm font-medium">Upload gagal. Silakan coba lagi.</span>
          </div>
        )}
      </div>

      {/* Import History / Review Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-5 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">Review Data Import</h3>
          <p className="text-sm text-gray-500 mt-1">Data yang baru saja diimport atau dalam proses.</p>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID Import</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Chapter</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tanggal</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {importedData.map((data) => (
                <tr key={data.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-4 text-sm font-medium text-gray-900">{data.id}</td>
                  <td className="px-5 py-4 text-sm font-medium text-gray-900">{data.name}</td>
                  <td className="px-5 py-4 text-sm text-gray-600">{data.email}</td>
                  <td className="px-5 py-4 text-sm text-gray-600">{data.chapter}</td>
                  <td className="px-5 py-4">
                    <span className={`px-2.5 py-1 text-xs rounded-full ${
                      data.status === "Success" 
                        ? "bg-success/10 text-success" 
                        : "bg-danger/10 text-danger"
                    }`}>
                      {data.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-600">{data.importDate}</td>
                  <td className="px-5 py-4">
                    <div className="flex gap-2">
                      <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-danger hover:bg-red-50 rounded-lg">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden divide-y divide-gray-100">
          {importedData.map((data) => (
            <div key={data.id} className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-sm font-medium text-gray-900">{data.name}</p>
                  <p className="text-xs text-gray-500">{data.id}</p>
                </div>
                <span className={`px-2.5 py-1 text-xs rounded-full ${
                  data.status === "Success" 
                    ? "bg-success/10 text-success" 
                    : "bg-danger/10 text-danger"
                }`}>
                  {data.status}
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-xs text-gray-500 uppercase">Email</span>
                  <span className="text-sm text-gray-900">{data.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-gray-500 uppercase">Chapter</span>
                  <span className="text-sm text-gray-900">{data.chapter}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-gray-500 uppercase">Tanggal</span>
                  <span className="text-sm text-gray-900">{data.importDate}</span>
                </div>
              </div>
              <div className="flex gap-2 mt-4 pt-3 border-t border-gray-100">
                <button className="flex-1 p-2 text-gray-600 hover:bg-gray-100 rounded-lg flex items-center justify-center gap-1">
                  <Eye className="w-4 h-4" />
                  <span className="text-xs">View</span>
                </button>
                <button className="flex-1 p-2 text-danger hover:bg-red-50 rounded-lg flex items-center justify-center gap-1">
                  <Trash2 className="w-4 h-4" />
                  <span className="text-xs">Delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {importedData.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            <FileSpreadsheet className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p>Belum ada data import</p>
            <p className="text-sm">Upload file Excel untuk melihat data disini</p>
          </div>
        )}
      </div>
    </div>
  );
}
