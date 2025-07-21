# 🚀 Configurar GitHub Pages para TModLoader MCP

## Passo a Passo

### 1. Preparar o Repositório

Certifique-se de que o repositório está no GitHub e que você tem permissões de administrador.

### 2. Ativar GitHub Pages

1. Vá para **Settings** do repositório
2. Role até **Pages** na barra lateral
3. Em **Source**, selecione **Deploy from a branch**
4. Em **Branch**, selecione **gh-pages** e **/(root)**
5. Clique **Save**

### 3. Configurar GitHub Actions

Os workflows já estão configurados no projeto:

- `.github/workflows/setup-pages.yml` - Deploy automático
- `.github/workflows/deploy-pages.yml` - Build e deploy
- `.github/workflows/api-handler.yml` - Processamento de API

### 4. Fazer Push para Ativar

```bash
git add .
git commit -m "Configurar GitHub Pages"
git push origin main
```

### 5. Verificar Deploy

1. Vá para **Actions** no GitHub
2. Verifique se o workflow "Setup GitHub Pages" executou com sucesso
3. Aguarde alguns minutos para o deploy

### 6. Acessar o Site

A URL será: `https://[seu-usuario].github.io/tmodloader/`

## 🔧 Configurações Importantes

### Branch gh-pages
O GitHub Actions criará automaticamente o branch `gh-pages` com os arquivos estáticos.

### Permissões
Certifique-se de que o `GITHUB_TOKEN` tem permissões para:
- `contents: write`
- `pages: write`

### Domínio Customizado (Opcional)
Se quiser um domínio customizado:
1. Vá para **Settings > Pages**
2. Em **Custom domain**, adicione seu domínio
3. Configure o DNS conforme instruções

## 🎯 Testando

### Teste Local
```bash
npm run build
npm run server
curl http://localhost:3000/health
```

### Teste no GitHub Pages
```bash
curl https://[seu-usuario].github.io/tmodloader/health
```

## 🚨 Troubleshooting

### Problema: Página não carrega
**Solução:**
1. Verifique se o branch `gh-pages` foi criado
2. Verifique se o GitHub Pages está ativado
3. Aguarde alguns minutos para o deploy

### Problema: Build falha
**Solução:**
1. Verifique os logs do GitHub Actions
2. Certifique-se de que todas as dependências estão no `package.json`
3. Verifique se o TypeScript está compilando corretamente

### Problema: API não funciona
**Solução:**
1. GitHub Pages serve apenas arquivos estáticos
2. Para API dinâmica, use GitHub Actions ou migre para Render/Railway
3. A interface web funciona perfeitamente no GitHub Pages

## ✅ Vantagens do GitHub Pages

- **Gratuito** - Sem custos de hospedagem
- **Automático** - Deploy automático via GitHub Actions
- **Confiável** - Infraestrutura do GitHub
- **Público** - Sem problemas de autenticação
- **CDN** - Distribuição global rápida
- **HTTPS** - Segurança automática

## 📊 Status do Deploy

Após o push, você pode verificar o status em:
- **Actions** → Workflows executados
- **Settings > Pages** → Status do deploy
- **Branch gh-pages** → Arquivos publicados

## 🎉 Próximos Passos

1. **Teste a interface web**
2. **Configure um domínio customizado** (opcional)
3. **Adicione mais funcionalidades** à interface
4. **Documente a API** para outros desenvolvedores

## 📞 Suporte

Se encontrar problemas:
1. Verifique os logs do GitHub Actions
2. Consulte a documentação do GitHub Pages
3. Abra uma issue no repositório 