import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth';

export const loginGuard: CanActivateFn = () => {

  const auth = inject(AuthService);
  const router = inject(Router);

  const user = auth.getCurrentUser();

  if (user) {

    if (user.role === 'Admin') {
      router.navigate(['/admin']);
    } else {
      router.navigate(['/dashboard']);
    }

    return false;
  }

  return true;
};