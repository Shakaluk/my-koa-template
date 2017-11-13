import { Component, OnInit } from '@angular/core';

import { UserService } from '../users/user.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public apiUrl = environment.apiUrl;
  public staticUrl = environment.staticUrl;
  users = 0;
  admins = 0;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    this.userService.getUsers(0, 10000)
      .subscribe(users => {
        for (let user of users) {
          if (user.role == 'admin') {
            this.admins++;
          } else {
            this.users++;
          }
        }
      });
  }
}
