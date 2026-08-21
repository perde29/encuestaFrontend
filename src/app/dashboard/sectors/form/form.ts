import { Component, Input, OnChanges } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CategoryService } from '../../../core/services/category.service';
import { Category } from '../../../core/interfaces/interfaces';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './form.html',
  styleUrl: './form.css',
})
export class Form implements OnChanges {
  @Input() id!: number;
  sector!: Category[];
  formSector!: FormGroup;
  loginError: string = '';

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly categoryService: CategoryService,
  ) {}

  ngOnChanges(): void {
    this.formSector = this.formBuilder.group({
      title: ['', [Validators.required]],
      status: [1, []],
      id: [0],
    });

    if (this.id) {
      this.categoryService.getCategoryId(this.id)?.subscribe({
        next: (resp) => {
          if (resp) {
            const selectedStatus = Number(resp.state ?? resp.state ?? 1);

            this.formSector.patchValue({
              title: resp.title,
              status: selectedStatus,
              id: resp.id,
            });
          }
        },
      });
    }
  }

  submitSector(): void {
    /* alert('submit'); */
    if (this.formSector.valid) {
      this.loginError = '';
      const formData = { ...this.formSector.value };

      this.categoryService.getSaveCategory(formData)?.subscribe({
        next: (resp) => {
          if (resp) {
          }
        }
      });

      console.log(formData);
    }
  }
}
