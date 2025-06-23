import { Component, Inject, Input, OnInit, Optional } from '@angular/core';
import { BasicInformationTournament } from '../../interface';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TournamentService } from '../../tournament.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-create-tournament-basic-information',
  templateUrl: './create-tournament-basic-information.component.html',
  styleUrls: ['./create-tournament-basic-information.component.css']
})
export class CreateTournamentBasicInformationComponent implements OnInit {
  @Input() basicInformation!: FormGroup<BasicInformationTournament>;
  options = [
    { label: "Soccer", value: "football" },
    { label: "Basket", value: "Basketball" },
  ]

  constructor(
    private tournamentServ: TournamentService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data?: FormGroup<BasicInformationTournament>,
    @Optional() private dialogRef?: MatDialogRef<CreateTournamentBasicInformationComponent>,
  ) { }

  ngOnInit(): void {
    if (this.data?.value) {
      this.basicInformation = this.data;
    }
  }

  onSubmit(): void {
    if (!this.basicInformation.valid) {
      console.error('Form is invalid');
      return
    }
    this.editTournament();
  }

  editTournament(): void {
    this.tournamentServ.editTournament(this.basicInformation.value).subscribe({
      next: (data) => {
        console.log('Tournament updated successfully:', data);
        this.dialogRef?.close(this.basicInformation.value)
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error updating tournament:', error);
      }
    });
  }

}
