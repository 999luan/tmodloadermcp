# 🚀 Deploy Rápido - MCP TModLoader Gratuito

## ⚡ Deploy em 5 minutos!

### 1. 🐳 Docker (Mais Fácil)

```bash
# Build da imagem
npm run docker:build

# Executar localmente
npm run docker:run

# Ou usar diretamente
docker run -p 3000:3000 seu-usuario/tmodloader-mcp:latest
```

### 2. 🌐 Render.com (Gratuito)

1. **Fork** este repositório
2. Acesse [render.com](https://render.com)
3. **Connect** seu GitHub
4. **New Web Service**
5. Selecione o repositório
6. **Deploy** automático!

### 3. 🚀 Railway.app (Gratuito)

1. Acesse [railway.app](https://railway.app)
2. **Connect** GitHub
3. **New Project** → **Deploy from GitHub repo**
4. Selecione o repositório
5. **Deploy** automático!

### 4. 📦 NPM Package

```bash
# Publicar no NPM
npm login
npm publish

# Usar em qualquer lugar
npx tmodloader-mcp
```

## 🔧 Configuração para Clientes

### Cursor/VS Code
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

### Outros Clientes
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

## 🎯 URLs de Exemplo

Após o deploy, você terá URLs como:
- **Render**: `https://tmodloader-mcp.onrender.com`
- **Railway**: `https://tmodloader-mcp.railway.app`
- **Heroku**: `https://tmodloader-mcp.herokuapp.com`

## 📊 Teste Rápido

```bash
# Health check
curl https://sua-url.com/health

# Informações
curl https://sua-url.com/info

# Teste MCP
curl -X POST https://sua-url.com/mcp \
  -H "Content-Type: application/json" \
  -d '{"method": "get_tmodloader_documentation", "params": {"topic": "items"}}'
```

## 🎉 Pronto!

Agora qualquer pessoa pode usar seu MCP TModLoader gratuitamente! 🚀✨ 