"use client";

import { useState } from "react";
import { Database, CheckCircle, XCircle, RefreshCw, Key, Globe } from "lucide-react";

interface APIConnection {
  id: string;
  name: string;
  type: string;
  status: "Connected" | "Disconnected";
  lastSync: string;
  endpoint: string;
}

const connections: APIConnection[] = [
  {
    id: "conn001",
    name: "BNI Core API",
    type: "REST API",
    status: "Connected",
    lastSync: "2024-03-31 14:30",
    endpoint: "https://api.bni.co.id/v1",
  },
  {
    id: "conn002",
    name: "Payment Gateway",
    type: "Webhook",
    status: "Connected",
    lastSync: "2024-03-31 13:15",
    endpoint: "https://pg.example.com/webhook",
  },
  {
    id: "conn003",
    name: "CRM Integration",
    type: "REST API",
    status: "Disconnected",
    lastSync: "Never",
    endpoint: "https://crm.company.com/api",
  },
];

export default function APIConnectionPage() {
  const [testing, setTesting] = useState<string | null>(null);

  const handleTestConnection = (id: string) => {
    setTesting(id);
    setTimeout(() => setTesting(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">API Connection</h2>
        <button className="flex items-center gap-2 bg-bni-primary hover:bg-bni-dark text-white px-4 py-2 rounded-lg text-sm font-medium">
          <Database className="w-4 h-4" />
          Add Connection
        </button>
      </div>

      {/* Connection Cards */}
      <div className="grid gap-4">
        {connections.map((conn) => (
          <div key={conn.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  conn.status === "Connected" ? "bg-success/10 text-success" : "bg-gray-100 text-gray-500"
                }`}>
                  <Database className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{conn.name}</h3>
                  <p className="text-sm text-gray-500">{conn.type}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                {conn.status === "Connected" ? (
                  <span className="flex items-center gap-1 px-2.5 py-1 text-xs bg-success/10 text-success rounded-full">
                    <CheckCircle className="w-3 h-3" />
                    Connected
                  </span>
                ) : (
                  <span className="flex items-center gap-1 px-2.5 py-1 text-xs bg-danger/10 text-danger rounded-full">
                    <XCircle className="w-3 h-3" />
                    Disconnected
                  </span>
                )}
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm">
                <Globe className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600">{conn.endpoint}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Key className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600">API Key: ••••••••••••</span>
              </div>
              <div className="text-sm text-gray-500">
                Last sync: {conn.lastSync}
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => handleTestConnection(conn.id)}
                disabled={testing === conn.id}
                className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-50"
              >
                {testing === conn.id ? (
                  <>
                    <div className="w-4 h-4 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
                    Testing...
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-4 h-4" />
                    Test Connection
                  </>
                )}
              </button>
              
              <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50">
                Edit
              </button>
              
              {conn.status === "Connected" ? (
                <button className="px-4 py-2 border border-danger text-danger rounded-lg text-sm hover:bg-red-50">
                  Disconnect
                </button>
              ) : (
                <button className="px-4 py-2 bg-bni-primary text-white rounded-lg text-sm hover:bg-bni-dark">
                  Connect
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* API Documentation */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">API Documentation</h3>
        <div className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Base URL</h4>
            <code className="text-sm bg-gray-100 px-2 py-1 rounded">https://api.bnipayment.com/v1</code>
          </div>
          
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Authentication</h4>
            <p className="text-sm text-gray-600">
              Gunakan API Key yang tersedia di pengaturan untuk autentikasi.
              Sertakan dalam header: <code className="bg-gray-100 px-1 rounded">Authorization: Bearer YOUR_API_KEY</code>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
