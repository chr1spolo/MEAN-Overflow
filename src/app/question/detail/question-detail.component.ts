import { Component } from '@angular/core';
import { Question } from "../question.model";

@Component({
    selector: 'app-question-detail',
    templateUrl: './question-detail.component.html',
    styleUrls: ['./question-detail.component.css']
})
export class QuestionDetailComponent{

    constructor(){
        let main = document.getElementsByClassName('section');
        main[0].classList.remove('animated');
    }

    question: Question = new Question(
        'Esta es una nueva pregunta sobre Android',
        'Miren, tengo una duda con una app que estoy escribiendo para android...',
        new Date,
        'devicon-android-plain'
    );
}