# Guia de Uso - TModLoader MCP

## 🚀 Início Rápido

### 1. Instalação
```bash
# Clone o repositório
git clone https://github.com/seu-usuario/tmodloader-mcp.git
cd tmodloader-mcp

# Instale as dependências
npm install

# Configure o projeto
npm run setup

# Compile o projeto
npm run build

# Execute o servidor
npm start
```

### 2. Configuração do Cliente MCP
Configure seu cliente MCP (como Claude, GPT-4, etc.) para conectar ao servidor:

```json
{
  "mcpServers": {
    "tmodloader": {
      "command": "node",
      "args": ["dist/index.js"],
      "cwd": "/caminho/para/tmodloader-mcp"
    }
  }
}
```

## 📚 Funcionalidades Principais

### Documentação Inteligente
O MCP fornece documentação completa sobre TModLoader, incluindo:

- **API Reference**: Todas as classes e métodos do TModLoader
- **Exemplos de Código**: Snippets práticos para cada funcionalidade
- **Guias de Implementação**: Passo a passo para criar diferentes tipos de conteúdo
- **Referências**: Constantes, IDs e valores padrão

**Exemplo de uso:**
```
Obtenha documentação sobre criação de itens no TModLoader
```

### Tutoriais Interativos
Guias passo a passo organizados por dificuldade:

- **Básico**: Primeiro mod, configuração de ambiente
- **Intermediário**: Sistemas complexos, multiplayer
- **Avançado**: Bosses, biomas, networking

**Exemplo de uso:**
```
Me ensine como criar um boss personalizado para TModLoader
```

### Melhores Práticas
Diretrizes organizadas por categoria:

- **Performance**: Otimização de código e memória
- **Compatibilidade**: Trabalho com outros mods
- **Organização**: Estrutura de projeto e nomenclatura
- **Debugging**: Ferramentas e técnicas
- **Testing**: Estratégias de teste
- **Documentação**: Padrões de documentação

**Exemplo de uso:**
```
Quais são as melhores práticas para otimizar performance em mods TModLoader?
```

### Geração de Código
Templates automatizados para diferentes tipos de conteúdo:

- **Items**: Armas, ferramentas, acessórios, armaduras
- **NPCs**: Inimigos, critters, NPCs da cidade
- **Tiles**: Blocos, mobília, decorações
- **Projectiles**: Flechas, projéteis mágicos
- **Buffs**: Efeitos temporários e debuffs
- **Bosses**: AI complexa com múltiplas fases

**Exemplo de uso:**
```
Gere código para uma espada de fogo com 100 de dano
```

### Análise de Código
Análise automática de código com sugestões de melhoria:

- **Detecção de Problemas**: Identifica erros comuns
- **Sugestões de Melhoria**: Recomendações baseadas em boas práticas
- **Pontuação de Qualidade**: Avaliação numérica do código
- **Correções Automáticas**: Sugestões de código corrigido

**Exemplo de uso:**
```
Analise este código de item e sugira melhorias
```

## 🎯 Casos de Uso Comuns

### 1. Criando seu Primeiro Mod

**Passo 1: Obter Documentação**
```
Explique como criar um mod básico no TModLoader
```

**Passo 2: Seguir Tutorial**
```
Me dê um tutorial passo a passo para criar meu primeiro mod
```

**Passo 3: Gerar Estrutura**
```
Crie uma estrutura de projeto para um mod chamado "MeuMod"
```

**Passo 4: Implementar Conteúdo**
```
Gere código para um item básico chamado "Espada de Madeira"
```

### 2. Criando um Boss Complexo

**Passo 1: Entender Conceitos**
```
Explique como criar bosses no TModLoader
```

**Passo 2: Aprender Técnicas**
```
Me ensine sobre AI de boss e múltiplas fases
```

**Passo 3: Gerar Código**
```
Gere código para um boss dragão com 3 fases
```

**Passo 4: Otimizar**
```
Analise este código de boss e sugira melhorias
```

### 3. Otimizando um Mod Existente

**Passo 1: Analisar Código**
```
Analise este código e identifique problemas de performance
```

**Passo 2: Aplicar Melhores Práticas**
```
Quais são as melhores práticas para compatibilidade com outros mods?
```

**Passo 3: Refatorar**
```
Gere uma versão otimizada deste código
```

### 4. Aprendendo TModLoader

**Explorar Tópicos:**
```
Explique como criar tiles personalizados
```

**Praticar com Exemplos:**
```
Gere exemplos de código para diferentes tipos de projéteis
```

**Aplicar Conhecimento:**
```
Como implementar um sistema de crafting personalizado?
```

## 🔧 Ferramentas Disponíveis

### `get_tmodloader_documentation`
Obtém documentação específica sobre tópicos do TModLoader.

**Parâmetros:**
- `topic` (opcional): Tópico específico (items, npcs, tiles, etc.)

**Exemplos:**
```
get_tmodloader_documentation("items")
get_tmodloader_documentation("bosses")
get_tmodloader_documentation("networking")
```

### `get_tutorial_guide`
Fornece tutoriais passo a passo para desenvolvimento.

**Parâmetros:**
- `tutorial_type`: Tipo de tutorial (basic_mod, custom_item, boss_fight)
- `difficulty`: Nível de dificuldade (beginner, intermediate, advanced)

**Exemplos:**
```
get_tutorial_guide("custom_item", "intermediate")
get_tutorial_guide("boss_fight", "advanced")
```

### `get_best_practices`
Retorna diretrizes de melhores práticas.

**Parâmetros:**
- `category` (opcional): Categoria específica (performance, compatibility, etc.)

**Exemplos:**
```
get_best_practices("performance")
get_best_practices("compatibility")
get_best_practices("debugging")
```

### `create_mod_structure`
Gera estrutura completa de projeto para um mod.

**Parâmetros:**
- `mod_name`: Nome do mod
- `mod_type`: Tipo do mod (content, library, framework)
- `features`: Lista de funcionalidades a incluir

**Exemplos:**
```
create_mod_structure("FantasyMod", "content", ["items", "npcs", "bosses"])
create_mod_structure("LibraryMod", "library", ["systems"])
```

### `analyze_mod_code`
Analisa código existente e fornece sugestões.

**Parâmetros:**
- `code`: Código a ser analisado
- `mod_type`: Tipo do código (item, npc, tile, etc.)

**Exemplos:**
```
analyze_mod_code("public class CustomItem : ModItem { ... }", "item")
analyze_mod_code("public class CustomNPC : ModNPC { ... }", "npc")
```

### `generate_mod_code`
Gera código para funcionalidades específicas.

**Parâmetros:**
- `feature`: Funcionalidade a gerar (custom_item, boss_ai, etc.)
- `parameters`: Parâmetros para personalização

**Exemplos:**
```
generate_mod_code("custom_item", {"name": "Fire Sword", "damage": 100})
generate_mod_code("boss_ai", {"name": "Dragon Boss"})
generate_mod_code("weapon", {"name": "Thunder Hammer", "damage": 150})
```

## 💡 Dicas de Uso Eficiente

### 1. Use Linguagem Natural
O MCP entende linguagem natural, então você pode fazer perguntas como:
- "Como criar uma espada personalizada?"
- "Me ensine sobre bosses no TModLoader"
- "Quais são as melhores práticas para performance?"

### 2. Combine Ferramentas
Use múltiplas ferramentas em sequência:
1. Obtenha documentação sobre o tópico
2. Siga um tutorial relacionado
3. Gere código baseado no que aprendeu
4. Analise o código gerado
5. Aplique melhorias baseadas em boas práticas

### 3. Seja Específico
Quanto mais específico você for, melhor será a resposta:
- ❌ "Como criar um item?"
- ✅ "Como criar uma espada mágica que causa dano de fogo?"

### 4. Itere e Refine
- Gere código inicial
- Analise o código gerado
- Aplique sugestões de melhoria
- Teste e refine

## 🐛 Solução de Problemas

### Problema: Servidor não inicia
**Solução:**
1. Verifique se Node.js 18+ está instalado
2. Execute `npm install` para instalar dependências
3. Execute `npm run build` para compilar
4. Verifique se o arquivo `dist/index.js` existe

### Problema: Cliente MCP não conecta
**Solução:**
1. Verifique o caminho no arquivo de configuração
2. Certifique-se de que o servidor está rodando
3. Verifique se as permissões estão corretas

### Problema: Erros de compilação
**Solução:**
1. Execute `npm run lint` para identificar problemas
2. Execute `npm run format` para formatar código
3. Verifique se todas as dependências estão instaladas

## 📞 Suporte

- **Issues**: Use o GitHub Issues para reportar bugs
- **Discussions**: Use o GitHub Discussions para perguntas
- **Documentação**: Consulte este guia e o README.md

## 🔄 Atualizações

Para manter o MCP atualizado:
1. Execute `git pull` para obter as últimas mudanças
2. Execute `npm install` para instalar novas dependências
3. Execute `npm run build` para recompilar
4. Reinicie o servidor

---

**Desenvolvido com ❤️ para a comunidade TModLoader** 