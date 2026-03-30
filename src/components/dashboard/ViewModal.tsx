"use client";

import { X } from "lucide-react";
import StatusBadge from "./StatusBadge";
import { PaymentRecord } from "@/lib/dummy-data";

interface ViewModalProps {
  data: PaymentRecord | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ViewModal({ data, isOpen, onClose }: ViewModalProps) {
  if (!isOpen || !data) return null;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">Detail Member</h3>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto max-h-[calc(90vh-80px)]">
          {/* Avatar & Name */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-bni-primary/10 flex items-center justify-center text-bni-primary text-2xl font-bold">
              {data.memberName.charAt(0)}
            </div>
            <div>
              <h4 className="text-xl font-semibold text-gray-900">{data.memberName}</h4>
              <p className="text-sm text-gray-500">ID: {data.memberId}</p>
            </div>
          </div>

          {/* Info Grid */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Chapter</p>
                <p className="text-sm font-medium text-gray-900">{data.chapter}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Status</p>
                <StatusBadge status={data.status} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Payment Status</p>
                <StatusBadge status={data.paymentStatus} />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Date</p>
                <p className="text-sm font-medium text-gray-900">
                  {new Date(data.date).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>

            {data.amount && (
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Amount</p>
                <p className="text-lg font-bold text-bni-primary">{formatCurrency(data.amount)}</p>
              </div>
            )}

            {/* Timeline */}
            <div className="border-t border-gray-100 pt-4 mt-4">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">Activity Timeline</p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-success mt-1.5" />
                  <div>
                    <p className="text-sm text-gray-900">Member Registration</p>
                    <p className="text-xs text-gray-500">Joined as {data.chapter} member</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-warning mt-1.5" />
                  <div>
                    <p className="text-sm text-gray-900">Payment {data.paymentStatus}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(data.date).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-3 p-5 border-t border-gray-100 bg-gray-50">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100"
          >
            Close
          </button>
          <button className="flex-1 px-4 py-2 bg-bni-primary hover:bg-bni-dark text-white rounded-lg text-sm font-medium">
            Edit Member
          </button>
        </div>
      </div>
    </div>
  );
}