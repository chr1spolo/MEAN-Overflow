import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';


import { AppComponent } from './app.component';

// material angular imports
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './material.module';

// modulos personales
import { QuestionDetailComponent } from './question/detail/question-detail.component';
import { AnswerFormComponent } from './answer/answer-form.component';

import { SignInScreenComponent } from './auth/signin/signin-screen.component';
import { SignUpScreenComponent } from './auth/signup/signup-screen.component';
import { QuestionListComponent } from './question/list/question-list.component';
import { QuestionFormComponent } from './question/form/question-form.component';
import { AuthService } from './auth/auth.service';


import { MomentModule } from 'angular2-moment';

// Routing
import { Routing } from './app.routing';

@NgModule({
  declarations: [
    AppComponent,
    QuestionDetailComponent,
    AnswerFormComponent,
    SignInScreenComponent,
    SignUpScreenComponent,
    QuestionListComponent,
    QuestionFormComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    MomentModule,
    FormsModule,
    ReactiveFormsModule,
    Routing,
    HttpModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
