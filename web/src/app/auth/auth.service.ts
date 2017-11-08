import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import { User } from '../users/user';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthService {

  private authUrl = `${environment.apiUrl}auth`;
  private userUrl = `${environment.apiUrl}user`;
  public token = '';
  public tokenData;
  public user: User;

  constructor(
    private http: HttpClient
  ) {}

  get isLoggedIn() {
    return !!this.token;
  }

  get role() {
    if(this.tokenData) {
      return this.tokenData.role;
    }
  }

  init() {
    const token = localStorage.getItem('token');

    if(token) {
      this.setToken(token);

      return this.refreshToken()
        .switchMap(result => this.getLoggedUser())
        .map((user: any) => this.user = user)
        .toPromise();
    }
  }

  getLoggedUser() {
    return this.getHeaders()
      .switchMap(headers => this.http.get(`${this.userUrl}/${this.tokenData.id}`, {headers}))

  }

  setToken(token) {
    this.token = `Bearer ${token}`;
    this.tokenData = this.parseJwt(token);
    localStorage.setItem('token', token);
  }

  refreshToken() {
    const headers = new HttpHeaders({'Authorization': this.token});

    return this.http.get(`${this.authUrl}/refresh`, {headers})
      .map(response => this.setToken(response['token']));
  }

  getHeaders() {
    let headers;

    if(this.isTokenExpired()) {
      return this.refreshToken()
        .map(() => new HttpHeaders({'Authorization': this.token}))
    }

    headers = new HttpHeaders({'Authorization': this.token});

    return Observable.of(headers);
  }

  parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');

    return JSON.parse(window.atob(base64));
  }

  isTokenExpired() {
    return this.tokenData.exp < Math.floor(Date.now() / 1000);
  }

  login(user: object): Promise<any> {
    return this.http.post(`${this.authUrl}/login`, user)
      .toPromise()
      .then(response => {
        this.setToken(response['token']);
        this.user = response['user'];
      })
      .catch(this.handleError);
  }

  logout() {
    this.token = '';
    localStorage.removeItem('token');
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);

    return Promise.reject(error);
  }
}
