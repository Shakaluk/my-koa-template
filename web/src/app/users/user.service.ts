import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';

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

    return this.authService.getHeaders()
      .switchMap(headers => this.http.get(`${this.usersUrl}`, {params, headers}))
      .map(response => {
        const jsonData = response;
        this.count = jsonData['count'];
        return jsonData['data'] as User[];
      });
  }

  getCount() {
    return this.count;
  }

  getUser(id: string): Promise<User> {
    const url = `${this.usersUrl}/${id}`;

    return this.authService.getHeaders()
      .switchMap(headers => this.http.get(url, {headers}))
      .toPromise()
      .then(response => response as User)
      .catch(this.handleError);
  }

  createUser(user: object): Promise<User> {
    return this.authService.getHeaders()
      .switchMap(headers => this.http.post(this.usersUrl, user, {headers}))
      .toPromise()
      .catch(this.handleError);
  }

  updateUser(id: string, user: object): Promise<User> {
    const url = `${this.usersUrl}/${id}`;

    return this.authService.getHeaders()
      .switchMap(headers => this.http.patch(url, user, {headers}))
      .toPromise()
      .catch(this.handleError);
  }

  removeUser(id: string): Promise<any> {
    const url = `${this.usersUrl}/${id}`;

    return this.authService.getHeaders()
      .switchMap(headers => this.http.delete(url, {headers}))
      .toPromise()
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);

    return Promise.reject(error);
  }
}
