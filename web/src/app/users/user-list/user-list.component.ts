import { Component, OnInit, ViewChild } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/merge';

import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  displayedColumns = ['name', 'email', 'role', 'createdAt', 'updatedAt', 'actions'];
  dataSource: UserDataSource | null;
  length = 0;
  pageIndex = 0;
  pageSize = 25;
  pageSizeOptions = [5, 10, 25, 100];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    this.dataSource = new UserDataSource(this.userService, this.paginator, this.sort);
    this.dataSource.getData(this.pageIndex, this.pageSize);
  }
}

export class UserDataSource extends DataSource<any> {
  dataChange: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  loaded = false;

  constructor(private userService: UserService, private _paginator: MatPaginator, private _sort: MatSort) {
    super();
  }

  getData(skip, limit, sort?, order?) {
    this.loaded = false;

    this.userService.getUsers(skip, limit, sort, order).subscribe((users) => {
      this.loaded = true;
      this._paginator.length = this.userService.getCount();
      this.dataChange.next(users);
    });
  }

  connect(): Observable<User[]> {
    const displayDataChanges = [
      this._paginator.page,
      this._sort.sortChange
    ];

    Observable.merge(...displayDataChanges).subscribe(() => {
      const startIndex = this._paginator.pageIndex * this._paginator.pageSize;

      this.getData(startIndex, this._paginator.pageSize, this._sort.active, this._sort.direction);
    });

    return Observable.merge(...[this.dataChange]).map((users) => {
      return users;
    });
  }

  disconnect() {}
}
