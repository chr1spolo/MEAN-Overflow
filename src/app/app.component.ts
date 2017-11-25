import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private authService: AuthService) {}

  userIsLoggedIn() {
    return this.authService.userIsLoggedIn();
  }

  fullName() {
    return this.authService.currentUser.fullName();
  }

  logOut() {
    return this.authService.userLogOut();
  }
}
