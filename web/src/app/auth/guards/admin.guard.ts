import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { MatSnackBar } from '@angular/material';

import { AuthService } from '../auth.service';

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if(this.authService.role !== 'admin') {
      this.snackBar.open('Permission denied', 'Ok', {
        duration: 2000,
      });
      return false;
    }

    return true;
  }
}
