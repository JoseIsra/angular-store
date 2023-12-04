import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '@/services/auth/auth.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

export const adminGuard: CanActivateFn = (route, state) => {
  const $router = inject(Router);
  const authService = inject(AuthService);

  return authService.user$.pipe(
    map((user) => {
      if (user?.role === 'admin') return true;
      $router.navigate(['home']);
      return false;
    })
  );
};
