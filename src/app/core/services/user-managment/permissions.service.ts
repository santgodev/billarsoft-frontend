import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { IPermissions, IPermissionsList } from '../../interfaces/user-managment/ipermissions';
import { environment } from '../../../../environments/environment.development';
import { IModule } from '../../interfaces/user-managment/imodule';

@Injectable({
  providedIn: 'root'
})
export class PermissionsService {

  apiUrl = environment.apiUrl + '/module_permissions';
  $permissions: BehaviorSubject<IPermissions[]> = new BehaviorSubject<IPermissions[]>([]);

  private _mapPermissionsList(moduleId: number, roleId: number): IPermissionsList {
    let permissions = {
      "roleId": roleId,
      "moduleId": moduleId,
    }
    return permissions;
  }

  constructor(private http: HttpClient) { }

  getPermissions(id: number): Observable<IPermissions[]> {
    return this.http.get<IPermissions[]>(this.apiUrl + "/" + id).pipe(
      tap((permissions) => {
        this.$permissions.next(permissions)
      })
    )
  }



  insertPermissionsList(modules: IModule[], roleId: number) {
    let data: IPermissionsList[] = []
    modules.forEach((module) => {
      data.push(this._mapPermissionsList(module.id, roleId))

    })
    return this.http.post(this.apiUrl + "/list", data)
  }




  updatePermissions(permissions: IPermissions) {
    let data = {
      "roleId": permissions.roleId,
      "moduleId": permissions.moduleId,
      "list": permissions.list,
      "insert": permissions.insert,
      "update": permissions.update,
      "delete": permissions.delete
    }
    return this.http.put(this.apiUrl, data).pipe(
      tap(() => {
        this.getPermissions(permissions.roleId!).subscribe()
      })
    )
  }

  
  deletePermissions(roleId: number, moduleId: number) {
    const data = {
      "roleId": roleId,
      "moduleId": moduleId
    };
    return this.http.delete(this.apiUrl,{body:data}).pipe(
      tap(() => {
        this.getPermissions(roleId).subscribe();
      })
    );
  }

  //ModulePermissionsId it´s compose by a moduleId and roleId
  getPermissionsByModulePermissionsId(moduleId: number, roleId: number): Observable<IPermissions> {
    let modulePermissionsId = {
      "moduleId": moduleId,
      "roleId": roleId
    }
    return this.http.post<IPermissions>(this.apiUrl + "/permissionsId", modulePermissionsId)
  }


}
