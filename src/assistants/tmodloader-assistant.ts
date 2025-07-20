import { DocumentationService } from '../services/documentation-service.js';
import { TutorialService } from '../services/tutorial-service.js';
import { BestPracticesService } from '../services/best-practices-service.js';
import { ModCreationService } from '../services/mod-creation-service.js';
import { InternetKnowledgeService } from '../services/internet-knowledge-service.js';

export class TModLoaderAssistant {
  constructor(
    private documentationService: DocumentationService,
    private tutorialService: TutorialService,
    private bestPracticesService: BestPracticesService,
    private modCreationService: ModCreationService,
    private internetKnowledgeService: InternetKnowledgeService
  ) {}

  async getDocumentation(topic?: string) {
    const docs = await this.documentationService.getDocumentation(topic);
    return {
      content: [
        {
          type: 'text',
          text: docs,
        },
      ],
    };
  }

  async getTutorialGuide(tutorialType: string, difficulty: string = 'beginner') {
    const tutorial = await this.tutorialService.getTutorial(tutorialType, difficulty);
    return {
      content: [
        {
          type: 'text',
          text: tutorial,
        },
      ],
    };
  }

  async getBestPractices(category?: string) {
    const practices = await this.bestPracticesService.getBestPractices(category);
    return {
      content: [
        {
          type: 'text',
          text: practices,
        },
      ],
    };
  }

  async createModStructure(modName: string, modType: string, features: string[] = []) {
    const structure = await this.modCreationService.createModStructure(modName, modType, features);
    return {
      content: [
        {
          type: 'text',
          text: structure,
        },
      ],
    };
  }

  async analyzeModCode(code: string, modType: string) {
    const analysis = await this.modCreationService.analyzeModCode(code, modType);
    return {
      content: [
        {
          type: 'text',
          text: analysis,
        },
      ],
    };
  }

  async generateModCode(feature: string, parameters: any) {
    const code = await this.modCreationService.generateModCode(feature, parameters);
    return {
      content: [
        {
          type: 'text',
          text: code,
        },
      ],
    };
  }

  async getLatestTModLoaderInfo() {
    const info = await this.internetKnowledgeService.getLatestTModLoaderInfo();
    return {
      content: [
        {
          type: 'text',
          text: info,
        },
      ],
    };
  }

  async getTutorialFromYouTube(query: string) {
    const tutorial = await this.internetKnowledgeService.getTutorialFromYouTube(query);
    return {
      content: [
        {
          type: 'text',
          text: tutorial,
        },
      ],
    };
  }

  async getCommunityPatterns() {
    const patterns = await this.internetKnowledgeService.getCommunityPatterns();
    return {
      content: [
        {
          type: 'text',
          text: patterns,
        },
      ],
    };
  }

  async getLatestAPIChanges() {
    const changes = await this.internetKnowledgeService.getLatestAPIChanges();
    return {
      content: [
        {
          type: 'text',
          text: changes,
        },
      ],
    };
  }

  async getPopularModsAnalysis() {
    const analysis = await this.internetKnowledgeService.getPopularModsAnalysis();
    return {
      content: [
        {
          type: 'text',
          text: analysis,
        },
      ],
    };
  }
} 