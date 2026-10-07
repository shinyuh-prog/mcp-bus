import React from 'react';
import {
  X,
  Bus,
  Train,
  MessageSquare,
  HelpCircle,
  Search,
  CheckCircle2,
  PhoneCall,
  ShieldAlert,
} from 'lucide-react';
import { MRT_STATUS } from '../data/transitData.ts';

interface NavigationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectBusMode: () => void;
  onOpenRailStatus: () => void;
  onOpenLostFound: () => void;
  onOpenFeedback: () => void;
}

export const NavigationDrawer: React.FC<NavigationDrawerProps> = ({
  isOpen,
  onClose,
  onSelectBusMode,
  onOpenRailStatus,
  onOpenLostFound,
  onOpenFeedback,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Drawer content */}
      <div className="relative w-4/5 max-w-sm bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-200 ml-auto">
        {/* Drawer Header */}
        <div className="bg-[#702082] text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="text-xl font-extrabold italic text-[#e35205] font-sans">
              SBS
            </span>
            <span
              className="text-xl font-semibold italic text-white"
              style={{ fontFamily: 'Georgia, Cambria, serif' }}
            >
              Transit
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-white/80 hover:text-white p-1 rounded-md"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Links */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6 text-sm text-slate-700">
          <div>
            <div className="text-[11px] font-bold text-[#702082] uppercase tracking-wider mb-2">
              Transport Services
            </div>
            <ul className="space-y-1">
              <li>
                <button
                  type="button"
                  onClick={() => {
                    onSelectBusMode();
                    onClose();
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-purple-50 text-slate-800 font-semibold transition-colors text-left"
                >
                  <Bus className="w-4 h-4 text-[#702082]" />
                  <span>NextBus Arrival Timings</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    onSelectBusMode();
                    onClose();
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-purple-50 text-slate-700 transition-colors text-left"
                >
                  <Search className="w-4 h-4 text-[#702082]" />
                  <span>Bus Services &amp; Routes Directory</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    onOpenRailStatus();
                    onClose();
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-purple-50 text-slate-700 transition-colors text-left"
                >
                  <Train className="w-4 h-4 text-[#0054A6]" />
                  <span>Rail Services (DTL &amp; NEL)</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Rail Status Quick Widget */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
            <div className="text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-2 flex items-center justify-between">
              <span>Rail Network Status</span>
              <span className="text-emerald-600 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Normal
              </span>
            </div>
            <div className="space-y-1.5 text-xs">
              {MRT_STATUS.map((item) => (
                <div key={item.line} className="flex items-center justify-between">
                  <span className="text-slate-700">{item.line}</span>
                  <span className="text-emerald-700 font-medium">Normal</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="text-[11px] font-bold text-[#e35205] uppercase tracking-wider mb-2">
              Commuter Support
            </div>
            <ul className="space-y-1">
              <li>
                <button
                  type="button"
                  onClick={() => {
                    onOpenFeedback();
                    onClose();
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-orange-50 text-slate-700 transition-colors text-left"
                >
                  <MessageSquare className="w-4 h-4 text-[#e35205]" />
                  <span>Customer Feedback</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    onOpenLostFound();
                    onClose();
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-orange-50 text-slate-700 transition-colors text-left"
                >
                  <HelpCircle className="w-4 h-4 text-[#e35205]" />
                  <span>Lost &amp; Found Online Enquiry</span>
                </button>
              </li>
              <li>
                <div className="px-3 py-2.5 text-xs text-slate-500 flex items-center gap-2">
                  <PhoneCall className="w-4 h-4 text-slate-400" />
                  <span>Hotline: 1800-287-2727</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Drawer Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 text-xs text-slate-500">
          <p>© 2026 SBS Transit Ltd</p>
          <p className="text-[11px] text-slate-400 mt-0.5">
            LTA NextBus Data Integration
          </p>
        </div>
      </div>
    </div>
  );
};
