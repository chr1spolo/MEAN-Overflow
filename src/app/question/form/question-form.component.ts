import { Component } from "@angular/core";
import { NgForm } from '@angular/forms';
import { Question } from '../question.model';
import icons from '../../icons'

@Component({
    selector: 'app-question-form',
    templateUrl: './question-form.component.html',
    styleUrls: ['./question-form.component.css']
})
export class QuestionFormComponent{

    icons: Object[] = icons;
    favoriteSeason: string;

    getIconVersion(icon: any){
        let version;
        if( icon.versions.font.includes('plain-wordmark') ){
            version = 'plain-wordmark';
        }else if(icon.versions.font.includes('plain') )
        {
            version = icon.versions.font[0];
        }else{
            version = 'plain';
        }
        return version;
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    onSubmit(form: NgForm){
        const q = new Question(
            form.value.title,
            form.value.description,
            new Date(),
            form.value.icon
        );
        console.log(q);
    }

}