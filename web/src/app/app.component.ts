import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  handsetPortrait: boolean;
  navigationList = [
    {name: 'Shak Systems', link: '/dashboard', icon: 'trending_up'},
    {name: 'Add user', link: '/user/new', icon: 'person_add'},
    {name: 'Users list', link: '/user', icon: 'people'}
  ];

  constructor(
    private breakpointObserver: BreakpointObserver,
    private snackBar: MatSnackBar
  ) {
    breakpointObserver.observe([
      Breakpoints.HandsetPortrait,
      Breakpoints.TabletPortrait,
      Breakpoints.HandsetLandscape
    ]).subscribe(result => {
      this.handsetPortrait = result.matches;
    });
  }

  showNotImplemented() {
    this.snackBar.open('Not implemented', 'Ok', {
      duration: 2000,
    });
  }
}
