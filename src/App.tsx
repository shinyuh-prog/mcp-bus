import React, { useState } from 'react';
import { Header } from './components/Header.tsx';
import { SearchBar } from './components/SearchBar.tsx';
import { ModeBar } from './components/ModeBar.tsx';
import { WhatsNewCard } from './components/WhatsNewCard.tsx';
import { NextBusArrivalTimings } from './components/NextBusArrivalTimings.tsx';
import { Footer } from './components/Footer.tsx';
import { NewsModal } from './components/NewsModal.tsx';
import { NavigationDrawer } from './components/NavigationDrawer.tsx';
import { RailStatusModal } from './components/RailStatusModal.tsx';
import { FeedbackModal } from './components/FeedbackModal.tsx';
import { NewsItem } from './data/transitData.ts';
import { Smartphone, Monitor } from 'lucide-react';

export default function App() {
  // Accessibility font scaling state
  const [fontSizeLevel, setFontSizeLevel] = useState<'normal' | 'large' | 'larger'>('large');
  
  // Navigation & mode states
  const [currentMode, setCurrentMode] = useState<'BUS' | 'TRAIN' | 'FARES'>('BUS');
  const [isNavDrawerOpen, setIsNavDrawerOpen] = useState(false);
  const [activeNews, setActiveNews] = useState<NewsItem | null>(null);
  const [isRailStatusOpen, setIsRailStatusOpen] = useState(false);
  const [feedbackType, setFeedbackType] = useState<'feedback' | 'lost_found' | null>(null);

  // Selected bus service and stop query
  const [selectedServiceNo, setSelectedServiceNo] = useState<string>('147');
  const [selectedStopCode, setSelectedStopCode] = useState<string>('01012');

  // View frame toggle (Mobile-Centric Frame vs Full Responsive)
  const [viewMode, setViewMode] = useState<'mobile' | 'wide'>('mobile');

  const handleSelectService = (serviceNo: string) => {
    setSelectedServiceNo(serviceNo);
    setCurrentMode('BUS');
  };

  const handleSelectStop = (stopCode: string) => {
    setSelectedStopCode(stopCode);
    setCurrentMode('BUS');
  };

  const handleModeChange = (mode: 'BUS' | 'TRAIN' | 'FARES') => {
    setCurrentMode(mode);
    if (mode === 'TRAIN') {
      setIsRailStatusOpen(true);
    }
  };

  const fontClass =
    fontSizeLevel === 'normal'
      ? 'font-scale-normal'
      : fontSizeLevel === 'large'
      ? 'font-scale-large'
      : 'font-scale-larger';

  return (
    <div className={`min-h-screen bg-[#dce8f5] text-slate-800 ${fontClass} flex flex-col items-center justify-start`}>
      {/* Top desktop helper toolbar (hidden on mobile) */}
      <div className="w-full bg-[#1b1722] text-slate-300 text-xs py-1.5 px-4 hidden md:flex items-center justify-between border-b border-white/10">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="font-semibold text-white">SBS Transit Live Portal</span>
          <span className="text-slate-400">•</span>
          <span className="text-slate-300">NextBus Arrival Timings Engine Active</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-slate-400 text-[11px]">Display Frame:</span>
          <button
            type="button"
            onClick={() => setViewMode('mobile')}
            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs transition-colors ${
              viewMode === 'mobile'
                ? 'bg-[#702082] text-white font-semibold'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Mobile Device (Match Image)</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('wide')}
            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs transition-colors ${
              viewMode === 'wide'
                ? 'bg-[#702082] text-white font-semibold'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>Wide Desktop View</span>
          </button>
        </div>
      </div>

      {/* Main Container */}
      <div
        className={`w-full transition-all duration-200 ${
          viewMode === 'mobile'
            ? 'max-w-[460px] my-0 sm:my-4 sm:rounded-3xl shadow-2xl overflow-hidden border-0 sm:border sm:border-slate-300/80'
            : 'max-w-4xl my-0 sm:my-6 rounded-2xl shadow-xl overflow-hidden'
        }`}
      >
        {/* Sky gradient background container for the top section */}
        <div className="bg-sky-transit-gradient pt-1 px-3 sm:px-4 pb-4">
          {/* 1. Header with logo, A+ A A-, and hamburger */}
          <Header
            fontSizeLevel={fontSizeLevel}
            setFontSizeLevel={setFontSizeLevel}
            onOpenMenu={() => setIsNavDrawerOpen(true)}
          />

          {/* 2. Global search bar */}
          <div className="mt-2 mb-3">
            <SearchBar
              onSelectService={handleSelectService}
              onSelectStop={handleSelectStop}
            />
          </div>

          {/* 3. Mode selector dropdown bar ("BUS") */}
          <div className="mb-4">
            <ModeBar
              currentMode={currentMode}
              onSelectMode={handleModeChange}
            />
          </div>

          {/* 4. "What's New" purple announcement card */}
          <div className="mb-4">
            <WhatsNewCard
              onReadMore={(news) => setActiveNews(news)}
            />
          </div>
        </div>

        {/* 5. Main Content: NextBus Arrival Timings */}
        <div className="bg-[#f8ded2]/30 px-2 sm:px-3 -mt-2 pb-2">
          <NextBusArrivalTimings
            initialServiceNo={selectedServiceNo}
            initialStopCode={selectedStopCode}
          />
        </div>

        {/* 6. Footer (matches image dark section) */}
        <Footer
          onSelectServiceTab={() => {
            window.scrollTo({ top: 400, behavior: 'smooth' });
          }}
          onOpenFeedback={() => setFeedbackType('feedback')}
          onOpenLostFound={() => setFeedbackType('lost_found')}
          onOpenRailStatus={() => setIsRailStatusOpen(true)}
        />
      </div>

      {/* Modals & Drawers */}
      <NewsModal
        news={activeNews}
        onClose={() => setActiveNews(null)}
      />

      <NavigationDrawer
        isOpen={isNavDrawerOpen}
        onClose={() => setIsNavDrawerOpen(false)}
        onSelectBusMode={() => {
          setCurrentMode('BUS');
          setIsNavDrawerOpen(false);
        }}
        onOpenRailStatus={() => {
          setIsNavDrawerOpen(false);
          setIsRailStatusOpen(true);
        }}
        onOpenLostFound={() => {
          setIsNavDrawerOpen(false);
          setFeedbackType('lost_found');
        }}
        onOpenFeedback={() => {
          setIsNavDrawerOpen(false);
          setFeedbackType('feedback');
        }}
      />

      <RailStatusModal
        isOpen={isRailStatusOpen}
        onClose={() => setIsRailStatusOpen(false)}
      />

      <FeedbackModal
        type={feedbackType || 'feedback'}
        isOpen={feedbackType !== null}
        onClose={() => setFeedbackType(null)}
      />
    </div>
  );
}
