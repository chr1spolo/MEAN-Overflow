import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../user.model';

@Component({
    selector: 'app-singup-screen',
    templateUrl: './signup-screen.module.html',
    styleUrls: ['./signup-screen.module.css']
})
export class SignUpScreenComponent implements OnInit {

    signinForm: FormGroup;

        ngOnInit() {
            this.signinForm = new FormGroup({
                firstname: new FormControl(null, Validators.required),
                lastname: new FormControl(null, Validators.required),
                email: new FormControl(null, [
                    Validators.required,
                    Validators.pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
                ]),
                password: new FormControl(null, Validators.required)
            });
        }

        onSubmit(){
            if (this.signinForm.valid) {
                const { firstname, lastname,email, password } = this.signinForm.value;
                const user = new User(email, password, firstname, lastname);
                console.log(user);
            }
        }
}
