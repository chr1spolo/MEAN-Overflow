import { QuestionListComponent } from './list/question-list.component';
import { QuestionFormComponent } from './form/question-form.component';
import { QuestionDetailComponent } from './detail/question-detail.component';

export const QUESTION_ROUTES = [
    { path: '', component: QuestionListComponent, pathMatch: 'full' },
    { path: 'new', component: QuestionFormComponent },
    { path: ':id', component: QuestionDetailComponent }
];
