import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth-guard';
import { RoleGuard } from './core/guards/role-guard';
import { Login } from './features/auth/login/login';
import { Home } from './features/dashboard/home/home';
import { ManageUsers } from './features/admin/manage-users/manage-users';
import { loginGuard } from './core/guards/login-guard';

export const routes: Routes = [
  {
    path: '', 
    component: Login,
    canActivate: [loginGuard]

  },
  {
    path: 'dashboard',
    component: Home,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin',
    component: ManageUsers,
    canActivate: [AuthGuard, RoleGuard]
  }
];