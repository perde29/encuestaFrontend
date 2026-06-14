import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Nav } from '../../../shared/components/nav/nav';
import { Header } from '../../../shared/components/header/header';
import { ActivatedRoute, RouterLink } from '@angular/router';
import feather from 'feather-icons';
import { CategoryService } from '../../../core/services/category.service';
import { QuestionaryService } from '../../../core/services/questionary.service';
import { QuestionInput } from './question-input/question-input';

@Component({
  selector: 'app-preview',
  standalone: true,
  imports: [Nav, Header, RouterLink, QuestionInput],
  templateUrl: './preview.html',
  styleUrl: './preview.css',
})
export class QuestionsPreview implements OnInit, AfterViewInit {
  usuario: string = '';
  surveys: any[] = [];
  questionnaireTitle: string = '';
  id: number = 0;
  constructor(
    private readonly router: ActivatedRoute,
    private readonly categoryService: CategoryService,
    private readonly questionaryService: QuestionaryService,
  ) {}

  ngOnInit(): void {
    this.id = Number(this.router.snapshot.paramMap.get('id'));
    // icono menu
    setTimeout(() => {
      feather.replace();
    });
    this.usuario = this.router.snapshot.data['usuario'];

    this.categoryService.getCategoryId(this.id)?.subscribe({
      next: (resp: any) => {
        this.questionnaireTitle = resp.title;
      },
    });

    this.questionaryService.getviewsSurveys(this.id)?.subscribe({
      next: (resp: any) => {
        this.surveys = resp;
      },
    });
  }

  mostrarTitulo(index: number): boolean {
    if (index === 0) {
      return true;
    }

    return (
      this.surveys[index].questionary_id !==
      this.surveys[index - 1].questionary_id
    );
  }

  ngAfterViewInit() {}
}
