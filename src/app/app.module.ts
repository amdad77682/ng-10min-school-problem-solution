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
import { SwitchTeacherService } from './services/switch-teacher.service';
import { LearnTogetherWithStudentnComponent } from './learn-together-with-studentn/learn-together-with-studentn.component';
import { PUBNUBService } from './services/pubnub.service';
import { JITSIService } from './services/jitsi.service';

@NgModule({
  declarations: [
    AppComponent,
    TopBarHeaderComponent,
    LearnTogetherComponent,
    FooterComponent,
    TeacherModeSelectionComponent,
    SafeUrlPipe,
    LearnTogetherWithStudentnComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],

  providers: [
    SwitchTeacherService,
    JITSIService,
    PUBNUBService,
    // PubNubAngularApp
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
