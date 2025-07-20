import * as fs from 'fs-extra';
import * as path from 'path';

export class ModCreationService {
  private readonly templatesPath = path.join(process.cwd(), 'data', 'templates');

  constructor() {
    this.initializeTemplates();
  }

  private async initializeTemplates() {
    await fs.ensureDir(this.templatesPath);
  }

  async createModStructure(modName: string, modType: string, features: string[] = []): Promise<string> {
    const structure = this.generateModStructure(modName, modType, features);
    return structure;
  }

  async analyzeModCode(code: string, modType: string): Promise<string> {
    const analysis = this.analyzeCode(code, modType);
    return analysis;
  }

  async generateModCode(feature: string, parameters: any): Promise<string> {
    const code = this.generateCode(feature, parameters);
    return code;
  }

  private generateModStructure(modName: string, modType: string, features: string[]): string {
    const cleanModName = this.cleanName(modName);
    const namespace = cleanModName;

    let structure = `
# Estrutura do Mod: ${modName}

## Estrutura de Pastas Recomendada
\`\`\`
${cleanModName}/
├── Mod.cs
├── Items/
│   ├── Weapons/
│   ├── Tools/
│   ├── Accessories/
│   └── Materials/
├── NPCs/
│   ├── Enemies/
│   └── TownNPCs/
├── Tiles/
│   ├── Blocks/
│   └── Furniture/
├── Projectiles/
├── Buffs/
├── Systems/
├── Content/
│   ├── Textures/
│   │   ├── Items/
│   │   ├── NPCs/
│   │   └── Tiles/
│   └── Sounds/
└── Properties/
    └── AssemblyInfo.cs
\`\`\`

## Arquivo Principal: Mod.cs
\`\`\`csharp
using Terraria;
using Terraria.ModLoader;

namespace ${namespace}
{
    public class ${cleanModName} : Mod
    {
        public override void Load()
        {
            // Código executado quando o mod é carregado
            Mod.Logger.Info("${modName} carregado com sucesso!");
        }

        public override void Unload()
        {
            // Código executado quando o mod é descarregado
            Mod.Logger.Info("${modName} descarregado.");
        }
    }
}
\`\`\`

## AssemblyInfo.cs
\`\`\`csharp
using System.Reflection;
using System.Runtime.CompilerServices;
using System.Runtime.InteropServices;
using Terraria.ModLoader;

[assembly: AssemblyTitle("${modName}")]
[assembly: AssemblyDescription("${modName} - Um mod personalizado para TModLoader")]
[assembly: AssemblyConfiguration("")]
[assembly: AssemblyCompany("")]
[assembly: AssemblyProduct("${modName}")]
[assembly: AssemblyCopyright("Copyright © 2024")]
[assembly: AssemblyTrademark("")]
[assembly: AssemblyCulture("")]
[assembly: ComVisible(false)]
[assembly: Guid("${this.generateGuid()}")]
[assembly: AssemblyVersion("1.0.0.0")]
[assembly: AssemblyFileVersion("1.0.0.0")]
\`\`\`
`;

    // Adicionar funcionalidades específicas
    if (features.includes('items')) {
      structure += this.getItemsStructure(namespace);
    }

    if (features.includes('npcs')) {
      structure += this.getNPCsStructure(namespace);
    }

    if (features.includes('tiles')) {
      structure += this.getTilesStructure(namespace);
    }

    if (features.includes('projectiles')) {
      structure += this.getProjectilesStructure(namespace);
    }

    if (features.includes('buffs')) {
      structure += this.getBuffsStructure(namespace);
    }

    structure += `
## Próximos Passos

1. **Configure o Projeto**:
   - Abra o Visual Studio
   - Crie um novo projeto de biblioteca de classes (.NET Framework 4.7.2)
   - Adicione referências ao TModLoader

2. **Adicione Conteúdo**:
   - Crie itens, NPCs, tiles conforme necessário
   - Adicione texturas na pasta Content/Textures/
   - Implemente funcionalidades específicas

3. **Teste o Mod**:
   - Compile o projeto
   - Copie o arquivo .tmod para a pasta Mods
   - Teste no jogo

4. **Otimize e Refine**:
   - Teste com outros mods
   - Otimize performance
   - Adicione documentação

## Dicas Importantes

- **Nomenclatura**: Use PascalCase para classes e camelCase para variáveis
- **Namespaces**: Mantenha namespaces organizados
- **Documentação**: Comente código complexo
- **Testing**: Teste regularmente seu mod
- **Backup**: Mantenha backups do seu trabalho
`;

    return structure;
  }

  private getItemsStructure(namespace: string): string {
    return `

## Estrutura de Items

### Items/Weapons/CustomSword.cs
\`\`\`csharp
using Terraria;
using Terraria.ID;
using Terraria.ModLoader;

namespace ${namespace}.Items.Weapons
{
    public class CustomSword : ModItem
    {
        public override void SetStaticDefaults()
        {
            DisplayName.SetDefault("Espada Personalizada");
            Tooltip.SetDefault("Uma espada poderosa criada por você!");
        }

        public override void SetDefaults()
        {
            Item.width = 40;
            Item.height = 40;
            Item.useTime = 20;
            Item.useAnimation = 20;
            Item.useStyle = ItemUseStyleID.Swing;
            Item.knockBack = 6;
            Item.value = 10000;
            Item.rare = ItemRarityID.Green;
            Item.UseSound = SoundID.Item1;
            Item.autoReuse = true;
            Item.damage = 50;
            Item.DamageType = DamageClass.Melee;
        }

        public override void AddRecipes()
        {
            Recipe recipe = CreateRecipe();
            recipe.AddIngredient(ItemID.Wood, 20);
            recipe.AddIngredient(ItemID.IronBar, 10);
            recipe.AddTile(TileID.WorkBenches);
            recipe.Register();
        }
    }
}
\`\`\`

### Items/Accessories/CustomAccessory.cs
\`\`\`csharp
using Terraria;
using Terraria.ID;
using Terraria.ModLoader;

namespace ${namespace}.Items.Accessories
{
    public class CustomAccessory : ModItem
    {
        public override void SetStaticDefaults()
        {
            DisplayName.SetDefault("Acessório Personalizado");
            Tooltip.SetDefault("Aumenta defesa em 5");
        }

        public override void SetDefaults()
        {
            Item.width = 20;
            Item.height = 20;
            Item.accessory = true;
            Item.value = 10000;
            Item.rare = ItemRarityID.Green;
        }

        public override void UpdateAccessory(Player player, bool hideVisual)
        {
            player.statDefense += 5;
        }
    }
}
\`\`\`
`;
  }

  private getNPCsStructure(namespace: string): string {
    return `

## Estrutura de NPCs

### NPCs/Enemies/CustomEnemy.cs
\`\`\`csharp
using Microsoft.Xna.Framework;
using Terraria;
using Terraria.ID;
using Terraria.ModLoader;

namespace ${namespace}.NPCs.Enemies
{
    public class CustomEnemy : ModNPC
    {
        public override void SetStaticDefaults()
        {
            DisplayName.SetDefault("Inimigo Personalizado");
            Main.npcFrameCount[Type] = 4;
        }

        public override void SetDefaults()
        {
            NPC.width = 40;
            NPC.height = 40;
            NPC.damage = 20;
            NPC.defense = 10;
            NPC.lifeMax = 200;
            NPC.HitSound = SoundID.NPCHit1;
            NPC.DeathSound = SoundID.NPCDeath1;
            NPC.value = 60f;
            NPC.knockBackResist = 0.5f;
            NPC.aiStyle = NPCAIStyleID.Fighter;
        }

        public override float SpawnChance(NPCSpawnInfo spawnInfo)
        {
            return spawnInfo.Player.ZoneForest ? 0.1f : 0f;
        }
    }
}
\`\`\`
`;
  }

  private getTilesStructure(namespace: string): string {
    return `

## Estrutura de Tiles

### Tiles/Blocks/CustomTile.cs
\`\`\`csharp
using Microsoft.Xna.Framework;
using Terraria;
using Terraria.ID;
using Terraria.ModLoader;

namespace ${namespace}.Tiles.Blocks
{
    public class CustomTile : ModTile
    {
        public override void SetStaticDefaults()
        {
            Main.tileSolid[Type] = true;
            Main.tileMergeDirt[Type] = true;
            Main.tileBlockLight[Type] = true;
            Main.tileLighted[Type] = true;
            AddMapEntry(new Color(200, 200, 200));
            DustType = DustID.Stone;
        }

        public override void NumDust(int i, int j, bool fail, ref int num)
        {
            num = fail ? 1 : 3;
        }
    }
}
\`\`\`

### Items/Materials/CustomTileItem.cs
\`\`\`csharp
using Terraria;
using Terraria.ID;
using Terraria.ModLoader;

namespace ${namespace}.Items.Materials
{
    public class CustomTileItem : ModItem
    {
        public override void SetStaticDefaults()
        {
            DisplayName.SetDefault("Bloco Personalizado");
            Tooltip.SetDefault("Um bloco personalizado");
        }

        public override void SetDefaults()
        {
            Item.width = 16;
            Item.height = 16;
            Item.maxStack = 999;
            Item.useTurn = true;
            Item.autoReuse = true;
            Item.useAnimation = 15;
            Item.useTime = 10;
            Item.useStyle = ItemUseStyleID.Swing;
            Item.consumable = true;
            Item.createTile = ModContent.TileType<Tiles.Blocks.CustomTile>();
        }
    }
}
\`\`\`
`;
  }

  private getProjectilesStructure(namespace: string): string {
    return `

## Estrutura de Projectiles

### Projectiles/CustomProjectile.cs
\`\`\`csharp
using Microsoft.Xna.Framework;
using Terraria;
using Terraria.ID;
using Terraria.ModLoader;

namespace ${namespace}.Projectiles
{
    public class CustomProjectile : ModProjectile
    {
        public override void SetStaticDefaults()
        {
            DisplayName.SetDefault("Projétil Personalizado");
        }

        public override void SetDefaults()
        {
            Projectile.width = 8;
            Projectile.height = 8;
            Projectile.friendly = true;
            Projectile.hostile = false;
            Projectile.damage = 20;
            Projectile.knockBack = 2f;
            Projectile.aiStyle = ProjAIStyleID.Arrow;
            Projectile.timeLeft = 600;
            Projectile.ignoreWater = true;
            Projectile.tileCollide = true;
        }

        public override void AI()
        {
            // AI personalizada aqui
            Projectile.rotation = Projectile.velocity.ToRotation() + MathHelper.PiOver2;
        }
    }
}
\`\`\`
`;
  }

  private getBuffsStructure(namespace: string): string {
    return `

## Estrutura de Buffs

### Buffs/CustomBuff.cs
\`\`\`csharp
using Terraria;
using Terraria.ID;
using Terraria.ModLoader;

namespace ${namespace}.Buffs
{
    public class CustomBuff : ModBuff
    {
        public override void SetStaticDefaults()
        {
            DisplayName.SetDefault("Buff Personalizado");
            Description.SetDefault("Um buff personalizado");
            Main.debuff[Type] = false;
            Main.buffNoSave[Type] = true;
            Main.buffNoTimeDisplay[Type] = false;
        }

        public override void Update(Player player, ref int buffIndex)
        {
            player.statDefense += 5;
            player.moveSpeed += 0.1f;
        }
    }
}
\`\`\`
`;
  }

  private analyzeCode(code: string, modType: string): string {
    const analysis = {
      issues: [] as string[],
      suggestions: [] as string[],
      score: 0
    };

    // Análise básica
    if (!code.includes('namespace')) {
      analysis.issues.push('❌ Namespace não encontrado');
      analysis.score -= 10;
    } else {
      analysis.suggestions.push('✅ Namespace encontrado');
      analysis.score += 5;
    }

    if (!code.includes('using Terraria')) {
      analysis.issues.push('❌ Using Terraria não encontrado');
      analysis.score -= 5;
    } else {
      analysis.suggestions.push('✅ Using Terraria encontrado');
      analysis.score += 5;
    }

    if (!code.includes('ModItem') && !code.includes('ModNPC') && !code.includes('ModTile')) {
      analysis.issues.push('❌ Herança de classe TModLoader não encontrada');
      analysis.score -= 15;
    } else {
      analysis.suggestions.push('✅ Herança de classe TModLoader encontrada');
      analysis.score += 10;
    }

    // Análise específica por tipo
    if (modType.toLowerCase().includes('item')) {
      if (!code.includes('SetDefaults')) {
        analysis.issues.push('❌ Método SetDefaults não encontrado para item');
        analysis.score -= 10;
      } else {
        analysis.suggestions.push('✅ Método SetDefaults encontrado');
        analysis.score += 5;
      }
    }

    if (modType.toLowerCase().includes('npc')) {
      if (!code.includes('SpawnChance')) {
        analysis.suggestions.push('💡 Considere adicionar SpawnChance para controlar spawn');
      }
    }

    // Análise de boas práticas
    if (code.includes('Console.WriteLine')) {
      analysis.issues.push('❌ Evite Console.WriteLine, use Mod.Logger');
      analysis.score -= 5;
    }

    if (code.includes('Mod.Logger')) {
      analysis.suggestions.push('✅ Uso correto de Mod.Logger');
      analysis.score += 5;
    }

    if (code.includes('//')) {
      analysis.suggestions.push('✅ Comentários encontrados');
      analysis.score += 3;
    }

    // Calcular pontuação final
    analysis.score = Math.max(0, Math.min(100, analysis.score + 50));

    return `
# Análise do Código

## Pontuação: ${analysis.score}/100

## Problemas Encontrados:
${analysis.issues.map(issue => `- ${issue}`).join('\n')}

## Sugestões de Melhoria:
${analysis.suggestions.map(suggestion => `- ${suggestion}`).join('\n')}

## Recomendações:

### 1. Estrutura Básica
\`\`\`csharp
using Terraria;
using Terraria.ModLoader;

namespace YourModName
{
    public class YourClass : ModItem // ou ModNPC, ModTile, etc.
    {
        public override void SetStaticDefaults()
        {
            // Configurações estáticas
        }

        public override void SetDefaults()
        {
            // Configurações básicas
        }
    }
}
\`\`\`

### 2. Logging Adequado
\`\`\`csharp
// ✅ Bom
Mod.Logger.Info("Informação importante");
Mod.Logger.Warn("Aviso");
Mod.Logger.Error("Erro");

// ❌ Evite
Console.WriteLine("Debug");
\`\`\`

### 3. Comentários
\`\`\`csharp
// Adicione comentários para explicar lógica complexa
public override void AI()
{
    // Fase 1: Perseguição
    if (NPC.life > NPC.lifeMax * 0.5f)
    {
        ChasePlayer();
    }
    // Fase 2: Ataque
    else
    {
        AttackPlayer();
    }
}
\`\`\`

### 4. Tratamento de Erros
\`\`\`csharp
public override void OnHitNPC(NPC target, NPC.HitInfo hit, int damageDone)
{
    if (target == null || !target.active)
    {
        return; // Evita erros com NPCs inválidos
    }
    
    // Processar hit
    target.AddBuff(BuffID.Poisoned, 300);
}
\`\`\`

## Próximos Passos:
1. Corrija os problemas identificados
2. Implemente as sugestões de melhoria
3. Teste o código no jogo
4. Refine baseado no feedback
`;
  }

  private generateCode(feature: string, parameters: any): string {
    const self = this;
    const codeGenerators: { [key: string]: (params: any) => string } = {
      'custom_item': (params) => self.generateCustomItem(params),
      'custom_npc': (params) => self.generateCustomNPC(params),
      'custom_tile': (params) => self.generateCustomTile(params),
      'custom_projectile': (params) => self.generateCustomProjectile(params),
      'custom_buff': (params) => self.generateCustomBuff(params),
      'boss_ai': (params) => self.generateBossAI(params),
      'weapon': (params) => self.generateWeapon(params),
      'accessory': (params) => self.generateAccessory(params),
      'armor': (params) => self.generateArmor(params)
    };

    const generator = codeGenerators[feature.toLowerCase()];
    if (generator) {
      return generator(parameters);
    }

    return `
# Geração de Código

## Funcionalidade não encontrada: ${feature}

### Funcionalidades disponíveis:
- **custom_item**: Item personalizado básico
- **custom_npc**: NPC personalizado básico
- **custom_tile**: Tile personalizado básico
- **custom_projectile**: Projétil personalizado
- **custom_buff**: Buff personalizado
- **boss_ai**: AI de boss avançada
- **weapon**: Arma personalizada
- **accessory**: Acessório personalizado
- **armor**: Armadura personalizada

### Exemplo de uso:
\`\`\`
generate_mod_code("custom_item", {
  name: "Espada de Fogo",
  damage: 50,
  useTime: 20,
  value: 10000
})
\`\`\`
`;
  }

  private generateCustomItem(params: any): string {
    const name = params.name || 'CustomItem';
    const damage = params.damage || 50;
    const useTime = params.useTime || 20;
    const value = params.value || 10000;

    return `
# Item Personalizado: ${name}

\`\`\`csharp
using Terraria;
using Terraria.ID;
using Terraria.ModLoader;

namespace YourModName.Items
{
    public class ${this.cleanName(name)} : ModItem
    {
        public override void SetStaticDefaults()
        {
            DisplayName.SetDefault("${name}");
            Tooltip.SetDefault("Um item personalizado criado por você!");
        }

        public override void SetDefaults()
        {
            Item.width = 40;
            Item.height = 40;
            Item.useTime = ${useTime};
            Item.useAnimation = ${useTime};
            Item.useStyle = ItemUseStyleID.Swing;
            Item.knockBack = 6;
            Item.value = ${value};
            Item.rare = ItemRarityID.Green;
            Item.UseSound = SoundID.Item1;
            Item.autoReuse = true;
            Item.damage = ${damage};
            Item.DamageType = DamageClass.Melee;
        }

        public override void AddRecipes()
        {
            Recipe recipe = CreateRecipe();
            recipe.AddIngredient(ItemID.Wood, 20);
            recipe.AddIngredient(ItemID.IronBar, 10);
            recipe.AddTile(TileID.WorkBenches);
            recipe.Register();
        }
    }
}
\`\`\`

## Como usar:
1. Crie um arquivo com o nome da classe (ex: ${this.cleanName(name)}.cs)
2. Cole o código acima
3. Ajuste as propriedades conforme necessário
4. Compile e teste no jogo
`;
  }

  private generateCustomNPC(params: any): string {
    const name = params.name || 'CustomEnemy';
    const damage = params.damage || 20;
    const life = params.life || 200;

    return `
# NPC Personalizado: ${name}

\`\`\`csharp
using Microsoft.Xna.Framework;
using Terraria;
using Terraria.ID;
using Terraria.ModLoader;

namespace YourModName.NPCs
{
    public class ${this.cleanName(name)} : ModNPC
    {
        public override void SetStaticDefaults()
        {
            DisplayName.SetDefault("${name}");
            Main.npcFrameCount[Type] = 4;
        }

        public override void SetDefaults()
        {
            NPC.width = 40;
            NPC.height = 40;
            NPC.damage = ${damage};
            NPC.defense = 10;
            NPC.lifeMax = ${life};
            NPC.HitSound = SoundID.NPCHit1;
            NPC.DeathSound = SoundID.NPCDeath1;
            NPC.value = 60f;
            NPC.knockBackResist = 0.5f;
            NPC.aiStyle = NPCAIStyleID.Fighter;
        }

        public override float SpawnChance(NPCSpawnInfo spawnInfo)
        {
            return spawnInfo.Player.ZoneForest ? 0.1f : 0f;
        }
    }
}
\`\`\`

## Como usar:
1. Crie um arquivo com o nome da classe (ex: ${this.cleanName(name)}.cs)
2. Cole o código acima
3. Ajuste as propriedades conforme necessário
4. Compile e teste no jogo
`;
  }

  private generateCustomTile(params: any): string {
    const name = params.name || 'CustomTile';

    return `
# Tile Personalizado: ${name}

\`\`\`csharp
using Microsoft.Xna.Framework;
using Terraria;
using Terraria.ID;
using Terraria.ModLoader;

namespace YourModName.Tiles
{
    public class ${this.cleanName(name)} : ModTile
    {
        public override void SetStaticDefaults()
        {
            Main.tileSolid[Type] = true;
            Main.tileMergeDirt[Type] = true;
            Main.tileBlockLight[Type] = true;
            Main.tileLighted[Type] = true;
            AddMapEntry(new Color(200, 200, 200));
            DustType = DustID.Stone;
        }

        public override void NumDust(int i, int j, bool fail, ref int num)
        {
            num = fail ? 1 : 3;
        }
    }
}
\`\`\`

## Item para o Tile:

\`\`\`csharp
using Terraria;
using Terraria.ID;
using Terraria.ModLoader;

namespace YourModName.Items
{
    public class ${this.cleanName(name)}Item : ModItem
    {
        public override void SetStaticDefaults()
        {
            DisplayName.SetDefault("${name}");
            Tooltip.SetDefault("Um bloco personalizado");
        }

        public override void SetDefaults()
        {
            Item.width = 16;
            Item.height = 16;
            Item.maxStack = 999;
            Item.useTurn = true;
            Item.autoReuse = true;
            Item.useAnimation = 15;
            Item.useTime = 10;
            Item.useStyle = ItemUseStyleID.Swing;
            Item.consumable = true;
            Item.createTile = ModContent.TileType<${this.cleanName(name)}>();
        }
    }
}
\`\`\`

## Como usar:
1. Crie os arquivos com os nomes das classes
2. Cole os códigos acima
3. Ajuste as propriedades conforme necessário
4. Compile e teste no jogo
`;
  }

  private generateCustomProjectile(params: any): string {
    const name = params.name || 'CustomProjectile';
    const damage = params.damage || 20;

    return `
# Projétil Personalizado: ${name}

\`\`\`csharp
using Microsoft.Xna.Framework;
using Terraria;
using Terraria.ID;
using Terraria.ModLoader;

namespace YourModName.Projectiles
{
    public class ${this.cleanName(name)} : ModProjectile
    {
        public override void SetStaticDefaults()
        {
            DisplayName.SetDefault("${name}");
        }

        public override void SetDefaults()
        {
            Projectile.width = 8;
            Projectile.height = 8;
            Projectile.friendly = true;
            Projectile.hostile = false;
            Projectile.damage = ${damage};
            Projectile.knockBack = 2f;
            Projectile.aiStyle = ProjAIStyleID.Arrow;
            Projectile.timeLeft = 600;
            Projectile.ignoreWater = true;
            Projectile.tileCollide = true;
        }

        public override void AI()
        {
            // Rotação do projétil
            Projectile.rotation = Projectile.velocity.ToRotation() + MathHelper.PiOver2;
            
            // Efeitos visuais
            if (Main.rand.NextBool(3))
            {
                Dust.NewDust(Projectile.position, Projectile.width, Projectile.height, DustID.Fire);
            }
        }
    }
}
\`\`\`

## Como usar:
1. Crie um arquivo com o nome da classe (ex: ${this.cleanName(name)}.cs)
2. Cole o código acima
3. Ajuste as propriedades conforme necessário
4. Compile e teste no jogo
`;
  }

  private generateCustomBuff(params: any): string {
    const name = params.name || 'CustomBuff';
    const defense = params.defense || 5;
    const speed = params.speed || 0.1;

    return `
# Buff Personalizado: ${name}

\`\`\`csharp
using Terraria;
using Terraria.ID;
using Terraria.ModLoader;

namespace YourModName.Buffs
{
    public class ${this.cleanName(name)} : ModBuff
    {
        public override void SetStaticDefaults()
        {
            DisplayName.SetDefault("${name}");
            Description.SetDefault("Um buff personalizado");
            Main.debuff[Type] = false;
            Main.buffNoSave[Type] = true;
            Main.buffNoTimeDisplay[Type] = false;
        }

        public override void Update(Player player, ref int buffIndex)
        {
            player.statDefense += ${defense};
            player.moveSpeed += ${speed}f;
        }
    }
}
\`\`\`

## Como usar:
1. Crie um arquivo com o nome da classe (ex: ${this.cleanName(name)}.cs)
2. Cole o código acima
3. Ajuste as propriedades conforme necessário
4. Compile e teste no jogo
`;
  }

  private generateBossAI(params: any): string {
    const name = params.name || 'CustomBoss';

    return `
# AI de Boss: ${name}

\`\`\`csharp
using Microsoft.Xna.Framework;
using Terraria;
using Terraria.ID;
using Terraria.ModLoader;

namespace YourModName.NPCs
{
    public class ${this.cleanName(name)} : ModNPC
    {
        private int phase = 0;
        private const int MaxPhase = 3;

        public override void SetStaticDefaults()
        {
            DisplayName.SetDefault("${name}");
            Main.npcFrameCount[Type] = 4;
        }

        public override void SetDefaults()
        {
            NPC.width = 100;
            NPC.height = 100;
            NPC.damage = 60;
            NPC.defense = 25;
            NPC.lifeMax = 5000;
            NPC.HitSound = SoundID.NPCHit1;
            NPC.DeathSound = SoundID.NPCDeath1;
            NPC.value = 20000f;
            NPC.knockBackResist = 0.05f;
            NPC.aiStyle = NPCAIStyleID.Fighter;
            NPC.boss = true;
            NPC.noTileCollide = true;
            NPC.noGravity = true;
        }

        public override void AI()
        {
            // Mudar de fase baseado na vida
            float lifePercent = (float)NPC.life / NPC.lifeMax;
            
            if (lifePercent <= 0.3f && phase == 1)
            {
                phase = 2;
                // Ativar fase final
            }
            else if (lifePercent <= 0.7f && phase == 0)
            {
                phase = 1;
                // Ativar segunda fase
            }

            // Comportamento baseado na fase
            switch (phase)
            {
                case 0:
                    Phase1AI();
                    break;
                case 1:
                    Phase2AI();
                    break;
                case 2:
                    Phase3AI();
                    break;
            }
        }

        private void Phase1AI()
        {
            // AI básica de perseguição
            Player player = Main.player[NPC.target];
            Vector2 direction = player.Center - NPC.Center;
            direction.Normalize();
            NPC.velocity = direction * 4f;
        }

        private void Phase2AI()
        {
            // AI com ataques à distância
            if (Main.rand.NextBool(60))
            {
                Player player = Main.player[NPC.target];
                Vector2 direction = player.Center - NPC.Center;
                direction.Normalize();
                
                Projectile.NewProjectile(NPC.GetSource_FromAI(), NPC.Center, direction * 8f,
                    ModContent.ProjectileType<BossProjectile>(), 30, 2f);
            }
        }

        private void Phase3AI()
        {
            // AI final com ataques múltiplos
            if (Main.rand.NextBool(30))
            {
                for (int i = 0; i < 8; i++)
                {
                    Vector2 direction = Vector2.UnitX.RotatedBy(i * MathHelper.TwoPi / 8);
                    Projectile.NewProjectile(NPC.GetSource_FromAI(), NPC.Center, direction * 10f,
                        ModContent.ProjectileType<BossProjectile>(), 40, 3f);
                }
            }
        }
    }
}
\`\`\`

## Como usar:
1. Crie um arquivo com o nome da classe (ex: ${this.cleanName(name)}.cs)
2. Cole o código acima
3. Ajuste as propriedades conforme necessário
4. Compile e teste no jogo
`;
  }

  private generateWeapon(params: any): string {
    const name = params.name || 'CustomWeapon';
    const damage = params.damage || 50;
    const useTime = params.useTime || 20;
    const damageType = params.damageType || 'Melee';

    return `
# Arma Personalizada: ${name}

\`\`\`csharp
using Terraria;
using Terraria.ID;
using Terraria.ModLoader;

namespace YourModName.Items.Weapons
{
    public class ${this.cleanName(name)} : ModItem
    {
        public override void SetStaticDefaults()
        {
            DisplayName.SetDefault("${name}");
            Tooltip.SetDefault("Uma arma poderosa!");
        }

        public override void SetDefaults()
        {
            Item.width = 40;
            Item.height = 40;
            Item.useTime = ${useTime};
            Item.useAnimation = ${useTime};
            Item.useStyle = ItemUseStyleID.Swing;
            Item.knockBack = 6;
            Item.value = 10000;
            Item.rare = ItemRarityID.Green;
            Item.UseSound = SoundID.Item1;
            Item.autoReuse = true;
            Item.damage = ${damage};
            Item.DamageType = DamageClass.${damageType};
        }

        public override void OnHitNPC(Player player, NPC target, NPC.HitInfo hit, int damageDone)
        {
            // Efeito especial ao acertar
            target.AddBuff(BuffID.OnFire, 300);
            
            // Criar partículas
            for (int i = 0; i < 10; i++)
            {
                Dust.NewDust(target.position, target.width, target.height, DustID.Fire);
            }
        }

        public override void AddRecipes()
        {
            Recipe recipe = CreateRecipe();
            recipe.AddIngredient(ItemID.Wood, 20);
            recipe.AddIngredient(ItemID.IronBar, 10);
            recipe.AddTile(TileID.WorkBenches);
            recipe.Register();
        }
    }
}
\`\`\`

## Como usar:
1. Crie um arquivo com o nome da classe (ex: ${this.cleanName(name)}.cs)
2. Cole o código acima
3. Ajuste as propriedades conforme necessário
4. Compile e teste no jogo
`;
  }

  private generateAccessory(params: any): string {
    const name = params.name || 'CustomAccessory';
    const defense = params.defense || 5;
    const speed = params.speed || 0.1;

    return `
# Acessório Personalizado: ${name}

\`\`\`csharp
using Terraria;
using Terraria.ID;
using Terraria.ModLoader;

namespace YourModName.Items.Accessories
{
    public class ${this.cleanName(name)} : ModItem
    {
        public override void SetStaticDefaults()
        {
            DisplayName.SetDefault("${name}");
            Tooltip.SetDefault("Aumenta defesa em ${defense} e velocidade em ${speed * 100}%");
        }

        public override void SetDefaults()
        {
            Item.width = 20;
            Item.height = 20;
            Item.accessory = true;
            Item.value = 10000;
            Item.rare = ItemRarityID.Green;
        }

        public override void UpdateAccessory(Player player, bool hideVisual)
        {
            player.statDefense += ${defense};
            player.moveSpeed += ${speed}f;
        }

        public override void AddRecipes()
        {
            Recipe recipe = CreateRecipe();
            recipe.AddIngredient(ItemID.Leather, 10);
            recipe.AddIngredient(ItemID.IronBar, 5);
            recipe.AddTile(TileID.WorkBenches);
            recipe.Register();
        }
    }
}
\`\`\`

## Como usar:
1. Crie um arquivo com o nome da classe (ex: ${this.cleanName(name)}.cs)
2. Cole o código acima
3. Ajuste as propriedades conforme necessário
4. Compile e teste no jogo
`;
  }

  private generateArmor(params: any): string {
    const name = params.name || 'CustomArmor';
    const defense = params.defense || 10;

    return `
# Armadura Personalizada: ${name}

## Capacete:

\`\`\`csharp
using Terraria;
using Terraria.ID;
using Terraria.ModLoader;

namespace YourModName.Items.Armor
{
    [AutoloadEquip(EquipType.Head)]
    public class ${this.cleanName(name)}Helmet : ModItem
    {
        public override void SetStaticDefaults()
        {
            DisplayName.SetDefault("${name} Helmet");
            Tooltip.SetDefault("Capacete da armadura ${name}");
        }

        public override void SetDefaults()
        {
            Item.width = 18;
            Item.height = 18;
            Item.value = 10000;
            Item.rare = ItemRarityID.Green;
            Item.defense = ${defense};
        }

        public override void UpdateEquip(Player player)
        {
            player.statDefense += 5;
        }

        public override bool IsArmorSet(Item head, Item body, Item legs)
        {
            return body.type == ModContent.ItemType<${this.cleanName(name)}Breastplate>() && 
                   legs.type == ModContent.ItemType<${this.cleanName(name)}Leggings>();
        }

        public override void UpdateArmorSet(Player player)
        {
            player.setBonus = "Conjunto ${name} - Aumenta defesa em 10";
            player.statDefense += 10;
        }
    }
}
\`\`\`

## Peitoral:

\`\`\`csharp
[AutoloadEquip(EquipType.Body)]
public class ${this.cleanName(name)}Breastplate : ModItem
{
    public override void SetStaticDefaults()
    {
        DisplayName.SetDefault("${name} Breastplate");
        Tooltip.SetDefault("Peitoral da armadura ${name}");
    }

    public override void SetDefaults()
    {
        Item.width = 18;
        Item.height = 18;
        Item.value = 10000;
        Item.rare = ItemRarityID.Green;
        Item.defense = ${defense + 5};
    }

    public override void UpdateEquip(Player player)
    {
        player.statDefense += 8;
    }
}
\`\`\`

## Calças:

\`\`\`csharp
[AutoloadEquip(EquipType.Legs)]
public class ${this.cleanName(name)}Leggings : ModItem
{
    public override void SetStaticDefaults()
    {
        DisplayName.SetDefault("${name} Leggings");
        Tooltip.SetDefault("Calças da armadura ${name}");
    }

    public override void SetDefaults()
    {
        Item.width = 18;
        Item.height = 18;
        Item.value = 10000;
        Item.rare = ItemRarityID.Green;
        Item.defense = ${defense + 3};
    }

    public override void UpdateEquip(Player player)
    {
        player.statDefense += 6;
        player.moveSpeed += 0.1f;
    }
}
\`\`\`

## Como usar:
1. Crie os arquivos para cada parte da armadura
2. Cole os códigos acima
3. Ajuste as propriedades conforme necessário
4. Compile e teste no jogo
`;
  }

  private cleanName(name: string): string {
    return name.replace(/[^a-zA-Z0-9]/g, '');
  }

  private generateGuid(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
} 