import { Routes, RouterModule } from '@angular/router';

import { QuestionListComponent } from './question/list/question-list.component';
import { SignInScreenComponent } from './auth/signin/signin-screen.component';
import { SignUpScreenComponent } from './auth/signup/signup-screen.component';

// sub routes
import { QUESTION_ROUTES } from './question/question.routing';

const APP_ROUTES: Routes = [
    { path: '', component: QuestionListComponent, pathMatch: 'full' },
    { path: 'signIn', component: SignInScreenComponent },
    { path: 'signUp', component: SignUpScreenComponent },
    { path: 'questions', children: QUESTION_ROUTES }
];

export const Routing = RouterModule.forRoot(APP_ROUTES);
