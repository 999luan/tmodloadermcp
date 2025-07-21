import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { TModLoaderAssistant } from './assistants/tmodloader-assistant.js';
import { DocumentationService } from './services/documentation-service.js';
import { TutorialService } from './services/tutorial-service.js';
import { BestPracticesService } from './services/best-practices-service.js';
import { ModCreationService } from './services/mod-creation-service.js';
import { InternetKnowledgeService } from './services/internet-knowledge-service.js';

class TModLoaderMCPServer {
  private server: Server;
  private tmodloaderAssistant: TModLoaderAssistant;

  constructor() {
    this.server = new Server(
      {
        name: 'tmodloader-mcp',
        version: '1.0.0',
      }
    );

    // Initialize services
    const documentationService = new DocumentationService();
    const tutorialService = new TutorialService();
    const bestPracticesService = new BestPracticesService();
    const modCreationService = new ModCreationService();
    const internetKnowledgeService = new InternetKnowledgeService();

    // Initialize assistant
    this.tmodloaderAssistant = new TModLoaderAssistant(
      documentationService,
      tutorialService,
      bestPracticesService,
      modCreationService,
      internetKnowledgeService
    );

    this.setupToolHandlers();
  }

  private setupToolHandlers() {
    // List available tools
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      return {
        tools: [
          {
            name: 'get_tmodloader_documentation',
            description: 'Get TModLoader documentation and API references',
            inputSchema: {
              type: 'object',
              properties: {
                topic: {
                  type: 'string',
                  description: 'Specific topic to search for (e.g., "items", "npcs", "tiles")',
                },
              },
            },
          },
          {
            name: 'get_tutorial_guide',
            description: 'Get step-by-step tutorial guides for TModLoader mod development',
            inputSchema: {
              type: 'object',
              properties: {
                tutorial_type: {
                  type: 'string',
                  description: 'Type of tutorial (e.g., "basic_mod", "custom_item", "boss_fight")',
                },
                difficulty: {
                  type: 'string',
                  description: 'Difficulty level (beginner, intermediate, advanced)',
                },
              },
            },
          },
          {
            name: 'get_best_practices',
            description: 'Get best practices and guidelines for TModLoader mod development',
            inputSchema: {
              type: 'object',
              properties: {
                category: {
                  type: 'string',
                  description: 'Category of best practices (e.g., "performance", "compatibility", "code_organization")',
                },
              },
            },
          },
          {
            name: 'create_mod_structure',
            description: 'Generate a complete mod project structure with best practices',
            inputSchema: {
              type: 'object',
              properties: {
                mod_name: {
                  type: 'string',
                  description: 'Name of the mod',
                },
                mod_type: {
                  type: 'string',
                  description: 'Type of mod (e.g., "content", "library", "framework")',
                },
                features: {
                  type: 'array',
                  items: { type: 'string' },
                  description: 'List of features to include',
                },
              },
            },
          },
          {
            name: 'analyze_mod_code',
            description: 'Analyze existing mod code and provide improvement suggestions',
            inputSchema: {
              type: 'object',
              properties: {
                code: {
                  type: 'string',
                  description: 'Code to analyze',
                },
                mod_type: {
                  type: 'string',
                  description: 'Type of mod code being analyzed',
                },
              },
            },
          },
          {
            name: 'generate_mod_code',
            description: 'Generate code snippets for specific TModLoader features',
            inputSchema: {
              type: 'object',
              properties: {
                feature: {
                  type: 'string',
                  description: 'Feature to generate code for (e.g., "custom_item", "boss_ai", "tile")',
                },
                parameters: {
                  type: 'object',
                  description: 'Parameters for the feature',
                },
              },
            },
          },
          {
            name: 'get_latest_tmodloader_info',
            description: 'Get latest information about TModLoader from the internet',
            inputSchema: {
              type: 'object',
              properties: {},
            },
          },
          {
            name: 'get_youtube_tutorials',
            description: 'Search for TModLoader tutorials on YouTube',
            inputSchema: {
              type: 'object',
              properties: {
                query: {
                  type: 'string',
                  description: 'Search query for tutorials (e.g., "custom item", "boss fight", "tile creation")',
                },
              },
            },
          },
          {
            name: 'get_community_patterns',
            description: 'Get community patterns and best practices for TModLoader mod development',
            inputSchema: {
              type: 'object',
              properties: {},
            },
          },
          {
            name: 'get_latest_api_changes',
            description: 'Get information about latest API changes in TModLoader',
            inputSchema: {
              type: 'object',
              properties: {},
            },
          },
          {
            name: 'get_popular_mods_analysis',
            description: 'Get analysis of popular TModLoader mods and their patterns',
            inputSchema: {
              type: 'object',
              properties: {},
            },
          },
        ],
      };
    });

    // Handle tool calls
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      try {
        switch (name) {
          case 'get_tmodloader_documentation':
            return await this.tmodloaderAssistant.getDocumentation(args?.topic as string);
          
          case 'get_tutorial_guide':
            return await this.tmodloaderAssistant.getTutorialGuide(
              args?.tutorial_type as string,
              args?.difficulty as string
            );
          
          case 'get_best_practices':
            return await this.tmodloaderAssistant.getBestPractices(args?.category as string);
          
          case 'create_mod_structure':
            return await this.tmodloaderAssistant.createModStructure(
              args?.mod_name as string,
              args?.mod_type as string,
              args?.features as string[]
            );
          
          case 'analyze_mod_code':
            return await this.tmodloaderAssistant.analyzeModCode(
              args?.code as string,
              args?.mod_type as string
            );
          
          case 'generate_mod_code':
            return await this.tmodloaderAssistant.generateModCode(
              args?.feature as string,
              args?.parameters as any
            );
          
          case 'get_latest_tmodloader_info':
            return await this.tmodloaderAssistant.getLatestTModLoaderInfo();
          
          case 'get_youtube_tutorials':
            return await this.tmodloaderAssistant.getTutorialFromYouTube(
              args?.query as string
            );
          
          case 'get_community_patterns':
            return await this.tmodloaderAssistant.getCommunityPatterns();
          
          case 'get_latest_api_changes':
            return await this.tmodloaderAssistant.getLatestAPIChanges();
          
          case 'get_popular_mods_analysis':
            return await this.tmodloaderAssistant.getPopularModsAnalysis();
          
          default:
            throw new Error(`Unknown tool: ${name}`);
        }
      } catch (error) {
        return {
          content: [
            {
              type: 'text',
              text: `Error executing tool ${name}: ${error instanceof Error ? error.message : String(error)}`,
            },
          ],
        };
      }
    });
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('TModLoader MCP Server started');
  }

  // Método para lidar com requisições HTTP (usado pelo Vercel)
  async handleRequest(method: string, params: any) {
    try {
      switch (method) {
        case 'get_tmodloader_documentation':
          return await this.tmodloaderAssistant.getDocumentation(params?.topic as string);
        
        case 'get_tutorial_guide':
          return await this.tmodloaderAssistant.getTutorialGuide(
            params?.tutorial_type as string,
            params?.difficulty as string
          );
        
        case 'get_best_practices':
          return await this.tmodloaderAssistant.getBestPractices(params?.category as string);
        
        case 'create_mod_structure':
          return await this.tmodloaderAssistant.createModStructure(
            params?.mod_name as string,
            params?.mod_type as string,
            params?.features as string[]
          );
        
        case 'analyze_mod_code':
          return await this.tmodloaderAssistant.analyzeModCode(
            params?.code as string,
            params?.mod_type as string
          );
        
        case 'generate_mod_code':
          return await this.tmodloaderAssistant.generateModCode(
            params?.feature as string,
            params?.parameters as any
          );
        
        case 'get_latest_tmodloader_info':
          return await this.tmodloaderAssistant.getLatestTModLoaderInfo();
        
        case 'get_youtube_tutorials':
          return await this.tmodloaderAssistant.getTutorialFromYouTube(
            params?.query as string
          );
        
        case 'get_community_patterns':
          return await this.tmodloaderAssistant.getCommunityPatterns();
        
        case 'get_latest_api_changes':
          return await this.tmodloaderAssistant.getLatestAPIChanges();
        
        case 'get_popular_mods_analysis':
          return await this.tmodloaderAssistant.getPopularModsAnalysis();
        
        default:
          throw new Error(`Unknown method: ${method}`);
      }
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Error executing method ${method}: ${error instanceof Error ? error.message : String(error)}`,
          },
        ],
      };
    }
  }
}

// Start the server
const server = new TModLoaderMCPServer();
server.run().catch(console.error);

// Export for use in API routes
export { TModLoaderMCPServer }; 