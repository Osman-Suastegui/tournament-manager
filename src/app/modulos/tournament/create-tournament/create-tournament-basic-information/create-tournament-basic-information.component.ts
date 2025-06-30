import { Component, Inject, Input, OnInit, Optional } from '@angular/core';
import { BasicInformationTournament } from '../../interface';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TournamentService } from '../../tournament.service';
import { HttpErrorResponse } from '@angular/common/http';
import { DateTimeService } from 'src/app/shared/services/date-time.service';

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
    private dateTimeService:DateTimeService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data?: FormGroup<BasicInformationTournament>,
    @Optional() private dialogRef?: MatDialogRef<CreateTournamentBasicInformationComponent>,
  ) { }

  ngOnInit(): void {
    if (this.data?.value) {
      this.basicInformation = this.data;
    }
  }

  onSubmit(): void {
    console.log('Form submitted:', this.basicInformation.value);
    if (!this.basicInformation.valid) {
      console.error('Form is invalid');
      return
    }

    const payload = {
      ...this.basicInformation.value,
      startDate: this.basicInformation.value.startDate ? this.dateTimeService.addCurrentTimeAndToUtc(this.basicInformation.value.startDate) : null,
      endDate: this.basicInformation.value.endDate ? this.dateTimeService.addCurrentTimeAndToUtc(this.basicInformation.value.endDate) : null,
    }
    this.editTournament(payload);
  }

  editTournament(payload: any): void {
    this.tournamentServ.editTournament(payload).subscribe({
      next: (data) => {
        console.log('Tournament updated successfully:', data);
        this.dialogRef?.close(payload)
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error updating tournament:', error);
      }
    });
  }

}
