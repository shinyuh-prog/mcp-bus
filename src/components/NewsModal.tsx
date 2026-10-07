import React from 'react';
import { X, Calendar, Share2, Printer } from 'lucide-react';
import { NewsItem } from '../data/transitData.ts';

interface NewsModalProps {
  news: NewsItem | null;
  onClose: () => void;
}

export const NewsModal: React.FC<NewsModalProps> = ({ news, onClose }) => {
  if (!news) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-lg w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden border border-slate-200">
        {/* Modal Header */}
        <div className="bg-[#651c78] text-white p-4 flex items-start justify-between">
          <div className="pr-4">
            <span className="text-[11px] uppercase tracking-wider text-amber-300 font-semibold block mb-1">
              SBS Transit News & Press Release
            </span>
            <h3 className="text-base sm:text-lg font-bold leading-snug">
              {news.title}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-white/80 hover:text-white p-1 rounded-md hover:bg-white/10 transition-colors shrink-0"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-4 text-slate-700 text-sm leading-relaxed">
          <div className="flex items-center gap-2 text-xs text-slate-500 pb-3 border-b border-slate-100">
            <Calendar className="w-4 h-4 text-[#702082]" />
            <span>Published: {news.date}</span>
            <span>•</span>
            <span className="text-[#e35205] font-medium">{news.category}</span>
          </div>

          <div className="p-3 bg-purple-50/70 border border-purple-100 rounded-lg text-slate-800 font-medium text-xs sm:text-sm">
            {news.summary}
          </div>

          <div className="space-y-3 text-slate-600">
            {news.content.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 text-xs text-slate-500">
            For further commuter assistance, please contact SBS Transit Customer Relations at <strong>1800-287-2727</strong> or visit our passenger service counters.
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                if (navigator.clipboard) {
                  navigator.clipboard.writeText(window.location.href);
                }
              }}
              className="text-xs text-slate-600 hover:text-[#702082] px-2.5 py-1.5 rounded-md border border-slate-200 bg-white inline-flex items-center gap-1.5 transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Copy Link</span>
            </button>
            <button
              type="button"
              onClick={() => window.print()}
              className="text-xs text-slate-600 hover:text-[#702082] px-2.5 py-1.5 rounded-md border border-slate-200 bg-white inline-flex items-center gap-1.5 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 bg-[#702082] hover:bg-[#5a1769] text-white text-xs font-semibold rounded-md transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
