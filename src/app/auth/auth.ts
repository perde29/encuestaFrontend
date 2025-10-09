import { Injectable } from '@angular/core';

import { catchError, map, Observable, of, tap, throwError } from 'rxjs';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Environment } from '../../environment/environment';

const base_url = Environment.urlHost;

@Injectable({
  providedIn: 'root',
})
export class Auth {
  constructor(private http: HttpClient) {}

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post<any>(`${base_url}/auth/login`, credentials).pipe(
      tap((Data) => {
        localStorage.setItem('token', Data.data.accessToken);
      }),
      map((Data) => Data.data.accessToken),
      catchError(this.handleError)
    );
  }

  profileToken(): Observable<any> {
    const token = localStorage.getItem('token')?.trim();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<any>(`${base_url}/auth/profile`, { headers }).pipe(
      map((data) => {
        return data.user.email;
      }),
      catchError(() => { // error
        //console.error('Error al obtener perfil:', error);
        return of(null); // ⬅️ Retorna observable con `null`
      })
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('Se ha producio un error ', error.error);
    } else {
      console.error('Backend retornó el código de estado ', error);
    }
    return throwError(
      () => new Error('Algo falló. Por favor intente nuevamente.')
    );
  }
}
