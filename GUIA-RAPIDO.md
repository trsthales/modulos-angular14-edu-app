# 🎯 GUIA RÁPIDO DE REFERÊNCIA - Módulos Angular 14

## 📋 Quando usar cada tipo de módulo

### 🌳 AppModule (Root Module)
**Quando:** Sempre - é obrigatório e único
**Contém:**
- BrowserModule
- RouterModule.forRoot()
- Componente bootstrap
- Importação do CoreModule
- Importação do SharedModule

---

### 📦 Feature Module
**Quando:** Para organizar funcionalidades específicas
**Exemplos:** 
- Módulo de Produtos
- Módulo de Usuários
- Módulo de Dashboard

**Contém:**
- CommonModule (não BrowserModule)
- RouterModule.forChild()
- Componentes da funcionalidade
- Pode usar Lazy Loading

**Template:**
```typescript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // suas rotas
];

@NgModule({
  declarations: [
    // seus componentes
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class MeuFeatureModule { }
```

---

### 🔄 Shared Module
**Quando:** Para componentes/diretivas/pipes reutilizáveis
**Exemplos:**
- Componentes UI (botões, cards, modals)
- Diretivas customizadas
- Pipes de formatação

**Contém:**
- CommonModule (importado e re-exportado)
- Componentes reutilizáveis (exportados)
- Diretivas customizadas (exportadas)
- Pipes customizados (exportados)
- **NUNCA serviços!**

**Template:**
```typescript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    // componentes, diretivas, pipes
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CommonModule,
    // tudo que quer disponibilizar
  ],
  providers: [] // SEMPRE VAZIO!
})
export class SharedModule { }
```

---

### ⚙️ Core Module
**Quando:** Para serviços singleton globais
**Exemplos:**
- AuthService
- LoggerService
- HTTP Interceptors
- Guards

**Contém:**
- Serviços singleton
- Guards
- Interceptors
- Guard anti-reimportação

**Template:**
```typescript
import { NgModule, Optional, SkipSelf } from '@angular/core';

@NgModule({
  providers: [
    // seus serviços
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule já foi carregado!');
    }
  }
}
```

---

## 🔑 Tabela de Referência Rápida

| Recurso | AppModule | Feature | Shared | Core |
|---------|-----------|---------|--------|------|
| BrowserModule | ✅ | ❌ | ❌ | ❌ |
| CommonModule | ❌ | ✅ | ✅ | ✅ |
| forRoot() | ✅ | ❌ | ❌ | ❌ |
| forChild() | ❌ | ✅ | ❌ | ❌ |
| bootstrap | ✅ | ❌ | ❌ | ❌ |
| declarations | ✅ | ✅ | ✅ | Raro |
| exports | ❌ | Raro | ✅ | ❌ |
| providers | Raro | Opcional | ❌ | ✅ |
| Lazy Loading | ❌ | ✅ | ❌ | ❌ |
| Importado onde | - | Vários | Vários | AppModule |
| Importa quantas vezes | 1 | Várias | Várias | 1 |

---

## 🚨 Erros Comuns e Soluções

### ❌ Erro: "NullInjectorError: No provider for..."
**Causa:** Serviço não foi fornecido
**Solução:** Adicione `providedIn: 'root'` ou registre em providers

### ❌ Erro: "Component is declared in multiple modules"
**Causa:** Componente declarado em mais de um módulo
**Solução:** Declare apenas uma vez, exporte se necessário

### ❌ Erro: "Can't bind to 'ngModel'..."
**Causa:** FormsModule não importado
**Solução:** Importe FormsModule no módulo

### ❌ Erro: "Can't bind to 'formGroup'..."
**Causa:** ReactiveFormsModule não importado
**Solução:** Importe ReactiveFormsModule no módulo

### ❌ Erro: "'component-name' is not a known element"
**Causa:** Componente não foi declarado ou exportado
**Solução:** Declare no módulo ou importe o módulo que o exporta

---

## ✅ Checklist - Criando um Novo Módulo

### Feature Module
- [ ] Criar arquivo `feature.module.ts`
- [ ] Importar CommonModule
- [ ] Criar rotas com RouterModule.forChild()
- [ ] Declarar componentes
- [ ] Importar SharedModule se necessário
- [ ] Configurar lazy loading no app.routes.ts

### Shared Module
- [ ] Criar arquivo `shared.module.ts`
- [ ] Importar CommonModule
- [ ] Declarar componentes/diretivas/pipes
- [ ] EXPORTAR tudo que será usado externamente
- [ ] NÃO adicionar providers

### Core Module
- [ ] Criar arquivo `core.module.ts`
- [ ] Adicionar guard anti-reimportação
- [ ] Registrar serviços em providers
- [ ] Importar APENAS no AppModule

---

## 💡 Dicas de Boas Práticas

1. **Um módulo, uma responsabilidade**
   - Cada módulo deve ter um propósito claro

2. **Lazy loading para performance**
   - Feature modules grandes devem usar lazy loading

3. **SharedModule sem providers**
   - Nunca coloque serviços no SharedModule

4. **CoreModule importado uma vez**
   - Sempre adicione o guard de reimportação

5. **providedIn: 'root' para serviços**
   - É a forma moderna e tree-shakeable

6. **Organize por funcionalidade, não por tipo**
   - ✅ features/produtos/
   - ❌ components/, services/, models/

---

## 🎯 Comandos Úteis

```bash
# Criar novo módulo
ng generate module features/nome-modulo --routing

# Criar componente em módulo específico
ng generate component features/nome-modulo/componente

# Criar serviço
ng generate service core/services/nome-servico

# Criar diretiva no shared
ng generate directive shared/directives/nome-diretiva

# Criar pipe no shared
ng generate pipe shared/pipes/nome-pipe
```

---

## 📚 Leitura Complementar

- **AppModule:** Entry point da aplicação
- **Feature Modules:** Organização e lazy loading
- **Shared Module:** Reutilização de código
- **Core Module:** Serviços singleton
- **Routing Modules:** Separação de rotas

---

**Mantenha este guia à mão enquanto desenvolve! 🚀**
