import { Component, Input } from '@angular/core';
import { SidebarService } from '../../../core/services/sidebar.service';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  @Input() usuario: string = '';
  dropdownColapsado = false;
  profileColapsado  = false;

  constructor(private sidebarService: SidebarService) {}

  ngOnInit() {
    this.sidebarService.alertsDropdown$.subscribe(valor => {
      this.dropdownColapsado = valor;
    });

    this.sidebarService.dropdownProfile$.subscribe(valor => {
      this.profileColapsado = valor;
    })
  }


  toggleSidebar() {
    this.sidebarService.toggle();
  }

  /*
  dropdownClick() {
    this.sidebarService.sidebar();
  }
  */

  profileClick() {
    this.sidebarService.profile()
  }
}
