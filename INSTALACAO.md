# 🚀 Guia de Instalação e Execução

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** versão 16 ou superior ([Download](https://nodejs.org/))
- **npm** (vem com Node.js) ou **yarn**
- Um editor de código (recomendamos **VS Code**)

### Verificar instalação

```bash
node --version
# Deve mostrar v16.x.x ou superior

npm --version
# Deve mostrar 8.x.x ou superior
```

---

## 📥 Instalação

### 1. Navegue até o diretório do projeto

```bash
cd c:\Users\User\Downloads\Fazendo\Angular\modulos-angular14-edu-app
```

### 2. Instale as dependências

```bash
npm install
```

Isso pode levar alguns minutos. O npm vai baixar todos os pacotes necessários.

**Possíveis avisos:**
- Avisos de deprecated packages são normais
- Vulnerabilidades de baixa severidade geralmente não são críticas

---

## ▶️ Executando a Aplicação

### Modo de Desenvolvimento

```bash
npm start
```

Ou:

```bash
ng serve
```

A aplicação estará disponível em: **http://localhost:4200**

**O que esperar:**
- Compilação pode levar 30-60 segundos na primeira vez
- O navegador pode abrir automaticamente
- Mudanças no código recarregam automaticamente (hot reload)

### Abrir no navegador

Se o navegador não abrir automaticamente, acesse:
```
http://localhost:4200
```

---

## 🔍 Explorando a Aplicação

### 1. Página Inicial
- Mostra explicações sobre módulos
- Apresenta os diferentes tipos de módulos
- Conceitos fundamentais bem explicados

### 2. Teste Lazy Loading
1. Abra o **DevTools** (F12)
2. Vá para a aba **Network**
3. Recarregue a página (Ctrl+R)
4. Observe os arquivos carregados
5. Clique em **"Produtos"** no menu
6. Veja um novo arquivo `.js` sendo carregado!
7. Isso é o **Lazy Loading** em ação! 🎉

### 3. Explore os Módulos
- **Produtos**: Feature module com lista e detalhes
- **Usuários**: Outro feature module com tabela
- Observe os console.logs mostrando quando cada módulo carrega

---

## 🛠️ Comandos Úteis

### Iniciar servidor de desenvolvimento
```bash
npm start
# ou
ng serve
```

### Iniciar em porta diferente
```bash
ng serve --port 4300
```

### Abrir navegador automaticamente
```bash
ng serve --open
# ou
ng serve -o
```

### Build de produção
```bash
npm run build
# ou
ng build
```
Os arquivos otimizados estarão em `dist/`

### Build com watch (recompila automaticamente)
```bash
npm run watch
# ou
ng build --watch
```

---

## 📂 Explorando o Código

### Arquivos Importantes para Estudar (em ordem)

1. **README.md** - Documentação principal
2. **GUIA-RAPIDO.md** - Referência rápida
3. **DIAGRAMAS.md** - Diagramas visuais
4. **src/main.ts** - Ponto de entrada
5. **src/app/app.module.ts** - Módulo raiz
6. **src/app/core/core.module.ts** - Core module
7. **src/app/shared/shared.module.ts** - Shared module
8. **src/app/features/produtos/produtos.module.ts** - Feature module

### VS Code - Extensões Recomendadas

- **Angular Language Service** - Intellisense para Angular
- **Angular Snippets** - Snippets úteis
- **Prettier** - Formatação de código
- **ESLint** - Linting

---

## 🐛 Problemas Comuns

### Erro: "ng: command not found"

**Solução:**
```bash
npm install -g @angular/cli
```

### Erro: "Port 4200 is already in use"

**Solução 1:** Use outra porta
```bash
ng serve --port 4300
```

**Solução 2:** Mate o processo na porta 4200
```bash
# Windows
netstat -ano | findstr :4200
taskkill /PID <número> /F

# Linux/Mac
lsof -ti:4200 | xargs kill
```

### Erro: "Cannot find module..."

**Solução:**
```bash
# Limpe e reinstale
rm -rf node_modules package-lock.json
npm install
```

### Compilação muito lenta

**Solução:**
```bash
# Use o modo de compilação otimizada
ng serve --optimization=false
```

---

## 📚 Estrutura de Aprendizado Recomendada

### Dia 1: Fundamentos
1. Leia o **README.md** completo
2. Execute a aplicação
3. Navegue pela interface
4. Observe os console.logs

### Dia 2: Código
1. Estude **app.module.ts**
2. Estude **core.module.ts**
3. Estude **shared.module.ts**
4. Entenda a estrutura

### Dia 3: Features
1. Estude **produtos.module.ts**
2. Teste o lazy loading no DevTools
3. Veja como as rotas funcionam
4. Modifique algo e observe

### Dia 4: Prática
1. Abra **EXERCICIOS.md**
2. Faça os exercícios propostos
3. Crie seu próprio feature module
4. Experimente!

---

## 💡 Dicas de Estudo

### 1. Use o Console
Todos os módulos fazem `console.log` quando carregam. Isso ajuda a entender a ordem de carregamento.

### 2. Modifique o Código
- Mude textos nos templates
- Adicione novos componentes
- Experimente quebrar coisas para entender melhor

### 3. Leia os Comentários
Cada arquivo tem comentários extensivos explicando conceitos.

### 4. Use o DevTools
- Aba Network: Veja lazy loading
- Aba Console: Veja logs de carregamento
- Aba Sources: Explore os arquivos gerados

### 5. Compare Módulos
Compare lado a lado:
- AppModule vs Feature Module
- SharedModule vs CoreModule
- BrowserModule vs CommonModule

---

## 🎯 Checklist de Aprendizado

Marque conforme for aprendendo:

### Conceitos Básicos
- [ ] Entendo o que é um NgModule
- [ ] Sei a diferença entre declarations, imports, exports
- [ ] Entendo o papel do providers
- [ ] Sei o que é bootstrap

### Tipos de Módulos
- [ ] Entendo o Root Module (AppModule)
- [ ] Entendo Feature Modules
- [ ] Entendo Shared Module
- [ ] Entendo Core Module

### Diferenças Importantes
- [ ] BrowserModule vs CommonModule
- [ ] forRoot() vs forChild()
- [ ] providedIn: 'root' vs providers array

### Lazy Loading
- [ ] Sei o que é lazy loading
- [ ] Sei configurar lazy loading
- [ ] Vi lazy loading funcionando no DevTools

### Prática
- [ ] Criei meu próprio feature module
- [ ] Adicionei componente ao SharedModule
- [ ] Criei um serviço no CoreModule
- [ ] Implementei lazy loading

---

## 🆘 Suporte e Recursos

### Documentação Oficial
- [Angular Docs](https://angular.io/docs)
- [NgModule Guide](https://angular.io/guide/ngmodules)
- [Lazy Loading](https://angular.io/guide/lazy-loading-ngmodules)

### Comunidade
- [Stack Overflow - Angular](https://stackoverflow.com/questions/tagged/angular)
- [Angular Discord](https://discord.gg/angular)
- [Reddit r/Angular2](https://reddit.com/r/Angular2)

### Vídeos e Tutoriais
- [Angular YouTube Channel](https://www.youtube.com/c/Angular)
- Busque por "Angular Modules" no YouTube

---

## ✅ Próximos Passos

Depois de dominar módulos:

1. **Standalone Components** (Angular 14+)
   - Nova forma de criar componentes sem módulos

2. **State Management**
   - NgRx
   - Akita
   - NGXS

3. **Testing**
   - Unit tests com Jasmine
   - E2E tests com Cypress

4. **Performance**
   - Change Detection
   - OnPush strategy
   - TrackBy

5. **Arquitetura**
   - Design patterns
   - Clean architecture
   - DDD

---

**Boa sorte nos estudos! 🚀📚**

**Qualquer dúvida, consulte a documentação oficial ou a comunidade Angular!**
