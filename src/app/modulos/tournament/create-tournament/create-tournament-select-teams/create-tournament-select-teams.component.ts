import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SelectTeamsTournament } from '../../interface';
import { MatDialog } from '@angular/material/dialog';
import { AddTeamComponent } from 'src/app/modulos/teams/add-team/add-team.component';

@Component({
  selector: 'app-create-tournament-select-teams',
  templateUrl: './create-tournament-select-teams.component.html',
  styleUrls: ['./create-tournament-select-teams.component.css']
})
export class CreateTournamentSelectTeamsComponent {
  @Input() selectTeams!: FormGroup<SelectTeamsTournament>;
  search: FormControl<string | null> = new FormControl("");

  constructor(public dialog: MatDialog) {}

  addTeam() {
    this.dialog.open(AddTeamComponent,{
      autoFocus:false
    })
  }

}

