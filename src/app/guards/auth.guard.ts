import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { authService } from '../services/authenticateService/auth.service';

export const authGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const authServ = inject(authService);
  if (authServ.isLoggedIn()) {
    return true;
  }
  // not logged in → store attempted URL (optional) and redirect
  console.log("state.url", state.url),
  router.navigate(['/signin'], {

    queryParams: { returnUrl: state.url }
  });
  return false;

}
