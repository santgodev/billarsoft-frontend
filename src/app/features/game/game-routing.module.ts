import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PoolComponent } from './pool/pool.component';

const routes: Routes = [
  {
    path: '', component: PoolComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GameRoutingModule { }
