import { inject } from '@angular/core';
import { AuthService } from '@/services/auth/auth.service';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs/operators';

export const authGuard: CanActivateFn = (route, state) => {
  const $router = inject(Router);
  // const tokenService = inject(TokenService);
  const authService = inject(AuthService);
  // return tokenService.userToken.length > 0 ? true : $router.navigate(['home']);
  return authService.user$.pipe(
    map((user) => {
      if (!user) {
        $router.navigate(['home']);
        return false;
      }
      return true;
    })
  );
};
