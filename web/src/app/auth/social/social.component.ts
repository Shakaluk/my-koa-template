import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.css']
})
export class SocialComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    let token = this.activatedRoute.snapshot.queryParamMap.get('token');
    let message = this.activatedRoute.snapshot.queryParamMap.get('message');

    if (message) {
      this.showMessage(message);
      this.goToLogin();
    } else {
      this.authService.setToken(token);
      this.goToDashboard();
    }
  }

  goToDashboard(): void {
    this.router.navigate(['']);
  }

  goToLogin(): void {
    this.router.navigate(['login']);
  }

  showMessage(message) {
    this.snackBar.open(message, 'Ok', {
      duration: 4000,
    });
  }
}
