import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import 'rxjs/add/operator/switchMap';

import { User } from '../user';
import { UserService } from '../user.service';
import { DialogsService } from '../../shared/dialogs/dialogs.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  id: string;
  user: User;

  constructor(
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dialogsService: DialogsService
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap
      .switchMap((params: ParamMap) => {
        this.id = params.get('id');
        return this.userService.getUser(this.id);
      })
      .subscribe(user => this.user = user);
  }

  removeUser() {
    this.dialogsService
      .confirm('Remove user', 'Are you sure?')
      .subscribe(res => {
        if (res) {
          this.userService.removeUser(this.id).then(user => this.goToList());
        }
      });
  }

  goToList(): void {
    this.router.navigate(['/user']);
  }
}
