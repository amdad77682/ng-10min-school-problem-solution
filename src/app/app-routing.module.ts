import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LearnTogetherComponent } from './learn-together/learn-together.component';

const routes: Routes = [
  { path: 'app', component: LearnTogetherComponent },
  { path: ' /app/:videoId', component: LearnTogetherComponent },
  { path: '', redirectTo: '/app', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
