import axios from 'axios';
import * as fs from 'fs-extra';
import * as path from 'path';

export class DocumentationService {
  private documentationCache: Map<string, string> = new Map();
  private readonly docsPath = path.join(process.cwd(), 'data', 'documentation');

  constructor() {
    this.initializeDocumentation();
  }

  private async initializeDocumentation() {
    await fs.ensureDir(this.docsPath);
    await this.loadDocumentation();
  }

  private async loadDocumentation() {
    const documentationFiles = [
      'items.md',
      'npcs.md',
      'tiles.md',
      'projectiles.md',
      'buffs.md',
      'biomes.md',
      'worldgen.md',
      'api.md',
      'hooks.md',
      'networking.md'
    ];

    for (const file of documentationFiles) {
      const filePath = path.join(this.docsPath, file);
      if (await fs.pathExists(filePath)) {
        const content = await fs.readFile(filePath, 'utf-8');
        this.documentationCache.set(file.replace('.md', ''), content);
      }
    }
  }

  async getDocumentation(topic?: string): Promise<string> {
    if (topic) {
      const cached = this.documentationCache.get(topic.toLowerCase());
      if (cached) {
        return cached;
      }
    }

    // Fallback to comprehensive documentation
    return this.getComprehensiveDocumentation(topic);
  }

  private async getComprehensiveDocumentation(topic?: string): Promise<string> {
    const baseDocs = `
# TModLoader Documentation

## Overview
TModLoader is a modding framework for Terraria that allows developers to create custom content including items, NPCs, tiles, projectiles, and more.

## Core Concepts

### 1. Mod Structure
Every TModLoader mod follows a specific structure:
- **Mod.cs**: Main mod class that inherits from Mod
- **Items/**: Directory for custom items
- **NPCs/**: Directory for custom NPCs
- **Tiles/**: Directory for custom tiles
- **Projectiles/**: Directory for custom projectiles
- **Buffs/**: Directory for custom buffs

### 2. Basic Mod Class
\`\`\`csharp
using Terraria;
using Terraria.ModLoader;

namespace YourModName
{
    public class YourMod : Mod
    {
        public override void Load()
        {
            // Called when the mod is loaded
        }

        public override void Unload()
        {
            // Called when the mod is unloaded
        }
    }
}
\`\`\`

### 3. Item Creation
\`\`\`csharp
using Terraria;
using Terraria.ID;
using Terraria.ModLoader;

namespace YourModName.Items
{
    public class CustomItem : ModItem
    {
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

### 4. NPC Creation
\`\`\`csharp
using Microsoft.Xna.Framework;
using Terraria;
using Terraria.ID;
using Terraria.ModLoader;

namespace YourModName.NPCs
{
    public class CustomNPC : ModNPC
    {
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

### 5. Tile Creation
\`\`\`csharp
using Microsoft.Xna.Framework;
using Terraria;
using Terraria.ID;
using Terraria.ModLoader;

namespace YourModName.Tiles
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
        }

        public override void NumDust(int i, int j, bool fail, ref int num)
        {
            num = fail ? 1 : 3;
        }
    }
}
\`\`\`

## Key Topics

${topic ? this.getTopicSpecificInfo(topic) : this.getAllTopics()}

## Best Practices
1. Always use proper namespaces
2. Follow Terraria's naming conventions
3. Use appropriate sound and texture references
4. Test your mod thoroughly
5. Document your code
6. Use appropriate rarity and value settings
7. Consider multiplayer compatibility
8. Optimize performance for large mods

## Common Hooks
- \`SetDefaults()\`: Set basic properties
- \`AddRecipes()\`: Add crafting recipes
- \`SpawnChance()\`: Control spawn rates
- \`OnHitPlayer()\`: Handle player damage
- \`OnHitNPC()\`: Handle NPC damage
- \`ModifyHitPlayer()\`: Modify damage to players
- \`ModifyHitNPC()\`: Modify damage to NPCs

## Networking
For multiplayer compatibility, use:
- \`ModPacket\` for custom data
- \`SendData()\` for vanilla data
- \`NetMessage.SendData()\` for specific packets

## Performance Tips
1. Use \`Main.tile\` arrays efficiently
2. Minimize texture loading
3. Use appropriate update frequencies
4. Cache frequently accessed data
5. Use \`Main.LocalPlayer\` for client-side code
`;

    return baseDocs;
  }

  private getTopicSpecificInfo(topic: string): string {
    const topicMap: { [key: string]: string } = {
      'items': `
### Items
Items are the most common content type in TModLoader mods.

**Key Properties:**
- \`Item.width\` and \`Item.height\`: Size in pixels
- \`Item.value\`: Sell value in copper coins
- \`Item.rare\`: Rarity color (use ItemRarityID)
- \`Item.maxStack\`: Maximum stack size
- \`Item.damage\`: Damage value
- \`Item.defense\`: Defense value
- \`Item.crit\`: Critical strike chance

**Common Item Types:**
- Weapons: \`Item.DamageType\` = DamageClass.Melee/Ranged/Magic/Summon
- Tools: \`Item.pick\`, \`Item.axe\`, \`Item.hammer\`
- Armor: \`Item.headSlot\`, \`Item.bodySlot\`, \`Item.legSlot\`
- Accessories: \`Item.accessory = true\`

**Example Weapon:**
\`\`\`csharp
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
\`\`\`
`,

      'npcs': `
### NPCs
NPCs include enemies, critters, and town NPCs.

**Key Properties:**
- \`NPC.width\` and \`NPC.height\`: Size in pixels
- \`NPC.damage\`: Attack damage
- \`NPC.defense\`: Defense value
- \`NPC.lifeMax\`: Maximum health
- \`NPC.value\`: Drop value
- \`NPC.aiStyle\`: AI behavior (use NPCAIStyleID)
- \`NPC.friendly\`: Whether it's friendly to players

**AI Styles:**
- \`NPCAIStyleID.Fighter\`: Basic enemy AI
- \`NPCAIStyleID.Flying\`: Flying enemy AI
- \`NPCAIStyleID.Worm\`: Worm-like AI
- \`NPCAIStyleID.Passive\`: Passive/critter AI

**Example Enemy:**
\`\`\`csharp
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
    NPC.friendly = false;
    NPC.noGravity = false;
    NPC.noTileCollide = false;
}
\`\`\`
`,

      'tiles': `
### Tiles
Tiles are the building blocks of the world.

**Key Properties:**
- \`Main.tileSolid[Type]\`: Whether it's solid
- \`Main.tileMergeDirt[Type]\`: Whether it merges with dirt
- \`Main.tileBlockLight[Type]\`: Whether it blocks light
- \`Main.tileLighted[Type]\`: Whether it emits light
- \`Main.tileFrameImportant[Type]\`: Whether frame is important

**Tile Types:**
- Solid tiles: \`Main.tileSolid[Type] = true\`
- Background tiles: \`Main.tileFrameImportant[Type] = true\`
- Furniture: Use \`ModTileEntity\` for complex furniture

**Example Solid Tile:**
\`\`\`csharp
public override void SetStaticDefaults()
{
    Main.tileSolid[Type] = true;
    Main.tileMergeDirt[Type] = true;
    Main.tileBlockLight[Type] = true;
    Main.tileLighted[Type] = true;
    AddMapEntry(new Color(200, 200, 200));
    DustType = DustID.Stone;
    ItemDrop = ModContent.ItemType<CustomTileItem>();
}
\`\`\`
`,

      'projectiles': `
### Projectiles
Projectiles are fired objects like arrows, bullets, and magic spells.

**Key Properties:**
- \`Projectile.width\` and \`Projectile.height\`: Size
- \`Projectile.damage\`: Damage value
- \`Projectile.knockBack\`: Knockback strength
- \`Projectile.aiStyle\`: AI behavior
- \`Projectile.friendly\`: Whether it hurts enemies
- \`Projectile.hostile\`: Whether it hurts players

**AI Styles:**
- \`ProjectileID.Sets.TrailCacheLength\`: For trail effects
- \`ProjectileID.Sets.TrailingMode\`: Trail mode
- Custom AI in \`AI()\` method

**Example Projectile:**
\`\`\`csharp
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
\`\`\`
`,

      'buffs': `
### Buffs
Buffs are temporary effects applied to players or NPCs.

**Key Properties:**
- \`Buff.timeLeft\`: Duration in frames
- \`Buff.buffIndex\`: Buff ID
- \`Buff.canBeCleared\`: Whether it can be cleared
- \`Buff.longerExpertDebuff\`: Expert mode duration

**Buff Types:**
- Positive buffs: Increase stats
- Negative buffs (debuffs): Decrease stats
- Visual buffs: Only visual effects

**Example Buff:**
\`\`\`csharp
public override void SetStaticDefaults()
{
    DisplayName.SetDefault("Custom Buff");
    Description.SetDefault("A custom buff effect");
    Main.debuff[Type] = false;
    Main.buffNoSave[Type] = true;
    Main.buffNoTimeDisplay[Type] = false;
}

public override void Update(Player player, ref int buffIndex)
{
    player.statDefense += 5;
    player.moveSpeed += 0.1f;
}
\`\`\`
`,

      'biomes': `
### Biomes
Custom biomes add new areas to the world.

**Key Components:**
- Biome detection in \`ModPlayer\`
- Custom background styles
- Custom music
- Custom spawn rates
- Custom tile generation

**Example Biome Detection:**
\`\`\`csharp
public override void PostUpdate()
{
    if (IsInCustomBiome())
    {
        Player.ZoneCustomBiome = true;
    }
}

private bool IsInCustomBiome()
{
    // Check for custom tiles, background, etc.
    return Main.tile[Player.Center.ToTileCoordinates()].TileType == ModContent.TileType<CustomTile>();
}
\`\`\`
`,

      'worldgen': `
### World Generation
Custom world generation adds new structures and features.

**Key Methods:**
- \`ModWorld.PostWorldGen()\`: After world generation
- \`ModWorld.ModifyWorldGenTasks()\`: Modify generation tasks
- \`ModWorld.PreWorldGen()\`: Before world generation

**Example Structure Generation:**
\`\`\`csharp
public override void PostWorldGen()
{
    for (int i = 0; i < 10; i++)
    {
        int x = WorldGen.genRand.Next(100, Main.maxTilesX - 100);
        int y = WorldGen.genRand.Next(100, Main.maxTilesY - 100);
        GenerateCustomStructure(x, y);
    }
}

private void GenerateCustomStructure(int x, int y)
{
    // Generate your custom structure
    WorldGen.PlaceTile(x, y, ModContent.TileType<CustomTile>());
}
\`\`\`
`,

      'api': `
### TModLoader API
The TModLoader API provides access to game systems.

**Key Classes:**
- \`Mod\`: Main mod class
- \`ModItem\`: Custom items
- \`ModNPC\`: Custom NPCs
- \`ModTile\`: Custom tiles
- \`ModProjectile\`: Custom projectiles
- \`ModBuff\`: Custom buffs
- \`ModPlayer\`: Player modifications
- \`ModWorld\`: World modifications

**Content Loading:**
- \`ModContent.ItemType<T>()\`: Get item type
- \`ModContent.NPCType<T>()\`: Get NPC type
- \`ModContent.TileType<T>()\`: Get tile type
- \`ModContent.ProjectileType<T>()\`: Get projectile type

**Asset Loading:**
- \`GetTexture()\`: Load textures
- \`GetSound()\`: Load sounds
- \`GetFont()\`: Load fonts
`,

      'hooks': `
### Hooks
Hooks allow you to intercept game events.

**Common Hooks:**
- \`OnHitPlayer()\`: When NPC hits player
- \`OnHitNPC()\`: When player hits NPC
- \`ModifyHitPlayer()\`: Modify damage to player
- \`ModifyHitNPC()\`: Modify damage to NPC
- \`OnSpawn()\`: When entity spawns
- \`OnKill()\`: When entity dies
- \`PreUpdate()\`: Before update
- \`PostUpdate()\`: After update

**Example Hook:**
\`\`\`csharp
public override void OnHitPlayer(Player target, Player.HurtInfo hurtInfo)
{
    // Apply custom effect when hitting player
    target.AddBuff(BuffID.Poisoned, 300);
}

public override void ModifyHitNPC(NPC target, ref NPC.HitModifiers modifiers)
{
    // Modify damage to NPCs
    modifiers.FinalDamage *= 1.5f;
}
\`\`\`
`,

      'networking': `
### Networking
Networking enables multiplayer functionality.

**Key Classes:**
- \`ModPacket\`: Custom packet data
- \`NetMessage\`: Vanilla networking
- \`MultiplayerSystem\`: Multiplayer utilities

**Example Packet:**
\`\`\`csharp
public override void HandlePacket(BinaryReader reader, int whoAmI)
{
    byte msgType = reader.ReadByte();
    switch (msgType)
    {
        case 0:
            // Handle custom data
            break;
    }
}

public void SendCustomData(int toClient = -1)
{
    ModPacket packet = GetPacket();
    packet.Write((byte)0);
    packet.Write("Custom data");
    packet.Send(toClient);
}
\`\`\`
`
    };

    return topicMap[topic.toLowerCase()] || `
### ${topic}
This topic is not yet documented. Please check the main documentation for general information about TModLoader modding.
`;
  }

  private getAllTopics(): string {
    return `
### Available Topics:
- **items**: Creating custom items, weapons, tools, and accessories
- **npcs**: Creating enemies, critters, and town NPCs
- **tiles**: Creating custom blocks and furniture
- **projectiles**: Creating arrows, bullets, and magic spells
- **buffs**: Creating temporary effects and debuffs
- **biomes**: Creating custom world areas
- **worldgen**: Custom world generation and structures
- **api**: TModLoader API reference
- **hooks**: Event hooks and callbacks
- **networking**: Multiplayer and packet handling

Use any of these topics to get detailed information about that specific aspect of TModLoader modding.
`;
  }
} 