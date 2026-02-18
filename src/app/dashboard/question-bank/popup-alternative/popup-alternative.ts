import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { MultiSelectModule } from 'primeng/multiselect';
import { CategoryService } from '../../../core/services/category.service';
import { QuestionsService } from '../../../core/services/questions.service';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
  ɵInternalFormsSharedModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AlternativeService } from '../../../core/services/alternative.service';

// import { Questions } from '../../../core/interfaces/interfaces';

@Component({
  selector: 'app-popup-alternative',
  imports: [
    MultiSelectModule,
    ɵInternalFormsSharedModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './popup-alternative.html',
  styleUrl: './popup-alternative.css',
})
export class PopupAlternative implements OnInit, OnChanges {
  @Input() questionsId!: number;
  @Input() questionaryId!: number;
  category: any[] = [];
  alternatives: any[] = [];
  selectedCategoryIds: number[] = [];
  loginError: string = '';

  mostrarDiv: boolean = false;
  formPopupAlternative!: FormGroup;

  texto: string = '';
  idAlternative: number = 0;

  constructor(
    private readonly categoryService: CategoryService,
    private readonly alternativeService: AlternativeService,
    private readonly questionsService: QuestionsService,
    private readonly formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {}

  ngOnChanges() {
    this.categoryService.getCategory()?.subscribe({
      next: (resp) => {
        this.category = resp;
      },
    });

    this.formPopupAlternative = this.formBuilder.group({
      title: ['', [Validators.required]],
      allSectors: ['1'],
      inputType: [1, [Validators.required]],
      status: [1, [Validators.required]],
      questionnaireResponse: [1, [Validators.required]],
      id: [0],
      categories: [],
      /* questionsId: [this.questionsId], */
    });

    if (this.questionsId) {
      this.questionsService.getQuestionsId(this.questionsId)?.subscribe({
        next: (resp) => {
          // this.questions = resp;  || inputType
          this.formPopupAlternative.patchValue({
            title: resp.title,
            allSectors: resp.allSectors,
            status: resp.status,
            questionnaireResponse: resp.questionnaireResponse,
            inputType: resp.inputType,
            id: resp.id,
          });

          // para mostrar el registro si esta el select ::
          this.mostrarDiv = Number(resp.inputType ?? 0) === 3;
        },
      });

      this.categoryService.getCategoryQuestions(this.questionsId)?.subscribe({
        next: (resp) => {
          /* console.log(resp); */
          this.formPopupAlternative.patchValue({
            categories: resp,
          });
        },
      });

      // getAlternativeByQuestionId
      this.alternativeService
        .getAlternativeByQuestionId(this.questionsId)
        ?.subscribe({
          next: (resp) => {
            this.alternatives = resp;
            // console.log('Alternativas:', resp);
          },
        });
    }
  }

  onAlternative(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const value = Number(selectElement.value);

    this.mostrarDiv = value === 3;
  }

  onResponseAlternative(): void {
    const payload = {
      idAlternative: this.idAlternative, // puede ser null si es nuevo
      texto: this.texto,
      id: this.formPopupAlternative.get('id')?.value,
    };

    this.alternativeService.saveAlternative(payload)?.subscribe({
      next: (resp) => {
        /* En esta seccion se debe de actualizar la informacion de datos */
        this.texto = '';
        this.idAlternative = 0;
        if (resp.userUpdate) {
          const updated = resp as any;

          this.alternatives = this.alternatives.map((a) =>
            a.id === updated.id
              ? { ...a, title: updated.title ?? updated.texto ?? this.texto }
              : a,
          );
        } else {
          this.alternatives = [...this.alternatives, resp];
        }
      },
    });
  }

  onSaveQuestions() {}

  submitPopupAlternative(): void {
    if (this.formPopupAlternative.valid) {
      this.loginError = '';

      const formData = { ...this.formPopupAlternative.value };
      formData.categories = formData.categories.map((cat: any) => cat.code);

      this.questionsService.getsaveQuestions(formData)?.subscribe({
        next: (resp) => {
          console.log(resp);
        },
        error: (err) => {
          console.error('Error al guardar:', err);
          this.loginError = 'Ocurrió un error al guardar el cuestionario';
        },
      });
    }
  }

  onEditAlternative(item: any) {
    this.texto = item.title;
    this.idAlternative = item.id;
  }

  onDeleteAlternative(item: any) {
    // Aquí puedes implementar la lógica para eliminar la alternativa
    // console.log('Eliminar alternativa con ID:', item.id);

    this.alternativeService.deleteAlternative(item.id)?.subscribe({
      next: (resp) => {
        // Actualizar la lista de alternativas después de eliminar
        this.alternatives = this.alternatives.filter((a) => a.id !== item.id);
      },
      error: (err) => {
        console.error('Error al eliminar:', err);
      },
    });
  }
}
