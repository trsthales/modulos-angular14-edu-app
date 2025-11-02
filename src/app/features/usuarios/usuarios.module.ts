/**
 * USUARIOS.MODULE.TS - OUTRO FEATURE MODULE
 * ==========================================
 * 
 * Este é outro exemplo de Feature Module, seguindo os mesmos princípios
 * do ProdutosModule, mas com funcionalidades diferentes.
 * 
 * Este módulo demonstra como você pode ter múltiplos feature modules
 * em uma aplicação Angular, cada um com suas próprias responsabilidades.
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';

import { UsuariosListaComponent } from './usuarios-lista/usuarios-lista.component';

const routes: Routes = [
  {
    path: '',
    component: UsuariosListaComponent
  }
];

@NgModule({
  declarations: [
    UsuariosListaComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class UsuariosModule {
  constructor() {
    console.log('✅ UsuariosModule carregado (Lazy Loading)');
  }
}
