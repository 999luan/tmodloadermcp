# 🚀 Como Usar o MCP no GitHub Pages

## 🌐 Acesso Principal

**URL:** `https://[seu-usuario].github.io/tmodloader/`

## 📋 Métodos Disponíveis

### 1. **get_tmodloader_documentation**
```javascript
// Obter documentação sobre um tópico específico
{
  "method": "get_tmodloader_documentation",
  "params": {
    "topic": "items" // ou "npcs", "tiles", "weapons", etc.
  }
}
```

### 2. **get_tutorial_guide**
```javascript
// Obter guia de tutorial
{
  "method": "get_tutorial_guide",
  "params": {
    "tutorial_type": "basic_mod", // ou "custom_item", "boss_fight"
    "difficulty": "beginner" // ou "intermediate", "advanced"
  }
}
```

### 3. **get_youtube_tutorials**
```javascript
// Buscar tutoriais no YouTube
{
  "method": "get_youtube_tutorials",
  "params": {
    "query": "custom item tutorial"
  }
}
```

### 4. **get_best_practices**
```javascript
// Obter melhores práticas
{
  "method": "get_best_practices",
  "params": {
    "category": "performance" // ou "compatibility", "code_organization"
  }
}
```

### 5. **create_mod_structure**
```javascript
// Criar estrutura de projeto
{
  "method": "create_mod_structure",
  "params": {
    "mod_name": "MeuMod",
    "mod_type": "content", // ou "library", "framework"
    "features": ["items", "npcs", "tiles"]
  }
}
```

### 6. **analyze_mod_code**
```javascript
// Analisar código existente
{
  "method": "analyze_mod_code",
  "params": {
    "code": "// seu código aqui",
    "mod_type": "content"
  }
}
```

### 7. **generate_mod_code**
```javascript
// Gerar código baseado em parâmetros
{
  "method": "generate_mod_code",
  "params": {
    "feature": "custom_item",
    "parameters": {
      "item_name": "SwordOfPower",
      "damage": 50,
      "defense": 10
    }
  }
}
```

### 8. **get_latest_tmodloader_info**
```javascript
// Informações mais recentes
{
  "method": "get_latest_tmodloader_info",
  "params": {}
}
```

### 9. **get_community_patterns**
```javascript
// Padrões da comunidade
{
  "method": "get_community_patterns",
  "params": {}
}
```

### 10. **get_latest_api_changes**
```javascript
// Mudanças na API
{
  "method": "get_latest_api_changes",
  "params": {}
}
```

### 11. **get_popular_mods_analysis**
```javascript
// Análise de mods populares
{
  "method": "get_popular_mods_analysis",
  "params": {}
}
```

## 🎯 Formas de Usar

### 1. **Interface Web** (Recomendado para Iniciantes)
1. Acesse a URL principal
2. Clique em qualquer método
3. Preencha os parâmetros
4. Clique "Testar Método"
5. Veja a resposta em tempo real

### 2. **API REST** (Para Desenvolvedores)
```bash
# Exemplo: Obter documentação sobre items
curl -X POST https://[seu-usuario].github.io/tmodloader/mcp \
  -H "Content-Type: application/json" \
  -d '{
    "method": "get_tmodloader_documentation",
    "params": {"topic": "items"}
  }'
```

### 3. **JavaScript/Fetch** (Para Aplicações Web)
```javascript
const response = await fetch('https://[seu-usuario].github.io/tmodloader/mcp', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    method: 'get_tmodloader_documentation',
    params: { topic: 'items' }
  })
});

const result = await response.json();
console.log(result);
```

### 4. **Python** (Para Scripts)
```python
import requests

response = requests.post(
    'https://[seu-usuario].github.io/tmodloader/mcp',
    json={
        'method': 'get_tmodloader_documentation',
        'params': {'topic': 'items'}
    }
)

result = response.json()
print(result)
```

## 🔧 Integração com Context7

### Configuração MCP
```json
{
  "mcpServers": {
    "tmodloader": {
      "command": "node",
      "args": ["-e", "console.log(JSON.stringify({name: 'tmodloader-mcp', version: '1.0.0'}))"],
      "env": {
        "MCP_SERVER_URL": "https://[seu-usuario].github.io/tmodloader/mcp"
      }
    }
  }
}
```

### Uso no Context7
```javascript
// No Context7, você pode usar:
const result = await mcp.tmodloader.get_tmodloader_documentation({
  topic: "items"
});
```

## 🎮 Exemplos Práticos

### Exemplo 1: Criar um Mod Básico
```javascript
// 1. Obter documentação
const docs = await fetch('/mcp', {
  method: 'POST',
  body: JSON.stringify({
    method: 'get_tmodloader_documentation',
    params: { topic: 'basic_mod' }
  })
});

// 2. Obter tutorial
const tutorial = await fetch('/mcp', {
  method: 'POST',
  body: JSON.stringify({
    method: 'get_tutorial_guide',
    params: { tutorial_type: 'basic_mod', difficulty: 'beginner' }
  })
});

// 3. Criar estrutura
const structure = await fetch('/mcp', {
  method: 'POST',
  body: JSON.stringify({
    method: 'create_mod_structure',
    params: {
      mod_name: 'MeuPrimeiroMod',
      mod_type: 'content',
      features: ['items']
    }
  })
});
```

### Exemplo 2: Analisar Código Existente
```javascript
const analysis = await fetch('/mcp', {
  method: 'POST',
  body: JSON.stringify({
    method: 'analyze_mod_code',
    params: {
      code: `
        public class CustomItem : ModItem {
          public override void SetDefaults() {
            item.damage = 50;
            item.defense = 10;
          }
        }
      `,
      mod_type: 'content'
    }
  })
});
```

## 🚀 Vantagens do GitHub Pages

✅ **Sempre Online** - Sem downtime
✅ **Sem Autenticação** - Acesso público
✅ **Interface Visual** - Fácil de usar
✅ **API REST** - Para integração
✅ **Gratuito** - Sem custos
✅ **HTTPS** - Seguro por padrão

## 📞 Suporte

Se encontrar problemas:
1. Verifique se a URL está correta
2. Teste primeiro na interface web
3. Verifique os logs do GitHub Actions
4. Abra uma issue no repositório 