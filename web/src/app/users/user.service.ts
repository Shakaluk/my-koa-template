import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import { User } from './user';
import { environment } from '../../environments/environment';

@Injectable()
export class UserService {

  private usersUrl = environment.apiUrl + 'user';
  private headers = new HttpHeaders({'Content-Type': 'application/json'});

  count = 0;

  constructor(private http: HttpClient) { }

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

    return this.http.get(`${this.usersUrl}`, {params})
      .map(response => {
        const jsonData = response;
        this.count = jsonData['count'];
        return jsonData['data'] as User[];
      })
  }

  getCount() {
    return this.count;
  }

  getUser(_id: string): Promise<User> {
    const url = `${this.usersUrl}/${_id}`;

    return this.http.get(url)
      .toPromise()
      .then(response => response as User)
      .catch(this.handleError);
  }

  createUser(user: object): Promise<User> {
    return this.http.post(this.usersUrl, JSON.stringify(user), {headers: this.headers})
      .toPromise()
      .catch(this.handleError);
  }

  updateUser(_id: string, user: object): Promise<User> {
    const url = `${this.usersUrl}/${_id}`;

    return this.http.patch(url, JSON.stringify(user), {headers: this.headers})
      .toPromise()
      .catch(this.handleError);
  }

  removeUser(_id: string): Promise<User> {
    const url = `${this.usersUrl}/${_id}`;

    return this.http.delete(url)
      .toPromise()
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);

    return Promise.reject(error);
  }
}
