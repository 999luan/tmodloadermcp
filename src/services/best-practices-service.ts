import * as fs from 'fs-extra';
import * as path from 'path';

export class BestPracticesService {
  private readonly practicesPath = path.join(process.cwd(), 'data', 'best-practices');

  constructor() {
    this.initializePractices();
  }

  private async initializePractices() {
    await fs.ensureDir(this.practicesPath);
  }

  async getBestPractices(category?: string): Promise<string> {
    const practices = this.getPracticesContent(category);
    return practices;
  }

  private getPracticesContent(category?: string): string {
    const practices: { [key: string]: string } = {
      'performance': `
# Melhores Práticas: Performance

## Otimização de Código

### 1. Uso Eficiente de Arrays
\`\`\`csharp
// ❌ Ruim - Acessa array múltiplas vezes
for (int i = 0; i < Main.maxTilesX; i++)
{
    for (int j = 0; j < Main.maxTilesY; j++)
    {
        if (Main.tile[i, j].TileType == ModContent.TileType<CustomTile>())
        {
            // Processar tile
        }
    }
}

// ✅ Bom - Cache a referência
Tile[,] tiles = Main.tile;
for (int i = 0; i < Main.maxTilesX; i++)
{
    for (int j = 0; j < Main.maxTilesY; j++)
    {
        if (tiles[i, j].TileType == ModContent.TileType<CustomTile>())
        {
            // Processar tile
        }
    }
}
\`\`\`

### 2. Minimizar Alocações de Memória
\`\`\`csharp
// ❌ Ruim - Cria novos objetos a cada frame
public override void AI()
{
    Vector2 direction = new Vector2(Main.rand.NextFloat(), Main.rand.NextFloat());
    NPC.velocity = direction * 5f;
}

// ✅ Bom - Reutiliza objetos
private Vector2 cachedDirection = Vector2.Zero;
public override void AI()
{
    if (Main.rand.NextBool(60))
    {
        cachedDirection = new Vector2(Main.rand.NextFloat(), Main.rand.NextFloat());
    }
    NPC.velocity = cachedDirection * 5f;
}
\`\`\`

### 3. Otimizar Loops
\`\`\`csharp
// ❌ Ruim - Loop desnecessário
public override void PostUpdate()
{
    for (int i = 0; i < Main.maxPlayers; i++)
    {
        Player player = Main.player[i];
        if (player.active)
        {
            // Processar jogador
        }
    }
}

// ✅ Bom - Usa Main.LocalPlayer quando possível
public override void PostUpdate()
{
    Player player = Main.LocalPlayer;
    if (player.active)
    {
        // Processar jogador local
    }
}
\`\`\`

## Otimização de Assets

### 1. Carregamento de Texturas
\`\`\`csharp
// ✅ Bom - Carrega textura uma vez
private static Texture2D texture;
public override void Load()
{
    texture = Request<Texture2D>("Textures/Items/CustomItem").Value;
}

public override void Unload()
{
    texture = null;
}
\`\`\`

### 2. Cache de Valores Frequentes
\`\`\`csharp
// ✅ Bom - Cache de valores
private static int customTileType;
public override void Load()
{
    customTileType = ModContent.TileType<CustomTile>();
}
\`\`\`

## Otimização de Networking

### 1. Minimizar Pacotes
\`\`\`csharp
// ❌ Ruim - Envia dados desnecessários
public void SendData()
{
    ModPacket packet = GetPacket();
    packet.Write(player.position.X);
    packet.Write(player.position.Y);
    packet.Write(player.velocity.X);
    packet.Write(player.velocity.Y);
    packet.Write(player.life);
    packet.Write(player.mana);
    packet.Send();
}

// ✅ Bom - Envia apenas dados essenciais
public void SendData()
{
    ModPacket packet = GetPacket();
    packet.Write(player.position.X);
    packet.Write(player.position.Y);
    packet.Send();
}
\`\`\`
`,

      'compatibility': `
# Melhores Práticas: Compatibilidade

## Compatibilidade com Outros Mods

### 1. Namespaces Únicos
\`\`\`csharp
// ✅ Bom - Namespace único
namespace YourModName.Items
{
    public class CustomItem : ModItem
    {
        // Código do item
    }
}

// ❌ Ruim - Namespace genérico
namespace Items
{
    public class CustomItem : ModItem
    {
        // Código do item
    }
}
\`\`\`

### 2. Verificação de Dependências
\`\`\`csharp
public override void Load()
{
    // Verificar se mod dependente está carregado
    if (ModLoader.TryGetMod("CalamityMod", out Mod calamity))
    {
        // Usar funcionalidades do Calamity
        calamityItem = calamity.Find<ModItem>("CalamityItem").Type;
    }
}
\`\`\`

### 3. Hooks Seguros
\`\`\`csharp
// ✅ Bom - Verifica se NPC é válido
public override void OnHitNPC(NPC target, NPC.HitInfo hit, int damageDone)
{
    if (target != null && target.active)
    {
        // Processar hit
    }
}

// ❌ Ruim - Não verifica validade
public override void OnHitNPC(NPC target, NPC.HitInfo hit, int damageDone)
{
    // Pode causar erros se target for null
    target.AddBuff(BuffID.Poisoned, 300);
}
\`\`\`

## Compatibilidade Multiplayer

### 1. Sincronização de Dados
\`\`\`csharp
public class CustomPlayer : ModPlayer
{
    public bool customFlag = false;

    public override void SyncPlayer(int toWho, int fromWho, bool newPlayer)
    {
        ModPacket packet = GetPacket();
        packet.Write(customFlag);
        packet.Send(toWho, fromWho);
    }

    public override void ReceivePlayerSync(BinaryReader reader)
    {
        customFlag = reader.ReadBoolean();
    }
}
\`\`\`

### 2. Verificação de Rede
\`\`\`csharp
public override void AI()
{
    // Executar apenas no servidor
    if (Main.netMode == NetmodeID.Server)
    {
        // Lógica do servidor
    }

    // Executar apenas no cliente
    if (Main.netMode == NetmodeID.MultiplayerClient)
    {
        // Lógica do cliente
    }
}
\`\`\`

## Compatibilidade de Versões

### 1. Versionamento
\`\`\`csharp
public class YourMod : Mod
{
    public override string Version => "1.0.0";
    
    public override void Load()
    {
        // Verificar versão do TModLoader
        if (ModLoader.Version < new Version(2022, 1, 1))
        {
            throw new Exception("TModLoader 2022.1.1+ required");
        }
    }
}
\`\`\`

### 2. Fallbacks para Funcionalidades
\`\`\`csharp
public override void SetDefaults()
{
    // Usar funcionalidades novas quando disponíveis
    if (ModLoader.Version >= new Version(2022, 1, 1))
    {
        Item.DamageType = DamageClass.Summon;
    }
    else
    {
        // Fallback para versões antigas
        Item.magic = true;
    }
}
\`\`\`
`,

      'code_organization': `
# Melhores Práticas: Organização de Código

## Estrutura de Projeto

### 1. Organização de Pastas
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
├── Systems/
│   ├── CustomPlayer.cs
│   └── CustomWorld.cs
├── Content/
│   ├── Textures/
│   └── Sounds/
└── Properties/
    └── AssemblyInfo.cs
\`\`\`

### 2. Convenções de Nomenclatura
\`\`\`csharp
// ✅ Bom - Nomes descritivos
public class SuperUltraMegaSword : ModItem { }
public class FireBreathingDragon : ModNPC { }
public class CrystalCaveTile : ModTile { }

// ❌ Ruim - Nomes genéricos
public class Item1 : ModItem { }
public class Enemy : ModNPC { }
public class Tile : ModTile { }
\`\`\`

## Organização de Código

### 1. Métodos Organizados
\`\`\`csharp
public class CustomItem : ModItem
{
    // 1. Métodos estáticos primeiro
    public override void SetStaticDefaults()
    {
        // Configurações estáticas
    }

    // 2. Métodos de inicialização
    public override void SetDefaults()
    {
        // Configurações básicas
    }

    // 3. Métodos de comportamento
    public override void OnHitNPC(Player player, NPC target, NPC.HitInfo hit, int damageDone)
    {
        // Lógica de hit
    }

    // 4. Métodos de crafting
    public override void AddRecipes()
    {
        // Receitas
    }
}
\`\`\`

### 2. Comentários Efetivos
\`\`\`csharp
public class CustomNPC : ModNPC
{
    // Configurações de spawn baseadas no bioma
    public override float SpawnChance(NPCSpawnInfo spawnInfo)
    {
        // Spawn apenas em florestas durante o dia
        return spawnInfo.Player.ZoneForest && Main.dayTime ? 0.1f : 0f;
    }

    // AI personalizada para comportamento único
    public override void AI()
    {
        // Fase 1: Perseguição do jogador
        if (NPC.life > NPC.lifeMax * 0.5f)
        {
            ChasePlayer();
        }
        // Fase 2: Ataques à distância
        else
        {
            RangedAttack();
        }
    }

    private void ChasePlayer()
    {
        Player player = Main.player[NPC.target];
        Vector2 direction = player.Center - NPC.Center;
        direction.Normalize();
        NPC.velocity = direction * 4f;
    }

    private void RangedAttack()
    {
        if (Main.rand.NextBool(60))
        {
            // Disparar projétil
            Projectile.NewProjectile(NPC.GetSource_FromAI(), NPC.Center, 
                Vector2.UnitX * 8f, ModContent.ProjectileType<CustomProjectile>(), 
                30, 2f);
        }
    }
}
\`\`\`

## Reutilização de Código

### 1. Classes Base
\`\`\`csharp
public abstract class BaseWeapon : ModItem
{
    protected virtual int Damage => 50;
    protected virtual float Knockback => 6f;
    protected virtual int UseTime => 20;

    public override void SetDefaults()
    {
        Item.width = 40;
        Item.height = 40;
        Item.damage = Damage;
        Item.knockBack = Knockback;
        Item.useTime = UseTime;
        Item.useAnimation = UseTime;
        Item.useStyle = ItemUseStyleID.Swing;
        Item.autoReuse = true;
        Item.DamageType = DamageClass.Melee;
    }
}

public class CustomSword : BaseWeapon
{
    protected override int Damage => 75;
    protected override float Knockback => 8f;
}
\`\`\`

### 2. Métodos Utilitários
\`\`\`csharp
public static class ModUtils
{
    public static bool IsInBiome(Player player, int tileType)
    {
        Point tilePos = player.Center.ToTileCoordinates();
        return Main.tile[tilePos.X, tilePos.Y].TileType == tileType;
    }

    public static void SpawnDust(Vector2 position, int dustType, int count = 10)
    {
        for (int i = 0; i < count; i++)
        {
            Dust.NewDust(position, 10, 10, dustType);
        }
    }
}
\`\`\`
`,

      'debugging': `
# Melhores Práticas: Debugging

## Ferramentas de Debug

### 1. Logs Informativos
\`\`\`csharp
public override void AI()
{
    // Log apenas em desenvolvimento
    #if DEBUG
    if (Main.rand.NextBool(300))
    {
        Mod.Logger.Info($"NPC {Name} at position {NPC.Center}");
    }
    #endif
}
\`\`\`

### 2. Verificações de Validade
\`\`\`csharp
public override void OnHitNPC(NPC target, NPC.HitInfo hit, int damageDone)
{
    // Verificações de debug
    if (target == null)
    {
        Mod.Logger.Error("Target NPC is null!");
        return;
    }

    if (!target.active)
    {
        Mod.Logger.Warn("Target NPC is not active!");
        return;
    }

    // Processar hit normalmente
    target.AddBuff(BuffID.Poisoned, 300);
}
\`\`\`

### 3. Debug Visual
\`\`\`csharp
public override void PostDraw(SpriteBatch spriteBatch, Vector2 screenPos, Color drawColor)
{
    #if DEBUG
    // Desenhar informações de debug
    string debugInfo = $"Life: {NPC.life}/{NPC.lifeMax}\\nTarget: {NPC.target}";
    Vector2 textPos = NPC.Center - screenPos;
    textPos.Y -= 50;
    
    spriteBatch.DrawString(Main.fontMouseText, debugInfo, textPos, Color.White);
    #endif
}
\`\`\`

## Tratamento de Erros

### 1. Try-Catch Estratégico
\`\`\`csharp
public override void AI()
{
    try
    {
        // Lógica principal
        ProcessAI();
    }
    catch (Exception ex)
    {
        Mod.Logger.Error($"Error in {Name} AI: {ex.Message}");
        // Fallback seguro
        NPC.velocity = Vector2.Zero;
    }
}

private void ProcessAI()
{
    // Lógica complexa que pode falhar
    Player player = Main.player[NPC.target];
    if (player == null || !player.active)
    {
        throw new InvalidOperationException("No valid target player");
    }
}
\`\`\`

### 2. Validação de Dados
\`\`\`csharp
public override void SetDefaults()
{
    // Validar valores antes de aplicar
    int damage = 50;
    if (damage < 0)
    {
        Mod.Logger.Error("Damage cannot be negative!");
        damage = 0;
    }
    
    Item.damage = damage;
}
\`\`\`

## Debugging de Performance

### 1. Medição de Tempo
\`\`\`csharp
private System.Diagnostics.Stopwatch aiTimer = new System.Diagnostics.Stopwatch();

public override void AI()
{
    aiTimer.Restart();
    
    // Lógica AI
    ProcessAI();
    
    aiTimer.Stop();
    if (aiTimer.ElapsedMilliseconds > 16) // Mais de 1 frame
    {
        Mod.Logger.Warn($"AI took {aiTimer.ElapsedMilliseconds}ms");
    }
}
\`\`\`

### 2. Contadores de Debug
\`\`\`csharp
private int hitCount = 0;
private int killCount = 0;

public override void OnHitNPC(NPC target, NPC.HitInfo hit, int damageDone)
{
    hitCount++;
    Mod.Logger.Info($"Hit count: {hitCount}");
}

public override void OnKill()
{
    killCount++;
    Mod.Logger.Info($"Kill count: {killCount}");
}
\`\`\`
`,

      'testing': `
# Melhores Práticas: Testing

## Testes Unitários

### 1. Testes de Configuração
\`\`\`csharp
[Test]
public void TestItemDefaults()
{
    var item = new CustomItem();
    item.SetDefaults();
    
    Assert.AreEqual(20, item.Item.width);
    Assert.AreEqual(20, item.Item.height);
    Assert.AreEqual(10000, item.Item.value);
    Assert.AreEqual(ItemRarityID.Green, item.Item.rare);
}
\`\`\`

### 2. Testes de Comportamento
\`\`\`csharp
[Test]
public void TestItemCrafting()
{
    var item = new CustomItem();
    var recipe = item.CreateRecipe();
    
    Assert.IsNotNull(recipe);
    // Verificar ingredientes
    // Verificar resultado
}
\`\`\`

## Testes de Integração

### 1. Testes de Spawn
\`\`\`csharp
[Test]
public void TestNPCSpawn()
{
    var npc = new CustomNPC();
    var spawnInfo = new NPCSpawnInfo
    {
        Player = new Player(),
        SpawnTileX = 100,
        SpawnTileY = 100
    };
    
    float chance = npc.SpawnChance(spawnInfo);
    Assert.IsTrue(chance >= 0 && chance <= 1);
}
\`\`\`

### 2. Testes de Interação
\`\`\`csharp
[Test]
public void TestPlayerInteraction()
{
    var player = new Player();
    var item = new CustomItem();
    
    // Simular uso do item
    bool canUse = item.CanUseItem(player);
    Assert.IsTrue(canUse);
}
\`\`\`

## Testes de Performance

### 1. Benchmarks
\`\`\`csharp
[Test]
public void BenchmarkAI()
{
    var npc = new CustomNPC();
    var stopwatch = System.Diagnostics.Stopwatch.StartNew();
    
    for (int i = 0; i < 1000; i++)
    {
        npc.AI();
    }
    
    stopwatch.Stop();
    Assert.Less(stopwatch.ElapsedMilliseconds, 100); // Máximo 100ms
}
\`\`\`

### 2. Testes de Memória
\`\`\`csharp
[Test]
public void TestMemoryUsage()
{
    var initialMemory = GC.GetTotalMemory(true);
    
    var items = new List<ModItem>();
    for (int i = 0; i < 100; i++)
    {
        items.Add(new CustomItem());
    }
    
    var finalMemory = GC.GetTotalMemory(true);
    var memoryIncrease = finalMemory - initialMemory;
    
    Assert.Less(memoryIncrease, 1024 * 1024); // Máximo 1MB
}
\`\`\`

## Testes de Compatibilidade

### 1. Testes de Multiplayer
\`\`\`csharp
[Test]
public void TestMultiplayerSync()
{
    var player = new CustomPlayer();
    var packet = new ModPacket();
    
    // Simular envio de dados
    player.SyncPlayer(0, 1, true);
    
    // Verificar se dados foram enviados corretamente
    Assert.IsTrue(packet.Length > 0);
}
\`\`\`

### 2. Testes de Versão
\`\`\`csharp
[Test]
public void TestVersionCompatibility()
{
    var mod = new YourMod();
    
    // Testar compatibilidade com diferentes versões
    Assert.IsTrue(mod.IsCompatibleWith("2022.1.1"));
    Assert.IsFalse(mod.IsCompatibleWith("2020.1.1"));
}
\`\`\`
`,

      'documentation': `
# Melhores Práticas: Documentação

## Documentação de Código

### 1. Comentários XML
\`\`\`csharp
/// <summary>
/// Representa uma espada personalizada com efeitos especiais.
/// </summary>
/// <remarks>
/// Esta classe herda de ModItem e implementa funcionalidades
/// específicas para armas corpo a corpo.
/// </remarks>
public class CustomSword : ModItem
{
    /// <summary>
    /// O dano base da espada.
    /// </summary>
    private const int BaseDamage = 50;

    /// <summary>
    /// Configura as propriedades básicas do item.
    /// </summary>
    public override void SetDefaults()
    {
        Item.damage = BaseDamage;
        // ... outras configurações
    }

    /// <summary>
    /// Processa o efeito quando o item acerta um NPC.
    /// </summary>
    /// <param name="player">O jogador que usou o item.</param>
    /// <param name="target">O NPC que foi atingido.</param>
    /// <param name="hit">Informações sobre o hit.</param>
    /// <param name="damageDone">O dano causado.</param>
    public override void OnHitNPC(Player player, NPC target, NPC.HitInfo hit, int damageDone)
    {
        // Aplicar efeito de veneno
        target.AddBuff(BuffID.Poisoned, 300);
    }
}
\`\`\`

### 2. Documentação de API
\`\`\`csharp
/// <summary>
/// Fornece utilitários para criação de mods TModLoader.
/// </summary>
public static class ModUtils
{
    /// <summary>
    /// Verifica se o jogador está em um bioma específico.
    /// </summary>
    /// <param name="player">O jogador a verificar.</param>
    /// <param name="tileType">O tipo de tile que define o bioma.</param>
    /// <returns>True se o jogador estiver no bioma, false caso contrário.</returns>
    /// <example>
    /// <code>
    /// if (ModUtils.IsInBiome(player, ModContent.TileType<CustomTile>()))
    /// {
    ///     // Jogador está no bioma personalizado
    /// }
    /// </code>
    /// </example>
    public static bool IsInBiome(Player player, int tileType)
    {
        Point tilePos = player.Center.ToTileCoordinates();
        return Main.tile[tilePos.X, tilePos.Y].TileType == tileType;
    }
}
\`\`\`

## Documentação de Projeto

### 1. README.md
\`\`\`markdown
# Nome do Mod

## Descrição
Uma breve descrição do que seu mod faz.

## Funcionalidades
- Lista de funcionalidades principais
- Itens adicionados
- NPCs adicionados
- Biomas adicionados

## Instalação
1. Baixe o arquivo .tmod
2. Coloque na pasta Mods do TModLoader
3. Ative o mod no jogo

## Compatibilidade
- TModLoader 2022.1.1+
- Compatível com Calamity Mod
- Não compatível com Thorium Mod

## Créditos
- Desenvolvido por: Seu Nome
- Texturas por: Nome do Artista
- Inspirado em: Fonte de Inspiração

## Licença
MIT License - veja LICENSE para detalhes
\`\`\`

### 2. Changelog
\`\`\`markdown
# Changelog

## [1.2.0] - 2024-01-15
### Adicionado
- Nova espada "Espada de Fogo"
- Sistema de crafting avançado
- Suporte a multiplayer

### Corrigido
- Bug de spawn de NPCs
- Problema de compatibilidade com Calamity

### Removido
- Item obsoleto "Espada Antiga"

## [1.1.0] - 2024-01-01
### Adicionado
- Primeira versão do mod
- 5 novos itens
- 2 novos NPCs
\`\`\`

## Documentação de Assets

### 1. Estrutura de Texturas
\`\`\`
Textures/
├── Items/
│   ├── CustomSword.png (32x32)
│   └── CustomBow.png (32x32)
├── NPCs/
│   ├── CustomEnemy.png (64x64)
│   └── CustomBoss.png (128x128)
└── Tiles/
    └── CustomTile.png (16x16)
\`\`\`

### 2. Especificações de Assets
\`\`\`markdown
## Especificações de Texturas

### Itens
- Tamanho: 32x32 pixels
- Formato: PNG com transparência
- Nomenclatura: PascalCase (ex: CustomSword.png)

### NPCs
- Tamanho: 64x64 pixels (inimigos), 128x128 pixels (bosses)
- Formato: PNG com transparência
- Nomenclatura: PascalCase (ex: CustomBoss.png)

### Tiles
- Tamanho: 16x16 pixels
- Formato: PNG com transparência
- Nomenclatura: PascalCase (ex: CustomTile.png)
\`\`\`
`
    };

    if (category && practices[category]) {
      return practices[category];
    }

    return `
# Melhores Práticas do TModLoader

## Categorias Disponíveis

### 1. Performance
Otimização de código, uso eficiente de memória e melhor performance geral.

### 2. Compatibilidade
Garantir que seu mod funcione bem com outros mods e em multiplayer.

### 3. Organização de Código
Estrutura de projeto, convenções de nomenclatura e reutilização de código.

### 4. Debugging
Ferramentas e técnicas para debugar seu mod efetivamente.

### 5. Testing
Como testar seu mod para garantir qualidade e estabilidade.

### 6. Documentação
Como documentar seu código e projeto adequadamente.

## Princípios Gerais

1. **Simplicidade**: Mantenha o código simples e legível
2. **Reutilização**: Evite duplicação de código
3. **Performance**: Otimize quando necessário
4. **Compatibilidade**: Teste com outros mods
5. **Documentação**: Documente funcionalidades complexas
6. **Testing**: Teste regularmente seu mod
7. **Backup**: Mantenha backups do seu trabalho
8. **Versionamento**: Use controle de versão (Git)

Escolha uma categoria específica para obter diretrizes detalhadas sobre esse aspecto do desenvolvimento de mods.
`;
  }
} 