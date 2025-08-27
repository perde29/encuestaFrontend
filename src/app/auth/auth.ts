import { Injectable } from '@angular/core';
import { User } from '../core/models/user.mode';

import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Environment } from '../../environment/environment';

const base_url = Environment.urlHost;

@Injectable({
  providedIn: 'root',
})
export class Auth {
  constructor(private http: HttpClient) {}

  login(credentials: { email: string; password: string }): Observable<User> {
    return this.http.post<User>(`${base_url}/auth/login`, credentials);
  }
}
