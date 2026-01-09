import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Questions } from '../interfaces/interfaces';
import { Environment } from '../../../environment/environment';
import { catchError, map, throwError } from 'rxjs';

const base_url = Environment.urlHost;

@Injectable({
  providedIn: 'root',
})
export class QuestionsService {
  constructor(private http: HttpClient) {}

  getQuestionsId(id: number) {
    return this.http.get<Questions>(`${base_url}/questions/${id}`).pipe(
      map((resp) => {
        return resp;
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
