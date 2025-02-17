import { Component, Inject, signal } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IUser } from '../../../core/interfaces/user-managment/iuser';
import { UserService } from '../../../core/services/user-managment/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IRole } from '../../../core/interfaces/user-managment/irole';
import { RoleService } from '../../../core/services/user-managment/role.service';

@Component({
  selector: 'app-user-dialogs',
  templateUrl: './user-dialogs.component.html',
  styleUrl: './user-dialogs.component.css'
})
export class UserDialogsComponent {

  errorMessage = signal('');
  form: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { templateName: string, userData: IUser },
    private userService: UserService,
    private fb: FormBuilder,
    private roleService: RoleService
  ) {
    this.form = this.fb.group({
      id: [null],
      name: ['', Validators.required],
      roleId: [null, Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
    if (data.userData) {
      this.form.setValue(data.userData);
    }
  }


  ngOnInit(): void {
    this.roleService.getRoles().subscribe((roles) => {
      this.roles = roles;
    }); 
  }

  updateErrorMessage(fieldName: string) {
    const field = this.form.get(fieldName);
    if (field?.hasError('required') && field?.touched) {
      this.errorMessage.set('Este campo es obligatorio');
    } else if (field?.hasError('email') && field?.touched) {
      this.errorMessage.set('Correo electrónico no válido');
    } else {
      this.errorMessage.set('');
    }
  }

  createUser() {
    let userData = this.form.getRawValue();
    this.userService.insertUser(userData).subscribe();
  }

  updateUser() {
    let userData = this.form.getRawValue();
    let user = {
      id: this.data.userData.id,
      name: userData['name'],
      roleId: userData['roleId'],
      email: userData['email'],
      password: userData['password'],
    };
    this.userService.updateUser(user).subscribe();
  }

  deleteUser() {
    this.userService.deleteUser(this.data.userData.id).subscribe();
  }


  selectedValue!: string;
  selectedCar!: string;
  roles: IRole[] = [];
}

