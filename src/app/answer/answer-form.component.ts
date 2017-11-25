import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Answer } from '../answer/answer.model';
import { User } from '../auth/user.model';
import { Question } from '../question/question.model';
import { QuestionService } from '../question/question.service';
import SweetScroll from 'sweet-scroll';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
    selector: 'app-answer-form',
    templateUrl: './answer-form.component.html',
    styleUrls: ['./answer-form.component.css'],
    providers: [QuestionService]
})
export class AnswerFormComponent {
    @Input() question: Question;
    sweetScroll: SweetScroll;

    constructor(
      private questionService: QuestionService,
      private authService: AuthService,
      private router: Router,
      public snackBar: MatSnackBar
    ) {
        this.sweetScroll = new SweetScroll();
    }

    onSubmit(form: NgForm) {

        if (!this.authService.userIsLoggedIn()) {
            this.snackBar.open('No estas autorizado', 'Error', {
              duration: 3000,
              horizontalPosition: 'right',
              verticalPosition: 'top',
            });
            console.clear();
            this.router.navigateByUrl('/signIn');
        }
        const answer = new Answer(
            form.value.description,
            this.question
        );
        this.questionService
            .addAnswer(answer)
            .subscribe(
              a => {
                this.question.answers.unshift(a);
                this.sweetScroll.to('#title');
              },
              error => console.log(error)
            );
        form.reset();
    }
}
