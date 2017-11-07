import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import { environment } from '../../environments/environment';

@Injectable()
export class AuthService {

  private usersUrl = `${environment.apiUrl}auth`;
  private tokenExpirationDate;
  public token = '';
  public user = {
    role: ''
  };

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  get isLoggedIn() {
    return Boolean(this.token);
  }

  get role() {
    return this.user.role;
  }

  setToken(token) {
    this.token = `Bearer ${token}`;
  }

  refreshToken() {
    const headers = new HttpHeaders({'Authorization': this.token});

    return this.http.get(`${this.usersUrl}/refresh`, {headers})
      .map(response => {
        return this.setToken(response['token']);
      });
  }

  getHeaders() {
    return new HttpHeaders({'Authorization': this.token});
  }

  parseJwt() {
    const base64Url = this.token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');

    return JSON.parse(window.atob(base64));
  }

  isTokenExpired() {
    return this.tokenExpirationDate < Math.floor(Date.now() / 1000);
  }

  login(user: object): Promise<any> {
    return this.http.post(`${this.usersUrl}/login`, user)
      .toPromise()
      .then(response => {
        this.setToken(response['token']);
        this.user = response['user'];
        this.tokenExpirationDate = this.parseJwt().exp;
      })
      .catch(this.handleError);
  }

  logout() {
    this.token = '';
    this.goToLogin();
  }

  goToLogin(): void {
    this.router.navigate(['login']);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);

    return Promise.reject(error);
  }
}
