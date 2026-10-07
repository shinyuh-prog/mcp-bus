/**
 * Health check endpoint for monitoring API status.
 * Compatible with Vercel Serverless Functions and Node.js HTTP handlers.
 */
export default async function handler(req, res) {
  // Support CORS
  if (res.setHeader) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  }

  if (req.method === 'OPTIONS') {
    if (res.status) return res.status(200).end();
    res.writeHead(200);
    return res.end();
  }

  const responsePayload = {
    status: 'ok',
    service: 'SBS Transit / LTA Bus Arrival API',
    timestamp: new Date().toISOString(),
    uptime: process.uptime ? Math.floor(process.uptime()) : 0,
    endpoints: {
      health: '/api/health',
      busArrival: '/api/bus-arrival?BusStopCode=04121&ServiceNo=7',
    },
    config: {
      hasLtaAccountKey: Boolean(process.env.LTA_ACCOUNT_KEY),
      environment: process.env.NODE_ENV || 'production',
    },
    message: process.env.LTA_ACCOUNT_KEY
      ? 'LTA_ACCOUNT_KEY is configured and active.'
      : 'LTA_ACCOUNT_KEY is not set yet. Falling back to simulated live transit data.',
  };

  if (typeof res.status === 'function' && typeof res.json === 'function') {
    return res.status(200).json(responsePayload);
  }

  // Standard Node.js res
  res.writeHead(200, { 'Content-Type': 'application/json' });
  return res.end(JSON.stringify(responsePayload));
}
