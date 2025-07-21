export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  res.status(200).json({
    name: 'TModLoader MCP Server',
    description: 'MCP Server para desenvolvimento de mods TModLoader',
    version: '1.0.0',
    platform: 'vercel',
    tools: [
      'get_tmodloader_documentation',
      'get_tutorial_guide',
      'get_youtube_tutorials',
      'get_best_practices',
      'get_community_patterns',
      'get_latest_api_changes',
      'create_mod_structure',
      'analyze_mod_code',
      'generate_mod_code',
      'get_latest_tmodloader_info',
      'get_popular_mods_analysis'
    ],
    endpoints: {
      health: '/api/health',
      info: '/api/info',
      mcp: '/api/mcp'
    },
    deployment: {
      platform: 'vercel',
      region: process.env.VERCEL_REGION || 'unknown',
      environment: process.env.NODE_ENV || 'production'
    }
  });
} 