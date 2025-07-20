import express from 'express';
import cors from 'cors';
import { TModLoaderMCPServer } from './dist/index.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Inicializar MCP Server
const mcpServer = new TModLoaderMCPServer();

// Endpoint para health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    service: 'tmodloader-mcp',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// Endpoint para informações do serviço
app.get('/info', (req, res) => {
  res.json({
    name: 'TModLoader MCP Server',
    description: 'MCP Server para desenvolvimento de mods TModLoader',
    version: '1.0.0',
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
      health: '/health',
      info: '/info',
      mcp: '/mcp'
    }
  });
});

// Endpoint principal do MCP
app.post('/mcp', async (req, res) => {
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
    
    res.json(result);
  } catch (error) {
    console.error('MCP Error:', error);
    res.status(500).json({ 
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

// Endpoint para teste de ferramentas
app.post('/test/:tool', async (req, res) => {
  try {
    const { tool } = req.params;
    const params = req.body;
    
    const result = await mcpServer.handleRequest(tool, params);
    
    res.json({
      tool,
      params,
      result
    });
  } catch (error) {
    res.status(500).json({ 
      error: error.message,
      tool: req.params.tool
    });
  }
});

// Middleware de erro
app.use((err, req, res, next) => {
  console.error('Server Error:', err);
  res.status(500).json({ 
    error: 'Internal Server Error',
    message: err.message
  });
});

// Middleware 404
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: 'Endpoint not found',
    availableEndpoints: [
      'GET /health',
      'GET /info',
      'POST /mcp',
      'POST /test/:tool'
    ]
  });
});

app.listen(port, () => {
  console.log(`🚀 TModLoader MCP Server running on port ${port}`);
  console.log(`📊 Health check: http://localhost:${port}/health`);
  console.log(`ℹ️  Info: http://localhost:${port}/info`);
  console.log(`🔧 MCP endpoint: http://localhost:${port}/mcp`);
}); 