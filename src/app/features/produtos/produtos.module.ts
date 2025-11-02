/**
 * PRODUTOS.MODULE.TS - FEATURE MODULE (Módulo de Funcionalidade)
 * ==============================================================
 * 
 * FEATURE MODULES são módulos que organizam funcionalidades específicas da aplicação.
 * 
 * CARACTERÍSTICAS DE UM FEATURE MODULE:
 * ------------------------------------
 * 
 * 1. USA COMMONMODULE (não BrowserModule)
 *    - BrowserModule só deve ser usado no AppModule
 *    - CommonModule fornece as mesmas diretivas (*ngIf, *ngFor, etc.)
 * 
 * 2. USA ROUTERMODULE.FORCHILD()
 *    - forChild() é usado para registrar rotas em feature modules
 *    - forRoot() é usado APENAS no AppModule
 * 
 * 3. PODE USAR LAZY LOADING
 *    - Carregado apenas quando necessário
 *    - Melhora performance inicial
 *    - Reduz o bundle size inicial
 * 
 * 4. ORGANIZA CÓDIGO RELACIONADO
 *    - Agrupa componentes, serviços e rotas de uma funcionalidade
 *    - Facilita manutenção e escalabilidade
 *    - Permite trabalho em equipe organizado
 * 
 * LAZY LOADING:
 * -------------
 * Este módulo é carregado sob demanda (lazy loading), ou seja,
 * apenas quando o usuário navega para a rota /produtos.
 * 
 * Isso é configurado no app.routes.ts com:
 * loadChildren: () => import('./features/produtos/produtos.module')
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';  // CommonModule em vez de BrowserModule
import { RouterModule, Routes } from '@angular/router';

// Importa o Shared Module para usar componentes reutilizáveis
import { SharedModule } from '../../shared/shared.module';

// Componentes deste módulo
import { ProdutosListaComponent } from './produtos-lista/produtos-lista.component';
import { ProdutoDetalheComponent } from './produto-detalhe/produto-detalhe.component';

/**
 * ROTAS DO MÓDULO DE PRODUTOS
 * ---------------------------
 * Como este módulo usa lazy loading, o path base '/produtos' 
 * já está definido no app.routes.ts.
 * Aqui definimos apenas os paths relativos.
 */
const routes: Routes = [
  {
    path: '',  // Corresponde a /produtos
    component: ProdutosListaComponent
  },
  {
    path: ':id',  // Corresponde a /produtos/:id
    component: ProdutoDetalheComponent
  }
];

@NgModule({
  /**
   * DECLARATIONS
   * Componentes que pertencem a este módulo
   */
  declarations: [
    ProdutosListaComponent,
    ProdutoDetalheComponent
  ],
  
  /**
   * IMPORTS
   * - CommonModule: Fornece diretivas básicas (*ngIf, *ngFor, etc.)
   * - RouterModule.forChild(): Registra rotas do feature module
   * - SharedModule: Componentes reutilizáveis compartilhados
   */
  imports: [
    CommonModule,                      // Sempre use CommonModule em feature modules
    RouterModule.forChild(routes),     // forChild() para feature modules
    SharedModule                       // Módulo compartilhado
  ],
  
  /**
   * PROVIDERS (Opcional)
   * Se você tem serviços específicos deste módulo que NÃO devem ser singleton,
   * pode registrá-los aqui. Caso contrário, use providedIn: 'root'.
   * 
   * CUIDADO: Serviços registrados aqui terão uma nova instância
   * para cada módulo lazy-loaded!
   */
  providers: []
})
export class ProdutosModule {
  constructor() {
    console.log('✅ ProdutosModule carregado (Lazy Loading)');
    console.log('📦 Este é um FEATURE MODULE com rotas próprias');
  }
}

/**
 * RESUMO - FEATURE MODULE:
 * ========================
 * 
 * ✓ Usa CommonModule
 * ✓ Usa RouterModule.forChild()
 * ✓ Pode ser lazy-loaded
 * ✓ Organiza funcionalidades específicas
 * ✓ Pode importar SharedModule
 * ✓ NÃO tem propriedade bootstrap
 * ✗ NÃO usa BrowserModule
 * ✗ NÃO usa RouterModule.forRoot()
 */
