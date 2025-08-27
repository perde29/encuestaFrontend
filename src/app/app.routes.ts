import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth',
    // loadComponent: --> es parecido al loadChildren - ver diferencias despues.
    loadChildren: () =>
      import('./auth/auth-routing-module').then((m) => m.routes),
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard-routing-module').then((m) => m.routes),
  },
];
