import { Component } from '@angular/core';
import { SidebarService } from '../../../core/services/sidebar.service';

@Component({
  selector: 'app-nav',
  imports: [],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav {
  sidebarColapsado = false;

  constructor(private sidebarService: SidebarService) {}

  ngOnInit() {
    this.sidebarService.colapsado$.subscribe((valor) => {
      this.sidebarColapsado = valor;
    });
  }
}
