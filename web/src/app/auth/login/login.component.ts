import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

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
      .then(user => this.goToDashboard())
      .catch(err => {
        const errData = JSON.parse(err.error);
        console.log(errData);

        this.submitted = false;

        if (err.status === 401) {
          switch (errData.type) {
            case 'email':
              userForm.controls.email.setErrors({'exist': true});
              this.emailError = errData.message;
              break;
            case 'password':
              userForm.controls.password.setErrors({'exist': true});
              this.passwordError = errData.message;
              break;
            case 'status':
              this.statusError = errData.message;
              break;
          }
        }
      });
  }

  goToDashboard(): void {
    this.router.navigate(['']);
  }
}
