import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ICustomDialog } from '../../interfaces/shared/icustom-dialog';
import { ReusableDialogComponent } from '../../../shared/reusable-dialog/reusable-dialog.component';
import { RolDialogsComponent } from '../../../features/user-management/rol-dialogs/rol-dialogs.component';
import { IRole } from '../../interfaces/user-managment/irole';
import { IUser } from '../../interfaces/user-managment/iuser';
import { UserDialogsComponent } from '../../../features/user-management/user-dialogs/user-dialogs.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private matDialog: MatDialog) { }

  openDialog(data: ICustomDialog) {
    this.matDialog.open(ReusableDialogComponent, { data })
  }


  openRolDialog(templateName: string, roleData: (IRole|null )) {
    let data = {
      'templateName': templateName,
      'roleData': roleData
    }
    this.matDialog.open(RolDialogsComponent, { data })
  }
  
  openUserDialog(templateName: string, userData: (IUser|null )) {
    let data = {
      'templateName': templateName,
      'userData': userData
    }
    this.matDialog.open(UserDialogsComponent, { data })
  }



}
