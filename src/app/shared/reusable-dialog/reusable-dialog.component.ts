import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ICustomDialog } from '../../core/interfaces/shared/icustom-dialog';

@Component({
  selector: 'app-reusable-dialog',
  templateUrl: './reusable-dialog.component.html',
  styleUrl: './reusable-dialog.component.css'
})
export class ReusableDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA)public data :ICustomDialog){}

}
