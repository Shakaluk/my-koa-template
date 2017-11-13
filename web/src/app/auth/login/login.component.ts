import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public apiUrl = environment.apiUrl;
  public staticUrl = environment.staticUrl;
  user = {
    email: '',
    password: ''
  };
  submitted = false;
  emailError = '';
  passwordError = '';
  statusError = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {}

  onSubmit(userForm) {
    this.submitted = true;

    this.authService.login(this.user)
      .subscribe(user => this.goToDashboard(),
        err => {
          console.log(err.error);

          this.submitted = false;

          if (err.status === 401) {
            switch (err.error.type) {
              case 'email':
                userForm.controls.email.setErrors({'exist': true});
                this.emailError = err.error.message;
                break;
              case 'password':
                userForm.controls.password.setErrors({'exist': true});
                this.passwordError = err.error.message;
                break;
              case 'status':
                this.statusError = err.error.message;
                break;
            }
          }
        }
      );
  }

  goToDashboard(): void {
    this.router.navigate(['']);
  }
}
