import { TModLoaderMCPServer } from '../../../dist/index.js';

const mcpServer = new TModLoaderMCPServer();

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const { tool } = req.query;
    const params = req.body;
    
    if (!tool) {
      return res.status(400).json({ 
        error: 'Tool parameter is required',
        availableTools: [
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
        ]
      });
    }
    
    const result = await mcpServer.handleRequest(tool, params);
    
    res.status(200).json({
      tool,
      params,
      result,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ 
      error: error.message,
      tool: req.query.tool,
      timestamp: new Date().toISOString()
    });
  }
} 