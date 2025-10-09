import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Home } from './home/home';
import { ProfileResolverService } from '../resolvers/profile.resolver.service';
import { QuestionBank } from './question-bank/question-bank';

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
];

/*
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
*/
