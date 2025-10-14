import { Component } from '@angular/core';
import { SidebarService } from '../../../core/services/sidebar.service';
import { PageRoutingModule } from "../../../page/page-routing-module";

@Component({
  selector: 'app-nav',
  imports: [PageRoutingModule],
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
