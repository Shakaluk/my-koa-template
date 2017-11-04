import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatDialogModule } from '@angular/material';

import { DialogsService } from './dialogs.service';
import { ConfirmComponent } from './confirm/confirm.component';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule
  ],
  declarations: [ConfirmComponent],
  exports: [ConfirmComponent],
  entryComponents: [ConfirmComponent],
  providers: [DialogsService]
})
export class DialogsModule { }
