import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const authCookie = document.cookie
    .split('; ')
    .find(row => row.startsWith('AuthCookieAdmin='));

  if (authCookie) {
    return true; // Permite el acceso si la cookie existe
  } else {
    const router = new Router(); 
    router.navigate(['/login']); // Redirige a login si no está autenticado
    return false;
  }
};
