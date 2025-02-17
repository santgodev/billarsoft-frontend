import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { IUser } from '../../interfaces/user-managment/iuser';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  $users: BehaviorSubject<IUser[]> = new BehaviorSubject<IUser[]>([]);
  apiUrl = environment.apiUrl + "/users";

  constructor(private http: HttpClient) { }

  getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.apiUrl).pipe(
      tap((users) => {
        this.$users.next(users);
      })
    );
  }

  insertUser(user: IUser): Observable<HttpResponse<void>> {
    const data = {
      name: user.name,
      roleId: user.roleId,
      email: user.email,
      password: user.password
    };
    return this.http.post<HttpResponse<void>>(this.apiUrl, data).pipe(
      tap(() => { this.getUsers().subscribe(); })
    );
  }

  updateUser(user: IUser): Observable<HttpResponse<void>> {
    return this.http.put<HttpResponse<void>>(this.apiUrl, user).pipe(
      tap(() => { this.getUsers().subscribe(); })
    );
  }

  deleteUser(id: number | undefined): Observable<HttpResponse<void>> {
    return this.http.delete<HttpResponse<void>>(this.apiUrl + "/" + id).pipe(
      tap(() => { this.getUsers().subscribe(); })
    );
  }
}
