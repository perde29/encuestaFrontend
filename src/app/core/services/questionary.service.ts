import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environment } from '../../../environment/environment';
import { catchError, map, of, throwError } from 'rxjs';
import { Questionary } from '../interfaces/interfaces';

const base_url = Environment.urlHost;

@Injectable({
  providedIn: 'root',
})
export class QuestionaryService {
  constructor(private http: HttpClient) {}

  getQuestionary() {
    /*
    const token = localStorage.getItem('token')?.trim();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}`,});
    */

    return this.http.get<Questionary[]>(`${base_url}/questionary`).pipe(
      map((data) => {
        return data;
      }),
      catchError(this.handleError)
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
