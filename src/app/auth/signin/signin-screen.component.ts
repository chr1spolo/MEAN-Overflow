import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { User } from '../user.model';
import { AuthService } from '../auth.service';
import { MatSnackBar } from '@angular/material';

@Component({
    selector: 'app-singin-screen',
    templateUrl: './signin-screen.module.html',
    styleUrls: ['./signin-screen.module.css']
})
export class SignInScreenComponent implements OnInit {

    signinForm: FormGroup;
    emailForm: any;

    constructor(
      private authService: AuthService,
      public snackBar: MatSnackBar
    ) {}

    ngOnInit() {
        this.signinForm = new FormGroup({
            email: new FormControl(null, [
                Validators.required,
                Validators.pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
            ]),
            password: new FormControl(null, Validators.required)
        });
        this.emailForm = this.signinForm.controls.email.valueChanges;
    }

    onSubmit() {
        if (this.signinForm.valid) {
            const { email, password } = this.signinForm.value;
            const user = new User(email, password);
            console.log(user);
            this.authService.userSignIn(user)
                            .subscribe(
                                this.authService.userIsLoggedIn,
                                (error) => this.handlerError(error.error)
                            );
        }
    }

    handlerError( message: string)  {
        this.snackBar.open(message, 'Error', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
    }

}
