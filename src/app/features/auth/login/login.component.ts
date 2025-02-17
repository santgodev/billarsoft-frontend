import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/user-managment/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  form: FormGroup = new FormGroup({
    username: new FormControl('', [
      Validators.required, Validators.email
    ]),
    password: new FormControl('', [
      Validators.required, Validators.minLength(8)
    ]),
  });
  ngOnInit(): void {
    this.form.reset()
  }

  get username() {
    return this.form.get('username');
  }

  get password() {
    return this.form.get('password');
  }
  submit() {
    if (this.form.valid) {
      this.login(this.form.value['username'], this.form.value['password'])
    }
  }
  login(username: string, password: string): boolean {
    this.authService.login(username, password).subscribe((modules) => {
      console.clear  
      this.router.navigate(['/home'])

    },
      (error) => {
        console.log(error);
        this.password?.reset

      }
    )
    return true;
  }

}
