import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopBarHeaderComponent } from './top-bar-header/top-bar-header.component';
import { FooterComponent } from './footer/footer.component';
import { LearnTogetherComponent } from './learn-together/learn-together.component';

import { TeacherModeSelectionComponent } from './teacher-mode-selection/teacher-mode-selection.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SafeUrlPipe } from './teacher-mode-selection/safe-url.pipe';

@NgModule({
  declarations: [
    AppComponent,
    TopBarHeaderComponent,
    LearnTogetherComponent,
    FooterComponent,
    TeacherModeSelectionComponent,
    SafeUrlPipe,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],

  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
