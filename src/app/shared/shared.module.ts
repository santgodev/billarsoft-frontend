import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { ReusableDialogComponent } from './reusable-dialog/reusable-dialog.component';



@NgModule({
  declarations: [
    ReusableDialogComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule
  ]
})
export class SharedModule { }
