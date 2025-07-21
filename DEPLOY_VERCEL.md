# 🚀 Deploy TModLoader MCP na Vercel

## 🎯 Por que Vercel?

- ✅ **100% gratuito** para projetos pessoais
- ✅ **Deploy automático** via GitHub
- ✅ **Performance global** com CDN
- ✅ **Serverless functions** escaláveis
- ✅ **SSL automático** e domínio personalizado
- ✅ **Integração perfeita** com Next.js/React

## 📋 Pré-requisitos

1. **Conta Vercel** (gratuita)
2. **Repositório no GitHub**
3. **Node.js 18+** (local para build)

## 🔧 Configuração

### 1. Instalar Vercel CLI
```bash
npm install -g vercel
```

### 2. Login na Vercel
```bash
vercel login
```

### 3. Configurar Projeto
```bash
vercel
```

## 🚀 Deploy Automático

### Opção 1: Via GitHub (Recomendado)

1. **Conectar GitHub**
   - Acesse [vercel.com](https://vercel.com)
   - Clique em **New Project**
   - Selecione **Import Git Repository**
   - Escolha seu repositório

2. **Configurar Build**
   - **Framework Preset**: `Node.js`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

3. **Environment Variables**
   ```
   NODE_ENV=production
   ```

4. **Deploy**
   - Clique em **Deploy**
   - Aguarde o build
   - URL será gerada automaticamente

### Opção 2: Via CLI

```bash
# Deploy para produção
npm run deploy:vercel

# Ou diretamente
vercel --prod
```

## 📁 Estrutura de Arquivos

```
tmodloader/
├── api/
│   ├── health.js          # Health check
│   ├── info.js            # Informações do serviço
│   ├── mcp.js             # Endpoint principal MCP
│   └── test/[tool].js     # Teste de ferramentas
├── dist/                   # Código compilado
├── src/                    # Código fonte
├── vercel.json            # Configuração Vercel
└── package.json           # Dependências
```

## 🔧 Configuração Vercel

### vercel.json
```json
{
  "version": 2,
  "builds": [
    {
      "src": "server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/server.js"
    }
  ],
  "env": {
    "NODE_ENV": "production"
  },
  "functions": {
    "server.js": {
      "maxDuration": 30
    }
  }
}
```

## 🌐 Endpoints Disponíveis

### Health Check
```
GET https://tmodloader-mcp.vercel.app/api/health
```

### Informações
```
GET https://tmodloader-mcp.vercel.app/api/info
```

### MCP Endpoint
```
POST https://tmodloader-mcp.vercel.app/api/mcp
Content-Type: application/json

{
  "method": "get_tmodloader_documentation",
  "params": {
    "topic": "items"
  }
}
```

### Teste de Ferramentas
```
POST https://tmodloader-mcp.vercel.app/api/test/get_tutorial_guide
Content-Type: application/json

{
  "tutorial_type": "basic_mod",
  "difficulty": "beginner"
}
```

## 🔧 Configuração para Clientes MCP

### Para Cursor/VS Code
```json
{
  "mcpServers": {
    "tmodloader": {
      "command": "curl",
      "args": [
        "-X", "POST",
        "https://tmodloader-mcp.vercel.app/api/mcp",
        "-H", "Content-Type: application/json"
      ]
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
      "args": [
        "-X", "POST",
        "https://tmodloader-mcp.vercel.app/api/mcp",
        "-H", "Content-Type: application/json",
        "-d", "{\"method\":\"get_tmodloader_documentation\",\"params\":{\"topic\":\"items\"}}"
      ]
    }
  }
}
```

## 🧪 Testar Deploy

### 1. Health Check
```bash
curl https://tmodloader-mcp.vercel.app/api/health
```

### 2. Informações
```bash
curl https://tmodloader-mcp.vercel.app/api/info
```

### 3. Teste MCP
```bash
curl -X POST https://tmodloader-mcp.vercel.app/api/mcp \
  -H "Content-Type: application/json" \
  -d '{"method": "get_tmodloader_documentation", "params": {"topic": "items"}}'
```

### 4. Teste de Ferramenta
```bash
curl -X POST https://tmodloader-mcp.vercel.app/api/test/get_tutorial_guide \
  -H "Content-Type: application/json" \
  -d '{"tutorial_type": "basic_mod", "difficulty": "beginner"}'
```

## 🔄 Deploy Automático

### GitHub Actions
```yaml
# .github/workflows/deploy-vercel.yml
name: Deploy to Vercel

on:
  push:
    branches: [ main ]

jobs:
  deploy:
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
    
    - name: Deploy to Vercel
      uses: amondnet/vercel-action@v25
      with:
        vercel-token: ${{ secrets.VERCEL_TOKEN }}
        vercel-org-id: ${{ secrets.ORG_ID }}
        vercel-project-id: ${{ secrets.PROJECT_ID }}
        vercel-args: '--prod'
```

## 🔐 Secrets para Vercel

### 1. Vercel Token
1. Acesse [vercel.com/account/tokens](https://vercel.com/account/tokens)
2. Clique em **Create Token**
3. Dê um nome (ex: "GitHub Actions")
4. Copie o token

### 2. Project ID
1. No dashboard da Vercel, clique no projeto
2. Vá em **Settings**
3. Copie o **Project ID**

### 3. Org ID
1. No dashboard da Vercel, vá em **Settings**
2. Copie o **Team ID** (ou User ID para conta pessoal)

### 4. Adicionar no GitHub
```
VERCEL_TOKEN=seu-token-vercel
PROJECT_ID=seu-project-id
ORG_ID=seu-org-id
```

## 📊 Monitoramento

### Vercel Analytics
- **Performance**: Métricas de velocidade
- **Function Logs**: Logs das serverless functions
- **Error Tracking**: Rastreamento de erros

### Uptime Monitoring
```bash
# Verificar status
curl -I https://tmodloader-mcp.vercel.app/api/health

# Monitorar performance
curl -w "@curl-format.txt" -o /dev/null -s https://tmodloader-mcp.vercel.app/api/health
```

## 🎯 Vantagens da Vercel

### ✅ Performance
- **Edge Network**: CDN global
- **Serverless**: Escalabilidade automática
- **Caching**: Cache inteligente

### ✅ Desenvolvimento
- **Preview Deploys**: Deploy automático em PRs
- **Branch Deploys**: Deploy por branch
- **Rollback**: Reverter para versão anterior

### ✅ Integração
- **GitHub**: Deploy automático
- **GitLab**: Suporte completo
- **Bitbucket**: Integração nativa

## 🚨 Troubleshooting

### Erro: "Function timeout"
- Aumente `maxDuration` no `vercel.json`
- Otimize o código para ser mais rápido

### Erro: "Module not found"
- Verifique se o build está correto
- Confirme se `dist/` existe

### Erro: "CORS"
- Verifique se os headers CORS estão configurados
- Teste com diferentes origens

## 🎉 Resultado Final

Após o deploy na Vercel:

1. **🌐 URL pública**: `https://tmodloader-mcp.vercel.app`
2. **📊 Analytics**: Métricas de performance
3. **🔄 Deploy automático**: Via GitHub
4. **🔧 Configuração**: Pronta para clientes MCP
5. **📈 Escalabilidade**: Serverless automático

**Agora qualquer pessoa pode usar seu MCP TModLoader via Vercel!** 🚀✨

## 🔗 URLs de Exemplo

- **Health**: `https://tmodloader-mcp.vercel.app/api/health`
- **Info**: `https://tmodloader-mcp.vercel.app/api/info`
- **MCP**: `https://tmodloader-mcp.vercel.app/api/mcp`
- **Test**: `https://tmodloader-mcp.vercel.app/api/test/get_tutorial_guide`

**A Vercel é uma excelente opção para deploy gratuito e confiável!** 🎯 