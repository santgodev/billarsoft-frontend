import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SidenavComponent } from './sidenav/sidenav.component';

const routes: Routes = [
  {
    path:'', component:SidenavComponent,
    children: [
      {
        path: '', loadChildren: () => import('../features/game/game.module').then(m => m.GameModule)
      },
      {
        path:'user-managment', loadChildren: () => import('../features/user-management/user-management.module').then(m=>m.UserManagementModule)
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
