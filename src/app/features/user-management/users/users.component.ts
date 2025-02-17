import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from '../../../core/services/user-managment/user.service';
import { DialogService } from '../../../core/services/shared/dialog.service';
import { IUser } from '../../../core/interfaces/user-managment/iuser';

export interface User {
  id: number;
  name: string;
  role: string;
  email: string;
  password: string;
}

const ELEMENT_DATA: User[] = [
  { id: 1, name: 'John Doe', role: 'Admin', email: 'john.doe@example.com', password: 'password123' },
  // Agrega más datos según sea necesario
];

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'email', 'actions'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  constructor(
    public userService: UserService,
    private dialogService: DialogService
  ) { }





  ngOnInit(): void {
    this.userService.getUsers().subscribe((users) => {
      console.log(users);
    })
  }

  createUser(): void {
    this.dialogService.openUserDialog("create", null)
  }

  deleteUser(user: IUser): void {
    let userData = {
      id: user.id,
      name: user.name,
      roleId: user.role?.id,
      email: user.email,
      password: user.password
    }
    this.dialogService.openUserDialog("delete", userData);
  }
  editUser(user: IUser): void {
    let userData = {
      id: user.id,
      name: user.name,
      roleId: user.role?.id,
      email: user.email,
      password: user.password
    }
    this.dialogService.openUserDialog("update", userData);
  }
}
