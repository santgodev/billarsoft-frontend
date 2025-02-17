import { ChangeDetectorRef, Component, inject, OnInit, TemplateRef } from '@angular/core';
import { RoleService } from '../../../core/services/user-managment/role.service';
import { PermissionsService } from '../../../core/services/user-managment/permissions.service';
import { IRole } from '../../../core/interfaces/user-managment/irole';
import { FormArray, FormBuilder, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { IPermissions, IPermissionsList } from '../../../core/interfaces/user-managment/ipermissions';
import { MatDialog } from '@angular/material/dialog';
import { ReusableDialogComponent } from '../../../shared/reusable-dialog/reusable-dialog.component';
import { ICustomDialog } from '../../../core/interfaces/shared/icustom-dialog';
import { ModuleService } from '../../../core/services/user-managment/module.service';
import { IModule } from '../../../core/interfaces/user-managment/imodule';
import { MatSelectionListChange } from '@angular/material/list';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrl: './permissions.component.css'
})
export class PermissionsComponent implements OnInit {
  private readonly fb = inject(NonNullableFormBuilder)
  readonly dialog = inject(MatDialog);

  displayedColumns: string[] = ['moduleName', 'list', 'insert', 'update', 'delete', 'saveRow'];
  rolesSelect: IRole[] = [];
  roleId!: number;
  permissions: IPermissions[] = [];
  dataSource = this.permissions
  indexPermissionsRow!: number;
  modulesWhereRoleIdNot: IModule[] = [];
  conditionalForShowAddModules: boolean = false;
  moduleName!: string;
  roleName!: string;

  constructor(
    private roleService: RoleService,
    public permissionsService: PermissionsService,
    private moduleService: ModuleService
  ) { }


  ngOnInit(): void {
    this.roleService.getRoles().subscribe((rolesSelect) => {
      this.rolesSelect = rolesSelect;
    });
  }


  form = this.fb.group({
    permissionsArray: this.fb.array([]),
  });


  editPermissionsRow() {
    let permissions = (this.form.value).permissionsArray![this.indexPermissionsRow] as IPermissions;
    let data = {
      "roleId": this.roleId,
      "moduleId": permissions.moduleId,
      "list": permissions.list,
      "insert": permissions.insert,
      "update": permissions.update,
      "delete": permissions.delete
    }
    this.permissionsService.updatePermissions(data).subscribe(
    )
  }

  listPermissionsWithRoleId(id: number) {
    this.permissionsService.getPermissions(id).subscribe((permissions) => {
      this.permissions = permissions;
      this._updatePermissionsArray();
      this.roleId = id;
      this.conditionalForShowAddModules = true;
    });
  }
  _updatePermissionsArray() {
    const permissionsArray = this.form.get('permissionsArray') as FormArray;
    permissionsArray.clear();
    this.permissions.forEach((permission) => {
      permissionsArray.push(this._createPermissionsFormGroup(permission));
    });
    this.dataSource = this.permissions;
  }
  _createPermissionsFormGroup(permissions: IPermissions) {
    return this.fb.group(
      {
        moduleId: permissions.moduleId,
        list: permissions.list,
        insert: permissions.insert,
        update: permissions.update,
        delete: permissions.delete,
      }
    )
  }
  openDeleteDialog(template: TemplateRef<any>, index: number, moduleName: string): void {
    this.moduleName = moduleName
    this.indexPermissionsRow = index;
    let data = {
      template: template
    }
    this.dialog.open(ReusableDialogComponent, { data })
  }
  deletePermissionsRow() {
    this.permissionsService.deletePermissions(this.roleId, this.permissions[this.indexPermissionsRow].moduleId).subscribe(
      () => {
        this.permissionsService.getPermissions(this.roleId).subscribe((permissions) => {
          this.permissions = permissions; this._updatePermissionsArray();
        }
        )
      });
  }

  getFormArray(index: number) {
    return (this.form.value).permissionsArray![index] as FormGroup;
  }

  getPermissionsFormGroup(index: number): FormGroup {
    let permissionsFormGroup = (this.form.value).permissionsArray![index] as FormGroup;
    console.log(permissionsFormGroup);
    return permissionsFormGroup;
  }

  openFormEditPermissions(template: TemplateRef<any>, index: number, moduleName: string) {
    this.moduleName = moduleName
    this.indexPermissionsRow = index;
    let data = {
      template: template
    }
    this.dialog.open(ReusableDialogComponent, { data })
  }

  listModulesWhereRoleIdNot(template: TemplateRef<any>) {
    let data = {
      template: template
    }
    this.moduleService.getModulesWhereRoleIdNot(this.roleId).subscribe(
      ((ModulesWhereRoleIdNot) => {
        this.modulesWhereRoleIdNot = ModulesWhereRoleIdNot
        this.dataSource2.data = ModulesWhereRoleIdNot

      })
    )
    this.dialog.open(ReusableDialogComponent, { data })

  }


  onAddSelect(event: MatSelectionListChange) {
    let data = {
    }
  }
  displayedColumns2: string[] = ['select', 'name'];
  dataSource2 = new MatTableDataSource<IModule>([]);
  selection = new SelectionModel<IModule>(true, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource2.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource2.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: IModule): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'}`;
  }
  insertPermissionsList() {

    this.permissionsService.insertPermissionsList(this.selection.selected, this.roleId).subscribe(
      () => {
        this.permissionsService.getPermissions(this.roleId).subscribe((permissions) => {
          this.permissions = permissions; this._updatePermissionsArray();
        }

        )
      })
  }


}









