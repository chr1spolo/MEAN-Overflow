import { Component } from "@angular/core";
import { Question } from '../question.model';

const q = new Question(
    '¿Como reutilizo un componente en android?',
    'Miren, esta es mi pregunta...',
    new Date(),
    'none'
);

@Component({
    selector: 'app-question-list',
    templateUrl: './question-list.component.html',
    styleUrls: ['./question-list.component.css']
})
export class QuestionListComponent{
    questions: Question[] = new Array(10).fill(q);
    constructor(){
        let main = document.getElementsByClassName('section');
        main[0].classList.remove('animated');
    }
}