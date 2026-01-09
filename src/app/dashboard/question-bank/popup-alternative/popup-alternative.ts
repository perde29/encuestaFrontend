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
  @Input() questionnaireId!: number;
  category: any[] = [];
  selectedCategoryIds: number[] = [];
  questions: any;
  mostrarDiv: boolean = false;
  formPopupAlternative!: FormGroup;

  texto: string = '';
  id_alternative: string = '';

  constructor(
    private readonly categoryService: CategoryService,
    private readonly questionsService: QuestionsService,
    private readonly formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {}

  ngOnChanges() {
    this.categoryService.getCategory()?.subscribe({
      next: (resp) => {
        this.category = resp;
      },
    });

    this.formPopupAlternative = this.formBuilder.group({
      ask: ['', [Validators.required]],
      all_sectors: ['1'],
      inputType: [1, [Validators.required]],
      status: [1, [Validators.required]],
      questionnaireResponse: [1, [Validators.required]],
      idQuestions: [''],
      categories: [],
    });

    if (this.questionnaireId) {
      this.questionsService.getQuestionsId(this.questionnaireId)?.subscribe({
        next: (resp) => {
          // this.questions = resp;  || inputType
          this.formPopupAlternative.patchValue({
            ask: resp.title,
            all_sectors: resp.allSectors,
            status: resp.status,
            questionnaireResponse: resp.questionnaireResponse,
            inputType: resp.inputType,
            idQuestions: resp.id,
          });
        },
      });

      this.categoryService
        .getCategoryQuestions(this.questionnaireId)
        ?.subscribe({
          next: (resp) => {
            /* console.log(resp); */
            this.formPopupAlternative.patchValue({
              categories: resp,
            });
          },
        });
    }
  }

  onAlternative(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const value = Number(selectElement.value);

    this.mostrarDiv = value === 3;
  }

  onResponseAlternative() {
    /* alert('Texto:' + this.texto); */
  }

  onSaveQuestions () {

  }


}
