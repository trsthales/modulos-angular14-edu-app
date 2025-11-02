# 🏗️ ARQUITETURA DE MÓDULOS - Diagrama Visual

```
┌─────────────────────────────────────────────────────────────────┐
│                         APLICAÇÃO ANGULAR                        │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │                    🌳 ROOT MODULE (AppModule)              │ │
│  │                                                            │ │
│  │  • BrowserModule                                           │ │
│  │  • RouterModule.forRoot(routes)                            │ │
│  │  • bootstrap: [AppComponent]                               │ │
│  │                                                            │ │
│  │  Importa:                                                  │ │
│  │  ├─► CoreModule (uma vez)                                 │ │
│  │  └─► SharedModule (pode usar)                             │ │
│  │                                                            │ │
│  └──────────────────────┬─────────────────────────────────────┘ │
│                         │                                        │
│         ┌───────────────┼───────────────┐                        │
│         │               │               │                        │
│         ▼               ▼               ▼                        │
│  ┌──────────┐   ┌──────────┐   ┌──────────┐                     │
│  │ ⚙️ CORE  │   │ 🔄 SHARED│   │ 📦 FEATURE                     │
│  │  MODULE  │   │  MODULE  │   │  MODULES │                     │
│  └──────────┘   └──────────┘   └──────────┘                     │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

---

## 🌳 ROOT MODULE (AppModule)

```
┌─────────────────────────────────────┐
│         app.module.ts               │
├─────────────────────────────────────┤
│                                     │
│  @NgModule({                        │
│    declarations: [                  │
│      AppComponent,                  │
│      HomeComponent                  │
│    ],                               │
│                                     │
│    imports: [                       │
│      BrowserModule,        ◄─────── Apenas aqui!
│      RouterModule.forRoot(),◄────── forRoot() apenas aqui!
│      CoreModule,           ◄─────── Importado uma vez
│      SharedModule          ◄─────── Pode importar
│    ],                               │
│                                     │
│    bootstrap: [            ◄─────── Apenas no Root!
│      AppComponent                   │
│    ]                                │
│  })                                 │
│                                     │
│  export class AppModule { }         │
│                                     │
└─────────────────────────────────────┘
```

---

## ⚙️ CORE MODULE (Singleton)

```
┌─────────────────────────────────────┐
│         core.module.ts              │
├─────────────────────────────────────┤
│                                     │
│  Contém:                            │
│  ├── 🔐 AuthService                 │
│  ├── 📊 LoggerService               │
│  ├── ⚙️  ConfigService              │
│  ├── 🛡️  AuthGuard                  │
│  └── 🔌 HTTP Interceptors           │
│                                     │
│  @NgModule({                        │
│    providers: [                     │
│      LoggerService,                 │
│      ConfigService                  │
│    ]                                │
│  })                                 │
│                                     │
│  constructor(                       │
│    @Optional() @SkipSelf()          │
│    parentModule: CoreModule         │
│  ) {                                │
│    if (parentModule) {              │
│      throw Error(                   │
│        'Já foi carregado!'          │
│      );                             │
│    }                                │
│  }                                  │
│                                     │
└─────────────────────────────────────┘

     ⚠️  IMPORTAR APENAS NO AppModule!
```

---

## 🔄 SHARED MODULE (Reutilizável)

```
┌─────────────────────────────────────┐
│       shared.module.ts              │
├─────────────────────────────────────┤
│                                     │
│  Contém:                            │
│  ├── 🎴 CardComponent               │
│  ├── ⏳ LoadingComponent            │
│  ├── ✨ HighlightDirective          │
│  └── ✂️  TruncatePipe               │
│                                     │
│  @NgModule({                        │
│    declarations: [                  │
│      CardComponent,                 │
│      LoadingComponent,              │
│      HighlightDirective,            │
│      TruncatePipe                   │
│    ],                               │
│                                     │
│    imports: [                       │
│      CommonModule                   │
│    ],                               │
│                                     │
│    exports: [          ◄─────────── IMPORTANTE!
│      CommonModule,                  │
│      CardComponent,                 │
│      LoadingComponent,              │
│      HighlightDirective,            │
│      TruncatePipe                   │
│    ],                               │
│                                     │
│    providers: []       ◄─────────── SEMPRE VAZIO!
│  })                                 │
│                                     │
└─────────────────────────────────────┘

     ✅ Pode ser importado em vários módulos!
```

---

## 📦 FEATURE MODULES (Lazy Loading)

```
┌─────────────────────────────────────┐
│      produtos.module.ts             │
├─────────────────────────────────────┤
│                                     │
│  const routes: Routes = [           │
│    { path: '', component: ... }     │
│  ];                                 │
│                                     │
│  @NgModule({                        │
│    declarations: [                  │
│      ProdutosListaComponent,        │
│      ProdutoDetalheComponent        │
│    ],                               │
│                                     │
│    imports: [                       │
│      CommonModule,     ◄─────────── Não BrowserModule!
│      RouterModule                   │
│        .forChild(routes),◄────────── forChild() aqui!
│      SharedModule      ◄─────────── Pode importar
│    ]                                │
│  })                                 │
│                                     │
└─────────────────────────────────────┘
              │
              │ Lazy Loading
              ▼
┌─────────────────────────────────────┐
│       app.routes.ts                 │
├─────────────────────────────────────┤
│                                     │
│  {                                  │
│    path: 'produtos',                │
│    loadChildren: () =>              │
│      import('./features/produtos')  │
│        .then(m => m.ProdutosModule) │
│  }                                  │
│                                     │
└─────────────────────────────────────┘
```

---

## 🔄 FLUXO DE CARREGAMENTO

```
1. Aplicação Inicia
   │
   ├─► main.ts
   │
   └─► platformBrowserDynamic()
       │
       └─► bootstrapModule(AppModule)
           │
           ├─► BrowserModule carregado
           ├─► CoreModule carregado (singleton)
           ├─► SharedModule carregado
           └─► AppComponent renderizado
               │
               └─► <router-outlet>
                   │
                   ├─► Usuário navega para /produtos
                   │   │
                   │   └─► ProdutosModule carregado (lazy)
                   │       └─► ProdutosListaComponent renderizado
                   │
                   └─► Usuário navega para /usuarios
                       │
                       └─► UsuariosModule carregado (lazy)
                           └─► UsuariosListaComponent renderizado
```

---

## 📊 COMPARAÇÃO: BrowserModule vs CommonModule

```
┌──────────────────────────┬──────────────────────────┐
│     BrowserModule        │     CommonModule         │
├──────────────────────────┼──────────────────────────┤
│                          │                          │
│  ✅ AppModule            │  ✅ Feature Modules      │
│  ❌ Feature Modules      │  ✅ Shared Module        │
│                          │  ✅ Core Module          │
│  • *ngIf                 │  • *ngIf                 │
│  • *ngFor                │  • *ngFor                │
│  • *ngSwitch             │  • *ngSwitch             │
│  • Pipes (date, etc)     │  • Pipes (date, etc)     │
│  • Serviços do Browser   │  • Sem serviços extras   │
│                          │                          │
│  Usar APENAS 1 vez       │  Usar quantas vezes      │
│                          │  necessário              │
│                          │                          │
└──────────────────────────┴──────────────────────────┘
```

---

## 📊 COMPARAÇÃO: forRoot() vs forChild()

```
┌──────────────────────────┬──────────────────────────┐
│   forRoot()              │   forChild()             │
├──────────────────────────┼──────────────────────────┤
│                          │                          │
│  ✅ AppModule            │  ✅ Feature Modules      │
│  ❌ Feature Modules      │  ❌ AppModule            │
│                          │                          │
│  • Configura serviços    │  • Apenas registra rotas │
│  • Cria instâncias       │  • Não cria serviços     │
│  • Singleton global      │  • Usa serviços globais  │
│                          │                          │
│  Usar APENAS 1 vez       │  Usar em cada            │
│  no módulo raiz          │  feature module          │
│                          │                          │
└──────────────────────────┴──────────────────────────┘
```

---

## 🎯 DECISÃO: Onde declarar um Componente?

```
                    Novo Componente
                          │
                          ▼
                ┌─────────────────┐
                │ É reutilizável  │
                │ em vários       │◄───── SIM ───► SharedModule
                │ módulos?        │                (com export)
                └─────────────────┘
                          │
                          │ NÃO
                          ▼
                ┌─────────────────┐
                │ É específico    │
                │ de uma          │◄───── SIM ───► Feature Module
                │ funcionalidade? │                (sem export)
                └─────────────────┘
                          │
                          │ NÃO
                          ▼
                ┌─────────────────┐
                │ É layout global │
                │ (header,        │◄───── SIM ───► AppModule ou
                │ footer)?        │                CoreModule
                └─────────────────┘
```

---

## 🎯 DECISÃO: Onde declarar um Serviço?

```
                    Novo Serviço
                          │
                          ▼
                ┌─────────────────┐
                │ Precisa ser     │
                │ singleton       │◄───── SIM ───► providedIn: 'root'
                │ global?         │                (melhor opção)
                └─────────────────┘                ou CoreModule
                          │
                          │ NÃO
                          ▼
                ┌─────────────────┐
                │ É específico    │
                │ de um módulo    │◄───── SIM ───► Feature Module
                │ lazy-loaded?    │                providers
                └─────────────────┘
                          │
                          │ NÃO
                          ▼
                  providedIn: 'root'
```

---

## 📐 ESTRUTURA VISUAL COMPLETA

```
meu-app/
│
├── src/
│   ├── app/
│   │   │
│   │   ├── app.module.ts ◄──────────── 🌳 ROOT
│   │   ├── app.component.ts
│   │   ├── app.routes.ts
│   │   │
│   │   ├── core/ ◄──────────────────── ⚙️ CORE (singleton)
│   │   │   ├── core.module.ts
│   │   │   ├── services/
│   │   │   ├── guards/
│   │   │   └── interceptors/
│   │   │
│   │   ├── shared/ ◄────────────────── 🔄 SHARED (reutilizável)
│   │   │   ├── shared.module.ts
│   │   │   ├── components/
│   │   │   ├── directives/
│   │   │   └── pipes/
│   │   │
│   │   └── features/ ◄──────────────── 📦 FEATURES (lazy)
│   │       │
│   │       ├── produtos/
│   │       │   ├── produtos.module.ts
│   │       │   ├── produtos-lista/
│   │       │   └── produto-detalhe/
│   │       │
│   │       └── usuarios/
│   │           ├── usuarios.module.ts
│   │           └── usuarios-lista/
│   │
│   ├── main.ts ◄───────────────────── Bootstrap
│   └── index.html
│
└── package.json
```

---

## 🎓 REGRAS DE OURO

```
┌─────────────────────────────────────────────────────┐
│  1. AppModule é único e usa BrowserModule           │
│                                                     │
│  2. Feature Modules usam CommonModule               │
│                                                     │
│  3. forRoot() apenas no AppModule                   │
│     forChild() nos Feature Modules                  │
│                                                     │
│  4. SharedModule EXPORTA componentes                │
│     SharedModule NÃO tem providers                  │
│                                                     │
│  5. CoreModule importado UMA VEZ no AppModule       │
│                                                     │
│  6. Componente declarado em APENAS UM módulo        │
│                                                     │
│  7. Use providedIn: 'root' para serviços singleton  │
│                                                     │
│  8. Feature Modules podem usar Lazy Loading         │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

**Use este diagrama como referência visual! 📊✨**
