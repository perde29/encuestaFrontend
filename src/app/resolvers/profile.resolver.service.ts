import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';
import { map, Observable, of } from 'rxjs';
import { Auth } from '../auth/auth';

let valor = '';

@Injectable({ providedIn: 'root' })
export class ProfileResolverService implements Resolve<any> {
  constructor(private auth: Auth, private router: Router) {}
  /*
  resolve(): Observable<any> {
    //TODO: CALL SERVICE
    this.auth.profileToken().subscribe((valor) => {
      if (valor) {
        email = valor;
        return of(email);
      } else {
        this.router.navigateByUrl('/auth/login');
      }
    });
  }
  */

  resolve(): Observable<any> {
    return this.auth.profileToken().pipe(
      map((valor) => {
        if (valor) {
          return valor; // retorna el valor al resolver
        } else {
          this.router.navigateByUrl('/auth/login');
        }
      })
    );
  }
}
