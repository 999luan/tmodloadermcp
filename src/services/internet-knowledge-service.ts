import axios from 'axios';
import * as cheerio from 'cheerio';

export class InternetKnowledgeService {
  private readonly tmodloaderWikiUrl = 'https://github.com/tModLoader/tModLoader/wiki';
  private readonly tmodloaderDocsUrl = 'https://github.com/tModLoader/tModLoader';
  private readonly terrariaWikiUrl = 'https://terraria.wiki.gg';
  private readonly youtubeSearchUrl = 'https://www.youtube.com/results';

  async getLatestTModLoaderInfo(): Promise<string> {
    try {
      const response = await axios.get(this.tmodloaderDocsUrl);
      const $ = cheerio.load(response.data);
      
      // Extrair informações sobre a versão mais recente
      const latestVersion = $('a[href*="/releases/tag/"]').first().text().trim();
      const readmeContent = $('.markdown-body').text().substring(0, 1000);
      
      return `
# Informações Atualizadas do TModLoader

## Versão Mais Recente
${latestVersion || 'Informação não disponível'}

## Resumo das Funcionalidades
${readmeContent}

## Links Úteis
- **GitHub**: ${this.tmodloaderDocsUrl}
- **Wiki**: ${this.tmodloaderWikiUrl}
- **Terraria Wiki**: ${this.terrariaWikiUrl}

## Notas Importantes
- Sempre verifique a versão mais recente do TModLoader
- Consulte a documentação oficial para mudanças na API
- Teste seus mods com a versão mais recente
`;
    } catch (error) {
      return `
# Informações do TModLoader

## Links Oficiais
- **GitHub**: ${this.tmodloaderDocsUrl}
- **Wiki**: ${this.tmodloaderWikiUrl}
- **Terraria Wiki**: ${this.terrariaWikiUrl}

## Dica
Sempre consulte a documentação oficial para informações mais atualizadas.
`;
    }
  }

  async getTutorialFromYouTube(query: string): Promise<string> {
    try {
      const searchQuery = encodeURIComponent(`TModLoader ${query} tutorial`);
      const response = await axios.get(`${this.youtubeSearchUrl}?search_query=${searchQuery}`);
      const $ = cheerio.load(response.data);
      
      const videos: string[] = [];
      $('a[href*="/watch"]').each((index, element) => {
        if (index < 5) { // Limitar a 5 vídeos
          const title = $(element).attr('title');
          const href = $(element).attr('href');
          if (title && href) {
            videos.push(`- [${title}](https://www.youtube.com${href})`);
          }
        }
      });

      return `
# Tutoriais do YouTube - ${query}

## Vídeos Encontrados
${videos.length > 0 ? videos.join('\n') : 'Nenhum vídeo encontrado'}

## Dicas para Tutoriais
1. **Procure por canais confiáveis**: Spriters, tModLoader team, etc.
2. **Verifique a data**: Tutoriais mais recentes são melhores
3. **Leia os comentários**: Outros desenvolvedores podem ter dicas úteis
4. **Pratique junto**: Pause o vídeo e implemente o código

## Canais Recomendados
- **Spriters**: Tutoriais oficiais do TModLoader
- **Calamity Mod**: Exemplos de mods complexos
- **Thorium Mod**: Boas práticas de desenvolvimento
`;
    } catch (error) {
      return `
# Tutoriais do YouTube - ${query}

## Canais Recomendados
- **Spriters**: Tutoriais oficiais do TModLoader
- **Calamity Mod**: Exemplos de mods complexos
- **Thorium Mod**: Boas práticas de desenvolvimento

## Dicas
1. Procure por tutoriais recentes
2. Verifique a qualidade do código
3. Pratique implementando junto
4. Leia comentários para dicas extras
`;
    }
  }

  async getCommunityPatterns(): Promise<string> {
    return `
# Padrões da Comunidade TModLoader

## Padrões de Nomenclatura
### Items
- **Weapons**: \`[Material][Type]Sword\` (ex: IronSword, CrystalBow)
- **Tools**: \`[Material][Tool]\` (ex: DiamondPickaxe, ObsidianHammer)
- **Accessories**: \`[Effect][Type]\` (ex: FireResistanceRing, SpeedBoots)

### NPCs
- **Enemies**: \`[Type][Creature]\` (ex: FireDragon, IceGolem)
- **Bosses**: \`[Name]Boss\` (ex: DragonBoss, CrystalBoss)
- **Town NPCs**: \`[Name]NPC\` (ex: MerchantNPC, WizardNPC)

### Tiles
- **Blocks**: \`[Material]Block\` (ex: CrystalBlock, ObsidianBlock)
- **Furniture**: \`[Type][Furniture]\` (ex: CrystalChair, MagicTable)

## Padrões de Organização
### Estrutura de Projeto
\`\`\`
YourMod/
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
└── Systems/
\`\`\`

## Padrões de Código
### Configuração de Items
\`\`\`csharp
public override void SetDefaults()
{
    // Dimensões
    Item.width = 32;
    Item.height = 32;
    
    // Propriedades básicas
    Item.damage = 50;
    Item.defense = 10;
    Item.crit = 5;
    
    // Uso
    Item.useTime = 20;
    Item.useAnimation = 20;
    Item.useStyle = ItemUseStyleID.Swing;
    
    // Valor e raridade
    Item.value = 10000;
    Item.rare = ItemRarityID.Green;
    
    // Sons
    Item.UseSound = SoundID.Item1;
    Item.HitSound = SoundID.NPCHit1;
}
\`\`\`

### Configuração de NPCs
\`\`\`csharp
public override void SetDefaults()
{
    // Dimensões
    NPC.width = 40;
    NPC.height = 40;
    
    // Estatísticas
    NPC.damage = 20;
    NPC.defense = 10;
    NPC.lifeMax = 200;
    
    // Comportamento
    NPC.aiStyle = NPCAIStyleID.Fighter;
    NPC.knockBackResist = 0.5f;
    
    // Sons
    NPC.HitSound = SoundID.NPCHit1;
    NPC.DeathSound = SoundID.NPCDeath1;
}
\`\`\`

## Padrões de Performance
### Otimização de Loops
\`\`\`csharp
// ❌ Ruim
for (int i = 0; i < Main.maxTilesX; i++)
{
    for (int j = 0; j < Main.maxTilesY; j++)
    {
        if (Main.tile[i, j].TileType == ModContent.TileType<CustomTile>())
        {
            // Processar
        }
    }
}

// ✅ Bom
Tile[,] tiles = Main.tile;
for (int i = 0; i < Main.maxTilesX; i++)
{
    for (int j = 0; j < Main.maxTilesY; j++)
    {
        if (tiles[i, j].TileType == ModContent.TileType<CustomTile>())
        {
            // Processar
        }
    }
}
\`\`\`

## Padrões de Compatibilidade
### Verificação de Dependências
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

### Hooks Seguros
\`\`\`csharp
public override void OnHitNPC(NPC target, NPC.HitInfo hit, int damageDone)
{
    if (target != null && target.active)
    {
        // Processar hit
        target.AddBuff(BuffID.Poisoned, 300);
    }
}
\`\`\`

## Padrões de Documentação
### Comentários XML
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
}
\`\`\`

## Padrões de Testing
### Testes Unitários
\`\`\`csharp
[Test]
public void TestItemDefaults()
{
    var item = new CustomItem();
    item.SetDefaults();
    
    Assert.AreEqual(32, item.Item.width);
    Assert.AreEqual(32, item.Item.height);
    Assert.AreEqual(50, item.Item.damage);
    Assert.AreEqual(ItemRarityID.Green, item.Item.rare);
}
\`\`\`

## Padrões de Versionamento
### Controle de Versão
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

## Padrões de Networking
### Sincronização de Dados
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

## Padrões de Assets
### Organização de Texturas
\`\`\`
Textures/
├── Items/
│   ├── Weapons/
│   ├── Tools/
│   └── Accessories/
├── NPCs/
│   ├── Enemies/
│   └── TownNPCs/
└── Tiles/
    ├── Blocks/
    └── Furniture/
\`\`\`

### Especificações de Texturas
- **Items**: 32x32 pixels, PNG com transparência
- **NPCs**: 64x64 pixels (inimigos), 128x128 pixels (bosses)
- **Tiles**: 16x16 pixels, PNG com transparência
- **Nomenclatura**: PascalCase (ex: CustomSword.png)

## Padrões de Release
### Changelog
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
\`\`\`

## Padrões de Comunidade
### Contribuição
1. **Fork o projeto**
2. **Crie uma branch**: \`git checkout -b feature/AmazingFeature\`
3. **Commit suas mudanças**: \`git commit -m 'Add some AmazingFeature'\`
4. **Push para a branch**: \`git push origin feature/AmazingFeature'\`
5. **Abra um Pull Request**

### Reporte de Bugs
- **Título claro**: "Crash ao usar CustomSword"
- **Descrição detalhada**: Passos para reproduzir
- **Informações do sistema**: Versão do TModLoader, outros mods
- **Logs**: Se disponível, inclua logs de erro

### Solicitação de Features
- **Justificativa**: Por que a feature é necessária
- **Proposta de implementação**: Como implementar
- **Exemplos**: Casos de uso específicos
- **Alternativas**: Outras formas de resolver o problema
`;
  }

  async getLatestAPIChanges(): Promise<string> {
    return `
# Mudanças Recentes na API do TModLoader

## Versão 2022.1.1+
### Novas Funcionalidades
- **DamageClass**: Sistema unificado de tipos de dano
- **ModPlayer.SyncPlayer**: Sincronização melhorada
- **ModPacket**: Sistema de pacotes mais robusto
- **ModContent**: Acesso mais seguro ao conteúdo

### Mudanças Breaking
- **Item.magic**: Substituído por \`Item.DamageType = DamageClass.Magic\`
- **Item.melee**: Substituído por \`Item.DamageType = DamageClass.Melee\`
- **Item.ranged**: Substituído por \`Item.DamageType = DamageClass.Ranged\`
- **Item.summon**: Substituído por \`Item.DamageType = DamageClass.Summon\`

### Exemplos de Migração
\`\`\`csharp
// ❌ Antigo
public override void SetDefaults()
{
    Item.magic = true;
    Item.mana = 10;
}

// ✅ Novo
public override void SetDefaults()
{
    Item.DamageType = DamageClass.Magic;
    Item.mana = 10;
}
\`\`\`

## Versão 2022.1.0+
### Melhorias de Performance
- **Tile arrays**: Acesso mais eficiente
- **NPC updates**: Otimização de atualizações
- **Memory management**: Melhor gerenciamento de memória

### Novos Hooks
- **ModPlayer.PreUpdate**: Antes da atualização
- **ModPlayer.PostUpdate**: Depois da atualização
- **ModNPC.PreAI**: Antes da AI
- **ModNPC.PostAI**: Depois da AI

## Versão 2022.0.0+
### Sistema de Mods
- **Mod loading**: Carregamento mais rápido
- **Dependency resolution**: Resolução automática de dependências
- **Error handling**: Melhor tratamento de erros

### Networking
- **ModPacket**: Sistema de pacotes personalizados
- **SyncPlayer**: Sincronização de dados do jogador
- **Multiplayer**: Suporte melhorado a multiplayer

## Dicas de Migração
1. **Atualize gradualmente**: Não tente migrar tudo de uma vez
2. **Teste cada mudança**: Verifique se funciona antes de continuar
3. **Use ferramentas**: IDEs podem ajudar a identificar problemas
4. **Consulte a documentação**: Sempre verifique a documentação oficial
5. **Faça backup**: Mantenha versões anteriores para rollback

## Recursos Úteis
- **GitHub Releases**: https://github.com/tModLoader/tModLoader/releases
- **Migration Guide**: Documentação oficial de migração
- **Community Discord**: Para dúvidas e suporte
- **Wiki**: Documentação detalhada de cada versão
`;
  }

  async getPopularModsAnalysis(): Promise<string> {
    return `
# Análise de Mods Populares

## Calamity Mod
### Características
- **Complexidade**: Alta
- **Conteúdo**: Bosses, itens, biomas, música
- **Performance**: Otimizado para grandes mods

### Padrões Identificados
\`\`\`csharp
// Sistema de fases de boss
public override void AI()
{
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
}
\`\`\`

### Lições Aprendidas
1. **Modularidade**: Divida funcionalidades em classes separadas
2. **Performance**: Use cache para dados frequentemente acessados
3. **Compatibilidade**: Teste com outros mods populares
4. **Documentação**: Mantenha documentação atualizada

## Thorium Mod
### Características
- **Complexidade**: Média-Alta
- **Conteúdo**: Classes, itens, NPCs
- **Balanceamento**: Foco em balanceamento

### Padrões Identificados
\`\`\`csharp
// Sistema de classes
public class ThoriumPlayer : ModPlayer
{
    public bool thoriumClass = false;
    public int thoriumLevel = 0;
    
    public override void ResetEffects()
    {
        thoriumClass = false;
        thoriumLevel = 0;
    }
}
\`\`\`

### Lições Aprendidas
1. **Balanceamento**: Teste extensivamente o balanceamento
2. **Progression**: Crie sistemas de progressão claros
3. **Integration**: Integre bem com o jogo base
4. **Community**: Mantenha a comunidade engajada

## Spirit Mod
### Características
- **Complexidade**: Média
- **Conteúdo**: Biomas, itens, NPCs
- **Atmosphere**: Foco em atmosfera e tema

### Padrões Identificados
\`\`\`csharp
// Sistema de biomas
public override void PostUpdate()
{
    if (IsInSpiritBiome())
    {
        Player.ZoneSpirit = true;
        // Efeitos do bioma
    }
}

private bool IsInSpiritBiome()
{
    Point tilePos = Player.Center.ToTileCoordinates();
    return Main.tile[tilePos.X, tilePos.Y].TileType == ModContent.TileType<SpiritTile>();
}
\`\`\`

### Lições Aprendidas
1. **Theming**: Mantenha um tema consistente
2. **Atmosphere**: Use música e visuais para criar atmosfera
3. **Exploration**: Crie conteúdo que incentive exploração
4. **Polish**: Detalhes fazem a diferença

## Tremor Mod
### Características
- **Complexidade**: Baixa-Média
- **Conteúdo**: Itens, NPCs, estruturas
- **Accessibility**: Foco em acessibilidade

### Padrões Identificados
\`\`\`csharp
// Sistema de crafting simples
public override void AddRecipes()
{
    Recipe recipe = CreateRecipe();
    recipe.AddIngredient(ItemID.Wood, 10);
    recipe.AddIngredient(ItemID.IronBar, 5);
    recipe.AddTile(TileID.WorkBenches);
    recipe.Register();
}
\`\`\`

### Lições Aprendidas
1. **Simplicidade**: Às vezes menos é mais
2. **Accessibility**: Torne o conteúdo acessível
3. **Documentation**: Documente bem o conteúdo
4. **Testing**: Teste com diferentes jogadores

## Ancients Awakened
### Características
- **Complexidade**: Alta
- **Conteúdo**: Bosses, itens, lore
- **Storytelling**: Foco em narrativa

### Padrões Identificados
\`\`\`csharp
// Sistema de lore
public class LoreSystem : ModSystem
{
    public static bool hasReadLore = false;
    
    public override void PostUpdateWorld()
    {
        // Atualizar estado do lore baseado no progresso
        if (NPC.downedBoss1 && !hasReadLore)
        {
            hasReadLore = true;
            // Mostrar lore
        }
    }
}
\`\`\`

### Lições Aprendidas
1. **Storytelling**: Use sistemas para contar histórias
2. **Progression**: Conecte conteúdo com progressão
3. **Lore**: Crie lore rico e interessante
4. **Integration**: Integre história com gameplay

## Padrões Comuns Identificados

### 1. Estrutura de Projeto
Todos os mods populares seguem uma estrutura similar:
- **Organização clara**: Separação por tipo de conteúdo
- **Nomenclatura consistente**: Padrões de nomenclatura
- **Documentação**: README e changelog
- **Testing**: Testes regulares

### 2. Performance
- **Otimização**: Todos otimizam para performance
- **Memory management**: Gerenciamento cuidadoso de memória
- **Update frequency**: Frequência de atualização apropriada
- **Caching**: Cache de dados frequentemente acessados

### 3. Compatibilidade
- **Mod compatibility**: Testam com outros mods
- **Version checking**: Verificam versões compatíveis
- **Fallbacks**: Implementam fallbacks para funcionalidades
- **Error handling**: Tratamento robusto de erros

### 4. Community
- **Documentation**: Documentação clara e atualizada
- **Support**: Suporte ativo à comunidade
- **Updates**: Atualizações regulares
- **Feedback**: Incorporam feedback da comunidade

## Recomendações para Novos Mods

### 1. Comece Pequeno
- **MVP**: Crie um mínimo produto viável
- **Iterate**: Melhore baseado em feedback
- **Expand**: Expanda gradualmente
- **Polish**: Pola cada funcionalidade

### 2. Foque na Qualidade
- **Testing**: Teste extensivamente
- **Performance**: Otimize desde o início
- **Compatibility**: Considere compatibilidade
- **Documentation**: Documente bem

### 3. Engaje a Comunidade
- **Feedback**: Solicite e incorpore feedback
- **Updates**: Mantenha atualizações regulares
- **Support**: Ofereça suporte ativo
- **Collaboration**: Colabore com outros desenvolvedores

### 4. Aprenda com Outros
- **Study**: Estude mods populares
- **Analyze**: Analise código de outros mods
- **Contribute**: Contribua para outros mods
- **Network**: Conecte-se com outros desenvolvedores
`;
  }
} 