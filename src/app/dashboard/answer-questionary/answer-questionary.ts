import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Header } from '../../shared/components/header/header';
import { Nav } from '../../shared/components/nav/nav';
import feather from 'feather-icons';
import { ActivatedRoute } from '@angular/router';
import { QuestionsService } from '../../core/services/questions.service';

@Component({
  selector: 'app-answer-questionary',
  standalone: true,
  imports: [Nav, Header],
  templateUrl: './answer-questionary.html',
  styleUrl: './answer-questionary.css',
})
export class AnswerQuestionary implements OnInit, AfterViewInit {
  usuario: string = '';
  titleCustomer: any = [];
  registerCustomer: any = [];

  constructor(
    private readonly router: ActivatedRoute,
    private readonly questionService: QuestionsService,
  ) {}

  ngOnInit(): void {
    // icono menu
    setTimeout(() => {
      feather.replace();
    });
    this.usuario = this.router.snapshot.data['usuario'];

    this.questionService.getCabeceraTitleCustomer().subscribe((resp) => {
      this.titleCustomer = resp;
    });

    this.questionService.getRegisterCustomer().subscribe((resp) => {
      console.log(resp);
      this.registerCustomer = resp;
    });
  }
  ngAfterViewInit(): void {}
}
