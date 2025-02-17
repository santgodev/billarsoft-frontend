import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { IModule } from '../../interfaces/user-managment/imodule';
import { IUser } from '../../interfaces/user-managment/iuser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = environment.apiUrl;
  $modules: BehaviorSubject<IModule[]> = new BehaviorSubject<IModule[]>([]);

  constructor(private http: HttpClient) { }


  get modules(): Observable<IModule[]> {
    return this.$modules.asObservable()
  }

  login(email: string, password: string): Observable<IUser> {
    let data = {
      "email": email,
      "password": password
    }
    return this.http.post<IUser>(this.apiUrl + '/auth', data).pipe(
      tap((user) => {
        localStorage.setItem("roleId",(user.roleId!).toString())
      })
    )
  }

}
