import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Team } from '../../interface';

@Component({
  selector: 'app-add-participant-modal',
  templateUrl: './add-participant-modal.component.html',
  styleUrls: ['./add-participant-modal.component.css']
})
export class AddParticipantModalComponent implements OnInit {
  participantForm: FormGroup<{ name: FormControl<string> }>;
  isEditMode: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<AddParticipantModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { tournamentId: string; team?: Team }
  ) {
    this.participantForm = new FormGroup({
      name: new FormControl('', { validators: [Validators.required], nonNullable: true })
    });
  }

  ngOnInit(): void {
    if (this.data.team) {
      this.isEditMode = true;
      this.participantForm.patchValue({
        name: this.data.team.name
      });
    }
  }

  onSubmit(): void {
    if (this.participantForm.valid) {
      this.dialogRef.close({
        name: this.participantForm.value.name
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}


