// import { QuestionListComponent } from './list/question-list.component';
import { QuestionScreenComponent } from './list/question-screen.component';
import { QuestionFormComponent } from './form/question-form.component';
import { QuestionDetailComponent } from './detail/question-detail.component';

export const QUESTION_ROUTES = [
    { path: '', component: QuestionScreenComponent, pathMatch: 'full' },
    { path: 'new', component: QuestionFormComponent },
    { path: ':id', component: QuestionDetailComponent }
];
