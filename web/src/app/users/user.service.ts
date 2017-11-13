import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { _throw } from 'rxjs/observable/throw';
import { catchError, map, switchMap } from 'rxjs/operators';

import { User } from './user';
import { AuthService } from '../auth/auth.service';
import { environment } from '../../environments/environment';

@Injectable()
export class UserService {

  private usersUrl = environment.apiUrl + 'user';

  count = 0;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  getParams(data) {
    let httpParams = new HttpParams();

    Object.keys(data).forEach(function (key) {
      if(data[key]) {
        httpParams = httpParams.append(key, data[key]);
      }
    });

    return httpParams;
  }

  getUsers(skip: number, limit: number = 25, sort?: string, order?: string): Observable<User[]> {
    const params = this.getParams({skip, limit, sort, order});

    return this.authService.getHeaders().pipe(
      switchMap(headers => this.http.get(`${this.usersUrl}`, {params, headers})),
      map(response => {
        const jsonData = response;
        this.count = jsonData['count'];
        return jsonData['data'] as User[];
      })
    );
  }

  getCount() {
    return this.count;
  }

  getUser(id: string): Observable<User> {
    const url = `${this.usersUrl}/${id}`;

    return this.authService.getHeaders().pipe(
      switchMap(headers => this.http.get(url, {headers})),
      map(response => response as User),
      catchError(this.handleError)
    );
  }

  createUser(user: object): Observable<User> {
    return this.authService.getHeaders().pipe(
      switchMap(headers => this.http.post(this.usersUrl, user, {headers})),
      catchError(this.handleError)
    );
  }

  updateUser(id: string, user: object): Observable<User> {
    const url = `${this.usersUrl}/${id}`;

    return this.authService.getHeaders().pipe(
      switchMap(headers => this.http.patch(url, user, {headers})),
      catchError(this.handleError)
    );
  }

  removeUser(id: string): Observable<any> {
    const url = `${this.usersUrl}/${id}`;

    return this.authService.getHeaders().pipe(
      switchMap(headers => this.http.delete(url, {headers})),
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<any> {
    console.error('An error occurred', error);

    return _throw(error);
  }
}
