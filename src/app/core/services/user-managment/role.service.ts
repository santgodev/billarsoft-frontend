import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { BehaviorSubject, map, Observable, take, tap } from 'rxjs';
import { IRole } from '../../interfaces/user-managment/irole';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  $roles: BehaviorSubject<IRole[]> = new BehaviorSubject<IRole[]>([]);
  apiUrl = environment.apiUrl + "/roles"
  constructor(private http: HttpClient) { }


  getRoles(): Observable<IRole[]> {
    return this.http.get<IRole[]>(this.apiUrl).pipe(
      tap((roles) => {
        this.$roles.next(roles)
      })
    )
  }

  insertRole(role: IRole) {
    let data = {
      name:role.name,
      description:role.description
    }
    return this.http.post<HttpResponse<void>>(this.apiUrl, data).pipe(
      tap(()=>{this.getRoles().subscribe()})
    )
  }

  updateRole(role: IRole) {
    return this.http.put<HttpResponse<void>>(this.apiUrl, role).pipe(
      tap(()=>{this.getRoles().subscribe()})
    )
  }

  deleteRole(id: (number|undefined)) {
    return this.http.delete<HttpResponse<void>>(this.apiUrl +"/"+ id).pipe(
      tap(()=>{this.getRoles().subscribe()})
    )

  }




}
