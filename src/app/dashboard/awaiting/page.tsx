"use client";

import { useState } from "react";
import StatCard from "@/components/dashboard/StatCard";
import MemberTable from "@/components/dashboard/MemberTable";
import { paymentRecords, paymentStats } from "@/lib/dummy-data";
import { CheckCircle, Send, X, Mail } from "lucide-react";

export default function AwaitingPage() {
  const awaitingPayments = paymentRecords.filter((r) => r.paymentStatus === "Awaiting");

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessWizard, setShowSuccessWizard] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSentAllReminder = () => {
    setShowConfirmModal(true);
  };

  const handleConfirmSend = async () => {
    setSending(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setSending(false);
    setShowConfirmModal(false);
    setShowSuccessWizard(true);
  };

  const handleCloseSuccess = () => {
    setShowSuccessWizard(false);
  };

  // Confirmation Modal
  if (showConfirmModal) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Konfirmasi Kirim Reminder</h2>
              <button
                onClick={() => !sending && setShowConfirmModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                disabled={sending}
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              {awaitingPayments.length} reminder akan dikirim
            </p>
          </div>

          <div className="p-6 max-h-80 overflow-y-auto">
            <div className="space-y-3">
              {awaitingPayments.map((payment) => (
                <div
                  key={payment.id}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                >
                  <div className="w-10 h-10 rounded-full bg-bni-primary/10 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-bni-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{payment.memberName}</p>
                    <p className="text-xs text-gray-500">{payment.email || "No email"}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 bg-gray-50 border-t border-gray-100 flex gap-3">
            <button
              onClick={() => !sending && setShowConfirmModal(false)}
              className="flex-1 px-4 py-3 border border-gray-200 rounded-lg text-gray-700 font-medium hover:bg-gray-100 transition-colors"
              disabled={sending}
            >
              Batal
            </button>
            <button
              onClick={handleConfirmSend}
              disabled={sending}
              className="flex-1 px-4 py-3 bg-bni-primary text-white rounded-lg font-medium hover:bg-bni-dark transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {sending ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Mengirim...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Kirim Semua
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Success Wizard
  if (showSuccessWizard) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
          <div className="p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Berhasil!</h2>
            <p className="text-gray-600 mb-2">
              {awaitingPayments.length} reminder berhasil dikirim
            </p>
            <p className="text-sm text-gray-500">
              Email reminder telah dikirim ke semua member
            </p>
          </div>
          <div className="p-6 bg-gray-50 border-t border-gray-100">
            <button
              onClick={handleCloseSuccess}
              className="w-full px-4 py-3 bg-bni-primary text-white rounded-lg font-medium hover:bg-bni-dark transition-colors"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          iconName="Clock"
          value={paymentStats.awaiting}
          label="Awaiting Confirmation"
          trend="-5%"
          trendDirection="down"
          color="amber"
        />
        <button
          onClick={handleSentAllReminder}
          className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:border-bni-primary hover:shadow-md transition-all text-left group"
        >
          <div className="flex items-start justify-between">
            <div className="p-3 rounded-lg bg-blue-500/10 text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-colors">
              <Send className="w-6 h-6" />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-3xl font-bold text-gray-900">Kirim</p>
            <p className="text-sm text-gray-500 mt-1">Sent All Reminder</p>
          </div>
        </button>
      </div>
      <MemberTable data={awaitingPayments} title="Awaiting Payment" />
    </div>
  );
}
