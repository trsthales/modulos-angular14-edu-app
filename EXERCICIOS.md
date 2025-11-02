# 📝 Exercícios Práticos - Módulos Angular 14

## 🎯 Objetivo
Consolidar o aprendizado através de exercícios práticos.

---

## 📚 Exercício 1: Criar um novo Feature Module

### Objetivo
Criar um módulo "Blog" com lazy loading.

### Passos
1. Crie a pasta `src/app/features/blog/`
2. Crie o arquivo `blog.module.ts`
3. Crie um componente `blog-lista.component.ts`
4. Configure as rotas internas do módulo
5. Configure lazy loading no `app.routes.ts`
6. Teste navegando para `/blog`

### Checklist
- [ ] CommonModule importado
- [ ] RouterModule.forChild() configurado
- [ ] Componente declarado
- [ ] Lazy loading funcionando
- [ ] SharedModule importado (opcional)

---

## 🔧 Exercício 2: Adicionar componente ao Shared Module

### Objetivo
Criar um componente "Alert" reutilizável.

### Passos
1. Crie `src/app/shared/components/alert/alert.component.ts`
2. Crie o HTML com diferentes tipos de alerta (success, error, warning)
3. Declare o componente no SharedModule
4. **IMPORTANTE:** Exporte o componente
5. Use o componente em ProdutosListaComponent

### Checklist
- [ ] Componente criado
- [ ] Declarado em SharedModule
- [ ] Exportado em SharedModule
- [ ] Usado em outro módulo

### Template do Componente
```typescript
@Component({
  selector: 'app-alert',
  template: `
    <div class="alert" [class]="type">
      <ng-content></ng-content>
    </div>
  `
})
export class AlertComponent {
  @Input() type: 'success' | 'error' | 'warning' | 'info' = 'info';
}
```

---

## 🎨 Exercício 3: Criar uma Diretiva Customizada

### Objetivo
Criar diretiva que aplica tooltip nos elementos.

### Passos
1. Crie `src/app/shared/directives/tooltip.directive.ts`
2. Use @HostListener para mostrar tooltip ao passar o mouse
3. Declare no SharedModule
4. Exporte no SharedModule
5. Use em algum componente

### Código Base
```typescript
@Directive({
  selector: '[appTooltip]'
})
export class TooltipDirective {
  @Input() appTooltip: string = '';
  
  @HostListener('mouseenter') onMouseEnter() {
    // Mostrar tooltip
  }
  
  @HostListener('mouseleave') onMouseLeave() {
    // Esconder tooltip
  }
}
```

---

## 🔄 Exercício 4: Criar um Pipe Customizado

### Objetivo
Criar pipe que formata CPF.

### Passos
1. Crie `src/app/shared/pipes/cpf.pipe.ts`
2. Implemente a formatação: `123.456.789-00`
3. Declare no SharedModule
4. Exporte no SharedModule
5. Use no template de usuários

### Código Base
```typescript
@Pipe({
  name: 'cpf'
})
export class CpfPipe implements PipeTransform {
  transform(value: string): string {
    // Implemente a formatação
    return '';
  }
}
```

---

## 🛡️ Exercício 5: Criar um Serviço no Core Module

### Objetivo
Criar um serviço de notificações global.

### Passos
1. Crie `src/app/core/services/notification.service.ts`
2. Implemente métodos: success(), error(), warning()
3. Use `providedIn: 'root'`
4. Injete em algum componente
5. Teste as notificações

### Código Base
```typescript
@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  success(message: string) {
    console.log('✅', message);
  }
  
  error(message: string) {
    console.error('❌', message);
  }
  
  warning(message: string) {
    console.warn('⚠️', message);
  }
}
```

---

## 🚀 Exercício 6: Implementar Lazy Loading

### Objetivo
Converter um módulo eager em lazy.

### Passos
1. Remova a importação direta do módulo no AppModule
2. Configure loadChildren no app.routes.ts
3. Verifique no Network que o chunk é carregado separadamente

### Antes (Eager)
```typescript
// app.module.ts
imports: [
  BlogModule  // Carregado imediatamente
]
```

### Depois (Lazy)
```typescript
// app.routes.ts
{
  path: 'blog',
  loadChildren: () => import('./features/blog/blog.module')
    .then(m => m.BlogModule)
}
```

---

## 🧩 Exercício 7: Organizar Módulo de Rotas Separado

### Objetivo
Criar arquivo separado para rotas de um feature module.

### Passos
1. Crie `produtos-routing.module.ts`
2. Mova as rotas para este arquivo
3. Importe no `produtos.module.ts`

### Template
```typescript
// produtos-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // suas rotas
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProdutosRoutingModule { }
```

---

## 🎓 Exercício 8: Prevenir Reimportação do Core Module

### Objetivo
Garantir que CoreModule só seja importado uma vez.

### Teste
1. Tente importar CoreModule em ProdutosModule
2. Verifique se lança erro
3. Se não lançar, implemente o guard

### Código
```typescript
constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
  if (parentModule) {
    throw new Error('CoreModule já foi carregado!');
  }
}
```

---

## 🔍 Exercício 9: Debug de Módulos

### Objetivo
Entender a ordem de carregamento dos módulos.

### Passos
1. Adicione `console.log` no constructor de cada módulo
2. Recarregue a aplicação
3. Observe a ordem de carregamento
4. Navegue para rotas lazy e observe novos logs

### Perguntas
- Qual módulo carrega primeiro?
- Quando os feature modules carregam?
- O que acontece ao navegar de volta?

---

## 🏆 Exercício 10: Projeto Completo

### Objetivo
Criar um módulo completo de "Contatos".

### Requisitos
- [ ] Feature module com lazy loading
- [ ] Rota `/contatos`
- [ ] Lista de contatos
- [ ] Detalhe de contato
- [ ] Usar componentes do SharedModule
- [ ] Usar serviço do CoreModule
- [ ] Usar pipe customizado
- [ ] Usar diretiva customizada

### Estrutura
```
features/contatos/
├── contatos.module.ts
├── contatos-routing.module.ts
├── contatos-lista/
│   ├── contatos-lista.component.ts
│   ├── contatos-lista.component.html
│   └── contatos-lista.component.css
└── contato-detalhe/
    ├── contato-detalhe.component.ts
    ├── contato-detalhe.component.html
    └── contato-detalhe.component.css
```

---

## ✅ Respostas e Soluções

As soluções estão nos arquivos de exemplo do projeto.
Tente fazer sozinho primeiro antes de consultar!

---

## 🎯 Próximos Passos

Após completar os exercícios:
1. Experimente criar seus próprios módulos
2. Pratique refatoração de módulos
3. Estude padrões de arquitetura Angular
4. Explore NgRx para state management
5. Aprenda sobre Standalone Components (Angular 14+)

**Boa sorte! 🚀**
