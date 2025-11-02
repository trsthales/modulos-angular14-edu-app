/**
 * APP.MODULE.TS - MÓDULO RAIZ DA APLICAÇÃO
 * =========================================
 * 
 * Este é o MÓDULO RAIZ (Root Module) da aplicação Angular.
 * Todo aplicativo Angular tem pelo menos UM módulo raiz chamado AppModule.
 * 
 * O QUE É UM MÓDULO?
 * ------------------
 * Um módulo NgModule é uma classe decorada com @NgModule() que organiza
 * e agrupa componentes, diretivas, pipes e serviços relacionados.
 * 
 * METADADOS DO @NgModule:
 * -----------------------
 * 
 * 1. DECLARATIONS (Declarações)
 *    - Lista de componentes, diretivas e pipes que PERTENCEM a este módulo
 *    - Só podem ser declarados em UM módulo
 *    - Exemplo: AppComponent, HeaderComponent, etc.
 * 
 * 2. IMPORTS (Importações)
 *    - Lista de módulos cujas funcionalidades são necessárias neste módulo
 *    - Exemplos: BrowserModule, FormsModule, RouterModule, etc.
 *    - Também importa módulos customizados (Feature Modules)
 * 
 * 3. PROVIDERS (Provedores)
 *    - Lista de serviços que estarão disponíveis em TODA a aplicação
 *    - Cria uma instância SINGLETON do serviço
 *    - No Angular 14+, preferimos usar providedIn: 'root' nos serviços
 * 
 * 4. BOOTSTRAP (Inicialização)
 *    - Define o componente raiz que será inicializado
 *    - Normalmente é o AppComponent
 *    - Só o módulo raiz tem esta propriedade
 * 
 * 5. EXPORTS (Exportações)
 *    - Lista de componentes, diretivas e pipes que podem ser usados
 *      por outros módulos que importarem este módulo
 *    - Não usado no módulo raiz, mas ESSENCIAL em Shared Modules
 */

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

// Importa o componente raiz
import { AppComponent } from './app.component';

// Importa componentes da aplicação
import { HomeComponent } from './components/home/home.component';

// Importa os módulos customizados que vamos criar
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

// Configuração de rotas
import { APP_ROUTES } from './app.routes';

/**
 * DECORATOR @NgModule
 * -------------------
 * Este decorator transforma a classe AppModule em um módulo Angular.
 * Ele recebe um objeto de configuração com os metadados do módulo.
 */
@NgModule({
  /**
   * DECLARATIONS
   * Declara os componentes, diretivas e pipes que PERTENCEM a este módulo.
   * Regra: Um componente/diretiva/pipe só pode ser declarado em UM módulo.
   */
  declarations: [
    AppComponent,      // Componente raiz da aplicação
    HomeComponent,     // Componente da página inicial
  ],

  /**
   * IMPORTS
   * Importa outros módulos cujas funcionalidades são necessárias.
   * 
   * BrowserModule: 
   *   - Necessário para aplicações que rodam no navegador
   *   - Fornece diretivas básicas como *ngIf, *ngFor, etc.
   *   - Só deve ser importado no módulo raiz (AppModule)
   *   - Em feature modules, use CommonModule
   * 
   * RouterModule.forRoot():
   *   - Configura o roteamento no módulo raiz
   *   - forRoot() deve ser usado APENAS no AppModule
   *   - Em feature modules, use forChild()
   * 
   * CoreModule:
   *   - Módulo singleton com serviços globais
   *   - Importado apenas uma vez no AppModule
   * 
   * SharedModule:
   *   - Módulo com componentes/diretivas/pipes reutilizáveis
   *   - Pode ser importado em vários módulos
   */
  imports: [
    BrowserModule,                           // Módulo essencial para aplicações browser
    RouterModule.forRoot(APP_ROUTES),        // Configuração de rotas raiz
    CoreModule,                              // Módulo core (singleton)
    SharedModule                             // Módulo compartilhado (reutilizável)
  ],

  /**
   * PROVIDERS
   * Define serviços que estarão disponíveis em toda a aplicação.
   * 
   * IMPORTANTE: No Angular 14+, a melhor prática é usar:
   * @Injectable({ providedIn: 'root' })
   * 
   * Deixamos vazio aqui e registramos serviços diretamente com providedIn.
   */
  providers: [],

  /**
   * BOOTSTRAP
   * Define o componente raiz que será inicializado ao carregar a aplicação.
   * 
   * O Angular cria uma instância deste componente e o insere no index.html
   * dentro da tag <app-root></app-root>
   * 
   * APENAS o módulo raiz tem esta propriedade!
   */
  bootstrap: [AppComponent]
})
export class AppModule {
  /**
   * OPCIONAL: Você pode adicionar lógica no construtor do módulo
   * para executar código durante a inicialização.
   */
  constructor() {
    console.log('✅ AppModule inicializado com sucesso!');
    console.log('📚 Este é o módulo RAIZ da aplicação');
  }
}

/**
 * RESUMO - TIPOS DE MÓDULOS NO ANGULAR:
 * ======================================
 * 
 * 1. ROOT MODULE (Módulo Raiz)
 *    - AppModule - existe apenas um
 *    - Usa BrowserModule
 *    - Usa RouterModule.forRoot()
 *    - Tem a propriedade bootstrap
 * 
 * 2. FEATURE MODULES (Módulos de Funcionalidade)
 *    - Organizam funcionalidades específicas
 *    - Podem usar Lazy Loading
 *    - Usa CommonModule (não BrowserModule)
 *    - Usa RouterModule.forChild()
 * 
 * 3. SHARED MODULE (Módulo Compartilhado)
 *    - Componentes/diretivas/pipes reutilizáveis
 *    - Importado em vários módulos
 *    - USA EXPORTS para disponibilizar recursos
 * 
 * 4. CORE MODULE (Módulo Core)
 *    - Serviços singleton globais
 *    - Importado APENAS no AppModule
 *    - Geralmente tem guard para prevenir reimportação
 * 
 * 5. ROUTING MODULE (Módulo de Roteamento)
 *    - Separa configuração de rotas
 *    - Importado pelo módulo correspondente
 */
