import React, { useState } from 'react';
import { X, Train, CheckCircle2, AlertTriangle, Clock } from 'lucide-react';
import { MRT_STATUS } from '../data/transitData.ts';

interface RailStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RailStatusModal: React.FC<RailStatusModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl overflow-hidden border border-slate-200">
        <div className="bg-[#702082] text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Train className="w-5 h-5 text-purple-200" />
            <h3 className="font-bold text-base text-white">
              SBS Transit Rail Status
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-white/80 hover:text-white p-1 rounded-md"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 flex items-center gap-2.5 text-emerald-800 text-xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>All SBS Transit rail lines are currently operating normally with regular peak frequencies.</span>
          </div>

          <div className="space-y-2.5">
            {MRT_STATUS.map((item) => (
              <div
                key={item.line}
                className="p-3 rounded-lg border border-slate-200 flex items-center justify-between bg-slate-50/50"
              >
                <div>
                  <div className="font-bold text-xs sm:text-sm text-slate-800">
                    {item.line}
                  </div>
                  <div className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                    <Clock className="w-3 h-3 text-slate-400" />
                    <span>Train frequencies: 2 - 3 mins</span>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800">
                  {item.status}
                </span>
              </div>
            ))}
          </div>

          <div className="text-xs text-slate-500 pt-2 border-t border-slate-100">
            First &amp; Last train timings available at station passenger service centres.
          </div>
        </div>

        <div className="p-3 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 bg-[#702082] text-white text-xs font-semibold rounded-md hover:bg-[#5b156a]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
