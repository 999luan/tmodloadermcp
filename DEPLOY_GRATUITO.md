# 🆓 Como Deployar o MCP TModLoader Gratuitamente

## 🎯 Opções Gratuitas Disponíveis

### 1. 🐳 Docker + GitHub Actions (Recomendado)

#### Passo 1: Criar Dockerfile
```dockerfile
FROM node:18-alpine

WORKDIR /app

# Copiar arquivos do projeto
COPY package*.json ./
COPY tsconfig.json ./
COPY src/ ./src/
COPY scripts/ ./scripts/

# Instalar dependências
RUN npm ci --only=production

# Compilar o projeto
RUN npm run build

# Expor porta (opcional, para health check)
EXPOSE 3000

# Comando para iniciar o servidor
CMD ["node", "dist/index.js"]
```

#### Passo 2: Criar GitHub Actions
```yaml
# .github/workflows/deploy.yml
name: Deploy MCP TModLoader

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Build project
      run: npm run build
    
    - name: Run tests
      run: npm test
    
    - name: Build Docker image
      run: docker build -t tmodloader-mcp .
    
    - name: Deploy to Docker Hub
      run: |
        echo ${{ secrets.DOCKER_PASSWORD }} | docker login -u ${{ secrets.DOCKER_USERNAME }} --password-stdin
        docker tag tmodloader-mcp ${{ secrets.DOCKER_USERNAME }}/tmodloader-mcp:latest
        docker push ${{ secrets.DOCKER_USERNAME }}/tmodloader-mcp:latest
```

### 2. 🌐 Render.com (Gratuito)

#### Passo 1: Criar render.yaml
```yaml
services:
  - type: web
    name: tmodloader-mcp
    env: node
    buildCommand: npm install && npm run build
    startCommand: node dist/index.js
    envVars:
      - key: NODE_ENV
        value: production
```

#### Passo 2: Deploy no Render
1. Conecte seu GitHub ao Render
2. Selecione o repositório
3. Configure como Web Service
4. Deploy automático!

### 3. 🚀 Railway.app (Gratuito)

#### Passo 1: Criar railway.json
```json
{
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "node dist/index.js",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

#### Passo 2: Deploy no Railway
1. Conecte GitHub ao Railway
2. Selecione o repositório
3. Deploy automático!

### 4. ☁️ Heroku (Gratuito - Limitado)

#### Passo 1: Criar Procfile
```
web: node dist/index.js
```

#### Passo 2: Deploy no Heroku
```bash
# Instalar Heroku CLI
npm install -g heroku

# Login
heroku login

# Criar app
heroku create tmodloader-mcp

# Deploy
git push heroku main
```

### 5. 🐳 Docker Compose (Local/Server)

#### Passo 1: Criar docker-compose.yml
```yaml
version: '3.8'

services:
  tmodloader-mcp:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    restart: unless-stopped
    volumes:
      - ./data:/app/data
```

#### Passo 2: Executar
```bash
docker-compose up -d
```

## 🔧 Configuração para Clientes MCP

### Para Cursor/VS Code
```json
{
  "mcpServers": {
    "tmodloader": {
      "command": "docker",
      "args": ["run", "--rm", "-i", "seu-usuario/tmodloader-mcp:latest"],
      "env": {
        "NODE_ENV": "production"
      }
    }
  }
}
```

### Para Outros Clientes
```json
{
  "mcpServers": {
    "tmodloader": {
      "command": "curl",
      "args": ["-X", "POST", "https://tmodloader-mcp.onrender.com/mcp", "-H", "Content-Type: application/json"],
      "env": {}
    }
  }
}
```

## 📦 Deploy como NPM Package

### Passo 1: Preparar para NPM
```json
// package.json
{
  "name": "tmodloader-mcp",
  "version": "1.0.0",
  "bin": {
    "tmodloader-mcp": "./dist/index.js"
  },
  "files": [
    "dist/",
    "README.md"
  ],
  "publishConfig": {
    "access": "public"
  }
}
```

### Passo 2: Publicar
```bash
npm login
npm publish
```

### Passo 3: Usar como Package
```json
{
  "mcpServers": {
    "tmodloader": {
      "command": "npx",
      "args": ["tmodloader-mcp"],
      "env": {}
    }
  }
}
```

## 🌐 Deploy como API Web

### Passo 1: Adicionar Express
```bash
npm install express cors
```

### Passo 2: Criar server.js
```javascript
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
  res.json({ status: 'ok', service: 'tmodloader-mcp' });
});

// Endpoint principal do MCP
app.post('/mcp', async (req, res) => {
  try {
    const { method, params } = req.body;
    
    // Processar requisição MCP
    const result = await mcpServer.handleRequest(method, params);
    
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`TModLoader MCP Server running on port ${port}`);
});
```

### Passo 3: Deploy
```bash
# Render/Railway/Heroku
npm start
```

## 🔄 CI/CD Automático

### GitHub Actions Completo
```yaml
name: Deploy TModLoader MCP

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    - uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    - run: npm ci
    - run: npm run build
    - run: npm test

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
    - uses: actions/checkout@v3
    
    - name: Deploy to Docker Hub
      uses: docker/build-push-action@v4
      with:
        push: true
        tags: ${{ secrets.DOCKER_USERNAME }}/tmodloader-mcp:latest
        cache-from: type=gha
        cache-to: type=gha,mode=max
    
    - name: Deploy to Render
      uses: johnbeynon/render-deploy-action@v1.0.0
      with:
        service-id: ${{ secrets.RENDER_SERVICE_ID }}
        api-key: ${{ secrets.RENDER_API_KEY }}
    
    - name: Deploy to Railway
      uses: bervProject/railway-deploy@v1.0.0
      with:
        railway_token: ${{ secrets.RAILWAY_TOKEN }}
        service: tmodloader-mcp
```

## 📊 Monitoramento Gratuito

### Uptime Robot
1. Crie conta gratuita
2. Adicione URL do seu deploy
3. Configure alertas

### StatusCake
1. Crie conta gratuita
2. Configure monitoramento
3. Receba alertas

## 🎯 Opção Mais Simples: GitHub Pages + API

### Passo 1: Criar API simples
```javascript
// api/index.js
export default function handler(req, res) {
  const { method, params } = req.body;
  
  // Processar requisição MCP
  const result = processMCPRequest(method, params);
  
  res.json(result);
}
```

### Passo 2: Deploy no Vercel
```bash
npm install -g vercel
vercel --prod
```

## 🚀 Deploy Instantâneo

### Opção 1: Glitch.com
1. Importe o repositório
2. Configure como Node.js
3. Deploy automático!

### Opção 2: Replit.com
1. Crie novo Repl
2. Importe o código
3. Deploy instantâneo!

### Opção 3: CodeSandbox
1. Crie novo sandbox
2. Importe o projeto
3. Deploy automático!

## 📋 Checklist de Deploy

- [ ] **Testes passando** ✅
- [ ] **Build funcionando** ✅
- [ ] **Dockerfile criado** ✅
- [ ] **GitHub Actions configurado** ✅
- [ ] **Variáveis de ambiente definidas** ✅
- [ ] **Health check implementado** ✅
- [ ] **Documentação atualizada** ✅
- [ ] **README com instruções** ✅

## 🎉 Resultado Final

Após o deploy, você terá:

1. **🌐 URL pública** para o MCP
2. **📦 Docker image** disponível
3. **📚 Documentação** completa
4. **🔄 Deploy automático** via GitHub
5. **📊 Monitoramento** gratuito
6. **🔧 Configuração** para clientes MCP

**Agora qualquer pessoa pode usar seu MCP TModLoader gratuitamente!** 🚀✨ 