import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Nav } from '../../../shared/components/nav/nav';
import { Header } from '../../../shared/components/header/header';
import * as bootstrap from 'bootstrap';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { QuestionaryService } from '../../../core/services/questionary.service';
import { Questions } from '../../../core/interfaces/interfaces';
import { PopupAlternative } from '../popup-alternative/popup-alternative';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [Nav, Header, ReactiveFormsModule, RouterLink, PopupAlternative],
  templateUrl: './form.html',
  styleUrl: './form.css',
})
export class QuestionBankForm implements OnInit {
  formQuestionBank!: FormGroup;
  usuario: string = '';
  id: number = 0;
  loginError: string = '';
  cabecera: string = '';
  questions: Questions[] = [];

  constructor(
    private readonly router: ActivatedRoute,
    private readonly route: Router,
    private readonly formBuilder: FormBuilder,
    private readonly questionaryService: QuestionaryService
  ) {}

  ngOnInit(): void {
    this.id = Number(this.router.snapshot.paramMap.get('id'));
    this.cabecera = 'Nuevo:';

    this.usuario = this.router.snapshot.data['usuario'];

    this.formQuestionBank = this.formBuilder.group({
      title: ['', [Validators.required]],
      status: [1, [Validators.required]],
      id: [this.id],
    });

    // si se esta realizando un edit
    if (this.id) {
      this.questionaryService.getQuestionaryId(this.id)?.subscribe({
        next: (resp) => {
          // Actualizar valores en el form
          this.formQuestionBank.patchValue({
            title: resp.title,
            status: resp.status,
            id: resp.id,
          });
        },
      });

      this.questionaryService.getQuestionsQuestionaryId(this.id)?.subscribe({
        next: (resp) => {
          this.questions = resp;
        },
      });

      this.cabecera = 'Editar:';
    }
  }

  submitQuestionary(): void {
    if (this.formQuestionBank.valid) {
      this.loginError = '';
      // this.formRegister.value
      this.questionaryService
        .getQuestionarySave(this.formQuestionBank.value)
        ?.subscribe({
          next: (resp) => {
            if (resp.id) {
              this.route.navigate(['/dashboard/question-bank/edit', resp.id]);
            }
          },
          error: (err) => {
            console.error('Error al guardar:', err);
            this.loginError = 'Ocurrió un error al guardar el cuestionario';
          },
        });
    }
  }

  onNewQuestion(): void {
    // exampleModalToggle
    const modalElement = document.getElementById('exampleModalToggle');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();



    }
  }
}
