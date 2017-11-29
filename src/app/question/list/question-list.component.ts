import { Component, OnInit, Input } from '@angular/core';
import { Question } from '../question.model';
import { QuestionService } from '../question.service';
import { AuthService } from '../../auth/auth.service';


@Component({
    selector: 'app-question-list',
    templateUrl: './question-list.component.html',
    styleUrls: ['./question-list.component.css'],
    providers: [ QuestionService ]
})
export class QuestionListComponent implements OnInit {
  constructor(
    private questionsService: QuestionService,
    private authService: AuthService
  ) {
    const main = document.getElementsByClassName('section');
    main[0].classList.remove('animated');
  }

    @Input() sort = '-createdAt';
    questions: Question[];
    loading = true;

    ngOnInit() {
      this.questionsService
        .getQuestions(this.sort)
        .then((questions: Question[]) => {
          this.questions = questions;
          this.loading = false;
        });
    }
}
