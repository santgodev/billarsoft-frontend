import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IModule } from '../../interfaces/user-managment/imodule';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ModuleService {

  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getModules(id: number): Observable<IModule[]> {
    return this.http.get<IModule[]>(this.apiUrl + "/modules/role/" + id)
  }

  getModulesWhereRoleIdNot(id: number): Observable<IModule[]> {
    return this.http.get<IModule[]>(this.apiUrl + "/modules/rolenot/" + id)
  }
}

 
