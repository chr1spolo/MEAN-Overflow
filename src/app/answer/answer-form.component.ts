import { Component, Input } from "@angular/core";
import { NgForm } from '@angular/forms';
import { Answer } from '../answer/answer.model';
import { User } from '../auth/user.model';
import { Question } from '../question/question.model';

@Component({
    selector: 'app-answer-form',
    templateUrl: './answer-form.component.html',
    styleUrls: ['./answer-form.component.css']
})
export class AnswerFormComponent{
    @Input() question: Question;

    onSubmit(form: NgForm) {
        const answer = new Answer(
            form.value.description,
            this.question,
            new Date(),
            new User(null, null, "Christian", "Polo")
        );
        this.question.answers.unshift(answer);
        form.reset();
    }
}