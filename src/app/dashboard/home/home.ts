import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Nav } from '../../shared/components/nav/nav';
import { Header } from '../../shared/components/header/header';
import feather from 'feather-icons';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Nav, Header],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit, AfterViewInit {
  usuario: string = '';

  constructor(private readonly router: ActivatedRoute) {}

  ngOnInit(): void {
    this.usuario = this.router.snapshot.data['usuario'];
    setTimeout(() => {
      feather.replace();
    });
  }

  ngAfterViewInit() {}
}
