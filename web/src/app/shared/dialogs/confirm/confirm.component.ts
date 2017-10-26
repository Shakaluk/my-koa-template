import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from "@angular/material";

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {

  public title: string;
  public message: string;

  constructor(
    public dialogRef: MatDialogRef<ConfirmComponent>
  ) { }

  ngOnInit() {
  }
}
