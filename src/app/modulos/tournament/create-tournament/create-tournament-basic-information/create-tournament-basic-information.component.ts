import { Component, Input } from '@angular/core';
import { BasicInformationTournament } from '../../interface';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-tournament-basic-information',
  templateUrl: './create-tournament-basic-information.component.html',
  styleUrls: ['./create-tournament-basic-information.component.css']
})
export class CreateTournamentBasicInformationComponent {
  @Input() basicInformation!: FormGroup<BasicInformationTournament>;
  options = [
    { label: "Soccer", value: "football" },
    { label: "Basket", value: "Basketball" },
  ]
}
