import { Component, OnInit, TemplateRef } from '@angular/core';
import { RoleService } from '../../../core/services/user-managment/role.service';
import { MatDialog } from '@angular/material/dialog';
import { ICustomDialog } from '../../../core/interfaces/shared/icustom-dialog';
import { DialogService } from '../../../core/services/shared/dialog.service';
import { IRole } from '../../../core/interfaces/user-managment/irole';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.css'
})
export class RolesComponent implements OnInit {

  displayedColumns: string[] = ['position', 'name', 'description', 'actions'];

  constructor(
    public roleService: RoleService,
    private dialogService: DialogService
  ) { }

  ngOnInit(): void {
    this.roleService.getRoles().subscribe((roles) => {
      console.log(roles);
    })
  }


  openCreateDialog() {
    this.dialogService.openRolDialog("create", null)
  }
  openUpdateDialog(role:IRole) {
    this.dialogService.openRolDialog("update", role)
  }
  openDeleteDialog(role:IRole) {
    this.dialogService.openRolDialog("delete", role)
  }


}



