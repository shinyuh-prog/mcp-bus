import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Clock,
  RotateCw,
  MapPin,
  ChevronDown,
  ArrowRightLeft,
  Route,
  Star,
  Check
} from 'lucide-react';
import {
  BUS_ROUTES,
  ALL_BUS_STOPS,
  DEFAULT_ARRIVAL_147_01012,
  ServiceArrivals,
  BusRoute,
} from '../data/transitData.ts';
import { RouteViewerModal } from './RouteViewerModal.tsx';

interface NextBusArrivalTimingsProps {
  initialServiceNo?: string;
  initialStopCode?: string;
}

export const NextBusArrivalTimings: React.FC<NextBusArrivalTimingsProps> = ({
  initialServiceNo = '147',
  initialStopCode = '01012',
}) => {
  const [activeTab, setActiveTab] = useState<'service' | 'stop'>('service');
  const [selectedServiceNo, setSelectedServiceNo] = useState<string>(initialServiceNo);
  const [selectedDirection, setSelectedDirection] = useState<1 | 2>(1);
  const [selectedStopCode, setSelectedStopCode] = useState<string>(initialStopCode);

  // For "By Bus Stop No." tab
  const [stopTabCode, setStopTabCode] = useState<string>('01012');

  // Live timer states
  const [refreshCountdown, setRefreshCountdown] = useState<number>(30);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isEstimated, setIsEstimated] = useState(true);
  const [isSavedFavorite, setIsSavedFavorite] = useState(false);
  const [showRouteModal, setShowRouteModal] = useState(false);

  // Keep state in sync if parent passed new props
  useEffect(() => {
    if (initialServiceNo) {
      setSelectedServiceNo(initialServiceNo);
    }
  }, [initialServiceNo]);

  useEffect(() => {
    if (initialStopCode) {
      setSelectedStopCode(initialStopCode);
      setStopTabCode(initialStopCode);
    }
  }, [initialStopCode]);

  // Current route object
  const currentRoute: BusRoute = useMemo(() => {
    return (
      BUS_ROUTES.find((r) => r.serviceNo === selectedServiceNo) || BUS_ROUTES[0]
    );
  }, [selectedServiceNo]);

  // Stops available for current direction
  const activeDirectionData = useMemo(() => {
    return (
      currentRoute.directions.find((d) => d.direction === selectedDirection) ||
      currentRoute.directions[0]
    );
  }, [currentRoute, selectedDirection]);

  // If the currently selected stop is not in the active direction, pick the first valid stop
  useEffect(() => {
    const hasStop = activeDirectionData.stops.some((s) => s.code === selectedStopCode);
    if (!hasStop && activeDirectionData.stops.length > 0) {
      setSelectedStopCode(activeDirectionData.stops[0].code);
    }
  }, [activeDirectionData, selectedStopCode]);

  // Current stop object
  const currentStop = useMemo(() => {
    return (
      activeDirectionData.stops.find((s) => s.code === selectedStopCode) ||
      ALL_BUS_STOPS.find((s) => s.code === selectedStopCode) || {
        code: selectedStopCode,
        name: 'Hotel Grand Pacific',
        road: 'Victoria St',
      }
    );
  }, [activeDirectionData, selectedStopCode]);

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setRefreshCountdown((prev) => {
        if (prev <= 1) {
          return 30;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleRefresh = useCallback(() => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setRefreshCountdown(30);
    }, 600);
  }, []);

  const handleEstimate = () => {
    setIsEstimated(true);
    handleRefresh();
  };

  const handleToggleDirection = () => {
    setSelectedDirection((prev) => (prev === 1 ? 2 : 1));
  };

  // Generate arrivals data
  const currentArrivals: ServiceArrivals = useMemo(() => {
    // If it's Service 147 at Stop 01012 in Dir 1, return exact numbers from image
    if (
      selectedServiceNo === '147' &&
      selectedStopCode === '01012' &&
      selectedDirection === 1
    ) {
      return DEFAULT_ARRIVAL_147_01012;
    }

    // Dynamic realistic arrivals for other stops/services
    const dirName = activeDirectionData.destinationName;
    return {
      serviceNo: selectedServiceNo,
      destination: dirName,
      operator: 'SBS Transit',
      wheelchairAccessible: true,
      nextBus: {
        estimatedMin: 3,
        crowdLevel: 'seats',
        busType: 'Double Deck',
        wheelchairAccessible: true,
      },
      secondBus: {
        estimatedMin: 11,
        crowdLevel: 'standing',
        busType: 'Single Deck',
        wheelchairAccessible: true,
      },
      thirdBus: {
        estimatedMin: 19,
        crowdLevel: 'limited',
        busType: 'Double Deck',
        wheelchairAccessible: true,
      },
    };
  }, [selectedServiceNo, selectedStopCode, selectedDirection, activeDirectionData]);

  // Multi-service arrivals for the "By Bus Stop No." tab
  const stopTabServices: ServiceArrivals[] = useMemo(() => {
    if (stopTabCode === '01012') {
      return [
        DEFAULT_ARRIVAL_147_01012,
        {
          serviceNo: '7',
          destination: 'Clementi Int',
          operator: 'SBS Transit',
          wheelchairAccessible: true,
          nextBus: { estimatedMin: 4, crowdLevel: 'seats', busType: 'Double Deck', wheelchairAccessible: true },
          secondBus: { estimatedMin: 12, crowdLevel: 'standing', busType: 'Double Deck', wheelchairAccessible: true },
          thirdBus: { estimatedMin: 22, crowdLevel: 'seats', busType: 'Single Deck', wheelchairAccessible: true },
        },
        {
          serviceNo: '12',
          destination: 'Kampong Bahru Ter',
          operator: 'SBS Transit',
          wheelchairAccessible: true,
          nextBus: { estimatedMin: 6, crowdLevel: 'standing', busType: 'Double Deck', wheelchairAccessible: true },
          secondBus: { estimatedMin: 15, crowdLevel: 'seats', busType: 'Double Deck', wheelchairAccessible: true },
          thirdBus: { estimatedMin: 25, crowdLevel: 'limited', busType: 'Single Deck', wheelchairAccessible: true },
        },
        {
          serviceNo: '174',
          destination: 'Kampong Bahru Ter',
          operator: 'SBS Transit',
          wheelchairAccessible: true,
          nextBus: { estimatedMin: 9, crowdLevel: 'seats', busType: 'Single Deck', wheelchairAccessible: true },
          secondBus: { estimatedMin: 18, crowdLevel: 'seats', busType: 'Double Deck', wheelchairAccessible: true },
          thirdBus: { estimatedMin: 28, crowdLevel: 'standing', busType: 'Double Deck', wheelchairAccessible: true },
        },
      ];
    }
    // Generic stop list
    return [
      DEFAULT_ARRIVAL_147_01012,
      {
        serviceNo: '65',
        destination: 'HarbourFront Int',
        operator: 'SBS Transit',
        wheelchairAccessible: true,
        nextBus: { estimatedMin: 5, crowdLevel: 'seats', busType: 'Double Deck', wheelchairAccessible: true },
        secondBus: { estimatedMin: 14, crowdLevel: 'standing', busType: 'Single Deck', wheelchairAccessible: true },
        thirdBus: { estimatedMin: 21, crowdLevel: 'seats', busType: 'Double Deck', wheelchairAccessible: true },
      },
    ];
  }, [stopTabCode]);

  return (
    <div className="w-full bg-white rounded-2xl sm:rounded-3xl shadow-sm border border-slate-100 p-4 sm:p-6 transition-all">
      {/* 1. Breadcrumb navigation */}
      <nav aria-label="Breadcrumb" className="text-xs font-bold mb-3 flex items-center gap-1.5 flex-wrap">
        <a href="#home" className="text-slate-600 hover:text-slate-900 transition-colors">
          HOME
        </a>
        <span className="text-slate-400">&gt;</span>
        <a href="#bus" className="text-slate-600 hover:text-slate-900 transition-colors">
          BUS
        </a>
        <span className="text-slate-400">&gt;</span>
        <span className="text-[#e35205] tracking-wide">
          NEXTBUS ARRIVAL TIMINGS
        </span>
      </nav>

      {/* 2. Section Heading */}
      <div className="mb-5">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#702082] tracking-tight">
          NextBus Arrival Timings
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Find out the estimated arrival time of your next bus!
        </p>
      </div>

      {/* 3. Tabs: By Service No. / By Bus Stop No. */}
      <div className="flex border-b border-slate-200 mb-5" role="tablist">
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'service'}
          onClick={() => setActiveTab('service')}
          className={`flex-1 sm:flex-none pb-2.5 px-4 sm:px-8 text-center text-xs sm:text-sm font-bold transition-all relative ${
            activeTab === 'service'
              ? 'text-[#702082]'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          By Service No.
          {activeTab === 'service' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#702082] rounded-full" />
          )}
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'stop'}
          onClick={() => setActiveTab('stop')}
          className={`flex-1 sm:flex-none pb-2.5 px-4 sm:px-8 text-center text-xs sm:text-sm font-bold transition-all relative ${
            activeTab === 'stop'
              ? 'text-[#702082]'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          By Bus Stop No.
          {activeTab === 'stop' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#702082] rounded-full" />
          )}
        </button>
      </div>

      {/* TAB 1: By Service No. */}
      {activeTab === 'service' && (
        <div className="space-y-4">
          {/* Service No Dropdown */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="service-select" className="text-xs font-bold text-slate-800">
                Service No. <span className="text-red-500">*</span>
              </label>
              <button
                type="button"
                onClick={handleToggleDirection}
                className="text-[11px] text-[#702082] font-semibold flex items-center gap-1 hover:underline cursor-pointer"
                title="Switch route travel direction"
              >
                <ArrowRightLeft className="w-3 h-3" />
                <span>Switch Direction ({selectedDirection === 1 ? 'Dir 1' : 'Dir 2'})</span>
              </button>
            </div>
            <div className="relative">
              <select
                id="service-select"
                value={selectedServiceNo}
                onChange={(e) => {
                  setSelectedServiceNo(e.target.value);
                  setIsEstimated(true);
                }}
                className="w-full appearance-none bg-white border border-slate-300 rounded-lg py-2.5 px-3.5 pr-10 text-xs sm:text-sm text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-[#702082]/30 focus:border-[#702082] shadow-2xs"
              >
                {BUS_ROUTES.map((route) => (
                  <option key={route.serviceNo} value={route.serviceNo}>
                    {route.displayName}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Direction Banner */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-lg p-2 flex items-center justify-between text-xs">
            <span className="text-slate-600">
              Direction: <strong className="text-slate-900">Towards {activeDirectionData.destinationName}</strong>
            </span>
            <button
              type="button"
              onClick={() => setShowRouteModal(true)}
              className="text-[#702082] font-bold text-xs flex items-center gap-1 hover:underline cursor-pointer"
            >
              <Route className="w-3.5 h-3.5" />
              <span>View Route Map</span>
            </button>
          </div>

          {/* Bus Stop No Dropdown */}
          <div>
            <label htmlFor="stop-select" className="block text-xs font-bold text-slate-800 mb-1.5">
              Bus Stop No. <span className="text-slate-400 font-normal">(*optional)</span>
            </label>
            <div className="relative">
              <select
                id="stop-select"
                value={selectedStopCode}
                onChange={(e) => {
                  setSelectedStopCode(e.target.value);
                  setIsEstimated(true);
                }}
                className="w-full appearance-none bg-white border border-slate-300 rounded-lg py-2.5 px-3.5 pr-10 text-xs sm:text-sm text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-[#702082]/30 focus:border-[#702082] shadow-2xs"
              >
                {activeDirectionData.stops.map((stop) => (
                  <option key={stop.code} value={stop.code}>
                    {stop.code} - {stop.name} ({stop.road})
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Estimate Arrival Time Button */}
          <button
            type="button"
            onClick={handleEstimate}
            className="w-full bg-[#702082] hover:bg-[#5b156a] active:bg-[#4a1056] text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer group"
          >
            <Clock className="w-4 h-4 text-white/90 group-hover:rotate-12 transition-transform" />
            <span className="text-sm tracking-wide">Estimate Arrival Time</span>
          </button>
        </div>
      )}

      {/* TAB 2: By Bus Stop No. */}
      {activeTab === 'stop' && (
        <div className="space-y-4">
          <div>
            <label htmlFor="stop-tab-select" className="block text-xs font-bold text-slate-800 mb-1.5">
              Bus Stop No. or Landmark <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                id="stop-tab-select"
                value={stopTabCode}
                onChange={(e) => {
                  setStopTabCode(e.target.value);
                  setSelectedStopCode(e.target.value);
                  setIsEstimated(true);
                }}
                className="w-full appearance-none bg-white border border-slate-300 rounded-lg py-2.5 px-3.5 pr-10 text-xs sm:text-sm text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-[#702082]/30 focus:border-[#702082] shadow-2xs"
              >
                {ALL_BUS_STOPS.map((stop) => (
                  <option key={stop.code} value={stop.code}>
                    {stop.code} - {stop.name} ({stop.road})
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Quick chip selectors for popular stops */}
          <div className="flex items-center gap-1.5 flex-wrap text-xs">
            <span className="text-slate-500 text-[11px] font-medium">Quick select:</span>
            {[
              { code: '01012', label: 'Hotel Grand Pacific' },
              { code: '01039', label: 'Bugis Stn' },
              { code: '04239', label: 'Clarke Quay' },
              { code: '05049', label: 'Chinatown' },
              { code: '17179', label: 'Clementi' },
            ].map((chip) => (
              <button
                key={chip.code}
                type="button"
                onClick={() => {
                  setStopTabCode(chip.code);
                  setSelectedStopCode(chip.code);
                  setIsEstimated(true);
                }}
                className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                  stopTabCode === chip.code
                    ? 'bg-[#702082] text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {chip.label}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={handleEstimate}
            className="w-full bg-[#702082] hover:bg-[#5b156a] active:bg-[#4a1056] text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
          >
            <Clock className="w-4 h-4 text-white/90" />
            <span className="text-sm tracking-wide">Find All Bus Arrivals</span>
          </button>
        </div>
      )}

      {/* 4. RESULTS DISPLAY (Exact match to image!) */}
      {isEstimated && (
        <div className="mt-6 pt-5 border-t border-slate-100 space-y-4 animate-in fade-in duration-200">
          {/* Header Stop banner */}
          <div className="bg-white border border-slate-200 rounded-lg p-3 sm:p-3.5 shadow-2xs">
            <div className="flex items-center justify-between gap-2 mb-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="bg-[#702082] text-white font-bold px-2 py-0.5 rounded text-xs tracking-wide">
                  STOP {currentStop.code}
                </span>
                <span className="font-bold text-slate-900 text-sm sm:text-base">
                  {currentStop.name}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsSavedFavorite(!isSavedFavorite)}
                  title={isSavedFavorite ? 'Remove from favorites' : 'Save to favorites'}
                  className="p-1 text-slate-400 hover:text-amber-500 transition-colors"
                >
                  <Star
                    className={`w-4 h-4 ${
                      isSavedFavorite
                        ? 'fill-amber-400 text-amber-500'
                        : ''
                    }`}
                  />
                </button>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  Live
                </span>
              </div>
            </div>
            <div className="text-xs text-slate-500 flex items-center gap-1.5">
              <span>{currentStop.road}</span>
              <span>•</span>
              <span>Direction towards {activeDirectionData.destinationName}</span>
            </div>
          </div>

          {/* In "By Service No." mode, display single card; In "By Bus Stop No." mode, display all services */}
          {(activeTab === 'service' ? [currentArrivals] : stopTabServices).map(
            (arrival) => (
              <div
                key={arrival.serviceNo}
                className="bg-white border border-purple-200/90 rounded-xl p-3.5 sm:p-4 shadow-xs"
              >
                {/* Top row: Service number, Destination, Operator, WAB badge */}
                <div className="flex items-start justify-between gap-2 mb-3.5">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-11 bg-purple-50 border border-purple-200 rounded-lg flex items-center justify-center text-[#702082] font-black text-xl sm:text-2xl tracking-tight">
                      {arrival.serviceNo}
                    </div>
                    <div>
                      <h2 className="text-sm sm:text-base font-bold text-slate-900 leading-tight">
                        To {arrival.destination}
                      </h2>
                      <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5">
                        Operated by {arrival.operator}
                      </p>
                    </div>
                  </div>

                  {arrival.wheelchairAccessible && (
                    <span
                      title="Wheelchair Accessible Bus"
                      className="inline-flex items-center gap-1 px-2 py-1 bg-sky-700 text-white rounded-full text-[11px] font-bold shadow-2xs shrink-0"
                    >
                      <span>♿</span>
                      <span>WAB</span>
                    </span>
                  )}
                </div>

                {/* 3 Arrival timing boxes (Exact reproduction of the screenshot) */}
                <div className="grid grid-cols-3 gap-2 sm:gap-3 text-center mb-3">
                  {/* NEXT BUS */}
                  <div className="bg-emerald-50/50 border border-emerald-300 rounded-lg p-2.5 sm:p-3 flex flex-col justify-between min-h-[90px]">
                    <div className="text-[10px] sm:text-[11px] uppercase tracking-wider font-bold text-slate-500">
                      NEXT BUS
                    </div>
                    <div className="text-xl sm:text-2xl font-black text-emerald-600 my-1">
                      {arrival.nextBus.estimatedMin === 0
                        ? 'Arr'
                        : `${arrival.nextBus.estimatedMin} min`}
                    </div>
                    <div>
                      <div className="text-[11px] font-semibold text-slate-700 flex items-center justify-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                        <span>
                          {arrival.nextBus.crowdLevel === 'seats'
                            ? 'Seats'
                            : arrival.nextBus.crowdLevel === 'standing'
                            ? 'Standing'
                            : 'Full'}
                        </span>
                      </div>
                      <div className="text-[10px] text-slate-500 mt-0.5">
                        {arrival.nextBus.busType}
                      </div>
                    </div>
                  </div>

                  {/* 2ND BUS */}
                  <div className="bg-amber-50/40 border border-amber-300 rounded-lg p-2.5 sm:p-3 flex flex-col justify-between min-h-[90px]">
                    <div className="text-[10px] sm:text-[11px] uppercase tracking-wider font-bold text-slate-500">
                      2ND BUS
                    </div>
                    <div className="text-xl sm:text-2xl font-black text-amber-600 my-1">
                      {arrival.secondBus.estimatedMin} min
                    </div>
                    <div>
                      <div className="text-[11px] font-semibold text-slate-700 flex items-center justify-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                        <span>
                          {arrival.secondBus.crowdLevel === 'seats'
                            ? 'Seats'
                            : arrival.secondBus.crowdLevel === 'standing'
                            ? 'Standing'
                            : 'Full'}
                        </span>
                      </div>
                      <div className="text-[10px] text-slate-500 mt-0.5">
                        {arrival.secondBus.busType}
                      </div>
                    </div>
                  </div>

                  {/* 3RD BUS */}
                  <div className="bg-red-50/40 border border-red-300 rounded-lg p-2.5 sm:p-3 flex flex-col justify-between min-h-[90px]">
                    <div className="text-[10px] sm:text-[11px] uppercase tracking-wider font-bold text-slate-500">
                      3RD BUS
                    </div>
                    <div className="text-xl sm:text-2xl font-black text-red-600 my-1">
                      {arrival.thirdBus.estimatedMin} min
                    </div>
                    <div>
                      <div className="text-[11px] font-semibold text-slate-700 flex items-center justify-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-red-500"></span>
                        <span>
                          {arrival.thirdBus.crowdLevel === 'seats'
                            ? 'Seats'
                            : arrival.thirdBus.crowdLevel === 'standing'
                            ? 'Standing'
                            : 'Full'}
                        </span>
                      </div>
                      <div className="text-[10px] text-slate-500 mt-0.5">
                        {arrival.thirdBus.busType}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Crowding status legend (as shown in image) */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-center gap-4 sm:gap-6 text-[11px] sm:text-xs text-slate-600">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <span>Seats Available</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                    <span>Standing</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-red-500"></span>
                    <span>Limited</span>
                  </div>
                </div>
              </div>
            )
          )}

          {/* Live countdown & Quick Refresh bar */}
          <div className="flex items-center justify-between text-xs text-slate-500 px-1 pt-1">
            <span className="flex items-center gap-1.5">
              <span>Auto-refreshes in</span>
              <strong className="text-slate-800 font-mono">{refreshCountdown}s</strong>
            </span>
            <button
              type="button"
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="inline-flex items-center gap-1 text-[#702082] hover:text-[#521362] font-semibold text-xs transition-colors cursor-pointer"
            >
              <RotateCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>Refresh Now</span>
            </button>
          </div>

          {/* LTA DataMall official attribution (as seen at bottom of result card in image) */}
          <div className="text-center text-[11px] text-slate-500 pt-3">
            Bus Arrival Information provided by{' '}
            <strong className="text-slate-700 font-semibold">
              Land Transport Authority (LTA DataMall)
            </strong>
          </div>
        </div>
      )}

      {/* Route viewer modal */}
      {showRouteModal && (
        <RouteViewerModal
          route={currentRoute}
          direction={selectedDirection}
          currentStopCode={selectedStopCode}
          onSelectStop={(code) => {
            setSelectedStopCode(code);
            setStopTabCode(code);
            setIsEstimated(true);
          }}
          onClose={() => setShowRouteModal(false)}
        />
      )}
    </div>
  );
};
