import { Component, OnInit } from '@angular/core';
import { Question } from '../question.model';
import { QuestionService } from '../question.service';
import { AuthService } from '../../auth/auth.service';

const q = new Question(
    '¿Como reutilizo un componente en android?',
    'Miren, esta es mi pregunta...',
    new Date(),
    'none'
);

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

    questions: Question[];
    loading = true;
    addQuestion = true;

    ngOnInit() {
      if ( !this.authService.userIsLoggedIn() ) {
        this.addQuestion = false;
      }
      this.questionsService
        .getQuestions()
        .then((questions: Question[]) => {
          this.questions = questions;
          this.loading = false;
        });
    }
}
