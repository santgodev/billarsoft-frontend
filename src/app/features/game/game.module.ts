import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameRoutingModule } from './game-routing.module';
import { AngularMaterialModule } from '../../angular-material.module';
import { PoolComponent } from './pool/pool.component';


@NgModule({
  declarations: [
    PoolComponent
  ],
  imports: [
    CommonModule,
    GameRoutingModule,
    AngularMaterialModule
  ]
})
export class GameModule { }
