import { TModLoaderMCPServer } from '../../dist/index.js';

// Inicializar MCP Server
const mcpServer = new TModLoaderMCPServer();

export default async function handler(req, res) {
  // Configurar CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const { method, params } = req.body;
    
    if (!method) {
      return res.status(400).json({ 
        error: 'Method is required',
        availableMethods: [
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
    
    // Processar requisição MCP
    const result = await mcpServer.handleRequest(method, params);
    
    res.status(200).json(result);
  } catch (error) {
    console.error('MCP Error:', error);
    res.status(500).json({ 
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
} 