import React from 'react';
import { Smartphone, Download, ExternalLink } from 'lucide-react';

interface FooterProps {
  onSelectServiceTab: () => void;
  onOpenFeedback: () => void;
  onOpenLostFound: () => void;
  onOpenRailStatus: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectServiceTab,
  onOpenFeedback,
  onOpenLostFound,
  onOpenRailStatus,
}) => {
  return (
    <footer className="w-full bg-[#1b1722] text-white pt-8 pb-10 px-4 sm:px-6 mt-8">
      <div className="max-w-xl mx-auto space-y-7">
        {/* Main 2-column footer links */}
        <div className="grid grid-cols-2 gap-6 sm:gap-8 text-xs sm:text-sm">
          {/* Transport Services */}
          <div>
            <h4 className="font-extrabold uppercase text-white tracking-wider text-xs sm:text-[13px] mb-3">
              TRANSPORT SERVICES
            </h4>
            <ul className="space-y-2 text-slate-300 text-xs sm:text-sm">
              <li>
                <button
                  type="button"
                  onClick={onSelectServiceTab}
                  className="hover:text-purple-300 text-left transition-colors"
                >
                  NextBus Arrival Timings
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onSelectServiceTab}
                  className="hover:text-purple-300 text-left transition-colors"
                >
                  Bus Services
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenRailStatus}
                  className="hover:text-purple-300 text-left transition-colors"
                >
                  Downtown Line
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenRailStatus}
                  className="hover:text-purple-300 text-left transition-colors"
                >
                  North East Line
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenRailStatus}
                  className="hover:text-purple-300 text-left transition-colors"
                >
                  Sengkang &amp; Punggol LRT
                </button>
              </li>
            </ul>
          </div>

          {/* Keep In Touch */}
          <div>
            <h4 className="font-extrabold uppercase text-white tracking-wider text-xs sm:text-[13px] mb-3">
              KEEP IN TOUCH
            </h4>
            <ul className="space-y-2 text-slate-300 text-xs sm:text-sm">
              <li>
                <button
                  type="button"
                  onClick={onOpenFeedback}
                  className="hover:text-purple-300 text-left transition-colors"
                >
                  FAQ &amp; Contact Us
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenFeedback}
                  className="hover:text-purple-300 text-left transition-colors"
                >
                  Customer Feedback
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenLostFound}
                  className="hover:text-purple-300 text-left transition-colors"
                >
                  Lost &amp; Found
                </button>
              </li>
              <li>
                <a
                  href="#news"
                  className="hover:text-purple-300 block transition-colors"
                >
                  Media Releases
                </a>
              </li>
              <li>
                <span className="text-slate-400 block cursor-default">
                  Procurement
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* SBS Transit Mobile App Bar */}
        <div className="bg-[#241f2e] border border-white/10 rounded-xl p-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#702082] flex items-center justify-center text-white shrink-0">
              <Smartphone className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="font-bold text-xs sm:text-sm text-white">
                SBS Transit Mobile App
              </div>
              <div className="text-[11px] text-slate-400">
                Available on iOS and Android
              </div>
            </div>
          </div>
          <span className="bg-[#1b1722] border border-purple-500/30 text-purple-200 text-xs font-mono font-bold px-2.5 py-1 rounded">
            v4.6
          </span>
        </div>

        {/* Legal & copyright */}
        <div className="pt-4 border-t border-white/10 text-[11px] sm:text-xs text-slate-400 space-y-1.5">
          <p>Co. Registration No. 199206653M</p>
          <p>© SBS TRANSIT LTD. All Rights Reserved.</p>
          <div className="flex items-center gap-2 pt-1 flex-wrap text-slate-400">
            <a href="#privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <span>•</span>
            <a href="#terms" className="hover:text-white transition-colors">
              Terms of Use
            </a>
            <span>•</span>
            <a href="#sitemap" className="hover:text-white transition-colors">
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
