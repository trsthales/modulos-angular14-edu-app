import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

/**
 * CONFIGURAÇÃO DE ROTAS DA APLICAÇÃO
 * ===================================
 * 
 * Define as rotas principais da aplicação.
 * Demonstra também o conceito de LAZY LOADING de módulos.
 */
export const APP_ROUTES: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'produtos',
    // LAZY LOADING - Carrega o módulo apenas quando a rota é acessada
    // Isso melhora a performance inicial da aplicação
    loadChildren: () => import('./features/produtos/produtos.module')
      .then(m => m.ProdutosModule)
  },
  {
    path: 'usuarios',
    loadChildren: () => import('./features/usuarios/usuarios.module')
      .then(m => m.UsuariosModule)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
