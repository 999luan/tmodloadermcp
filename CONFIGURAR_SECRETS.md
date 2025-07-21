# 🔐 Como Configurar Secrets no GitHub

## 🎯 O que são Secrets?

Secrets são variáveis de ambiente seguras que você pode usar no GitHub Actions sem expor informações sensíveis no código.

## 📋 Secrets Necessários

### 1. 🐳 Docker Hub Secrets
```bash
DOCKER_USERNAME=seu-usuario-docker
DOCKER_PASSWORD=sua-senha-docker
```

### 2. 🌐 Render.com Secrets
```bash
RENDER_SERVICE_ID=seu-service-id
RENDER_API_KEY=sua-api-key-render
```

### 3. 🚀 Railway.app Secrets
```bash
RAILWAY_TOKEN=seu-token-railway
```

### 4. 📦 NPM Secrets
```bash
NPM_TOKEN=seu-token-npm
```

## 🔧 Como Configurar

### Passo 1: Acessar Settings do Repositório

1. Vá para seu repositório no GitHub
2. Clique em **Settings** (aba superior)
3. No menu lateral, clique em **Secrets and variables**
4. Clique em **Actions**

### Passo 2: Adicionar Secrets

Para cada secret:

1. Clique em **New repository secret**
2. Digite o **Name** (ex: `DOCKER_USERNAME`)
3. Digite o **Value** (ex: `seu-usuario`)
4. Clique em **Add secret**

## 🐳 Docker Hub Secrets

### 1. Criar Conta Docker Hub
1. Acesse [hub.docker.com](https://hub.docker.com)
2. Crie uma conta gratuita
3. Anote seu username

### 2. Criar Access Token
1. No Docker Hub, vá em **Account Settings**
2. Clique em **Security**
3. Clique em **New Access Token**
4. Dê um nome (ex: "GitHub Actions")
5. Copie o token gerado

### 3. Adicionar Secrets
```bash
DOCKER_USERNAME=seu-usuario-docker
DOCKER_PASSWORD=seu-access-token
```

## 🌐 Render.com Secrets

### 1. Criar Conta Render
1. Acesse [render.com](https://render.com)
2. Crie uma conta gratuita
3. Conecte seu GitHub

### 2. Criar Web Service
1. Clique em **New** → **Web Service**
2. Selecione seu repositório
3. Configure:
   - **Name**: `tmodloader-mcp`
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `node dist/index.js`

### 3. Obter Service ID e API Key
1. No dashboard do Render, clique no seu serviço
2. Vá em **Settings**
3. Copie o **Service ID**
4. Vá em **Account** → **API Keys**
5. Crie uma nova API key

### 4. Adicionar Secrets
```bash
RENDER_SERVICE_ID=seu-service-id
RENDER_API_KEY=sua-api-key
```

## 🚀 Railway.app Secrets

### 1. Criar Conta Railway
1. Acesse [railway.app](https://railway.app)
2. Crie uma conta gratuita
3. Conecte seu GitHub

### 2. Criar Projeto
1. Clique em **New Project**
2. Selecione **Deploy from GitHub repo**
3. Selecione seu repositório
4. Configure o projeto

### 3. Obter Token
1. Vá em **Account** → **Tokens**
2. Clique em **New Token**
3. Copie o token gerado

### 4. Adicionar Secret
```bash
RAILWAY_TOKEN=seu-token-railway
```

## 📦 NPM Secrets

### 1. Criar Conta NPM
1. Acesse [npmjs.com](https://npmjs.com)
2. Crie uma conta gratuita
3. Verifique seu email

### 2. Criar Access Token
1. No NPM, vá em **Access Tokens**
2. Clique em **Generate New Token**
3. Selecione **Automation**
4. Copie o token gerado

### 3. Adicionar Secret
```bash
NPM_TOKEN=seu-token-npm
```

## 🔍 Verificar Secrets

### Lista Completa de Secrets
```bash
# Docker Hub
DOCKER_USERNAME=seu-usuario-docker
DOCKER_PASSWORD=seu-access-token-docker

# Render.com
RENDER_SERVICE_ID=seu-service-id-render
RENDER_API_KEY=sua-api-key-render

# Railway.app
RAILWAY_TOKEN=seu-token-railway

# NPM
NPM_TOKEN=seu-token-npm
```

## 🧪 Testar Secrets

### 1. Verificar no GitHub
1. Vá em **Settings** → **Secrets and variables** → **Actions**
2. Verifique se todos os secrets estão listados
3. Os valores ficam ocultos (****)

### 2. Testar Deploy
```bash
# Fazer um commit e push
git add .
git commit -m "Test deploy with secrets"
git push origin main

# Verificar GitHub Actions
# Vá em Actions tab do repositório
```

## 🚨 Troubleshooting

### Erro: "Secret not found"
- Verifique se o nome do secret está exatamente igual no código
- Verifique se o secret foi adicionado no repositório correto

### Erro: "Authentication failed"
- Verifique se as credenciais estão corretas
- Verifique se os tokens não expiraram

### Erro: "Permission denied"
- Verifique se o token tem as permissões necessárias
- Verifique se a conta tem acesso ao recurso

## 📊 Monitoramento

### GitHub Actions Logs
1. Vá em **Actions** tab
2. Clique no workflow que falhou
3. Clique no job que falhou
4. Veja os logs detalhados

### Verificar Deploy
```bash
# Docker Hub
docker pull seu-usuario/tmodloader-mcp:latest

# Render
curl https://tmodloader-mcp.onrender.com/health

# Railway
curl https://tmodloader-mcp.railway.app/health

# NPM
npx tmodloader-mcp --version
```

## 🎯 Checklist de Secrets

- [ ] **DOCKER_USERNAME** configurado
- [ ] **DOCKER_PASSWORD** configurado
- [ ] **RENDER_SERVICE_ID** configurado
- [ ] **RENDER_API_KEY** configurado
- [ ] **RAILWAY_TOKEN** configurado
- [ ] **NPM_TOKEN** configurado
- [ ] **Teste de deploy** realizado
- [ ] **Logs verificados**

## 🎉 Pronto!

Após configurar todos os secrets:

1. **Push para main branch**
2. **GitHub Actions executará automaticamente**
3. **Deploy será feito em todas as plataformas**
4. **MCP estará disponível gratuitamente!**

**Agora qualquer pessoa pode usar seu MCP TModLoader!** 🚀✨ 