import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Home } from './home/home';
import { ProfileResolverService } from '../resolvers/profile.resolver.service';
import { QuestionBank } from './question-bank/index/question-bank';
import { QuestionBankForm } from './question-bank/form/form';
import { Questionnaire } from './questionnaire/index/questionnaire';
import { QuestionsPreview } from './questionnaire/preview/preview';
import { AnswerQuestionary } from './answer-questionary/answer-questionary';

export const routes: Routes = [
  {
    path: '',
    component: Home,
    resolve: { usuario: ProfileResolverService },
  },
  {
    path: 'question-bank',
    component: QuestionBank,
    resolve: { usuario: ProfileResolverService },
  },

  {
    path: 'question-bank/add',
    component: QuestionBankForm,
    resolve: { usuario: ProfileResolverService },
  },
  {
    path: 'question-bank/edit/:id',
    component: QuestionBankForm,
    resolve: { usuario: ProfileResolverService },
  },
  {
    path: 'questionnaire',
    component: Questionnaire,
    resolve: { usuario: ProfileResolverService },
  },
  {
    path: 'questionnaire/preview/:id',
    component: QuestionsPreview,
    resolve: { usuario: ProfileResolverService },
  },
  {
    path: 'answer-questionary',
    component: AnswerQuestionary,
    resolve: { usuario: ProfileResolverService },
  }

];

/*
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
*/
