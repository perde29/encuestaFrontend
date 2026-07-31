import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import feather from 'feather-icons';

import { Nav } from '../../shared/components/nav/nav';
import { Header } from '../../shared/components/header/header';

@Component({
  selector: 'app-sectors',
  imports: [Nav, Header],
  templateUrl: './sectors.html',
  styleUrl: './sectors.css',
})
export class Sectors implements OnInit, AfterViewInit {
  usuario: string = '';

  constructor(private readonly router: ActivatedRoute) {}

  ngOnInit(): void {
    // icono menu
    setTimeout(() => {
      feather.replace();
    });
    this.usuario = this.router.snapshot.data['usuario'];
  }

  ngAfterViewInit() {}
}
