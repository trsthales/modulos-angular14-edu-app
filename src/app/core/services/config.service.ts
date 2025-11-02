/**
 * CONFIG.SERVICE.TS
 * Serviço singleton para configurações globais da aplicação
 */

import { Injectable } from '@angular/core';

interface AppConfig {
  appName: string;
  version: string;
  apiUrl: string;
  enableDebug: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private config: AppConfig = {
    appName: 'Módulos Angular 14 - Educacional',
    version: '1.0.0',
    apiUrl: 'https://api.example.com',
    enableDebug: true
  };

  constructor() {
    console.log('🔧 ConfigService criado (SINGLETON)');
  }

  /**
   * Retorna a configuração completa
   */
  getConfig(): AppConfig {
    return { ...this.config };
  }

  /**
   * Retorna o nome da aplicação
   */
  getAppName(): string {
    return this.config.appName;
  }

  /**
   * Retorna a versão da aplicação
   */
  getVersion(): string {
    return this.config.version;
  }

  /**
   * Retorna a URL da API
   */
  getApiUrl(): string {
    return this.config.apiUrl;
  }

  /**
   * Verifica se o modo debug está ativado
   */
  isDebugEnabled(): boolean {
    return this.config.enableDebug;
  }

  /**
   * Atualiza uma configuração
   */
  updateConfig(key: keyof AppConfig, value: any): void {
    (this.config as any)[key] = value;
  }
}
