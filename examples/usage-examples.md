# Exemplos de Uso - TModLoader MCP

## 📚 Documentação

### Obter Documentação Geral
```json
{
  "name": "get_tmodloader_documentation"
}
```

### Obter Documentação sobre Items
```json
{
  "name": "get_tmodloader_documentation",
  "arguments": {
    "topic": "items"
  }
}
```

### Obter Documentação sobre NPCs
```json
{
  "name": "get_tmodloader_documentation",
  "arguments": {
    "topic": "npcs"
  }
}
```

## 🎓 Tutoriais

### Tutorial Básico de Mod
```json
{
  "name": "get_tutorial_guide",
  "arguments": {
    "tutorial_type": "basic_mod",
    "difficulty": "beginner"
  }
}
```

### Tutorial Intermediário de Items
```json
{
  "name": "get_tutorial_guide",
  "arguments": {
    "tutorial_type": "custom_item",
    "difficulty": "intermediate"
  }
}
```

### Tutorial Avançado de Boss
```json
{
  "name": "get_tutorial_guide",
  "arguments": {
    "tutorial_type": "boss_fight",
    "difficulty": "advanced"
  }
}
```

## ⭐ Melhores Práticas

### Obter Todas as Melhores Práticas
```json
{
  "name": "get_best_practices"
}
```

### Obter Práticas de Performance
```json
{
  "name": "get_best_practices",
  "arguments": {
    "category": "performance"
  }
}
```

### Obter Práticas de Compatibilidade
```json
{
  "name": "get_best_practices",
  "arguments": {
    "category": "compatibility"
  }
}
```

## 🛠️ Criação de Mods

### Criar Estrutura Básica de Mod
```json
{
  "name": "create_mod_structure",
  "arguments": {
    "mod_name": "MyFirstMod",
    "mod_type": "content",
    "features": ["items"]
  }
}
```

### Criar Mod Completo
```json
{
  "name": "create_mod_structure",
  "arguments": {
    "mod_name": "FantasyMod",
    "mod_type": "content",
    "features": ["items", "npcs", "tiles", "projectiles", "buffs"]
  }
}
```

## 🔍 Análise de Código

### Analisar Código de Item
```json
{
  "name": "analyze_mod_code",
  "arguments": {
    "code": "public class CustomSword : ModItem { public override void SetDefaults() { Item.damage = 50; } }",
    "mod_type": "item"
  }
}
```

### Analisar Código de NPC
```json
{
  "name": "analyze_mod_code",
  "arguments": {
    "code": "public class CustomEnemy : ModNPC { public override void SetDefaults() { NPC.damage = 20; NPC.lifeMax = 200; } }",
    "mod_type": "npc"
  }
}
```

## 🎮 Geração de Código

### Gerar Item Personalizado
```json
{
  "name": "generate_mod_code",
  "arguments": {
    "feature": "custom_item",
    "parameters": {
      "name": "Dragon Sword",
      "damage": 100,
      "useTime": 15,
      "value": 50000
    }
  }
}
```

### Gerar NPC Personalizado
```json
{
  "name": "generate_mod_code",
  "arguments": {
    "feature": "custom_npc",
    "parameters": {
      "name": "Fire Dragon",
      "damage": 50,
      "life": 1000
    }
  }
}
```

### Gerar Tile Personalizado
```json
{
  "name": "generate_mod_code",
  "arguments": {
    "feature": "custom_tile",
    "parameters": {
      "name": "Crystal Block"
    }
  }
}
```

### Gerar Projétil Personalizado
```json
{
  "name": "generate_mod_code",
  "arguments": {
    "feature": "custom_projectile",
    "parameters": {
      "name": "Fireball",
      "damage": 30
    }
  }
}
```

### Gerar Buff Personalizado
```json
{
  "name": "generate_mod_code",
  "arguments": {
    "feature": "custom_buff",
    "parameters": {
      "name": "Fire Resistance",
      "defense": 10,
      "speed": 0.2
    }
  }
}
```

### Gerar AI de Boss
```json
{
  "name": "generate_mod_code",
  "arguments": {
    "feature": "boss_ai",
    "parameters": {
      "name": "Dragon Boss"
    }
  }
}
```

### Gerar Arma
```json
{
  "name": "generate_mod_code",
  "arguments": {
    "feature": "weapon",
    "parameters": {
      "name": "Thunder Hammer",
      "damage": 150,
      "useTime": 25,
      "damageType": "Melee"
    }
  }
}
```

### Gerar Acessório
```json
{
  "name": "generate_mod_code",
  "arguments": {
    "feature": "accessory",
    "parameters": {
      "name": "Wings of Flight",
      "defense": 8,
      "speed": 0.3
    }
  }
}
```

### Gerar Armadura
```json
{
  "name": "generate_mod_code",
  "arguments": {
    "feature": "armor",
    "parameters": {
      "name": "Crystal Armor",
      "defense": 15
    }
  }
}
```

## 🔄 Fluxo de Trabalho Completo

### 1. Obter Documentação
```json
{
  "name": "get_tmodloader_documentation",
  "arguments": {
    "topic": "items"
  }
}
```

### 2. Seguir Tutorial
```json
{
  "name": "get_tutorial_guide",
  "arguments": {
    "tutorial_type": "custom_item",
    "difficulty": "beginner"
  }
}
```

### 3. Gerar Código
```json
{
  "name": "generate_mod_code",
  "arguments": {
    "feature": "custom_item",
    "parameters": {
      "name": "My Custom Sword",
      "damage": 75,
      "useTime": 20
    }
  }
}
```

### 4. Analisar Código
```json
{
  "name": "analyze_mod_code",
  "arguments": {
    "code": "// Cole o código gerado aqui",
    "mod_type": "item"
  }
}
```

### 5. Aplicar Melhores Práticas
```json
{
  "name": "get_best_practices",
  "arguments": {
    "category": "performance"
  }
}
```

## 💡 Dicas de Uso

1. **Comece com Documentação**: Sempre consulte a documentação antes de começar
2. **Siga Tutoriais**: Use tutoriais para aprender conceitos novos
3. **Gere Código**: Use a geração de código para criar templates
4. **Analise e Refine**: Sempre analise o código gerado e aplique melhorias
5. **Aplique Práticas**: Consulte as melhores práticas regularmente

## 🎯 Casos de Uso Comuns

### Criando um Mod Completo
1. Use `create_mod_structure` para gerar a estrutura base
2. Use `get_tutorial_guide` para aprender sobre cada componente
3. Use `generate_mod_code` para criar cada parte do mod
4. Use `analyze_mod_code` para verificar qualidade
5. Use `get_best_practices` para otimizar

### Debugging de Código
1. Use `analyze_mod_code` para identificar problemas
2. Use `get_best_practices` para encontrar soluções
3. Use `get_tmodloader_documentation` para entender conceitos
4. Use `generate_mod_code` para criar código corrigido

### Aprendendo TModLoader
1. Use `get_tmodloader_documentation` para explorar tópicos
2. Use `get_tutorial_guide` para aprender passo a passo
3. Use `get_best_practices` para entender boas práticas
4. Use `generate_mod_code` para praticar com exemplos 