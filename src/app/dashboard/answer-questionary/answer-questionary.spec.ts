import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswerQuestionary } from './answer-questionary';

describe('AnswerQuestionary', () => {
  let component: AnswerQuestionary;
  let fixture: ComponentFixture<AnswerQuestionary>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnswerQuestionary]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnswerQuestionary);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
