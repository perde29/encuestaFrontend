import { Injectable } from '@angular/core';
import { Environment } from '../../../environment/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Category } from '../interfaces/interfaces';
import { catchError, map, throwError } from 'rxjs';

const base_url = Environment.urlHost;

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  getCategory() {
    return this.http.get<Category[]>(`${base_url}/category`).pipe(
      map((data) => {
        return data.map((item) => ({
          name: item.title,
          code: item.id,
        }));
      }),
      catchError(this.handleError)
    );
  }

  getCategoryQuestions(id: number) {
    /* /category-questions/{id} */ /* category_questions */
    return this.http.get<any[]>(`${base_url}/category-questions/${id}`).pipe(
      map((data) => {
        return data.map((item) => ({
          code: item.id,
          name: item.title,
        }));
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
