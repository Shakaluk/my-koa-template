import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  id: string;
  user: User;
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
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');

    this.userService.getUser(this.id)
      .subscribe(user => this.user = user);
  }

  onSubmit(userForm) {
    this.submitted = true;

    const data = {
      name : this.user.name,
      email: this.user.email,
      role : this.user.role
    };

    this.userService.updateUser(this.id, data)
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
