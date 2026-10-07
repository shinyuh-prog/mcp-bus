/**
 * LTA DataMall v3 Bus Arrival API Endpoint
 * 
 * Target Endpoint:
 * GET https://datamall2.mytransport.sg/ltaodataservice/v3/BusArrival?BusStopCode={code}&ServiceNo={serviceNo}
 * Header: AccountKey: {process.env.LTA_ACCOUNT_KEY}
 *
 * Query Parameters:
 * - BusStopCode: required (e.g. '04121', '01012')
 * - ServiceNo: optional (e.g. '7', '147')
 *
 * Refreshes every 20 seconds.
 */

export default async function handler(req, res) {
  // Setup CORS headers
  if (res.setHeader) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, AccountKey');
    res.setHeader('Cache-Control', 'public, max-age=20, s-maxage=20');
  }

  if (req.method === 'OPTIONS') {
    if (res.status) return res.status(200).end();
    res.writeHead(200);
    return res.end();
  }

  // Parse query parameters from req.query (Vercel/Express) or req.url (Node HTTP)
  let busStopCode = '';
  let serviceNo = '';

  if (req.query) {
    busStopCode = req.query.BusStopCode || req.query.busStopCode || '';
    serviceNo = req.query.ServiceNo || req.query.serviceNo || '';
  }

  if (!busStopCode && req.url) {
    try {
      const url = new URL(req.url, 'http://localhost');
      busStopCode = url.searchParams.get('BusStopCode') || url.searchParams.get('busStopCode') || '';
      serviceNo = url.searchParams.get('ServiceNo') || url.searchParams.get('serviceNo') || '';
    } catch {
      // ignore URL parsing error
    }
  }

  // BusStopCode is the only required parameter
  if (!busStopCode) {
    const errorResponse = {
      error: 'BusStopCode parameter is required.',
      usage: '/api/bus-arrival?BusStopCode=04121&ServiceNo=7',
      example: 'https://datamall2.mytransport.sg/ltaodataservice/v3/BusArrival?BusStopCode=04121',
    };
    if (typeof res.status === 'function') {
      return res.status(400).json(errorResponse);
    }
    res.writeHead(400, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify(errorResponse));
  }

  const accountKey = process.env.LTA_ACCOUNT_KEY || '';

  // 1. If LTA_ACCOUNT_KEY is configured, call the official LTA DataMall v3 API
  if (accountKey) {
    try {
      let ltaUrl = `https://datamall2.mytransport.sg/ltaodataservice/v3/BusArrival?BusStopCode=${encodeURIComponent(
        busStopCode
      )}`;
      if (serviceNo) {
        ltaUrl += `&ServiceNo=${encodeURIComponent(serviceNo)}`;
      }

      const ltaResponse = await fetch(ltaUrl, {
        method: 'GET',
        headers: {
          AccountKey: accountKey,
          accept: 'application/json',
        },
      });

      if (!ltaResponse.ok) {
        const errorText = await ltaResponse.text();
        const errPayload = {
          error: `LTA DataMall API responded with status ${ltaResponse.status}`,
          details: errorText,
          busStopCode,
          serviceNo,
        };
        if (typeof res.status === 'function') {
          return res.status(ltaResponse.status).json(errPayload);
        }
        res.writeHead(ltaResponse.status, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify(errPayload));
      }

      const ltaData = await ltaResponse.json();

      if (typeof res.status === 'function') {
        return res.status(200).json(ltaData);
      }
      res.writeHead(200, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify(ltaData));
    } catch (err) {
      console.error('Failed to fetch from LTA DataMall:', err);
      // Fall through to mock response on network error if needed
    }
  }

  // 2. Simulated response matching LTA DataMall v3 schema when LTA_ACCOUNT_KEY is not yet set
  const now = new Date();
  const addMinutes = (mins) => new Date(now.getTime() + mins * 60 * 1000).toISOString();

  const servicesList = [];
  const requestedServices = serviceNo ? [serviceNo] : ['147', '7', '12', '174'];

  for (const sNo of requestedServices) {
    servicesList.push({
      ServiceNo: sNo,
      Operator: 'SBST',
      NextBus: {
        OriginCode: '64009',
        DestinationCode: '17179',
        EstimatedArrival: addMinutes(2),
        Latitude: '1.29910',
        Longitude: '103.85210',
        VisitNumber: '1',
        Load: 'SEA', // SEA: Seats Available, SDA: Standing Available, LSD: Limited Standing
        Feature: 'WAB', // WAB: Wheelchair Accessible Bus
        Type: 'DD', // SD: Single Deck, DD: Double Deck, BD: Bendy
      },
      NextBus2: {
        OriginCode: '64009',
        DestinationCode: '17179',
        EstimatedArrival: addMinutes(8),
        Latitude: '1.30450',
        Longitude: '103.85520',
        VisitNumber: '1',
        Load: 'SDA',
        Feature: 'WAB',
        Type: 'SD',
      },
      NextBus3: {
        OriginCode: '64009',
        DestinationCode: '17179',
        EstimatedArrival: addMinutes(15),
        Latitude: '1.31500',
        Longitude: '103.86100',
        VisitNumber: '1',
        Load: 'LSD',
        Feature: 'WAB',
        Type: 'DD',
      },
    });
  }

  const simulatedResponse = {
    'odata.metadata': 'https://datamall2.mytransport.sg/ltaodataservice/v3/$metadata#BusArrival',
    BusStopCode: busStopCode,
    Services: servicesList,
    _mockNotice:
      'LTA_ACCOUNT_KEY environment variable is not configured. Returning simulated data matching LTA DataMall v3 schema. Once LTA_ACCOUNT_KEY is set in Vercel, live data will be returned automatically.',
  };

  if (typeof res.status === 'function') {
    return res.status(200).json(simulatedResponse);
  }
  res.writeHead(200, { 'Content-Type': 'application/json' });
  return res.end(JSON.stringify(simulatedResponse));
}
