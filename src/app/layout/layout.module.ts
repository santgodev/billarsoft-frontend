import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { AngularMaterialModule } from '../angular-material.module';
import { SidenavComponent } from './sidenav/sidenav.component';


@NgModule({
  declarations: [
    SidenavComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    AngularMaterialModule
    
  ]
})
export class LayoutModule { }
