import { Referee } from "./../../admin-ligas/temporada-caracteriticas/interfaces";
import { TemporadasService } from "./../../admin-ligas/adminLigasService/temporadas.service";
import { AddTeamComponent } from "../../teams/add-team/add-team.component";
import { AsignarArbitroComponent } from "./../../admin-ligas/asignar-arbitro/asignar-arbitro.component";
import { Component, Input } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Team } from "../interface";
import { LinkService } from "src/app/services/linkService/link.service";
import { AddPlayersToTeamLinkComponent } from "../../teams/add-players-to-team-link/add-players-to-team-link.component";
import { Router } from "@angular/router";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: "app-side-nav-contest-management",
  templateUrl: "./side-nav-contest-management.component.html",
  styleUrls: ["./side-nav-contest-management.component.css"]
})
export class SideNavContestManagementComponent {

  constructor(
    private dialog: MatDialog,
    private tempService: TemporadasService,
    private LinkService: LinkService,
    private router: Router
  ) { }

  @Input() teams: Team[] = [];
  @Input() referees: Referee[] = [];
  @Input() tournamentId: string = "";
  @Input() organizers: string[] = [];
  @Input() mode: "push" | "over" | "side" = "push";
  @Input() isOpen: boolean = false;

  addTeam($event: Event): void {
    this.dialog.open(AddTeamComponent, {
      panelClass: "add-team-dialog",
      data: { tournamentId: this.tournamentId }
    });
    $event.stopPropagation();
  }

  removeTeam($event: Event, tournamentId: string, teamId: string) {
    console.log("tournamentId",tournamentId);
    console.log("teamId",teamId);

    this.tempService.deleteTeamInTournament(tournamentId, teamId).subscribe({
      next: () => {
        this.teams = this.teams.filter(team => team.id !== teamId);
      },
      error: (e: HttpErrorResponse) => {
        if(e.status === 404){
          console.log(e);
        }else{
          alert(e);
        }
      }
    });
    $event.stopPropagation();
  }

  addReferee($event: Event) {
    this.dialog.open(AsignarArbitroComponent, {
      width: "250px",
    });
    $event.stopPropagation();
  }

  removeReferee($event: Event, seasonId: string, username: string) {
    this.tempService.eliminarArbitroDeTemporada(seasonId, username).subscribe({
      next: () => {
        this.tempService.emitNuevoArbitroAsignado();
      },
      error: (e) => {
        alert(e);
      }
    });
    $event.stopPropagation();
  }

  showPlayersTeam($event: MouseEvent,teamId: string) {
    console.log("teamId", teamId);
      this.router.navigate([`tournament/${this.tournamentId}/team/${teamId}`]);
  }

  copyLink($event: Event, teamId: string, tournamentId: string) {
    this.dialog.open(AddPlayersToTeamLinkComponent, {
      panelClass: "add-team-dialog",
      data: { teamId, tournamentId }
    });

    $event.stopPropagation();
  }

}
