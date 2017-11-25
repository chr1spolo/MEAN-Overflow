import { Injectable } from '@angular/core';
import urljoin from 'url-join';
import { environment } from '../../environments/environment';
import { User } from './user.model';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/Rx';
import { Resolve } from '@angular/router/src/interfaces';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
    usersUrl: string;
    currentUser?: User;

    constructor(private http: Http, private router: Router) {
        this.usersUrl = urljoin(environment.apiUrl, 'auth');
        if ( this.userIsLoggedIn() ) {
            const { userId, firstName, lastName, email } = JSON.parse( localStorage.getItem('user') );
            this.currentUser = new User(email, null, firstName, lastName, userId);
        }
    }

    userSignUp(user: User) {
        const body = JSON.stringify(user);
        const headers = new Headers(
          { 'Content-Type': 'application/json' }
        );
        return this.http.post(
            urljoin(this.usersUrl, 'signup'),
            body,
            {headers}
        ).map( (response: Response) => {
              const json = response.json();
              this.userLogIn(json);
              return json;
        }).catch( (error: Response) => {
            console.log(error);
            return Observable.throw(error.json());
        } );
    }

    userSignIn(user: User) {
        const body = JSON.stringify(user);
        const headers = new Headers(
          { 'Content-Type': 'application/json' }
        );
        return this.http.post(
            urljoin(this.usersUrl, 'signin'),
            body,
            {headers}
         ).map( (response: Response) => {
              const json = response.json();
              this.userLogIn(json);
              return json;
         }).catch( (error: Response) => {
            console.log(error);
            return Observable.throw(error.json());
         } );
    }


    userLogIn = ( { _token, userId, firstName, lastName, email } ) => {
        this.currentUser = new User(
            email,
            null,
            firstName,
            lastName,
            userId
        );
        localStorage.setItem('_token', _token);
        localStorage.setItem('user', JSON.stringify({ userId, firstName, lastName, email }));
        this.router.navigateByUrl('/');
    }

    userIsLoggedIn() {
        return localStorage.getItem('_token') !== null;
    }

    userLogOut() {
      localStorage.clear();
      this.currentUser = null;
      this.router.navigateByUrl('/');
    }
}
