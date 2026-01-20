import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Questions } from '../interfaces/interfaces';
import { Environment } from '../../../environment/environment';
import { catchError, map, tap, throwError } from 'rxjs';

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
      catchError(this.handleError),
    );
  }

  getsaveQuestions(PopupAlternative: Questions) {
    const token = localStorage.getItem('token')?.trim();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    const body = {
      title: PopupAlternative.title,
      inputType: PopupAlternative.inputType,
      status: PopupAlternative.status,
      allSectors: Number(PopupAlternative.allSectors),
      questionnaireResponse: PopupAlternative.questionnaireResponse,
    };

    if (PopupAlternative.id) {
      // editar

      return this.http
        .patch<any>(`${base_url}/questions/${PopupAlternative.id}`, body, {
          headers,
        })
        .pipe(
          tap((res) => {
            console.log(res);
          }),
        );
    } else {
      const newBody = {
        ...body,
        questionaryId: PopupAlternative.questionaryId, // o el valor que corresponda
      };

      // nuevo questions || /questions
      return this.http
        .post<any>(`${base_url}/questions`, newBody, { headers })
        .pipe(
          tap((res) => {
            console.log('Respuesta del backend:', res);
          }),
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
      () => new Error('Algo falló. Por favor intente nuevamente.'),
    );
  }
}
