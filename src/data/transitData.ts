export interface BusStop {
  code: string;
  name: string;
  road: string;
  seq?: number;
}

export interface BusArrivalInfo {
  estimatedMin: number; // in minutes, 0 = Arr
  crowdLevel: 'seats' | 'standing' | 'limited'; // green, orange, red
  busType: 'Double Deck' | 'Single Deck' | 'Bendy';
  wheelchairAccessible: boolean;
}

export interface ServiceArrivals {
  serviceNo: string;
  destination: string;
  operator: string;
  wheelchairAccessible: boolean;
  nextBus: BusArrivalInfo;
  secondBus: BusArrivalInfo;
  thirdBus: BusArrivalInfo;
}

export interface BusRoute {
  serviceNo: string;
  origin: string;
  destination: string;
  displayName: string;
  directions: {
    direction: 1 | 2;
    destinationName: string;
    originName: string;
    stops: BusStop[];
  }[];
}

export interface NewsItem {
  id: string;
  title: string;
  date: string;
  summary: string;
  content: string[];
  category: 'Bus Service Diversion' | 'Infrastructure' | 'Fares & Distances' | 'General';
}

export const NEWS_ITEMS: NewsItem[] = [
  {
    id: 'news-1',
    title: 'Changes To Bus Services And Boarding Berths At Sengkang Bus Interchange',
    date: '07 Oct 2026',
    category: 'Infrastructure',
    summary: 'Adjustments to passenger boarding berths for Services 80, 83, 85, 86, 87 and 163 at Sengkang Integrated Transport Hub.',
    content: [
      'To facilitate ongoing upgrading works and improve commuter flow at Sengkang Bus Interchange, boarding berths for selected bus services will be reallocated starting Monday, 12 October 2026.',
      'Affected services include Service 80, Service 83, Service 85, Service 86, Service 87, and Service 163. Commuters are advised to refer to directional signages and on-site staff guides stationed at the concourse.',
      'Wheelchair boarding bays and tactile guide paths have been refreshed to improve accessibility for all commuters.'
    ]
  },
  {
    id: 'news-2',
    title: 'Service 16/16M Affected by Road Closure for the Joo Chiat Car-Free Day',
    date: '01 Oct 2026',
    category: 'Bus Service Diversion',
    summary: 'Temporary route diversion along Joo Chiat Road on Sunday, 18 October 2026 from 6:00am to 1:00pm.',
    content: [
      'Please be informed that SBS Transit Bus Services 16 and 16M will be temporarily diverted on Sunday, 18 October 2026 from 6.00am to 1.00pm due to road closures for the community event Joo Chiat Car-Free Day.',
      'During this period, the bus services will skip 4 bus stops along Joo Chiat Road and will be routed via Dunman Road and Still Road.',
      'Commuters can board and alight at alternative stops along Dunman Road (Stop 82141) and East Coast Road (Stop 92121).'
    ]
  },
  {
    id: 'news-3',
    title: 'Updated Bus Stop Distances',
    date: '30 Sep 2026',
    category: 'Fares & Distances',
    summary: 'Annual recalibration of official route distances across SBS Transit bus routes in accordance with LTA Distance Fares framework.',
    content: [
      'SBS Transit has updated the official measured travel distances for 14 bus routes following recent road realignments and new bus bay commissionings.',
      'The recalibrated distances take effect from 1 November 2026. Under the Public Transport Council Distance-Based Fare scheme, fares are calculated seamlessly based on total trip distance travelled.',
      'Commuters may check fare stages and calculated distance brackets via the SBS Transit app Fare Calculator or the TransitLink SimplyGo portal.'
    ]
  }
];

export const BUS_ROUTES: BusRoute[] = [
  {
    serviceNo: '147',
    origin: 'Hougang Ctrl Int',
    destination: 'Clementi Int',
    displayName: '147 - Hougang Ctrl Int ⇄ Clementi Int',
    directions: [
      {
        direction: 1,
        originName: 'Hougang Ctrl Int',
        destinationName: 'Clementi Int',
        stops: [
          { code: '64009', name: 'Hougang Ctrl Int', road: 'Hougang Central', seq: 1 },
          { code: '64111', name: 'Blk 831', road: 'Hougang Ave 10', seq: 2 },
          { code: '64201', name: 'Opp Hougang Plaza', road: 'Upper Serangoon Rd', seq: 3 },
          { code: '63089', name: 'Kovan Stn Exit C', road: 'Upper Serangoon Rd', seq: 4 },
          { code: '66009', name: 'Serangoon Stn Exit H', road: 'Upper Serangoon Rd', seq: 5 },
          { code: '60111', name: 'Potong Pasir Stn Exit B', road: 'Upper Serangoon Rd', seq: 6 },
          { code: '60011', name: 'Boon Keng Stn / Blk 102', road: 'Upper Serangoon Rd', seq: 7 },
          { code: '01039', name: 'Bugis Stn Exit B', road: 'Victoria St', seq: 8 },
          { code: '01012', name: 'Hotel Grand Pacific', road: 'Victoria St', seq: 9 }, // Target stop from image!
          { code: '01029', name: 'Bras Basah Stn Exit A', road: 'Bras Basah Rd', seq: 10 },
          { code: '04121', name: 'Stamford Ct', road: 'Stamford Rd', seq: 11 },
          { code: '04239', name: 'Clarke Quay Stn', road: 'Eu Tong Sen St', seq: 12 },
          { code: '05049', name: 'Chinatown Stn Exit E', road: 'Eu Tong Sen St', seq: 13 },
          { code: '10018', name: 'Opp Pearl\'s Ctr', road: 'Eu Tong Sen St', seq: 14 },
          { code: '10021', name: 'Outram Park Stn Exit 7', road: 'New Bridge Rd', seq: 15 },
          { code: '11021', name: 'Queensway Sec Sch', road: 'Queensway', seq: 16 },
          { code: '11169', name: 'Commonwealth Stn Exit B', road: 'Commonwealth Ave', seq: 17 },
          { code: '12101', name: 'Dover Stn Exit A', road: 'Commonwealth Ave West', seq: 18 },
          { code: '17179', name: 'Clementi Int', road: 'Clementi Ave 3', seq: 19 }
        ]
      },
      {
        direction: 2,
        originName: 'Clementi Int',
        destinationName: 'Hougang Ctrl Int',
        stops: [
          { code: '17179', name: 'Clementi Int', road: 'Clementi Ave 3', seq: 1 },
          { code: '12109', name: 'Dover Stn Exit B', road: 'Commonwealth Ave West', seq: 2 },
          { code: '11161', name: 'Commonwealth Stn Exit A', road: 'Commonwealth Ave', seq: 3 },
          { code: '11029', name: 'Opp Queensway Sec Sch', road: 'Queensway', seq: 4 },
          { code: '10011', name: 'Pearl\'s Ctr', road: 'New Bridge Rd', seq: 5 },
          { code: '05019', name: 'Chinatown Point', road: 'New Bridge Rd', seq: 6 },
          { code: '04222', name: 'Opp Clarke Quay Stn', road: 'New Bridge Rd', seq: 7 },
          { code: '04149', name: 'Capitol Bldg', road: 'North Bridge Rd', seq: 8 },
          { code: '01013', name: 'Opp Hotel Grand Pacific', road: 'Victoria St', seq: 9 },
          { code: '01059', name: 'Bugis Stn Exit A', road: 'Victoria St', seq: 10 },
          { code: '60019', name: 'Boon Keng Stn Exit B', road: 'Upper Serangoon Rd', seq: 11 },
          { code: '60119', name: 'Potong Pasir Stn Exit A', road: 'Upper Serangoon Rd', seq: 12 },
          { code: '66001', name: 'Serangoon Stn Exit C', road: 'Upper Serangoon Rd', seq: 13 },
          { code: '63081', name: 'Kovan Stn Exit B', road: 'Upper Serangoon Rd', seq: 14 },
          { code: '64009', name: 'Hougang Ctrl Int', road: 'Hougang Central', seq: 15 }
        ]
      }
    ]
  },
  {
    serviceNo: '65',
    origin: 'Tampines Int',
    destination: 'HarbourFront Int',
    displayName: '65 - Tampines Int ⇄ HarbourFront Int',
    directions: [
      {
        direction: 1,
        originName: 'Tampines Int',
        destinationName: 'HarbourFront Int',
        stops: [
          { code: '84009', name: 'Tampines Int', road: 'Tampines Central 1', seq: 1 },
          { code: '75009', name: 'Bedok Reservoir Stn', road: 'Bedok Reservoir Rd', seq: 2 },
          { code: '61009', name: 'MacPherson Stn Exit A', road: 'Paya Lebar Rd', seq: 3 },
          { code: '60011', name: 'Boon Keng Stn / Blk 102', road: 'Upper Serangoon Rd', seq: 4 },
          { code: '07211', name: 'Little India Stn Exit A', road: 'Bukit Timah Rd', seq: 5 },
          { code: '08057', name: 'Dhoby Ghaut Stn', road: 'Orchard Rd', seq: 6 },
          { code: '09048', name: 'Somerset Stn', road: 'Orchard Rd', seq: 7 },
          { code: '10018', name: 'Opp Pearl\'s Ctr', road: 'Eu Tong Sen St', seq: 8 },
          { code: '14119', name: 'HarbourFront Int', road: 'Seah Im Rd', seq: 9 }
        ]
      },
      {
        direction: 2,
        originName: 'HarbourFront Int',
        destinationName: 'Tampines Int',
        stops: [
          { code: '14119', name: 'HarbourFront Int', road: 'Seah Im Rd', seq: 1 },
          { code: '10011', name: 'Pearl\'s Ctr', road: 'New Bridge Rd', seq: 2 },
          { code: '08057', name: 'Dhoby Ghaut Stn', road: 'Orchard Rd', seq: 3 },
          { code: '84009', name: 'Tampines Int', road: 'Tampines Central 1', seq: 4 }
        ]
      }
    ]
  },
  {
    serviceNo: '7',
    origin: 'Bedok Int',
    destination: 'Clementi Int',
    displayName: '7 - Bedok Int ⇄ Clementi Int',
    directions: [
      {
        direction: 1,
        originName: 'Bedok Int',
        destinationName: 'Clementi Int',
        stops: [
          { code: '82009', name: 'Bedok Int', road: 'Bedok North Ave 1', seq: 1 },
          { code: '01012', name: 'Hotel Grand Pacific', road: 'Victoria St', seq: 2 },
          { code: '08057', name: 'Dhoby Ghaut Stn', road: 'Orchard Rd', seq: 3 },
          { code: '17179', name: 'Clementi Int', road: 'Clementi Ave 3', seq: 4 }
        ]
      },
      {
        direction: 2,
        originName: 'Clementi Int',
        destinationName: 'Bedok Int',
        stops: [
          { code: '17179', name: 'Clementi Int', road: 'Clementi Ave 3', seq: 1 },
          { code: '08057', name: 'Dhoby Ghaut Stn', road: 'Orchard Rd', seq: 2 },
          { code: '82009', name: 'Bedok Int', road: 'Bedok North Ave 1', seq: 3 }
        ]
      }
    ]
  },
  {
    serviceNo: '12',
    origin: 'Pasir Ris Int',
    destination: 'Kampong Bahru Ter',
    displayName: '12 - Pasir Ris Int ⇄ Kampong Bahru Ter',
    directions: [
      {
        direction: 1,
        originName: 'Pasir Ris Int',
        destinationName: 'Kampong Bahru Ter',
        stops: [
          { code: '77009', name: 'Pasir Ris Int', road: 'Pasir Ris Central', seq: 1 },
          { code: '01012', name: 'Hotel Grand Pacific', road: 'Victoria St', seq: 2 },
          { code: '05049', name: 'Chinatown Stn Exit E', road: 'Eu Tong Sen St', seq: 3 },
          { code: '10041', name: 'Kampong Bahru Ter', road: 'Spooner Rd', seq: 4 }
        ]
      },
      {
        direction: 2,
        originName: 'Kampong Bahru Ter',
        destinationName: 'Pasir Ris Int',
        stops: [
          { code: '10041', name: 'Kampong Bahru Ter', road: 'Spooner Rd', seq: 1 },
          { code: '77009', name: 'Pasir Ris Int', road: 'Pasir Ris Central', seq: 2 }
        ]
      }
    ]
  },
  {
    serviceNo: '174',
    origin: 'Boon Lay Int',
    destination: 'Kampong Bahru Ter',
    displayName: '174 - Boon Lay Int ⇄ Kampong Bahru Ter',
    directions: [
      {
        direction: 1,
        originName: 'Boon Lay Int',
        destinationName: 'Kampong Bahru Ter',
        stops: [
          { code: '22009', name: 'Boon Lay Int', road: 'Jurong West Central 3', seq: 1 },
          { code: '01012', name: 'Hotel Grand Pacific', road: 'Victoria St', seq: 2 },
          { code: '10041', name: 'Kampong Bahru Ter', road: 'Spooner Rd', seq: 3 }
        ]
      },
      {
        direction: 2,
        originName: 'Kampong Bahru Ter',
        destinationName: 'Boon Lay Int',
        stops: [
          { code: '10041', name: 'Kampong Bahru Ter', road: 'Spooner Rd', seq: 1 },
          { code: '22009', name: 'Boon Lay Int', road: 'Jurong West Central 3', seq: 2 }
        ]
      }
    ]
  },
  {
    serviceNo: '16/16M',
    origin: 'Bukit Merah Int',
    destination: 'Bedok Int',
    displayName: '16/16M - Bukit Merah Int ⇄ Bedok Int',
    directions: [
      {
        direction: 1,
        originName: 'Bukit Merah Int',
        destinationName: 'Bedok Int',
        stops: [
          { code: '10009', name: 'Bukit Merah Int', road: 'Bt Merah Ctrl', seq: 1 },
          { code: '08057', name: 'Dhoby Ghaut Stn', road: 'Orchard Rd', seq: 2 },
          { code: '82009', name: 'Bedok Int', road: 'Bedok North Ave 1', seq: 3 }
        ]
      },
      {
        direction: 2,
        originName: 'Bedok Int',
        destinationName: 'Bukit Merah Int',
        stops: [
          { code: '82009', name: 'Bedok Int', road: 'Bedok North Ave 1', seq: 1 },
          { code: '10009', name: 'Bukit Merah Int', road: 'Bt Merah Ctrl', seq: 2 }
        ]
      }
    ]
  }
];

// All popular stops dictionary for easy lookup
export const ALL_BUS_STOPS: BusStop[] = [
  { code: '01012', name: 'Hotel Grand Pacific', road: 'Victoria St' },
  { code: '01029', name: 'Bras Basah Stn Exit A', road: 'Bras Basah Rd' },
  { code: '01039', name: 'Bugis Stn Exit B', road: 'Victoria St' },
  { code: '04121', name: 'Stamford Ct', road: 'Stamford Rd' },
  { code: '04239', name: 'Clarke Quay Stn', road: 'Eu Tong Sen St' },
  { code: '05049', name: 'Chinatown Stn Exit E', road: 'Eu Tong Sen St' },
  { code: '08057', name: 'Dhoby Ghaut Stn', road: 'Orchard Rd' },
  { code: '10018', name: 'Opp Pearl\'s Ctr', road: 'Eu Tong Sen St' },
  { code: '11021', name: 'Queensway Sec Sch', road: 'Queensway' },
  { code: '11169', name: 'Commonwealth Stn Exit B', road: 'Commonwealth Ave' },
  { code: '12101', name: 'Dover Stn Exit A', road: 'Commonwealth Ave West' },
  { code: '14119', name: 'HarbourFront Int', road: 'Seah Im Rd' },
  { code: '17179', name: 'Clementi Int', road: 'Clementi Ave 3' },
  { code: '22009', name: 'Boon Lay Int', road: 'Jurong West Central 3' },
  { code: '60011', name: 'Boon Keng Stn / Blk 102', road: 'Upper Serangoon Rd' },
  { code: '60111', name: 'Potong Pasir Stn Exit B', road: 'Upper Serangoon Rd' },
  { code: '63089', name: 'Kovan Stn Exit C', road: 'Upper Serangoon Rd' },
  { code: '64009', name: 'Hougang Ctrl Int', road: 'Hougang Central' },
  { code: '66009', name: 'Serangoon Stn Exit H', road: 'Upper Serangoon Rd' },
  { code: '77009', name: 'Pasir Ris Int', road: 'Pasir Ris Central' },
  { code: '82009', name: 'Bedok Int', road: 'Bedok North Ave 1' },
  { code: '84009', name: 'Tampines Int', road: 'Tampines Central 1' }
];

// Default sample arrivals data calibrated to match image precisely
export const DEFAULT_ARRIVAL_147_01012: ServiceArrivals = {
  serviceNo: '147',
  destination: 'Clementi Int',
  operator: 'SBS Transit',
  wheelchairAccessible: true,
  nextBus: {
    estimatedMin: 2,
    crowdLevel: 'seats',
    busType: 'Double Deck',
    wheelchairAccessible: true
  },
  secondBus: {
    estimatedMin: 8,
    crowdLevel: 'standing',
    busType: 'Single Deck',
    wheelchairAccessible: true
  },
  thirdBus: {
    estimatedMin: 15,
    crowdLevel: 'limited',
    busType: 'Double Deck',
    wheelchairAccessible: true
  }
};

// Rail network operational status
export const MRT_STATUS = [
  { line: 'Downtown Line (DTL)', status: 'Normal Service', color: '#0054A6' },
  { line: 'North East Line (NEL)', status: 'Normal Service', color: '#8A1B61' },
  { line: 'Sengkang LRT', status: 'Normal Service', color: '#708090' },
  { line: 'Punggol LRT', status: 'Normal Service', color: '#708090' }
];
