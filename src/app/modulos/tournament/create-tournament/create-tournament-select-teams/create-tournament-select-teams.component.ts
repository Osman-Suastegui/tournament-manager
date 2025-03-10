import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { SelectTeamsTournament, Team } from "../../interface";
import { MatDialog } from "@angular/material/dialog";
import { AddTeamComponent } from "src/app/modulos/teams/add-team/add-team.component";
import { TeamService } from "src/app/modulos/teams/teamService/team.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-create-tournament-select-teams",
  templateUrl: "./create-tournament-select-teams.component.html",
  styleUrls: ["./create-tournament-select-teams.component.css"]
})
export class CreateTournamentSelectTeamsComponent implements OnInit, OnDestroy {
  
  @Input() selectTeams!: FormGroup<SelectTeamsTournament>;
  search: FormControl<string | null> = new FormControl("");
  teams: Team[] = [];
  teamSubscription: Subscription = new Subscription();

  constructor(public dialog: MatDialog, private teamServ: TeamService) { }

  ngOnInit(): void {
    this.listenNewTeams();

  }

  listenNewTeams() {
    this.teamSubscription = this.teamServ.newTeam$.subscribe((newTeam: Team) => {
      this.selectTeams.patchValue({
        teams: [...(this.selectTeams.value.teams || []), newTeam]
      });
      this.teams = this.selectTeams.value.teams || [];
    }
    );
  }

  addTeam() {
    // print control select teams errors
    console.log(this.selectTeams.get("teams")?.errors);
    this.dialog.open(AddTeamComponent, {
      autoFocus: false,
      panelClass: "add-team-dialog",
      backdropClass: "custom-dark-backdrop"
    });
  }

  tagsChange(teams: Team[]) {
    this.teams = teams;
    this.selectTeams.patchValue({ teams });
  }

  displayTag(team: Team) {
    return team.name;
  }

  ngOnDestroy(): void {
    this.teamSubscription.unsubscribe();
  }

}

