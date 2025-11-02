/**
 * CORE.MODULE.TS - MÓDULO CORE (SINGLETON)
 * =========================================
 * 
 * O CORE MODULE é um módulo especial que contém serviços SINGLETON
 * e recursos que devem ter apenas UMA INSTÂNCIA em toda a aplicação.
 * 
 * CARACTERÍSTICAS DO CORE MODULE:
 * -------------------------------
 * 
 * 1. IMPORTADO APENAS UMA VEZ
 *    - Deve ser importado SOMENTE no AppModule
 *    - Geralmente tem um guard para prevenir reimportação
 * 
 * 2. CONTÉM SERVIÇOS SINGLETON
 *    - Serviços de autenticação
 *    - Serviços de configuração global
 *    - HTTP Interceptors
 *    - Guards de navegação
 * 
 * 3. NÃO DEVE SER IMPORTADO EM FEATURE MODULES
 *    - Se importar em vários lugares, pode criar múltiplas instâncias
 *    - Use o Optional e SkipSelf decorator para prevenir isso
 * 
 * 4. NÃO EXPORTA NADA (geralmente)
 *    - Serviços são injetados via DI, não precisam ser exportados
 *    - Componentes do core (header, footer) podem ser exportados se necessário
 * 
 * DIFERENÇA ENTRE CORE MODULE E SHARED MODULE:
 * --------------------------------------------
 * 
 * CORE MODULE:
 * - Serviços singleton
 * - Importado uma vez
 * - Não é exportado
 * - Guards, interceptors
 * 
 * SHARED MODULE:
 * - Componentes, diretivas, pipes
 * - Importado múltiplas vezes
 * - Exporta tudo
 * - Recursos reutilizáveis
 */

import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';

// Serviços do Core Module
import { LoggerService } from './services/logger.service';
import { ConfigService } from './services/config.service';

/**
 * throwIfAlreadyLoaded
 * --------------------
 * Função guard que previne o CoreModule de ser importado mais de uma vez.
 * 
 * Como funciona:
 * - @Optional: O parâmetro pode ser null (se for a primeira vez)
 * - @SkipSelf: Busca o módulo no parent injector, não no atual
 * - Se parentModule existe, significa que já foi importado antes
 */
function throwIfAlreadyLoaded(parentModule: any, moduleName: string) {
  if (parentModule) {
    throw new Error(
      `${moduleName} já foi carregado. Importe-o APENAS no AppModule!`
    );
  }
}

@NgModule({
  /**
   * DECLARATIONS
   * Componentes que fazem parte do core (header global, footer, etc)
   * Geralmente são poucos componentes
   */
  declarations: [],
  
  /**
   * IMPORTS
   * Módulos necessários para o CoreModule
   */
  imports: [
    CommonModule
  ],
  
  /**
   * EXPORTS
   * Geralmente vazio, mas pode exportar componentes de layout global
   * Serviços NÃO precisam ser exportados (são injetados via DI)
   */
  exports: [],
  
  /**
   * PROVIDERS
   * Lista de serviços singleton que estarão disponíveis globalmente.
   * 
   * NOTA: No Angular 14+, a melhor prática é usar:
   * @Injectable({ providedIn: 'root' })
   * 
   * Mas deixamos aqui para fins educacionais, mostrando que
   * você PODE registrar serviços desta forma.
   */
  providers: [
    LoggerService,
    ConfigService
  ]
})
export class CoreModule {
  /**
   * CONSTRUCTOR COM GUARD
   * ---------------------
   * Este constructor usa @Optional e @SkipSelf para verificar
   * se o CoreModule já foi importado antes.
   * 
   * @Optional: Permite que parentModule seja null na primeira importação
   * @SkipSelf: Busca o CoreModule no parent injector
   * 
   * Se parentModule não for null, significa que já existe uma instância,
   * então lançamos um erro.
   */
  constructor(
    @Optional() @SkipSelf() parentModule: CoreModule
  ) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
    console.log('✅ CoreModule carregado (SINGLETON)');
    console.log('⚙️ Este módulo contém serviços globais');
  }
}

/**
 * RESUMO - CORE MODULE:
 * =====================
 * 
 * ✓ Contém serviços singleton
 * ✓ Importado APENAS no AppModule
 * ✓ Tem guard para prevenir reimportação
 * ✓ Usa @Optional e @SkipSelf
 * ✓ Providers de serviços globais
 * ✗ NÃO deve ser importado em feature modules
 * ✗ NÃO deve ter muitas exportações
 * ✗ NÃO deve ter componentes reutilizáveis (use SharedModule)
 * 
 * EXEMPLOS DE CONTEÚDO:
 * --------------------
 * - AuthService (autenticação)
 * - AuthGuard (proteção de rotas)
 * - HttpInterceptor (interceptação de requisições)
 * - ConfigService (configurações globais)
 * - LoggerService (logging)
 * - ErrorHandlerService (tratamento de erros)
 */
