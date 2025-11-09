import { Component, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BasicInformationTournament } from '../../../interface';
import { CreateTournamentBasicInformationComponent } from '../create-tournament-basic-information.component';

@Component({
  selector: 'app-create-tournament-basic-information-modal',
  templateUrl: './create-tournament-basic-information-modal.component.html',
})
export class CreateTournamentBasicInformationModalComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: FormGroup<BasicInformationTournament>,
  ){
  }
}
