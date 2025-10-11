import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { CookieService } from 'ngx-cookie-service';
import type { Observable } from 'rxjs';
import { User } from '@/app/helper/fake-backend';
import { AuthService } from '@auth0/auth0-angular';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  user: User | null = null;

  public readonly authSessionKey = '_HIGHDMIN_AUTH_SESSION_KEY_';

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private auth: AuthService
  ) {}

  login(email: string, password: string): Observable<User> {
    return this.http.post<User>(`/api/login`, { email, password }).pipe(
      map((user) => {
        if (user && user.token) {
          this.user = user;
          this.saveSession(user.token);
        }
        return user;
      })
    );
  }

  logout(): void {
    this.removeSession();
    this.user = null;
  }

  // get session(): string {
  //   this.auth.getAccessTokenSilently().subscribe(token => {
  //     this.saveSession(token);
  //   });
  // }

  saveSession(token: string): void {
    this.cookieService.set(this.authSessionKey, token);
  }

  removeSession(): void {
    this.cookieService.delete(this.authSessionKey);
  }
}
