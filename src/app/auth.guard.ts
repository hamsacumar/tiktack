import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('token');
    const expiration = localStorage.getItem('tokenExpiration');

    if (!token) {
      this.router.navigate(['/login']);
      return false;
    }

    // Check if token is expired
    if (expiration) {
      const expirationDate = new Date(expiration);
      if (expirationDate <= new Date()) {
        // Token is expired, remove it and redirect to login
        localStorage.removeItem('token');
        localStorage.removeItem('tokenExpiration');
        this.router.navigate(['/login']);
        return false;
      }
    }

    return true;
  }
}