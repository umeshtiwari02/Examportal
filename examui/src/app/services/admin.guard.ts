import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

export const adminGuard: CanActivateFn = (route, state) => {
  const loginService = inject(LoginService);
  const router = inject(Router);

  if (loginService.isLoggedIn() && loginService.getUserRole() === 'ADMIN') {
    return true;
  }

  router.navigate(['login']);
  return false;
};
