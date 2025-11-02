/**
 * LOGGER.SERVICE.TS
 * Serviço singleton para logging na aplicação
 * 
 * SERVIÇOS NO CORE MODULE:
 * ------------------------
 * Serviços que devem ter apenas UMA INSTÂNCIA em toda a aplicação
 * devem estar no CoreModule ou usar providedIn: 'root'.
 * 
 * Este exemplo mostra um serviço registrado no CoreModule,
 * mas a melhor prática moderna é usar providedIn: 'root'.
 */

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'  // Moderna maneira de criar singleton (Angular 6+)
  // Alternativamente, pode ser registrado no providers do CoreModule
})
export class LoggerService {
  private logs: string[] = [];

  constructor() {
    console.log('🔧 LoggerService criado (SINGLETON)');
  }

  /**
   * Loga uma mensagem de informação
   */
  log(message: string): void {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] INFO: ${message}`;
    this.logs.push(logMessage);
    console.log(logMessage);
  }

  /**
   * Loga um erro
   */
  error(message: string, error?: any): void {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] ERROR: ${message}`;
    this.logs.push(logMessage);
    console.error(logMessage, error);
  }

  /**
   * Loga um aviso
   */
  warn(message: string): void {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] WARN: ${message}`;
    this.logs.push(logMessage);
    console.warn(logMessage);
  }

  /**
   * Retorna todos os logs
   */
  getLogs(): string[] {
    return [...this.logs];
  }

  /**
   * Limpa todos os logs
   */
  clearLogs(): void {
    this.logs = [];
  }
}

/**
 * EXPLICAÇÃO - providedIn: 'root'
 * ================================
 * 
 * No Angular 6+, a melhor maneira de criar serviços singleton é usar:
 * @Injectable({ providedIn: 'root' })
 * 
 * VANTAGENS:
 * - Automaticamente singleton em toda a aplicação
 * - Tree-shakeable (removido se não usado)
 * - Não precisa adicionar em providers do módulo
 * - Mais simples e limpo
 * 
 * QUANDO USAR CORE MODULE PROVIDERS:
 * - Quando precisa de configuração especial
 * - Quando usa factory providers
 * - Para compatibilidade com código legado
 * - Para organização explícita de serviços
 */
