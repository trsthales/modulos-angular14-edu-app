# 📝 Snippets de Código - Referência Rápida

Este arquivo contém snippets prontos para copiar e colar.

---

## 🌳 ROOT MODULE

```typescript
// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { APP_ROUTES } from './app.routes';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(APP_ROUTES),
    CoreModule,
    SharedModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

---

## 📦 FEATURE MODULE (Sem Lazy Loading)

```typescript
// meu-feature.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

import { MeuComponent } from './meu-component/meu-component.component';

const routes: Routes = [
  { path: '', component: MeuComponent }
];

@NgModule({
  declarations: [
    MeuComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class MeuFeatureModule { }
```

---

## 📦 FEATURE MODULE (Com Lazy Loading)

```typescript
// meu-feature.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

import { MeuComponent } from './meu-component/meu-component.component';

const routes: Routes = [
  { path: '', component: MeuComponent },
  { path: ':id', component: MeuDetalheComponent }
];

@NgModule({
  declarations: [
    MeuComponent,
    MeuDetalheComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class MeuFeatureModule { }
```

**No app.routes.ts:**
```typescript
export const APP_ROUTES: Routes = [
  {
    path: 'meu-modulo',
    loadChildren: () => import('./features/meu-feature/meu-feature.module')
      .then(m => m.MeuFeatureModule)
  }
];
```

---

## 🔄 SHARED MODULE

```typescript
// shared.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Componentes
import { CardComponent } from './components/card/card.component';
import { ModalComponent } from './components/modal/modal.component';

// Diretivas
import { HighlightDirective } from './directives/highlight.directive';

// Pipes
import { CapitalizePipe } from './pipes/capitalize.pipe';

@NgModule({
  declarations: [
    CardComponent,
    ModalComponent,
    HighlightDirective,
    CapitalizePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CommonModule,
    CardComponent,
    ModalComponent,
    HighlightDirective,
    CapitalizePipe
  ]
})
export class SharedModule { }
```

---

## ⚙️ CORE MODULE

```typescript
// core.module.ts
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthService } from './services/auth.service';
import { LoggerService } from './services/logger.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    AuthService,
    LoggerService
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule já foi carregado. Importe apenas no AppModule!'
      );
    }
  }
}
```

---

## 🧩 COMPONENTE

```typescript
// meu-component.component.ts
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-meu-component',
  templateUrl: './meu-component.component.html',
  styleUrls: ['./meu-component.component.css']
})
export class MeuComponent implements OnInit {
  @Input() titulo: string = '';
  @Output() eventoClick = new EventEmitter<string>();

  dados: any[] = [];

  constructor() { }

  ngOnInit(): void {
    this.carregarDados();
  }

  carregarDados(): void {
    this.dados = [
      { id: 1, nome: 'Item 1' },
      { id: 2, nome: 'Item 2' }
    ];
  }

  onClick(): void {
    this.eventoClick.emit('Clicado!');
  }
}
```

---

## 📋 DIRETIVA

```typescript
// highlight.directive.ts
import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {
  @Input() appHighlight: string = 'yellow';
  @Input() defaultColor: string = 'transparent';

  constructor(private el: ElementRef) { }

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight(this.appHighlight);
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight(this.defaultColor);
  }

  private highlight(color: string): void {
    this.el.nativeElement.style.backgroundColor = color;
  }
}
```

**Uso:**
```html
<p appHighlight="lightblue">Passe o mouse aqui</p>
```

---

## 🔧 PIPE

```typescript
// capitalize.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalize'
})
export class CapitalizePipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';
    
    return value
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
}
```

**Uso:**
```html
<p>{{ 'TEXTO EM MAIÚSCULAS' | capitalize }}</p>
<!-- Resultado: Texto Em Maiúsculas -->
```

---

## 💉 SERVIÇO (providedIn: 'root')

```typescript
// data.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'  // Singleton global
})
export class DataService {
  private apiUrl = 'https://api.example.com';

  constructor(private http: HttpClient) { }

  getDados(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/dados`);
  }

  getDadoPorId(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/dados/${id}`);
  }

  criarDado(dado: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/dados`, dado);
  }

  atualizarDado(id: number, dado: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/dados/${id}`, dado);
  }

  deletarDado(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/dados/${id}`);
  }
}
```

---

## 🛡️ GUARD

```typescript
// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    
    if (this.authService.isAuthenticated()) {
      return true;
    }

    // Redireciona para login
    this.router.navigate(['/login'], {
      queryParams: { returnUrl: state.url }
    });
    
    return false;
  }
}
```

**Uso nas rotas:**
```typescript
{
  path: 'admin',
  canActivate: [AuthGuard],
  loadChildren: () => import('./features/admin/admin.module')
    .then(m => m.AdminModule)
}
```

---

## 🔌 HTTP INTERCEPTOR

```typescript
// auth.interceptor.ts
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  
  constructor(private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Pega o token
    const token = this.authService.getToken();

    // Se tiver token, adiciona no header
    if (token) {
      const clonedReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      });
      return next.handle(clonedReq);
    }

    return next.handle(req);
  }
}
```

**Registro no CoreModule:**
```typescript
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';

@NgModule({
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ]
})
export class CoreModule { }
```

---

## 🗺️ ROTAS COMPLETAS

```typescript
// app.routes.ts
import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AuthGuard } from './core/guards/auth.guard';

export const APP_ROUTES: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'produtos',
    loadChildren: () => import('./features/produtos/produtos.module')
      .then(m => m.ProdutosModule)
  },
  {
    path: 'admin',
    canActivate: [AuthGuard],
    loadChildren: () => import('./features/admin/admin.module')
      .then(m => m.AdminModule)
  },
  {
    path: '404',
    component: NotFoundComponent
  },
  {
    path: '**',
    redirectTo: '404'
  }
];
```

---

## 📱 ROUTING MODULE SEPARADO

```typescript
// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'produtos',
    loadChildren: () => import('./features/produtos/produtos.module')
      .then(m => m.ProdutosModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

**No AppModule:**
```typescript
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,  // Em vez de RouterModule.forRoot()
    // ...
  ]
})
export class AppModule { }
```

---

## 🎨 TEMPLATE COM DIRETIVAS

```html
<!-- exemplo.component.html -->

<!-- *ngIf -->
<div *ngIf="mostrar; else elseTemplate">
  Conteúdo visível
</div>
<ng-template #elseTemplate>
  Conteúdo alternativo
</ng-template>

<!-- *ngFor -->
<ul>
  <li *ngFor="let item of items; let i = index; trackBy: trackByFn">
    {{ i + 1 }}. {{ item.nome }}
  </li>
</ul>

<!-- *ngSwitch -->
<div [ngSwitch]="tipo">
  <p *ngSwitchCase="'success'">Sucesso!</p>
  <p *ngSwitchCase="'error'">Erro!</p>
  <p *ngSwitchDefault>Outro tipo</p>
</div>

<!-- Property Binding -->
<img [src]="imagemUrl" [alt]="imagemAlt">

<!-- Event Binding -->
<button (click)="onClick()">Clique aqui</button>

<!-- Two-way Binding -->
<input [(ngModel)]="nome" placeholder="Digite seu nome">

<!-- Class Binding -->
<div [class.ativo]="isAtivo">Classe condicional</div>
<div [ngClass]="{'classe1': condicao1, 'classe2': condicao2}">Classes múltiplas</div>

<!-- Style Binding -->
<div [style.color]="cor">Cor dinâmica</div>
<div [ngStyle]="{'font-size': tamanhoFonte, 'color': cor}">Estilos múltiplos</div>
```

---

## 🔄 COMPONENTE COM OBSERVABLE

```typescript
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { DataService } from '../services/data.service';

@Component({
  selector: 'app-meu-component',
  templateUrl: './meu-component.component.html'
})
export class MeuComponent implements OnInit, OnDestroy {
  dados: any[] = [];
  loading = false;
  error = '';
  
  private destroy$ = new Subject<void>();

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.carregarDados();
  }

  carregarDados(): void {
    this.loading = true;
    
    this.dataService.getDados()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (dados) => {
          this.dados = dados;
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Erro ao carregar dados';
          this.loading = false;
          console.error(err);
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
```

---

## 📝 FORMULÁRIO REACTIVE

```typescript
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html'
})
export class FormularioComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      idade: [null, [Validators.required, Validators.min(18)]]
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      console.log(this.form.value);
    } else {
      console.log('Formulário inválido');
    }
  }

  get nome() {
    return this.form.get('nome');
  }

  get email() {
    return this.form.get('email');
  }
}
```

**Template:**
```html
<form [formGroup]="form" (ngSubmit)="onSubmit()">
  <div>
    <label>Nome:</label>
    <input formControlName="nome">
    <div *ngIf="nome?.invalid && nome?.touched">
      <small *ngIf="nome?.errors?.['required']">Nome é obrigatório</small>
      <small *ngIf="nome?.errors?.['minlength']">Mínimo 3 caracteres</small>
    </div>
  </div>

  <div>
    <label>Email:</label>
    <input formControlName="email" type="email">
    <div *ngIf="email?.invalid && email?.touched">
      <small *ngIf="email?.errors?.['required']">Email é obrigatório</small>
      <small *ngIf="email?.errors?.['email']">Email inválido</small>
    </div>
  </div>

  <button type="submit" [disabled]="form.invalid">Enviar</button>
</form>
```

---

**Use estes snippets como base para seus próprios módulos e componentes! 🚀**
