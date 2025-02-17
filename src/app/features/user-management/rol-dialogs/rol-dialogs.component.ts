import { Component, Inject, signal } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IRole } from '../../../core/interfaces/user-managment/irole';
import { RoleService } from '../../../core/services/user-managment/role.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-rol-dialogs',
  templateUrl: './rol-dialogs.component.html',
  styleUrl: './rol-dialogs.component.css'
})
export class RolDialogsComponent {

  errorMessage = signal('');
  form: FormGroup;


  constructor(@Inject(MAT_DIALOG_DATA) public data: { templateName: string, roleData: IRole },
    private roleService: RoleService,
    private fb: FormBuilder,

  ) {
    this.form = this.fb.group({
      id: [null],
      name: ['', Validators.required],
      description: ['', Validators.required],

    });
    if (data.roleData != null) {
      this.form.setValue(data.roleData)
    }
  }
  updateErrorMessage(fieldName: string) {
    const field = this.form.get(fieldName);
    if (field?.hasError('required') && field?.touched) {
      this.errorMessage.set('Este campo es obligatorio');
    } else {
      this.errorMessage.set('');
    }
  }
  createRole() {
    let roleData = this.form.getRawValue()
    this.roleService.insertRole(roleData).subscribe()
  }

  updateRole() {
    let roleData = this.form.getRawValue()
    let role = {
      id: this.data.roleData.id,
      name: roleData['name'],
      description: roleData['description'],

    }
    this.roleService.updateRole(role).subscribe()
  }

  deleteRole() {
    this.roleService.deleteRole(this.data.roleData.id).subscribe()
  }


}
