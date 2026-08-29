import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatTimepickerModule } from '@angular/material/timepicker';

import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';

import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ModalDialogComponent } from '../modal-dialog/modal-dialog.component';

interface DialogData {
  title: string;
  message: string;
  confirmButton: string;
  cancelButton: string;
}

@Component({
  selector: 'app-confirm-modal-dialog',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogContent,
    MatDialogActions,
    MatDialogTitle,
    MatIconModule,
    MatTimepickerModule,
    MatDatepickerModule,
  ],
  templateUrl: './confirm-modal-dialog.component.html',
  styleUrl: './confirm-modal-dialog.component.scss',
})
export class ConfirmModalDialogComponent {
  readonly dialogRef = inject(MatDialogRef<ConfirmModalDialogComponent>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);

  onSave() {
    this.dialogRef.close(this.data);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
