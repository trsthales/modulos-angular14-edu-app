/**
 * HOME.COMPONENT.TS
 * Componente da página inicial que explica os conceitos de módulos
 */

import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  modulesInfo = {
    root: {
      title: 'Root Module (AppModule)',
      description: 'O módulo raiz da aplicação. Único e obrigatório.',
      features: [
        'Importa BrowserModule',
        'Usa RouterModule.forRoot()',
        'Define o componente bootstrap',
        'Inicializa a aplicação'
      ],
      icon: '🌳'
    },
    feature: {
      title: 'Feature Modules',
      description: 'Módulos que organizam funcionalidades específicas.',
      features: [
        'Importa CommonModule',
        'Usa RouterModule.forChild()',
        'Podem usar Lazy Loading',
        'Organizam código relacionado'
      ],
      icon: '📦'
    },
    shared: {
      title: 'Shared Module',
      description: 'Módulo com componentes e recursos reutilizáveis.',
      features: [
        'Usa EXPORTS extensivamente',
        'Importado em vários módulos',
        'Componentes, pipes e diretivas comuns',
        'Não possui providers'
      ],
      icon: '🔄'
    },
    core: {
      title: 'Core Module',
      description: 'Módulo singleton com serviços globais.',
      features: [
        'Importado APENAS no AppModule',
        'Contém serviços singleton',
        'Guards de navegação',
        'Interceptors HTTP'
      ],
      icon: '⚙️'
    }
  };

  constructor() {
    console.log('🏠 HomeComponent inicializado');
  }
}
