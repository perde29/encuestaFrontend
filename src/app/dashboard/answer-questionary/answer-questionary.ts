import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Header } from '../../shared/components/header/header';
import { Nav } from '../../shared/components/nav/nav';
import feather from 'feather-icons';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-answer-questionary',
  standalone: true,
  imports: [Nav, Header],
  templateUrl: './answer-questionary.html',
  styleUrl: './answer-questionary.css',
})
export class AnswerQuestionary implements OnInit, AfterViewInit {
  usuario: string = '';

  constructor(private readonly router: ActivatedRoute) {}

  ngOnInit(): void {
    // icono menu
    setTimeout(() => {
      feather.replace();
    });
    this.usuario = this.router.snapshot.data['usuario'];
  }
  ngAfterViewInit(): void {}
}
