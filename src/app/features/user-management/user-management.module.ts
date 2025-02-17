import { NgModule } from '@angular/core';
import { CommonModule, NgTemplateOutlet } from '@angular/common';

import { UserManagementRoutingModule } from './user-management-routing.module';
import { RolesComponent } from './roles/roles.component';
import { UsersComponent } from './users/users.component';
import { PermissionsComponent } from './permissions/permissions.component';
import { AngularMaterialModule } from '../../angular-material.module';
import { MatDialogModule } from '@angular/material/dialog';
import { RolDialogsComponent } from './rol-dialogs/rol-dialogs.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserDialogsComponent } from './user-dialogs/user-dialogs.component';


@NgModule({
  declarations: [
    RolesComponent,
    UsersComponent,
    PermissionsComponent,
    RolDialogsComponent,
    UserDialogsComponent,
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    UserManagementRoutingModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class UserManagementModule { }
