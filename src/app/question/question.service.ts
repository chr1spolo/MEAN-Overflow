import { Injectable } from '@angular/core';
import { Question } from './question.model';
import { Answer } from '../answer/answer.model';
import { Http, Headers, Response } from '@angular/http';
import { environment } from '../../environments/environment';
import urljoin from 'url-join';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class QuestionService {

  private questionsUrl: string;


  constructor(private http: Http) {
      this.questionsUrl = urljoin(environment.apiUrl, 'questions');
  }

  addTokenString(url) {
      const _token = localStorage.getItem('_token');
      return url + `?_token=${_token}`;
  }

  getQuestions(): Promise<void | Question[]> {
      return this.http.get(this.questionsUrl)
                  .toPromise()
                  .then(response => response.json() as Question[])
                  .catch(this.handlerError);
  }

  getQuestion(id): Promise<void | Question> {
      const url = urljoin(this.questionsUrl, id);
      return this.http.get(url)
                  .toPromise()
                  .then(response => response.json() as Question)
                  .catch(this.handlerError);
  }

  addQuestion(question: Question) {
      const body = JSON.stringify(question);
      const headers = new Headers(
        { 'Content-Type': 'application/json' }
      );
      const url = this.addTokenString(this.questionsUrl);
      return this.http.post(url, body, {headers})
                      .map( (response: Response) => response.json())
                      .catch( (error: Response) => Observable.throw(error.json() ));
  }

  addAnswer(answer: Answer) {

    const a = {
        description: answer.description,
        question: {
          _id: answer.question._id
        }
      };
      const body = JSON.stringify(a);
      const headers = new Headers(
        { 'Content-Type': 'application/json' }
      );
      let url = urljoin( this.questionsUrl, answer.question._id, 'answers' );
      url = this.addTokenString(url);
      return this.http.post(url, body, {headers})
                      .map( (response: Response) => response.json())
                      .catch( (error: Response) => Observable.throw(error.json() ));
  }

  handlerError(error: any) {
      const errMessage = error.message ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error';

      console.log(errMessage);
  }
}
