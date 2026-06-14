import { Component, Input, OnInit } from '@angular/core';
import { AlternativeService } from '../../../../core/services/alternative.service';

@Component({
  selector: 'app-question-input',
  imports: [],
  templateUrl: './question-input.html',
  styleUrl: './question-input.css',
})
export class QuestionInput implements OnInit {
  @Input() type!: number;
  @Input() idPregunta!: number;
  alternative: any[] = [];


  constructor(private readonly alternativeService: AlternativeService) {}

  ngOnInit(): void {

    this.alternativeService.getAlternativeByQuestionId(this.idPregunta)?.subscribe({
      next: (resp: any) => {
        this.alternative = resp;
      },
    });


  }
}
