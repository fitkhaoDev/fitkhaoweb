import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'terms',
    loadComponent: () => import('./features/terms/terms').then(m => m.Terms)
  },
  {
    path: 'privacy',
    loadComponent: () => import('./features/privacy/privacy').then(m => m.Privacy)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
