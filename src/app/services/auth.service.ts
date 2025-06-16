import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

interface User {
  id: string;
  email: string;
  name?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  private baseUrl = environment.BASE_URL;
  private tokenKey = 'auth_token';

  constructor(private http: HttpClient) {
    this.loadUserFromStorage();
  }

  private loadUserFromStorage() {
    const token = localStorage.getItem(this.tokenKey);
    if (token) {
      // You might want to decode JWT token here or make an API call to get user info
      // For now, we'll just set a placeholder user
      this.currentUserSubject.next({ id: '1', email: 'user@example.com' });
    }
  }

  isLoggedIn(): boolean {
    return !!this.currentUserSubject.value;
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/auth/login/`, { email, password })
      .pipe(
        tap(response => {
          if (response && response.token) {
            localStorage.setItem(this.tokenKey, response.token);
            this.currentUserSubject.next(response.user);
          }
        }),
        catchError(error => {
          console.error('Login error', error);
          return of({ error: error.error?.message || 'Login failed' });
        })
      );
  }

  registerMentor(userData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/mentor-registration/`, userData)
      .pipe(
        catchError(error => {
          console.error('Registration error', error);
          return of({ error: error.error?.message || 'Registration failed' });
        })
      );
  }

  verifyEmail(email: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/auth/verify-email/`, { email })
      .pipe(
        catchError(error => {
          console.error('Email verification error', error);
          // Return the backend error message if available, otherwise a default message
          return of({ error: error.error?.error || error.error?.message || 'Email verification failed' });
        })
      );
  }

  verifyOtp(email: string, otp: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/auth/verify-otp/`, { email, otp })
      .pipe(
        catchError(error => {
          console.error('OTP verification error', error);
          return of({ error: error.error?.message || 'OTP verification failed' });
        })
      );
  }

  getAMentor(email: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/get-a-mentor-email/`, { email })
      .pipe(
        catchError(error => {
          console.error('Get a mentor error', error);
          return of({ error: error.error?.message || 'Request failed' });
        })
      );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.currentUserSubject.next(null);
  }
}