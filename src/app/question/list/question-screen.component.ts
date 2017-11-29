import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-question-screen',
  templateUrl: './question-screen.component.html',
  styleUrls: ['./question-screen.component.css']
})
export class QuestionScreenComponent implements OnInit {

  constructor(
    private authService: AuthService
  ) {}
  addQuestion = true;

  ngOnInit() {
    if ( !this.authService.userIsLoggedIn() ) {
      this.addQuestion = false;
    }
  }
}
