/**
 * SHARED.MODULE.TS - MÓDULO COMPARTILHADO
 * ========================================
 * 
 * O SHARED MODULE é um módulo especial que contém componentes, diretivas,
 * e pipes que são REUTILIZADOS em vários lugares da aplicação.
 * 
 * CARACTERÍSTICAS DO SHARED MODULE:
 * ---------------------------------
 * 
 * 1. USA EXPORTS EXTENSIVAMENTE
 *    - Exporta tudo que outros módulos precisam usar
 *    - CommonModule, FormsModule, etc são re-exportados
 *    - Componentes, diretivas e pipes são exportados
 * 
 * 2. IMPORTADO EM MÚLTIPLOS MÓDULOS
 *    - Feature modules podem importar o SharedModule
 *    - Evita repetição de imports comuns
 * 
 * 3. NÃO DEVE TER PROVIDERS
 *    - Serviços devem estar no CoreModule ou usar providedIn: 'root'
 *    - Se tiver providers, cada importação criará uma nova instância
 * 
 * 4. RE-EXPORTA MÓDULOS COMUNS
 *    - CommonModule, FormsModule, ReactiveFormsModule
 *    - Módulos que são frequentemente usados juntos
 * 
 * QUANDO USAR O SHARED MODULE:
 * ----------------------------
 * - Componentes UI reutilizáveis (botões, cards, modais)
 * - Diretivas customizadas usadas em vários lugares
 * - Pipes customizados para formatação de dados
 * - Módulos do Angular usados frequentemente
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Componentes compartilhados
import { CardComponent } from './components/card/card.component';
import { LoadingComponent } from './components/loading/loading.component';

// Diretivas compartilhadas
import { HighlightDirective } from './directives/highlight.directive';

// Pipes compartilhados
import { TruncatePipe } from './pipes/truncate.pipe';

@NgModule({
  /**
   * DECLARATIONS
   * Declara componentes, diretivas e pipes que pertencem a este módulo
   */
  declarations: [
    CardComponent,
    LoadingComponent,
    HighlightDirective,
    TruncatePipe
  ],
  
  /**
   * IMPORTS
   * Importa módulos necessários para este módulo
   */
  imports: [
    CommonModule  // Sempre necessário para *ngIf, *ngFor, etc
  ],
  
  /**
   * EXPORTS - CRUCIAL NO SHARED MODULE!
   * ====================================
   * 
   * Esta é a seção MAIS IMPORTANTE do SharedModule.
   * Tudo que você quer disponibilizar para outros módulos deve ser exportado.
   * 
   * REGRA DE OURO:
   * - Exportar CommonModule permite que outros módulos usem *ngIf, *ngFor, etc
   * - Exportar seus componentes/diretivas/pipes permite que sejam usados externamente
   * - Se não exportar, só estará disponível DENTRO deste módulo
   */
  exports: [
    // Re-exporta CommonModule para que módulos que importam SharedModule
    // não precisem importar CommonModule separadamente
    CommonModule,
    
    // Exporta componentes compartilhados
    CardComponent,
    LoadingComponent,
    
    // Exporta diretivas compartilhadas
    HighlightDirective,
    
    // Exporta pipes compartilhados
    TruncatePipe
  ],
  
  /**
   * PROVIDERS - DEVE ESTAR VAZIO!
   * ==============================
   * 
   * NÃO coloque serviços aqui!
   * 
   * Por quê?
   * - Cada módulo que importa SharedModule criaria uma NOVA INSTÂNCIA do serviço
   * - Isso quebra o padrão singleton
   * 
   * Onde colocar serviços?
   * - CoreModule (para serviços singleton globais)
   * - providedIn: 'root' no próprio serviço (melhor prática Angular 14+)
   */
  providers: []  // Sempre vazio!
})
export class SharedModule {
  constructor() {
    console.log('✅ SharedModule carregado');
    console.log('🔄 Este módulo exporta componentes reutilizáveis');
  }
}

/**
 * RESUMO - SHARED MODULE:
 * =======================
 * 
 * ✓ Exporta componentes/diretivas/pipes reutilizáveis
 * ✓ Re-exporta módulos comuns (CommonModule, etc)
 * ✓ Importado em múltiplos módulos
 * ✓ Usa CommonModule
 * ✗ NÃO deve ter providers
 * ✗ NÃO deve ter serviços
 * ✗ NÃO importa feature modules
 * 
 * EXEMPLO DE USO:
 * ---------------
 * 
 * No ProdutosModule:
 * imports: [
 *   CommonModule,
 *   SharedModule  // Agora pode usar CardComponent, TruncatePipe, etc
 * ]
 * 
 * No template:
 * <app-card>
 *   <p>{{ longText | truncate:50 }}</p>
 * </app-card>
 */
