import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { LoginBody } from '../models/auth/login-body.model';
import { LoginResponse } from '../models/auth/login-response.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private api = environment.baseApi;

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<LoginResponse> {
    const body: LoginBody = { email, password };
    return this.http.post<LoginResponse>(`${this.api}/login`, body).pipe(
      tap(res => {
        if (res?.code === 200 && res?.data) {
          localStorage.setItem('user', JSON.stringify(res.data));
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('user');
  }

  currentUser() {
    const raw = localStorage.getItem('user');
    return raw ? JSON.parse(raw) : null;
  }

  isAuthenticated(): boolean {
    return !!this.currentUser();
  }
}
