# TModLoader MCP Server

🚀 **MCP (Model Context Protocol) Server para TModLoader** - Um assistente inteligente que combina documentação oficial, tutoriais, melhores práticas e conhecimento da internet para ajudar desenvolvedores a criar mods incríveis para TModLoader.

## ✨ Funcionalidades

### 📚 Documentação e Tutoriais
- **Documentação Oficial**: Acesso completo à documentação do TModLoader
- **Tutoriais Estruturados**: Guias passo-a-passo por dificuldade
- **Tutoriais do YouTube**: Busca automática de tutoriais em vídeo
- **Exemplos de Código**: Snippets prontos para uso

### 🎯 Melhores Práticas
- **Padrões da Comunidade**: Análise de mods populares
- **Otimização de Performance**: Dicas para código eficiente
- **Compatibilidade**: Guias para trabalhar com outros mods
- **Organização de Código**: Estruturas recomendadas

### 🔧 Ferramentas de Desenvolvimento
- **Geração de Estrutura**: Criação automática de projetos
- **Análise de Código**: Verificação e sugestões de melhoria
- **Geração de Código**: Templates para itens, NPCs, tiles, etc.
- **Análise de Mods Populares**: Estudo de padrões de sucesso

### 🌐 Conhecimento da Internet
- **Informações Atualizadas**: Últimas versões e mudanças
- **Mudanças na API**: Guias de migração
- **Análise de Mods**: Estudo de Calamity, Thorium, Spirit, etc.
- **Padrões da Comunidade**: Práticas comuns identificadas

## 🛠️ Instalação

```bash
# Clone o repositório
git clone <repository-url>
cd tmodloader

# Instale as dependências
npm install

# Configure o projeto
npm run setup

# Compile o projeto
npm run build

# Teste o servidor
npm test
```

## 🚀 Como Usar

### 1. Configuração do Cliente MCP

Adicione ao seu arquivo de configuração MCP:

```json
{
  "mcpServers": {
    "tmodloader": {
      "command": "node",
      "args": ["dist/index.js"],
      "cwd": "/caminho/para/tmodloader",
      "env": {
        "NODE_ENV": "production"
      }
    }
  }
}
```

### 2. Ferramentas Disponíveis

#### 📖 Documentação
```json
{
  "name": "get_tmodloader_documentation",
  "args": {
    "topic": "items"
  }
}
```

#### 🎓 Tutoriais
```json
{
  "name": "get_tutorial_guide",
  "args": {
    "tutorial_type": "custom_item",
    "difficulty": "beginner"
  }
}
```

#### 🎥 Tutoriais do YouTube
```json
{
  "name": "get_youtube_tutorials",
  "args": {
    "query": "custom boss fight"
  }
}
```

#### 📋 Melhores Práticas
```json
{
  "name": "get_best_practices",
  "args": {
    "category": "performance"
  }
}
```

#### 🏗️ Criação de Mods
```json
{
  "name": "create_mod_structure",
  "args": {
    "mod_name": "MyAwesomeMod",
    "mod_type": "content",
    "features": ["items", "npcs", "tiles"]
  }
}
```

#### 🔍 Análise de Código
```json
{
  "name": "analyze_mod_code",
  "args": {
    "code": "// seu código aqui",
    "mod_type": "items"
  }
}
```

#### ⚡ Geração de Código
```json
{
  "name": "generate_mod_code",
  "args": {
    "feature": "custom_item",
    "parameters": {
      "name": "FireSword",
      "damage": 50,
      "defense": 10
    }
  }
}
```

#### 🌐 Informações da Internet
```json
{
  "name": "get_latest_tmodloader_info",
  "args": {}
}
```

```json
{
  "name": "get_community_patterns",
  "args": {}
}
```

```json
{
  "name": "get_latest_api_changes",
  "args": {}
}
```

```json
{
  "name": "get_popular_mods_analysis",
  "args": {}
}
```

## 📊 Exemplos de Uso

### Criando um Mod Básico
1. Use `get_tutorial_guide` com `tutorial_type: "basic_mod"`
2. Use `create_mod_structure` para gerar a estrutura
3. Use `generate_mod_code` para criar itens específicos

### Aprendendo sobre Performance
1. Use `get_best_practices` com `category: "performance"`
2. Use `get_community_patterns` para padrões da comunidade
3. Use `get_popular_mods_analysis` para ver como mods populares otimizam

### Atualizando um Mod Existente
1. Use `get_latest_api_changes` para ver mudanças recentes
2. Use `analyze_mod_code` para verificar seu código atual
3. Use `get_latest_tmodloader_info` para informações atualizadas

## 🎯 Casos de Uso

### Para Iniciantes
- **Tutoriais Estruturados**: Aprenda do básico ao avançado
- **Exemplos Práticos**: Código pronto para copiar e adaptar
- **Guias de Configuração**: Setup completo do ambiente

### Para Desenvolvedores Intermediários
- **Análise de Código**: Identifique problemas e otimizações
- **Padrões da Comunidade**: Aprenda com mods populares
- **Melhores Práticas**: Evite armadilhas comuns

### Para Desenvolvedores Avançados
- **Análise de Mods Populares**: Estude Calamity, Thorium, etc.
- **Otimização Avançada**: Técnicas de performance
- **Compatibilidade**: Integração com outros mods

## 🔧 Desenvolvimento

### Estrutura do Projeto
```
tmodloader/
├── src/
│   ├── index.ts                 # Servidor MCP principal
│   ├── assistants/
│   │   └── tmodloader-assistant.ts
│   └── services/
│       ├── documentation-service.ts
│       ├── tutorial-service.ts
│       ├── best-practices-service.ts
│       ├── mod-creation-service.ts
│       └── internet-knowledge-service.ts
├── dist/                        # Código compilado
├── docs/                        # Documentação
├── examples/                    # Exemplos de uso
└── scripts/                     # Scripts de utilidade
```

### Scripts Disponíveis
```bash
npm run build      # Compilar TypeScript
npm run dev        # Modo desenvolvimento
npm run start      # Iniciar servidor
npm run test       # Executar testes
npm run lint       # Verificar código
npm run format     # Formatar código
npm run setup      # Configurar projeto
```

### Adicionando Novas Funcionalidades

1. **Criar novo serviço** em `src/services/`
2. **Adicionar métodos** ao `TModLoaderAssistant`
3. **Registrar ferramenta** no `index.ts`
4. **Adicionar testes** em `src/__tests__/`

## 🌟 Recursos Especiais

### 🎥 Integração com YouTube
- Busca automática de tutoriais
- Análise de canais populares
- Dicas de qualidade de conteúdo

### 📊 Análise de Mods Populares
- **Calamity Mod**: Padrões de bosses complexos
- **Thorium Mod**: Sistemas de classes
- **Spirit Mod**: Criação de atmosfera
- **Tremor Mod**: Simplicidade e acessibilidade

### 🔄 Mudanças de API
- Guias de migração atualizados
- Exemplos de código antigo vs novo
- Dicas de compatibilidade

### 🏆 Padrões da Comunidade
- Nomenclatura consistente
- Estrutura de projetos
- Otimizações de performance
- Práticas de documentação

## 🤝 Contribuindo

1. **Fork** o projeto
2. **Crie uma branch**: `git checkout -b feature/AmazingFeature`
3. **Commit suas mudanças**: `git commit -m 'Add some AmazingFeature'`
4. **Push para a branch**: `git push origin feature/AmazingFeature'`
5. **Abra um Pull Request**

### Diretrizes de Contribuição
- Mantenha o código limpo e documentado
- Adicione testes para novas funcionalidades
- Siga os padrões de nomenclatura
- Atualize a documentação quando necessário

## 📄 Licença

Este projeto está licenciado sob a MIT License - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 🙏 Agradecimentos

- **TModLoader Team**: Pela excelente documentação
- **Comunidade TModLoader**: Pelos tutoriais e exemplos
- **Desenvolvedores de Mods Populares**: Pelos padrões estabelecidos
- **Contribuidores**: Por melhorar este projeto

## 📞 Suporte

- **Issues**: Reporte bugs e solicite features
- **Discussions**: Participe de discussões
- **Wiki**: Documentação detalhada
- **Discord**: Comunidade ativa

---

**🎮 Crie mods incríveis com a ajuda do TModLoader MCP!** 