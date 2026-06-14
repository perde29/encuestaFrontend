import { Injectable } from '@angular/core';
import { Environment } from '../../../environment/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Alternative } from '../interfaces/interfaces';
import { tap } from 'rxjs';

const base_url = Environment.urlHost;

@Injectable({
  providedIn: 'root',
})
export class AlternativeService {
  constructor(private http: HttpClient) {}

  saveAlternative(payload: Alternative) {
    const token = localStorage.getItem('token')?.trim();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    const body = {
      title: payload.texto,
      questionsId: payload.id,
    };

    if (payload.idAlternative) {
      // editar
      return this.http
        .patch<any>(`${base_url}/alternative/${payload.idAlternative}`, body, {
          headers,
        })
        .pipe(
          tap((res) => {
            return res;
          }),
        );
    } else {
      // insert
      return this.http
        .post<any>(`${base_url}/alternative`, body, {
          headers,
        })
        .pipe(
          tap((res) => {
            return res;
          }),
        );
    }
  }

  deleteAlternative(id: number) {
    // /alternative/{id}
    return this.http.delete(`${base_url}/alternative/${id}`).pipe(
      tap((res) => {
        return res;
      }),
    );
  }

  getAlternativeByQuestionId(questionId: number) {
    return this.http.get<any>(`${base_url}/alternative/${questionId}`).pipe(
      tap((res) => {
        return res;
      }),
    );
  }

  getpreguntaIdAlternative(id: number) {
    return this.http.get<any>(`${base_url}/alternative/pregunta/${id}`).pipe(
      tap((res) => {
        return res;
      }),
    );
  }
}
