import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserDetailsComponent } from './users/user-details/user-details.component';
import { UserNewComponent } from './users/user-new/user-new.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { SocialComponent } from './auth/social/social.component';
import { AuthGuard } from './auth/guards/auth.guard';
import { AdminGuard } from './auth/guards/admin.guard';

const routes: Routes = [
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: 'user', component: UserListComponent, canActivate: [AuthGuard]},
  {path: 'user/new', component: UserNewComponent, canActivate: [AuthGuard, AdminGuard]},
  {path: 'user/:id', component: UserDetailsComponent, canActivate: [AuthGuard]},
  {path: 'user/edit/:id', component: UserEditComponent, canActivate: [AuthGuard, AdminGuard]},
  {path: 'auth/social', component: SocialComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
