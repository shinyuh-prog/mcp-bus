import React from 'react';
import { X, Bus, CheckCircle2 } from 'lucide-react';
import { BusRoute } from '../data/transitData.ts';

interface RouteViewerModalProps {
  route: BusRoute;
  direction: 1 | 2;
  currentStopCode: string;
  onSelectStop: (stopCode: string) => void;
  onClose: () => void;
}

export const RouteViewerModal: React.FC<RouteViewerModalProps> = ({
  route,
  direction,
  currentStopCode,
  onSelectStop,
  onClose,
}) => {
  const dirData = route.directions.find((d) => d.direction === direction) || route.directions[0];
  const stops = dirData.stops;
  const currentStopIndex = stops.findIndex((s) => s.code === currentStopCode);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden border border-slate-200">
        {/* Header */}
        <div className="bg-[#702082] text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-white/15 flex items-center justify-center font-extrabold text-lg text-white">
              {route.serviceNo}
            </div>
            <div>
              <div className="text-xs text-purple-200 font-medium">Route Sequence & Live Buses</div>
              <h3 className="text-base font-bold text-white">
                To {dirData.destinationName}
              </h3>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-md text-white/80 hover:text-white hover:bg-white/10"
            aria-label="Close route viewer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Live status banner */}
        <div className="bg-purple-50 px-4 py-2 border-b border-purple-100 flex items-center justify-between text-xs text-purple-900">
          <span className="flex items-center gap-1.5 font-medium">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            3 Active Buses On Route
          </span>
          <span className="text-slate-500 text-[11px]">
            {stops.length} Total Bus Stops
          </span>
        </div>

        {/* Stops timeline list */}
        <div className="p-4 overflow-y-auto flex-1 space-y-1">
          {stops.map((stop, index) => {
            const isCurrent = stop.code === currentStopCode;
            const isFirst = index === 0;
            const isLast = index === stops.length - 1;

            // Simulate positions of the 3 buses:
            // Bus 1 is approaching current stop (say 1 stop before)
            const bus1Near = currentStopIndex >= 1 && index === currentStopIndex - 1;
            // Bus 2 is around 4 stops behind
            const bus2Near = currentStopIndex >= 4 && index === currentStopIndex - 4;
            // Bus 3 is around 8 stops behind
            const bus3Near = currentStopIndex >= 8 && index === currentStopIndex - 8;

            return (
              <div
                key={stop.code}
                onClick={() => {
                  onSelectStop(stop.code);
                  onClose();
                }}
                className={`relative flex items-start gap-3 p-2.5 rounded-xl cursor-pointer transition-colors ${
                  isCurrent
                    ? 'bg-purple-100/70 border border-[#702082]/30'
                    : 'hover:bg-slate-50'
                }`}
              >
                {/* Timeline connector line & bullet */}
                <div className="relative flex flex-col items-center self-stretch shrink-0 w-6">
                  {!isFirst && (
                    <div className="w-0.5 bg-slate-200 flex-1 -mt-2.5"></div>
                  )}
                  <div
                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 z-10 ${
                      isCurrent
                        ? 'border-[#702082] bg-[#702082] text-white'
                        : isFirst || isLast
                        ? 'border-[#e35205] bg-white'
                        : 'border-slate-300 bg-white'
                    }`}
                  >
                    {isCurrent && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
                  </div>
                  {!isLast && (
                    <div className="w-0.5 bg-slate-200 flex-1 -mb-2.5"></div>
                  )}
                </div>

                {/* Stop info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded">
                      {stop.code}
                    </span>
                    <span
                      className={`text-sm font-semibold truncate ${
                        isCurrent ? 'text-[#702082]' : 'text-slate-800'
                      }`}
                    >
                      {stop.name}
                    </span>
                    {isCurrent && (
                      <span className="text-[10px] bg-[#702082] text-white font-bold px-1.5 py-0.5 rounded uppercase">
                        Current
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    {stop.road}
                  </div>

                  {/* Simulated approaching bus tags */}
                  {bus1Near && (
                    <div className="mt-1.5 inline-flex items-center gap-1.5 px-2 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded text-xs font-semibold">
                      <Bus className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Next Bus arriving (2 min) • Seats</span>
                    </div>
                  )}
                  {bus2Near && (
                    <div className="mt-1.5 inline-flex items-center gap-1.5 px-2 py-0.5 bg-amber-50 text-amber-800 border border-amber-200 rounded text-xs font-semibold">
                      <Bus className="w-3.5 h-3.5 text-amber-600" />
                      <span>2nd Bus (8 min) • Standing</span>
                    </div>
                  )}
                  {bus3Near && (
                    <div className="mt-1.5 inline-flex items-center gap-1.5 px-2 py-0.5 bg-red-50 text-red-800 border border-red-200 rounded text-xs font-semibold">
                      <Bus className="w-3.5 h-3.5 text-red-600" />
                      <span>3rd Bus (15 min) • Full</span>
                    </div>
                  )}
                </div>

                {/* Action button */}
                <div className="shrink-0 self-center">
                  {isCurrent ? (
                    <CheckCircle2 className="w-4 h-4 text-[#702082]" />
                  ) : (
                    <button
                      type="button"
                      className="text-xs text-[#702082] font-semibold hover:underline"
                    >
                      Select
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>Click any stop above to view estimated arrivals for that stop.</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-800 text-white rounded-md font-semibold hover:bg-slate-700 transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
