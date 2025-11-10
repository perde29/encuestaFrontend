import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environment } from '../../../environment/environment';
import {
  catchError,
  firstValueFrom,
  map,
  Observable,
  of,
  switchMap,
  throwError,
} from 'rxjs';
import { Questionary } from '../interfaces/interfaces';

const base_url = Environment.urlHost;

@Injectable({
  providedIn: 'root',
})
export class QuestionaryService {
  //questionary: Questionary[] = [];
  orden: any;

  constructor(private http: HttpClient) {}

  getQuestionary() {
    return this.http.get<Questionary[]>(`${base_url}/questionary`).pipe(
      map((data) => {
        return data;
      }),
      catchError(this.handleError)
    );
  }

  getQuestionaryId(id: number) {
    alert(id);
    return this.http.get<Questionary>(`${base_url}/questionary/${id}`).pipe(
      map((resp) => {
        console.log(resp);
        // return resp;
      }),
      catchError(this.handleError)
    );
  }

  getQuestionayOrder({ id, value }: { id: number; value: number }) {
    // Editar el orden del registro a modificar
    const token = localStorage.getItem('token')?.trim();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.patch<any>(
      `${base_url}/questionary/order/${id}`,
      { orden: value },
      { headers }
    );
  }

  getQuestionarySave(QuestionBank: Questionary) {
    /*console.log(QuestionBank);*/

    const token = localStorage.getItem('token')?.trim();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    if (QuestionBank.id) {
      return null;
    } else {
      // Obtener el último orden antes de crear
      // Primero obtenemos el último orden
      return this.http
        .get<{ orden: number }>(`${base_url}/questionary/lastorden`, {
          headers,
        })
        .pipe(
          switchMap((res) => {
            const newOrden = (res.orden ?? 0) + 1;

            const body = {
              title: QuestionBank.title,
              status: QuestionBank.status,
              orden: newOrden,
            };

            // Retornamos el POST (Observable)
            return this.http.post<Questionary>(
              `${base_url}/questionary`,
              body,
              { headers }
            );
          })
        );
    }
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
