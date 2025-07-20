import { TModLoaderAssistant } from '../assistants/tmodloader-assistant';
import { DocumentationService } from '../services/documentation-service';
import { TutorialService } from '../services/tutorial-service';
import { BestPracticesService } from '../services/best-practices-service';
import { ModCreationService } from '../services/mod-creation-service';
import { InternetKnowledgeService } from '../services/internet-knowledge-service';

describe('TModLoaderAssistant', () => {
  let assistant: TModLoaderAssistant;
  let documentationService: DocumentationService;
  let tutorialService: TutorialService;
  let bestPracticesService: BestPracticesService;
  let modCreationService: ModCreationService;
  let internetKnowledgeService: InternetKnowledgeService;

  beforeEach(() => {
    documentationService = new DocumentationService();
    tutorialService = new TutorialService();
    bestPracticesService = new BestPracticesService();
    modCreationService = new ModCreationService();
    internetKnowledgeService = new InternetKnowledgeService();
    
    assistant = new TModLoaderAssistant(
      documentationService,
      tutorialService,
      bestPracticesService,
      modCreationService,
      internetKnowledgeService
    );
  });

  describe('getDocumentation', () => {
    it('should return documentation content', async () => {
      const result = await assistant.getDocumentation('items');
      
      expect(result).toBeDefined();
      expect(result.content).toBeDefined();
      expect(result.content[0]).toBeDefined();
      expect(result.content[0].type).toBe('text');
      expect(typeof result.content[0].text).toBe('string');
    });

    it('should return general documentation when no topic specified', async () => {
      const result = await assistant.getDocumentation();
      
      expect(result).toBeDefined();
      expect(result.content).toBeDefined();
      expect(result.content[0]).toBeDefined();
      expect(result.content[0].type).toBe('text');
      expect(typeof result.content[0].text).toBe('string');
    });
  });

  describe('getTutorialGuide', () => {
    it('should return tutorial content', async () => {
      const result = await assistant.getTutorialGuide('basic_mod', 'beginner');
      
      expect(result).toBeDefined();
      expect(result.content).toBeDefined();
      expect(result.content[0]).toBeDefined();
      expect(result.content[0].type).toBe('text');
      expect(typeof result.content[0].text).toBe('string');
    });

    it('should use default difficulty when not specified', async () => {
      const result = await assistant.getTutorialGuide('custom_item');
      
      expect(result).toBeDefined();
      expect(result.content).toBeDefined();
      expect(result.content[0]).toBeDefined();
      expect(result.content[0].type).toBe('text');
      expect(typeof result.content[0].text).toBe('string');
    });
  });

  describe('getBestPractices', () => {
    it('should return best practices content', async () => {
      const result = await assistant.getBestPractices('performance');
      
      expect(result).toBeDefined();
      expect(result.content).toBeDefined();
      expect(result.content[0]).toBeDefined();
      expect(result.content[0].type).toBe('text');
      expect(typeof result.content[0].text).toBe('string');
    });

    it('should return general practices when no category specified', async () => {
      const result = await assistant.getBestPractices();
      
      expect(result).toBeDefined();
      expect(result.content).toBeDefined();
      expect(result.content[0]).toBeDefined();
      expect(result.content[0].type).toBe('text');
      expect(typeof result.content[0].text).toBe('string');
    });
  });

  describe('createModStructure', () => {
    it('should return mod structure content', async () => {
      const result = await assistant.createModStructure('TestMod', 'content', ['items']);
      
      expect(result).toBeDefined();
      expect(result.content).toBeDefined();
      expect(result.content[0]).toBeDefined();
      expect(result.content[0].type).toBe('text');
      expect(typeof result.content[0].text).toBe('string');
    });

    it('should handle empty features array', async () => {
      const result = await assistant.createModStructure('TestMod', 'content');
      
      expect(result).toBeDefined();
      expect(result.content).toBeDefined();
      expect(result.content[0]).toBeDefined();
      expect(result.content[0].type).toBe('text');
      expect(typeof result.content[0].text).toBe('string');
    });
  });

  describe('analyzeModCode', () => {
    it('should return analysis content', async () => {
      const testCode = 'public class TestItem : ModItem { }';
      const result = await assistant.analyzeModCode(testCode, 'item');
      
      expect(result).toBeDefined();
      expect(result.content).toBeDefined();
      expect(result.content[0]).toBeDefined();
      expect(result.content[0].type).toBe('text');
      expect(typeof result.content[0].text).toBe('string');
    });
  });

  describe('generateModCode', () => {
    it('should return generated code content', async () => {
      const parameters = { name: 'TestItem', damage: 50 };
      const result = await assistant.generateModCode('custom_item', parameters);
      
      expect(result).toBeDefined();
      expect(result.content).toBeDefined();
      expect(result.content[0]).toBeDefined();
      expect(result.content[0].type).toBe('text');
      expect(typeof result.content[0].text).toBe('string');
    });
  });
}); 