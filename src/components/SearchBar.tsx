import React, { useState, useRef, useEffect } from 'react';
import { Search, X, Bus, MapPin } from 'lucide-react';
import { BUS_ROUTES, ALL_BUS_STOPS } from '../data/transitData.ts';

interface SearchBarProps {
  onSelectService: (serviceNo: string) => void;
  onSelectStop: (stopCode: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onSelectService,
  onSelectStop,
}) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Filter routes and stops
  const trimmed = query.trim().toLowerCase();
  const matchedRoutes = trimmed
    ? BUS_ROUTES.filter(
        (r) =>
          r.serviceNo.toLowerCase().includes(trimmed) ||
          r.displayName.toLowerCase().includes(trimmed)
      )
    : [];

  const matchedStops = trimmed
    ? ALL_BUS_STOPS.filter(
        (s) =>
          s.code.includes(trimmed) ||
          s.name.toLowerCase().includes(trimmed) ||
          s.road.toLowerCase().includes(trimmed)
      )
    : [];

  const hasMatches = matchedRoutes.length > 0 || matchedStops.length > 0;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="w-full relative" ref={dropdownRef}>
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Search"
          className="w-full bg-white border border-slate-300 rounded-full py-2.5 pl-4 pr-10 text-sm text-slate-800 placeholder-slate-400 shadow-2xs focus:outline-none focus:ring-2 focus:ring-[#702082]/40 focus:border-[#702082] transition-all"
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3.5 pointer-events-none text-slate-500">
          {query ? (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setQuery('');
              }}
              className="pointer-events-auto p-0.5 hover:text-slate-700"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <Search className="w-4 h-4 text-slate-400 stroke-[2.2]" />
          )}
        </div>
      </div>

      {/* Autocomplete popup */}
      {isOpen && query.trim() && (
        <div className="absolute left-0 right-0 mt-1.5 bg-white border border-slate-200 rounded-xl shadow-lg z-50 overflow-hidden max-h-72 overflow-y-auto">
          {hasMatches ? (
            <div className="p-2 space-y-1">
              {matchedRoutes.length > 0 && (
                <div>
                  <div className="px-2 py-1 text-[11px] font-semibold text-[#702082] uppercase tracking-wider">
                    Bus Services
                  </div>
                  {matchedRoutes.map((route) => (
                    <button
                      key={route.serviceNo}
                      type="button"
                      onClick={() => {
                        onSelectService(route.serviceNo);
                        setQuery('');
                        setIsOpen(false);
                      }}
                      className="w-full flex items-center justify-between px-3 py-2 text-left rounded-lg text-sm text-slate-700 hover:bg-purple-50 transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        <Bus className="w-4 h-4 text-[#702082]" />
                        <span className="font-semibold text-slate-900">
                          Service {route.serviceNo}
                        </span>
                        <span className="text-xs text-slate-500 truncate max-w-[190px]">
                          {route.origin} ⇄ {route.destination}
                        </span>
                      </span>
                      <span className="text-xs text-[#702082] font-medium">View</span>
                    </button>
                  ))}
                </div>
              )}

              {matchedStops.length > 0 && (
                <div>
                  <div className="px-2 py-1 text-[11px] font-semibold text-[#e35205] uppercase tracking-wider mt-1">
                    Bus Stops
                  </div>
                  {matchedStops.slice(0, 5).map((stop) => (
                    <button
                      key={stop.code}
                      type="button"
                      onClick={() => {
                        onSelectStop(stop.code);
                        setQuery('');
                        setIsOpen(false);
                      }}
                      className="w-full flex items-center justify-between px-3 py-2 text-left rounded-lg text-sm text-slate-700 hover:bg-orange-50 transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-[#e35205]" />
                        <div>
                          <span className="font-semibold text-slate-900 block text-xs">
                            {stop.name}
                          </span>
                          <span className="text-[11px] text-slate-500">
                            Stop {stop.code} • {stop.road}
                          </span>
                        </div>
                      </span>
                      <span className="text-xs text-[#e35205] font-medium">Select</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="p-4 text-center text-xs text-slate-500">
              No matching bus services or stops found for &ldquo;{query}&rdquo;.
            </div>
          )}
        </div>
      )}
    </div>
  );
};
