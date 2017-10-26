import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { MatDialogRef, MatDialog } from '@angular/material';

import { ConfirmComponent } from './confirm/confirm.component';

@Injectable()
export class DialogsService {

  constructor(
    private dialog: MatDialog
  ) { }

  public confirm(title: string, message: string):Observable<boolean> {
    let dialogRef: MatDialogRef<ConfirmComponent>;

    dialogRef = this.dialog.open(ConfirmComponent);

    dialogRef.componentInstance.title = title;
    dialogRef.componentInstance.message = message;

    return dialogRef.afterClosed();
  }
}
