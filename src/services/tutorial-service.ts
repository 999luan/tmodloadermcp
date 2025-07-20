import * as fs from 'fs-extra';
import * as path from 'path';

export class TutorialService {
  private readonly tutorialsPath = path.join(process.cwd(), 'data', 'tutorials');

  constructor() {
    this.initializeTutorials();
  }

  private async initializeTutorials() {
    await fs.ensureDir(this.tutorialsPath);
  }

  async getTutorial(tutorialType: string, difficulty: string = 'beginner'): Promise<string> {
    const tutorial = this.getTutorialContent(tutorialType, difficulty);
    return tutorial;
  }

  private getTutorialContent(tutorialType: string, difficulty: string): string {
    const tutorials: { [key: string]: { [key: string]: string } } = {
      'basic_mod': {
        beginner: `
# Tutorial: Criando seu Primeiro Mod TModLoader

## Pré-requisitos
- Visual Studio 2019/2022 ou VS Code
- TModLoader instalado
- Conhecimento básico de C#

## Passo 1: Configurar o Ambiente
1. Abra o Visual Studio
2. Crie um novo projeto de biblioteca de classes (.NET Framework 4.7.2)
3. Adicione referências ao TModLoader

## Passo 2: Estrutura Básica do Mod
Crie a seguinte estrutura de pastas:
\`\`\`
YourMod/
├── Mod.cs
├── Items/
├── NPCs/
├── Tiles/
└── Properties/
    └── AssemblyInfo.cs
\`\`\`

## Passo 3: Mod.cs Principal
\`\`\`csharp
using Terraria;
using Terraria.ModLoader;

namespace YourModName
{
    public class YourMod : Mod
    {
        public override void Load()
        {
            // Código executado quando o mod é carregado
        }

        public override void Unload()
        {
            // Código executado quando o mod é descarregado
        }
    }
}
\`\`\`

## Passo 4: Criar um Item Simples
Crie um arquivo em \`Items/CustomItem.cs\`:
\`\`\`csharp
using Terraria;
using Terraria.ID;
using Terraria.ModLoader;

namespace YourModName.Items
{
    public class CustomItem : ModItem
    {
        public override void SetStaticDefaults()
        {
            DisplayName.SetDefault("Item Personalizado");
            Tooltip.SetDefault("Um item personalizado criado por você!");
        }

        public override void SetDefaults()
        {
            Item.width = 20;
            Item.height = 20;
            Item.value = 10000;
            Item.rare = ItemRarityID.Green;
            Item.maxStack = 999;
        }

        public override void AddRecipes()
        {
            Recipe recipe = CreateRecipe();
            recipe.AddIngredient(ItemID.Wood, 10);
            recipe.AddTile(TileID.WorkBenches);
            recipe.Register();
        }
    }
}
\`\`\`

## Passo 5: Compilar e Testar
1. Compile o projeto
2. Copie o arquivo .tmod para a pasta Mods do TModLoader
3. Inicie o TModLoader e ative seu mod
4. Teste o item no jogo

## Próximos Passos
- Adicione texturas para seu item
- Crie mais itens
- Experimente com diferentes tipos de conteúdo
`,

        intermediate: `
# Tutorial Intermediário: Mod com Múltiplos Conteúdos

## Estrutura Avançada
\`\`\`
YourMod/
├── Mod.cs
├── Items/
│   ├── Weapons/
│   ├── Tools/
│   └── Accessories/
├── NPCs/
│   ├── Enemies/
│   └── TownNPCs/
├── Tiles/
│   ├── Blocks/
│   └── Furniture/
├── Projectiles/
├── Buffs/
└── Systems/
\`\`\`

## Sistema de Crafting Avançado
\`\`\`csharp
public override void AddRecipes()
{
    // Recipe com múltiplos ingredientes
    Recipe recipe = CreateRecipe();
    recipe.AddIngredient(ItemID.Wood, 20);
    recipe.AddIngredient(ItemID.StoneBlock, 10);
    recipe.AddIngredient(ItemID.IronBar, 5);
    recipe.AddTile(TileID.WorkBenches);
    recipe.AddTile(TileID.Anvils);
    recipe.Register();

    // Recipe alternativo
    Recipe recipe2 = CreateRecipe(2); // Produz 2 itens
    recipe2.AddIngredient(ItemID.GoldBar, 3);
    recipe2.AddTile(TileID.Furnaces);
    recipe2.Register();
}
\`\`\`

## Sistema de Drops
\`\`\`csharp
public override void ModifyNPCLoot(NPCLoot npcLoot)
{
    npcLoot.Add(ItemDropRule.Common(ModContent.ItemType<CustomItem>(), 10, 1, 3));
    npcLoot.Add(ItemDropRule.ByCondition(new CustomDropCondition(), ModContent.ItemType<RareItem>(), 50));
}
\`\`\`

## Hooks Avançados
\`\`\`csharp
public override void OnHitPlayer(Player target, Player.HurtInfo hurtInfo)
{
    // Aplicar efeito quando atacar jogador
    target.AddBuff(BuffID.Poisoned, 300);
}

public override void ModifyHitNPC(NPC target, ref NPC.HitModifiers modifiers)
{
    // Modificar dano baseado em condições
    if (target.life < target.lifeMax * 0.5f)
    {
        modifiers.FinalDamage *= 1.5f;
    }
}
\`\`\`
`,

        advanced: `
# Tutorial Avançado: Sistemas Complexos

## Sistema de Progression
\`\`\`csharp
public class ProgressionSystem : ModSystem
{
    public static bool HasDefeatedBoss1 = false;
    public static bool HasDefeatedBoss2 = false;

    public override void PostUpdateWorld()
    {
        // Verificar progresso do mundo
        if (NPC.downedBoss1)
        {
            HasDefeatedBoss1 = true;
        }
    }
}
\`\`\`

## Sistema de Biomas
\`\`\`csharp
public class CustomBiome : ModPlayer
{
    public bool ZoneCustomBiome = false;

    public override void PostUpdate()
    {
        ZoneCustomBiome = IsInCustomBiome();
    }

    private bool IsInCustomBiome()
    {
        Point tilePos = Player.Center.ToTileCoordinates();
        return Main.tile[tilePos.X, tilePos.Y].TileType == ModContent.TileType<CustomTile>();
    }
}
\`\`\`

## Sistema de Multiplayer
\`\`\`csharp
public override void HandlePacket(BinaryReader reader, int whoAmI)
{
    byte msgType = reader.ReadByte();
    switch (msgType)
    {
        case 0:
            // Sincronizar dados
            break;
        case 1:
            // Enviar mensagem
            break;
    }
}
\`\`\`
`
      },

      'custom_item': {
        beginner: `
# Tutorial: Criando Itens Personalizados

## Tipos de Itens
1. **Weapons**: Espadas, arcos, varinhas
2. **Tools**: Picaretas, machados, martelos
3. **Armor**: Capacetes, armaduras, calças
4. **Accessories**: Anéis, amuletos, asas
5. **Materials**: Materiais para crafting

## Item Básico
\`\`\`csharp
public class BasicItem : ModItem
{
    public override void SetStaticDefaults()
    {
        DisplayName.SetDefault("Item Básico");
        Tooltip.SetDefault("Um item básico de exemplo");
    }

    public override void SetDefaults()
    {
        Item.width = 20;
        Item.height = 20;
        Item.value = 10000;
        Item.rare = ItemRarityID.Green;
        Item.maxStack = 999;
    }
}
\`\`\`

## Arma Simples
\`\`\`csharp
public class SimpleSword : ModItem
{
    public override void SetStaticDefaults()
    {
        DisplayName.SetDefault("Espada Simples");
        Tooltip.SetDefault("Uma espada básica");
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
}
\`\`\`

## Acessório
\`\`\`csharp
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
\`\`\`
`,

        intermediate: `
# Tutorial Intermediário: Itens Avançados

## Item com Efeitos Especiais
\`\`\`csharp
public class SpecialItem : ModItem
{
    public override void SetDefaults()
    {
        // Configurações básicas
        Item.width = 40;
        Item.height = 40;
        Item.damage = 100;
        Item.DamageType = DamageClass.Melee;
        Item.useTime = 15;
        Item.useAnimation = 15;
        Item.useStyle = ItemUseStyleID.Swing;
        Item.knockBack = 8;
        Item.value = 50000;
        Item.rare = ItemRarityID.Purple;
        Item.UseSound = SoundID.Item1;
        Item.autoReuse = true;
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

    public override void MeleeEffects(Player player, Rectangle hitbox)
    {
        // Efeitos visuais durante o uso
        if (Main.rand.NextBool(3))
        {
            Dust.NewDust(new Vector2(hitbox.X, hitbox.Y), hitbox.Width, hitbox.Height, DustID.Fire);
        }
    }
}
\`\`\`

## Item com Projétil
\`\`\`csharp
public class ProjectileWeapon : ModItem
{
    public override void SetDefaults()
    {
        Item.width = 40;
        Item.height = 40;
        Item.damage = 50;
        Item.DamageType = DamageClass.Ranged;
        Item.useTime = 20;
        Item.useAnimation = 20;
        Item.useStyle = ItemUseStyleID.Shoot;
        Item.knockBack = 4;
        Item.value = 30000;
        Item.rare = ItemRarityID.Blue;
        Item.UseSound = SoundID.Item5;
        Item.autoReuse = true;
        Item.shoot = ModContent.ProjectileType<CustomProjectile>();
        Item.shootSpeed = 12f;
        Item.noMelee = true;
        Item.useAmmo = AmmoID.Arrow;
    }

    public override bool Shoot(Player player, EntitySource_ItemUse_WithAmmo source, Vector2 position, Vector2 velocity, int type, int damage, float knockback)
    {
        // Disparar múltiplos projéteis
        for (int i = 0; i < 3; i++)
        {
            Vector2 newVelocity = velocity.RotatedByRandom(MathHelper.ToRadians(15));
            Projectile.NewProjectile(source, position, newVelocity, type, damage, knockback, player.whoAmI);
        }
        return false;
    }
}
\`\`\`
`,

        advanced: `
# Tutorial Avançado: Itens Complexos

## Item com Sistema de Carga
\`\`\`csharp
public class ChargingWeapon : ModItem
{
    private int chargeLevel = 0;
    private const int MaxCharge = 3;

    public override void SetDefaults()
    {
        Item.width = 40;
        Item.height = 40;
        Item.damage = 30;
        Item.DamageType = DamageClass.Magic;
        Item.useTime = 20;
        Item.useAnimation = 20;
        Item.useStyle = ItemUseStyleID.HoldUp;
        Item.knockBack = 4;
        Item.value = 50000;
        Item.rare = ItemRarityID.Purple;
        Item.UseSound = SoundID.Item8;
        Item.autoReuse = false;
        Item.mana = 10;
    }

    public override bool CanUseItem(Player player)
    {
        if (player.controlUseItem)
        {
            // Carregando
            if (chargeLevel < MaxCharge)
            {
                chargeLevel++;
                return false;
            }
        }
        else
        {
            // Soltou o botão
            if (chargeLevel > 0)
            {
                return true;
            }
        }
        return false;
    }

    public override bool Shoot(Player player, EntitySource_ItemUse_WithAmmo source, Vector2 position, Vector2 velocity, int type, int damage, float knockback)
    {
        // Dano baseado no nível de carga
        int finalDamage = damage * chargeLevel;
        
        // Criar projétil baseado na carga
        Projectile.NewProjectile(source, position, velocity * chargeLevel, 
            ModContent.ProjectileType<ChargedProjectile>(), finalDamage, knockback, player.whoAmI);
        
        chargeLevel = 0;
        return false;
    }
}
\`\`\`

## Item com Sistema de Evolução
\`\`\`csharp
public class EvolvingWeapon : ModItem
{
    public int evolutionLevel = 0;
    private const int MaxEvolution = 3;

    public override void SetDefaults()
    {
        Item.width = 40;
        Item.height = 40;
        Item.damage = 20 + (evolutionLevel * 15);
        Item.DamageType = DamageClass.Melee;
        Item.useTime = 20 - (evolutionLevel * 2);
        Item.useAnimation = 20 - (evolutionLevel * 2);
        Item.useStyle = ItemUseStyleID.Swing;
        Item.knockBack = 4 + evolutionLevel;
        Item.value = 10000 + (evolutionLevel * 10000);
        Item.rare = ItemRarityID.Green + evolutionLevel;
        Item.UseSound = SoundID.Item1;
        Item.autoReuse = true;
    }

    public override void OnHitNPC(Player player, NPC target, NPC.HitInfo hit, int damageDone)
    {
        // Chance de evoluir ao acertar bosses
        if (target.boss && Main.rand.NextBool(10) && evolutionLevel < MaxEvolution)
        {
            evolutionLevel++;
            Item.SetDefaults(Item.type); // Reaplicar defaults
        }
    }

    public override void ModifyTooltips(List<TooltipLine> tooltips)
    {
        tooltips.Add(new TooltipLine(Mod, "EvolutionLevel", $"Nível de Evolução: {evolutionLevel}/{MaxEvolution}"));
    }
}
\`\`\`
`
      },

      'boss_fight': {
        beginner: `
# Tutorial: Criando Bosses Básicos

## Estrutura de um Boss
\`\`\`csharp
public class BasicBoss : ModNPC
{
    public override void SetStaticDefaults()
    {
        DisplayName.SetDefault("Boss Básico");
        Main.npcFrameCount[Type] = 4;
    }

    public override void SetDefaults()
    {
        NPC.width = 80;
        NPC.height = 80;
        NPC.damage = 50;
        NPC.defense = 20;
        NPC.lifeMax = 2000;
        NPC.HitSound = SoundID.NPCHit1;
        NPC.DeathSound = SoundID.NPCDeath1;
        NPC.value = 10000f;
        NPC.knockBackResist = 0.1f;
        NPC.aiStyle = NPCAIStyleID.Fighter;
        NPC.boss = true;
        NPC.noTileCollide = true;
        NPC.noGravity = true;
    }

    public override float SpawnChance(NPCSpawnInfo spawnInfo)
    {
        return 0f; // Bosses não spawnam naturalmente
    }
}
\`\`\`

## Sistema de Spawn
\`\`\`csharp
public class BossSummonItem : ModItem
{
    public override void SetDefaults()
    {
        Item.width = 20;
        Item.height = 20;
        Item.useTime = 20;
        Item.useAnimation = 20;
        Item.useStyle = ItemUseStyleID.HoldUp;
        Item.UseSound = SoundID.Item1;
        Item.value = 10000;
        Item.rare = ItemRarityID.Green;
    }

    public override bool CanUseItem(Player player)
    {
        return !NPC.AnyNPCs(ModContent.NPCType<BasicBoss>());
    }

    public override bool? UseItem(Player player)
    {
        if (Main.netMode != NetmodeID.MultiplayerClient)
        {
            NPC.SpawnOnPlayer(player.whoAmI, ModContent.NPCType<BasicBoss>());
        }
        return true;
    }
}
\`\`\`
`,

        intermediate: `
# Tutorial Intermediário: Bosses Avançados

## Boss com Múltiplas Fases
\`\`\`csharp
public class MultiPhaseBoss : ModNPC
{
    private int phase = 0;
    private const int MaxPhase = 3;

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
\`\`\`

## Sistema de Drops Avançado
\`\`\`csharp
public override void ModifyNPCLoot(NPCLoot npcLoot)
{
    // Drop garantido
    npcLoot.Add(ItemDropRule.Common(ModContent.ItemType<BossTrophy>(), 10));
    
    // Drop baseado em condições
    npcLoot.Add(ItemDropRule.ByCondition(new FirstTimeKillCondition(), 
        ModContent.ItemType<BossWeapon>(), 4));
    
    // Drop raro
    npcLoot.Add(ItemDropRule.Common(ModContent.ItemType<RareItem>(), 25));
}

public class FirstTimeKillCondition : IItemDropRuleCondition
{
    public bool CanDrop(DropAttemptInfo info)
    {
        return !info.player.GetModPlayer<CustomPlayer>().hasKilledBoss;
    }
}
\`\`\`
`,

        advanced: `
# Tutorial Avançado: Bosses Complexos

## Boss com Sistema de Arena
\`\`\`csharp
public class ArenaBoss : ModNPC
{
    private Rectangle arenaBounds;
    private bool arenaActive = false;

    public override void AI()
    {
        if (!arenaActive)
        {
            CreateArena();
            arenaActive = true;
        }

        // Manter boss na arena
        if (NPC.Center.X < arenaBounds.Left || NPC.Center.X > arenaBounds.Right)
        {
            NPC.velocity.X *= -1;
        }
        if (NPC.Center.Y < arenaBounds.Top || NPC.Center.Y > arenaBounds.Bottom)
        {
            NPC.velocity.Y *= -1;
        }

        // AI complexa baseada na posição na arena
        ArenaAI();
    }

    private void CreateArena()
    {
        Player player = Main.player[NPC.target];
        arenaBounds = new Rectangle(
            (int)player.Center.X - 200,
            (int)player.Center.Y - 200,
            400, 400
        );

        // Criar barreiras visuais
        for (int i = 0; i < 10; i++)
        {
            Dust.NewDust(new Vector2(arenaBounds.Left, arenaBounds.Top + i * 40), 
                arenaBounds.Width, 1, DustID.MagicMirror);
        }
    }

    private void ArenaAI()
    {
        // AI que usa a arena como referência
        Vector2 arenaCenter = arenaBounds.Center.ToVector2();
        Vector2 direction = arenaCenter - NPC.Center;
        
        if (direction.Length() > 50)
        {
            direction.Normalize();
            NPC.velocity += direction * 0.1f;
        }
    }
}
\`\`\`

## Boss com Sistema de Múltiplos Inimigos
\`\`\`csharp
public class MultiBoss : ModNPC
{
    private List<int> minionIDs = new List<int>();

    public override void AI()
    {
        // Spawnar minions
        if (minionIDs.Count < 3 && Main.rand.NextBool(300))
        {
            int minionID = NPC.NewNPC(NPC.GetSource_FromAI(), 
                (int)NPC.Center.X, (int)NPC.Center.Y, 
                ModContent.NPCType<BossMinion>());
            minionIDs.Add(minionID);
        }

        // Remover minions mortos
        minionIDs.RemoveAll(id => !Main.npc[id].active);

        // Boss fica mais forte com minions vivos
        NPC.damage = 50 + (minionIDs.Count * 10);
    }

    public override void OnKill()
    {
        // Matar todos os minions quando o boss morre
        foreach (int minionID in minionIDs)
        {
            if (Main.npc[minionID].active)
            {
                Main.npc[minionID].life = 0;
                Main.npc[minionID].checkDead();
            }
        }
    }
}
\`\`\`
`
      }
    };

    const tutorial = tutorials[tutorialType]?.[difficulty];
    if (tutorial) {
      return tutorial;
    }

    return `
# Tutorial não encontrado

O tutorial "${tutorialType}" com dificuldade "${difficulty}" não foi encontrado.

## Tutoriais disponíveis:
- **basic_mod**: Criando seu primeiro mod
- **custom_item**: Criando itens personalizados
- **boss_fight**: Criando bosses

## Dificuldades disponíveis:
- **beginner**: Para iniciantes
- **intermediate**: Para desenvolvedores intermediários
- **advanced**: Para desenvolvedores avançados

Escolha um tutorial e dificuldade válidos para obter um guia detalhado.
`;
  }
} 