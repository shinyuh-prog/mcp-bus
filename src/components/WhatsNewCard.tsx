import React from 'react';
import { NEWS_ITEMS, NewsItem } from '../data/transitData.ts';

interface WhatsNewCardProps {
  onReadMore: (news: NewsItem) => void;
}

export const WhatsNewCard: React.FC<WhatsNewCardProps> = ({ onReadMore }) => {
  return (
    <section
      aria-label="What's New Announcements"
      className="w-full bg-[#651c78] text-white rounded-xl sm:rounded-2xl p-4 sm:p-5 shadow-md"
    >
      <h2 className="text-xl sm:text-2xl font-bold tracking-tight mb-4 text-white">
        What&apos;s New
      </h2>

      <div className="space-y-3.5">
        {NEWS_ITEMS.map((item, index) => (
          <div
            key={item.id}
            className={`${
              index > 0 ? 'pt-3 border-t border-dotted border-white/30' : ''
            }`}
          >
            <h3 className="text-sm sm:text-[15px] font-medium leading-snug text-white/95 mb-2">
              {item.title}
            </h3>

            <div className="flex items-center justify-between text-xs">
              <span className="text-white/80 font-normal">
                {item.date}
              </span>
              <button
                type="button"
                onClick={() => onReadMore(item)}
                className="text-[#ff9e1b] hover:text-[#ffb54c] active:text-[#f59e0b] font-bold text-xs tracking-wide transition-colors cursor-pointer inline-flex items-center gap-1 group"
              >
                <span>Read More</span>
                <span className="text-[10px] group-hover:translate-x-0.5 transition-transform">→</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
