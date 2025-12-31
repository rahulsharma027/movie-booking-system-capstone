import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

/**
 * Login Guard - Prevents authenticated users from accessing login/signup pages
 * Redirects logged-in users to appropriate dashboard based on their role
 */
export const loginGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    // Redirect based on user role
    if (authService.isAdmin()) {
      router.navigate(['/admin']);
    } else {
      router.navigate(['/movies']);
    }
    return false;
  }

  return true;
};
