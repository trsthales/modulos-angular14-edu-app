/**
 * MAIN.TS - Ponto de Entrada da Aplicação Angular
 * 
 * Este arquivo é o primeiro a ser executado quando a aplicação Angular inicia.
 * Ele é responsável por "bootstrapar" (inicializar) o módulo raiz da aplicação.
 * 
 * CONCEITOS IMPORTANTES:
 * 1. platformBrowserDynamic(): Cria a plataforma para executar a aplicação no navegador
 * 2. bootstrapModule(): Inicializa o módulo raiz (AppModule)
 * 3. enableProdMode(): Ativa o modo de produção (otimizações de performance)
 */

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

// Habilita modo de produção se estiver em ambiente de produção
if (environment.production) {
  enableProdMode();
}

// Bootstrap (inicializa) o módulo raiz da aplicação
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error('Erro ao inicializar aplicação:', err));
