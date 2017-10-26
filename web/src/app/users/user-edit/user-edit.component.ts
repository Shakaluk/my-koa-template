import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import 'rxjs/add/operator/switchMap';

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
    this.activatedRoute.paramMap
      .switchMap((params: ParamMap) => {
        this.id = params.get('id');
        return this.userService.getUser(this.id);
      })
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
      .then(user => this.goToList())
      .catch((err) => {
        const errData = JSON.parse(err.error);

        this.submitted = false;

        if (err.status === 409) {
          userForm.controls.email.setErrors({'exist': true});
          this.emailError = errData.message;
        }
      });
  }

  goToList(): void {
    this.router.navigate(['/user']);
  }
}
