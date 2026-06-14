import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import feather from 'feather-icons';
import { Header } from '../../../shared/components/header/header';
import { Nav } from '../../../shared/components/nav/nav';
import { QuestionnaireList } from '../../../core/interfaces/interfaces';
import { CategoryService } from '../../../core/services/category.service';

@Component({
  selector: 'app-questionnaire',
  standalone: true,
  imports: [Nav, Header, RouterLink],
  templateUrl: './questionnaire.html',
  styleUrl: './questionnaire.css',
})
export class Questionnaire implements OnInit, AfterViewInit {
  usuario: string = '';
  questionnaireList: QuestionnaireList[] = [];

  constructor(
    private readonly router: ActivatedRoute,
    private readonly categoryService: CategoryService,
  ) {}

  ngOnInit(): void {
    // icono menu
    setTimeout(() => {
      feather.replace();
    });
    this.usuario = this.router.snapshot.data['usuario'];
    this.getquestionnaireList();
  }

  // getquestionnaireList()
  getquestionnaireList() {
    this.categoryService.getquestionnaireList().subscribe((resp) => {
      this.questionnaireList = resp;
    });
  }

  ngAfterViewInit() {}
}
