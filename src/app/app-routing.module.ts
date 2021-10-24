import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LearnTogetherWithStudentnComponent } from './learn-together-with-studentn/learn-together-with-studentn.component';
import { LearnTogetherComponent } from './learn-together/learn-together.component';

const routes: Routes = [
  { path: 'app', component: LearnTogetherComponent },
  { path: 'app/:videoId', component: LearnTogetherWithStudentnComponent },
  { path: '', redirectTo: '/app', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
