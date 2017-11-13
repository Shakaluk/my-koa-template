import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-new',
  templateUrl: './user-new.component.html',
  styleUrls: ['./user-new.component.css']
})
export class UserNewComponent implements OnInit {

  user = new User('', '', '', 'user');
  submitted = false;
  emailError = '';
  roles = [{
    value    : 'user',
    viewValue: 'User'
  }, {
    value    : 'admin',
    viewValue: 'Admin'
  }];

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {}

  onSubmit(userForm) {
    this.submitted = true;

    this.userService.createUser(this.user)
      .subscribe(user => this.goToList(),
      err => {
        this.submitted = false;

        if (err.status === 409) {
          userForm.controls.email.setErrors({'exist': true});
          this.emailError = err.error.message;
        }
        }
      );
  }

  goToList(): void {
    this.router.navigate(['/user']);
  }
}
