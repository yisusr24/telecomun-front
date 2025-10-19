import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./components/login/login.component').then(m => m.LoginComponent)
  },

  {
    path: 'inicio',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./components/inicio/inicio.component').then(m => m.InicioComponent)
  },

  {
    path: 'facturas',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./components/invoices/invoices.component').then(m => m.InvoicesComponent)
  },

  {
    path: 'consumo',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./components/usage/usage.component').then(m => m.UsageComponent)
  },

  { path: '', pathMatch: 'full', redirectTo: 'inicio' },

  { path: '**', redirectTo: 'inicio' }
];
