import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SidebarService {
  private colapsadoSource = new BehaviorSubject<boolean>(false);
  colapsado$ = this.colapsadoSource.asObservable();

  toggle() {
    this.colapsadoSource.next(!this.colapsadoSource.value);
  }

  setColapsado(valor: boolean) {
    this.colapsadoSource.next(valor);
  }


  // segundo estado:
  private dropdownColapsadoSource = new BehaviorSubject<boolean>(false);
  alertsDropdown$ = this.dropdownColapsadoSource.asObservable();

  sidebar() {
    this.dropdownColapsadoSource.next(!this.dropdownColapsadoSource.value);
  }

  // tercera estado:
  private dropdownProfileSource = new BehaviorSubject<boolean>(false);
  dropdownProfile$ = this.dropdownProfileSource.asObservable();

  profile() {
    this.dropdownProfileSource.next(!this.dropdownProfileSource.value);
  }

}
