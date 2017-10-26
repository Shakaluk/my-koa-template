import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { MatButtonModule, MatToolbarModule, MatSidenavModule, MatIconModule, MatListModule, MatCardModule, MatTableModule, MatPaginatorModule, MatTooltipModule, MatSortModule, MatInputModule, MatSelectModule, MatProgressSpinnerModule, MatProgressBarModule, MatDialogModule, MatSnackBarModule, MatMenuModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule  } from '@angular/cdk/layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserDetailsComponent } from './users/user-details/user-details.component';
import { UserService } from './users/user.service';
import { UserNewComponent } from './users/user-new/user-new.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { DialogsModule } from './shared/dialogs/dialogs.module';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    UserDetailsComponent,
    UserNewComponent,
    UserEditComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatListModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatSortModule,
    MatInputModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatDialogModule,
    DialogsModule,
    MatSnackBarModule,
    MatMenuModule
  ],
  providers: [
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
