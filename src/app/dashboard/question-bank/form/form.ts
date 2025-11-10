import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Nav } from '../../../shared/components/nav/nav';
import { Header } from '../../../shared/components/header/header';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { QuestionaryService } from '../../../core/services/questionary.service';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [Nav, Header, ReactiveFormsModule],
  templateUrl: './form.html',
  styleUrl: './form.css',
})
export class QuestionBankForm implements OnInit {
  formQuestionBank!: FormGroup;
  usuario: string = '';
  id: number = 0;
  loginError: string = '';

  constructor(
    private readonly router: ActivatedRoute,
    private readonly route: Router,
    private readonly formBuilder: FormBuilder,
    private readonly questionaryService: QuestionaryService
  ) {}

  ngOnInit(): void {
    this.id = Number(this.router.snapshot.paramMap.get('id'));

    this.usuario = this.router.snapshot.data['usuario'];
    this.formQuestionBank = this.formBuilder.group({
      title: ['', [Validators.required]],
      status: [1, [Validators.required]],
      id: [this.id],
    });

    // si se esta realizando un edit
    if (this.id) {
      console.log(this.id);
      this.questionaryService.getQuestionaryId(this.id);
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
}
