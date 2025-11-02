/**
 * APP.COMPONENT.TS - COMPONENTE RAIZ
 * ===================================
 * 
 * Este é o componente raiz da aplicação.
 * Ele é bootstrapped pelo AppModule e serve como container principal.
 */

import { Component } from '@angular/core';

@Component({
  selector: 'app-root',  // Tag usada no index.html: <app-root></app-root>
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Módulos Angular 14 - Guia Completo';
  
  constructor() {
    console.log('🚀 AppComponent inicializado!');
  }
}
