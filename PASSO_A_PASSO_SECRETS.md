# 🔐 Guia Visual: Configurar Secrets no GitHub

## 📍 Passo 1: Acessar Settings

```
GitHub Repository
├── Settings (clique aqui)
    ├── Secrets and variables (menu lateral)
        └── Actions (clique aqui)
```

## 🔑 Passo 2: Adicionar Secrets

Para cada secret:

1. **Clique em "New repository secret"**
2. **Name**: Digite o nome (ex: `DOCKER_USERNAME`)
3. **Value**: Digite o valor (ex: `seu-usuario`)
4. **Clique em "Add secret"**

## 🐳 Docker Hub Secrets

### 1. Criar Conta Docker Hub
```
hub.docker.com
├── Sign Up
    ├── Username: seu-usuario
    ├── Email: seu-email
    └── Password: sua-senha
```

### 2. Criar Access Token
```
Docker Hub Dashboard
├── Account Settings
    ├── Security
        ├── New Access Token
            ├── Name: "GitHub Actions"
            └── Copy Token
```

### 3. Adicionar no GitHub
```
GitHub Secrets
├── DOCKER_USERNAME = seu-usuario
└── DOCKER_PASSWORD = seu-access-token
```

## 🌐 Render.com Secrets

### 1. Criar Conta Render
```
render.com
├── Sign Up
    ├── Connect GitHub
    └── Authorize
```

### 2. Criar Web Service
```
Render Dashboard
├── New
    ├── Web Service
        ├── Connect Repository
        ├── Name: tmodloader-mcp
        ├── Environment: Node
        ├── Build Command: npm install && npm run build
        └── Start Command: node dist/index.js
```

### 3. Obter Service ID
```
Render Service
├── Settings
    └── Service ID (copiar)
```

### 4. Obter API Key
```
Render Account
├── API Keys
    ├── New API Key
    └── Copy Key
```

### 5. Adicionar no GitHub
```
GitHub Secrets
├── RENDER_SERVICE_ID = seu-service-id
└── RENDER_API_KEY = sua-api-key
```

## 🚀 Railway.app Secrets

### 1. Criar Conta Railway
```
railway.app
├── Sign Up
    ├── Connect GitHub
    └── Authorize
```

### 2. Criar Projeto
```
Railway Dashboard
├── New Project
    ├── Deploy from GitHub repo
    └── Select Repository
```

### 3. Obter Token
```
Railway Account
├── Tokens
    ├── New Token
    └── Copy Token
```

### 4. Adicionar no GitHub
```
GitHub Secrets
└── RAILWAY_TOKEN = seu-token-railway
```

## 📦 NPM Secrets

### 1. Criar Conta NPM
```
npmjs.com
├── Sign Up
    ├── Username: seu-usuario
    ├── Email: seu-email
    └── Password: sua-senha
```

### 2. Criar Access Token
```
NPM Dashboard
├── Access Tokens
    ├── Generate New Token
    ├── Type: Automation
    └── Copy Token
```

### 3. Adicionar no GitHub
```
GitHub Secrets
└── NPM_TOKEN = seu-token-npm
```

## ✅ Verificar Secrets

### Lista Final no GitHub
```
GitHub Repository Settings
├── Secrets and variables
    └── Actions
        ├── DOCKER_USERNAME (****)
        ├── DOCKER_PASSWORD (****)
        ├── RENDER_SERVICE_ID (****)
        ├── RENDER_API_KEY (****)
        ├── RAILWAY_TOKEN (****)
        └── NPM_TOKEN (****)
```

## 🧪 Testar Deploy

### 1. Fazer Commit
```bash
git add .
git commit -m "Add secrets configuration"
git push origin main
```

### 2. Verificar GitHub Actions
```
GitHub Repository
├── Actions (tab)
    ├── Deploy TModLoader MCP
        ├── ✅ test (passed)
        ├── ✅ deploy-docker (passed)
        ├── ✅ deploy-npm (passed)
        ├── ✅ deploy-render (passed)
        └── ✅ deploy-railway (passed)
```

## 🎯 URLs Finais

Após o deploy bem-sucedido:

```
Deploy URLs
├── Docker: docker run seu-usuario/tmodloader-mcp:latest
├── NPM: npx tmodloader-mcp
├── Render: https://tmodloader-mcp.onrender.com
├── Railway: https://tmodloader-mcp.railway.app
└── Heroku: https://tmodloader-mcp.herokuapp.com
```

## 🔧 Configuração para Usuários

### Docker (Recomendado)
```json
{
  "mcpServers": {
    "tmodloader": {
      "command": "docker",
      "args": ["run", "--rm", "-i", "seu-usuario/tmodloader-mcp:latest"]
    }
  }
}
```

### NPM (Mais Simples)
```json
{
  "mcpServers": {
    "tmodloader": {
      "command": "npx",
      "args": ["tmodloader-mcp"]
    }
  }
}
```

## 🎉 Resultado Final

Após configurar todos os secrets:

1. ✅ **Secrets configurados**
2. ✅ **Deploy automático ativo**
3. ✅ **MCP disponível gratuitamente**
4. ✅ **Comunidade pode usar**

**Agora qualquer pessoa pode usar seu MCP TModLoader!** 🚀✨ 