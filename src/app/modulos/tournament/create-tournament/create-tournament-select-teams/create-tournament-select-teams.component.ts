import { Component, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { SelectTeamsTournament, Team } from "../../interface";
import { MatDialog } from "@angular/material/dialog";
import { AddTeamComponent } from "src/app/modulos/teams/add-team/add-team.component";
import { TeamService } from "src/app/modulos/teams/teamService/team.service";

@Component({
  selector: "app-create-tournament-select-teams",
  templateUrl: "./create-tournament-select-teams.component.html",
  styleUrls: ["./create-tournament-select-teams.component.css"]
})
export class CreateTournamentSelectTeamsComponent implements OnInit {
  @Input() selectTeams!: FormGroup<SelectTeamsTournament>;
  search: FormControl<string | null> = new FormControl("");

  constructor(public dialog: MatDialog, private teamServ: TeamService) { }

  ngOnInit(): void {
    this.teamServ.newTeam$.subscribe((newTeam: Team) => {
      this.selectTeams.value.teams?.push(newTeam);
    }
    );
  }

  addTeam() {
    this.dialog.open(AddTeamComponent, {
      autoFocus: false,
      panelClass: "add-team-dialog",
      backdropClass: "custom-dark-backdrop"
    });
  }

  removeTeam(team: Team) {

    this.selectTeams.get("teams")?.setValue(this.selectTeams.value.teams?.filter(t => {
      if (team.id) return t.id !== team.id;
      return t.name !== team.name;
    }) || []);

  }

}

