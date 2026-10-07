import React from 'react';

interface HeaderProps {
  fontSizeLevel: 'normal' | 'large' | 'larger';
  setFontSizeLevel: (level: 'normal' | 'large' | 'larger') => void;
  onOpenMenu: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  fontSizeLevel,
  setFontSizeLevel,
  onOpenMenu,
}) => {
  return (
    <header className="w-full flex items-center justify-between py-3 px-3 sm:px-4">
      {/* SBS Transit Logo */}
      <a href="/" className="flex items-center gap-1 select-none group" aria-label="SBS Transit Home">
        <span className="text-2xl sm:text-3xl font-extrabold italic tracking-tight text-[#e35205] font-sans">
          SBS
        </span>
        <span
          className="text-2xl sm:text-3xl font-semibold italic tracking-tight text-[#702082]"
          style={{ fontFamily: 'Georgia, Cambria, serif' }}
        >
          Transit
        </span>
      </a>

      {/* Right controls: A+ A A- accessibility and hamburger menu */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        <div
          className="flex items-center border border-[#702082]/30 rounded bg-white shadow-xs overflow-hidden"
          role="group"
          aria-label="Text size adjustments"
        >
          <button
            type="button"
            onClick={() => setFontSizeLevel('larger')}
            title="Increase font size"
            aria-pressed={fontSizeLevel === 'larger'}
            className={`px-2 py-1 text-xs font-semibold transition-colors border-r border-[#702082]/20 min-w-[28px] text-center ${
              fontSizeLevel === 'larger'
                ? 'bg-[#702082] text-white'
                : 'text-[#702082] hover:bg-purple-50'
            }`}
          >
            A+
          </button>
          <button
            type="button"
            onClick={() => setFontSizeLevel('large')}
            title="Default font size"
            aria-pressed={fontSizeLevel === 'large'}
            className={`px-2 py-1 text-xs font-semibold transition-colors border-r border-[#702082]/20 min-w-[26px] text-center ${
              fontSizeLevel === 'large'
                ? 'bg-[#702082] text-white'
                : 'text-[#702082] hover:bg-purple-50'
            }`}
          >
            A
          </button>
          <button
            type="button"
            onClick={() => setFontSizeLevel('normal')}
            title="Decrease font size"
            aria-pressed={fontSizeLevel === 'normal'}
            className={`px-2 py-1 text-xs font-semibold transition-colors min-w-[26px] text-center ${
              fontSizeLevel === 'normal'
                ? 'bg-[#702082] text-white'
                : 'text-[#702082] hover:bg-purple-50'
            }`}
          >
            A-
          </button>
        </div>

        {/* Hamburger Menu button */}
        <button
          type="button"
          onClick={onOpenMenu}
          aria-label="Open Navigation Menu"
          className="w-9 h-9 sm:w-10 sm:h-10 bg-[#702082] hover:bg-[#581768] active:scale-95 text-white rounded flex flex-col items-center justify-center gap-1 transition-all shadow-xs"
        >
          <span className="w-4 h-0.5 bg-white rounded-full transition-transform"></span>
          <span className="w-4 h-0.5 bg-white rounded-full transition-transform"></span>
          <span className="w-4 h-0.5 bg-white rounded-full transition-transform"></span>
        </button>
      </div>
    </header>
  );
};
