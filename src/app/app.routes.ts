import { Routes } from '@angular/router';

import { Login } from './features/auth/login/login';
import { Home } from './features/dashboard/home/home';
import { ManageUsers } from './features/admin/manage-users/manage-users';

export const routes: Routes = [
  {
    path: '',
    component: Login
  },
  {
    path: 'dashboard',
    component: Home
  },
  {
    path: 'admin',
    component: ManageUsers
  }
];