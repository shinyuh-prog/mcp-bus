import React, { useState } from 'react';
import { ChevronDown, Bus, Train, ArrowLeftRight } from 'lucide-react';

interface ModeBarProps {
  currentMode: 'BUS' | 'TRAIN' | 'FARES';
  onSelectMode: (mode: 'BUS' | 'TRAIN' | 'FARES') => void;
}

export const ModeBar: React.FC<ModeBarProps> = ({ currentMode, onSelectMode }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-[#702082] hover:bg-[#5f1970] active:bg-[#521362] text-white font-bold py-2.5 px-4 rounded-md flex items-center justify-between shadow-xs transition-colors"
      >
        <span className="tracking-wide text-sm font-extrabold uppercase flex items-center gap-2">
          {currentMode === 'BUS' && <Bus className="w-4 h-4" />}
          {currentMode === 'TRAIN' && <Train className="w-4 h-4" />}
          {currentMode === 'FARES' && <ArrowLeftRight className="w-4 h-4" />}
          {currentMode}
        </span>
        <ChevronDown
          className={`w-5 h-5 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-md shadow-lg z-30 overflow-hidden py-1">
          <button
            type="button"
            onClick={() => {
              onSelectMode('BUS');
              setIsOpen(false);
            }}
            className={`w-full px-4 py-2.5 text-left text-xs font-bold uppercase flex items-center gap-2 transition-colors ${
              currentMode === 'BUS'
                ? 'bg-purple-50 text-[#702082]'
                : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Bus className="w-4 h-4 text-[#702082]" />
            BUS (NextBus & Routes)
          </button>
          <button
            type="button"
            onClick={() => {
              onSelectMode('TRAIN');
              setIsOpen(false);
            }}
            className={`w-full px-4 py-2.5 text-left text-xs font-bold uppercase flex items-center gap-2 transition-colors ${
              currentMode === 'TRAIN'
                ? 'bg-purple-50 text-[#702082]'
                : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Train className="w-4 h-4 text-[#0054A6]" />
            TRAIN (Downtown & North East Lines, LRT)
          </button>
          <button
            type="button"
            onClick={() => {
              onSelectMode('FARES');
              setIsOpen(false);
            }}
            className={`w-full px-4 py-2.5 text-left text-xs font-bold uppercase flex items-center gap-2 transition-colors ${
              currentMode === 'FARES'
                ? 'bg-purple-50 text-[#702082]'
                : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <ArrowLeftRight className="w-4 h-4 text-[#e35205]" />
            FARES & DISTANCE CALCULATOR
          </button>
        </div>
      )}
    </div>
  );
};
