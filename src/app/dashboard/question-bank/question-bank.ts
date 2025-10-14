import { Component, OnInit } from '@angular/core';
import { Nav } from '../../shared/components/nav/nav';
import { Header } from '../../shared/components/header/header';
import { ActivatedRoute } from '@angular/router';
import { Questionary } from '../../core/interfaces/interfaces';
import { QuestionaryService } from '../../core/services/questionary.service';
import feather from 'feather-icons';

@Component({
  selector: 'app-question-bank',
  standalone: true,
  imports: [Nav, Header],
  templateUrl: './question-bank.html',
  styleUrl: './question-bank.css',
})
export class QuestionBank implements OnInit {
  usuario: string = '';
  questionary: Questionary[] = [];

  constructor(
    private readonly router: ActivatedRoute,
    private readonly questionaryService: QuestionaryService
  ) {}

  ngOnInit(): void {
    // icono menu
    setTimeout(() => {
      feather.replace();
    });

    this.usuario = this.router.snapshot.data['usuario'];
    this.questionaryService.getQuestionary().subscribe((resp) => {
      this.questionary = resp;
    });
  }
}
