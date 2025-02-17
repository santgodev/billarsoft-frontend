import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, inject, OnInit, signal } from '@angular/core';
import { IModule } from '../../core/interfaces/user-managment/imodule';
import { ModuleService } from '../../core/services/user-managment/module.service';
import { PermissionsService } from '../../core/services/user-managment/permissions.service';
import { NgxPermissionsService } from 'ngx-permissions';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css'
})
export class SidenavComponent implements OnInit {

  modules: IModule[] = [];


  mobileQuery: MediaQueryList;

  readonly panelOpenState = signal(false);


  private _mobileQueryListener: () => void;

  constructor(private moduleService: ModuleService,
    private permissionService: PermissionsService,
    private permissionsService: NgxPermissionsService
  ) {
    const changeDetectorRef = inject(ChangeDetectorRef);
    const media = inject(MediaMatcher);


    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  ngOnInit() {
    let roleId: number = parseInt(localStorage.getItem("roleId")!)
    this.moduleService.getModules(roleId).subscribe((modules) => {
      this.modules = modules
    })

    this.changeModule(1)
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  callPermissionsModule() {
    this.permissionService.getPermissions
  }

  changeModule(moduleId: number) {
    this.permissionsService.flushPermissions();
    let roleId: number = parseInt(localStorage.getItem("roleId")!)
    let loadedPermissions: string[] = [];
    this.permissionService.getPermissionsByModulePermissionsId(moduleId, roleId).subscribe((permissions) => {
      if (permissions.list === true) {
        this.permissionsService.addPermission('LIST');
        loadedPermissions.push('LIST');
      }
      if (permissions.insert === true) {
        this.permissionsService.addPermission('INSERT');
        loadedPermissions.push('INSERT');
      }
      if (permissions.update === true) {
        this.permissionsService.addPermission('UPDATE');
        loadedPermissions.push('UPDATE');
      }
      if (permissions.delete === true) {
        this.permissionsService.addPermission('DELETE');
        loadedPermissions.push('DELETE');
      }
  
      console.log('Permisos cargados:', loadedPermissions);
    })
  }


}
