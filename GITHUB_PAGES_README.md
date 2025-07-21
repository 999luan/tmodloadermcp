# 🚀 TModLoader MCP Server - GitHub Pages

## Sobre

Este projeto fornece um MCP (Model Context Protocol) Server para auxiliar no desenvolvimento de mods do TModLoader. O servidor está hospedado no GitHub Pages e oferece uma interface web interativa.

## 🌐 Acesso

**URL Principal:** https://[seu-usuario].github.io/tmodloader/

## 🔧 Como Usar

### 1. Interface Web
Acesse a URL principal para usar a interface web interativa que permite:
- Testar todos os métodos disponíveis
- Visualizar respostas em tempo real
- Explorar a documentação

### 2. API REST
Para integração programática, use os endpoints:

```bash
# Health check
curl https://[seu-usuario].github.io/tmodloader/health

# Informações do serviço
curl https://[seu-usuario].github.io/tmodloader/info

# Testar método
curl -X POST https://[seu-usuario].github.io/tmodloader/mcp \
  -H "Content-Type: application/json" \
  -d '{"method": "get_tmodloader_documentation", "params": {"topic": "items"}}'
```

## 📋 Métodos Disponíveis

### Documentação
- `get_tmodloader_documentation` - Documentação e referências da API
- `get_tutorial_guide` - Guias passo a passo
- `get_youtube_tutorials` - Tutoriais do YouTube

### Desenvolvimento
- `get_best_practices` - Melhores práticas
- `create_mod_structure` - Gerar estrutura de projeto
- `analyze_mod_code` - Analisar código existente
- `generate_mod_code` - Gerar código baseado em parâmetros

### Informações
- `get_latest_tmodloader_info` - Informações mais recentes
- `get_community_patterns` - Padrões da comunidade
- `get_latest_api_changes` - Mudanças na API
- `get_popular_mods_analysis` - Análise de mods populares

## 🛠️ Configuração Local

### Pré-requisitos
- Node.js 18+
- npm ou yarn

### Instalação
```bash
git clone https://github.com/[seu-usuario]/tmodloader.git
cd tmodloader
npm install
npm run build
```

### Executar Localmente
```bash
# Servidor Express
npm run server

# Ou servidor MCP padrão
npm start
```

## 📁 Estrutura do Projeto

```
├── src/
│   ├── index.ts              # Servidor MCP principal
│   ├── assistants/           # Assistente principal
│   └── services/            # Serviços especializados
├── api/                     # Endpoints da API
├── public/                  # Arquivos estáticos (GitHub Pages)
├── dist/                    # Arquivos compilados
└── .github/workflows/       # GitHub Actions
```

## 🔄 Deploy Automático

O projeto usa GitHub Actions para deploy automático:

1. **Push para main** → Deploy automático no GitHub Pages
2. **Pull Request** → Preview automático
3. **API Requests** → Processamento via GitHub Actions

## 🎯 Exemplos de Uso

### Exemplo 1: Obter Documentação
```javascript
const response = await fetch('https://[seu-usuario].github.io/tmodloader/mcp', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    method: 'get_tmodloader_documentation',
    params: { topic: 'items' }
  })
});
```

### Exemplo 2: Criar Estrutura de Mod
```javascript
const response = await fetch('https://[seu-usuario].github.io/tmodloader/mcp', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    method: 'create_mod_structure',
    params: {
      mod_name: 'MeuMod',
      mod_type: 'content',
      features: ['items', 'npcs', 'tiles']
    }
  })
});
```

## 🚀 Vantagens do GitHub Pages

✅ **Gratuito** - Sem custos de hospedagem
✅ **Automático** - Deploy automático via GitHub Actions
✅ **Confiável** - Infraestrutura do GitHub
✅ **Público** - Sem problemas de autenticação
✅ **CDN** - Distribuição global rápida
✅ **HTTPS** - Segurança automática

## 🔧 Troubleshooting

### Problema: Página não carrega
**Solução:** Verifique se o branch `gh-pages` foi criado e se o GitHub Pages está ativado nas configurações do repositório.

### Problema: API não responde
**Solução:** Verifique se os workflows do GitHub Actions estão funcionando corretamente.

### Problema: Build falha
**Solução:** Verifique se todas as dependências estão instaladas e se o TypeScript está compilando corretamente.

## 📞 Suporte

- **Issues:** https://github.com/[seu-usuario]/tmodloader/issues
- **Discussions:** https://github.com/[seu-usuario]/tmodloader/discussions
- **Wiki:** https://github.com/[seu-usuario]/tmodloader/wiki

## 📄 Licença

MIT License - veja o arquivo [LICENSE](LICENSE) para detalhes. 