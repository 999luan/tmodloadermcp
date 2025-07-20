#!/usr/bin/env node

import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function setup() {
  console.log('🚀 Configurando TModLoader MCP...');

  try {
    // Criar diretórios necessários
    const dirs = [
      'data/documentation',
      'data/tutorials', 
      'data/best-practices',
      'data/templates',
      'dist'
    ];

    for (const dir of dirs) {
      await fs.ensureDir(dir);
      console.log(`✅ Criado diretório: ${dir}`);
    }

    // Criar arquivo de configuração MCP se não existir
    const configPath = path.join(process.cwd(), 'mcp-config.json');
    if (!await fs.pathExists(configPath)) {
      const config = {
        mcpServers: {
          tmodloader: {
            command: "node",
            args: ["dist/index.js"],
            cwd: process.cwd(),
            env: {
              NODE_ENV: "production"
            }
          }
        }
      };

      await fs.writeJson(configPath, config, { spaces: 2 });
      console.log('✅ Criado arquivo de configuração MCP: mcp-config.json');
    }

    // Verificar dependências
    const packageJson = await fs.readJson('package.json');
    if (!packageJson.dependencies['@modelcontextprotocol/sdk']) {
      console.log('⚠️  Dependência MCP SDK não encontrada. Execute: npm install');
    }

    console.log('\n🎉 Configuração concluída!');
    console.log('\n📋 Próximos passos:');
    console.log('1. Execute: npm run build');
    console.log('2. Configure seu cliente MCP para usar este servidor');
    console.log('3. Execute: npm start para iniciar o servidor');

  } catch (error) {
    console.error('❌ Erro durante a configuração:', error.message);
    process.exit(1);
  }
}

setup(); 