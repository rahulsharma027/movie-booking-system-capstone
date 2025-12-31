import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LoginRequest, LoginResponse, SignupRequest, User } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';
  private isBrowser: boolean;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        if (this.isBrowser) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('user', JSON.stringify(response));
          localStorage.setItem('theme', response.theme);
          this.applyTheme(response.theme);
        }
      })
    );
  }

  signup(data: SignupRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/signup`, data).pipe(
      tap(response => {
        if (this.isBrowser) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('user', JSON.stringify(response));
          localStorage.setItem('theme', response.theme);
          this.applyTheme(response.theme);
        }
      })
    );
  }

  logout(): void {
    if (this.isBrowser) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  }

  getToken(): string | null {
    return this.isBrowser ? localStorage.getItem('token') : null;
  }

  getCurrentUser(): LoginResponse | null {
    if (!this.isBrowser) return null;
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  isAdmin(): boolean {
    const user = this.getCurrentUser();
    return user?.role === 'ADMIN';
  }

  getTheme(): string {
    return this.isBrowser ? (localStorage.getItem('theme') || 'light') : 'light';
  }

  updateTheme(theme: 'light' | 'dark' | 'cinephile'): void {
    if (this.isBrowser) {
      localStorage.setItem('theme', theme);
      this.applyTheme(theme);
    }
  }

  applyTheme(theme: string): void {
    if (this.isBrowser) {
      document.body.setAttribute('data-theme', theme);
    }
  }
}
