export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  res.status(200).json({ 
    status: 'ok', 
    service: 'tmodloader-mcp',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    platform: 'vercel',
    endpoints: {
      health: '/api/health',
      info: '/api/info',
      mcp: '/api/mcp'
    }
  });
} 