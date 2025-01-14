import { Referee } from "./../../admin-ligas/temporada-caracteriticas/interfaces";
import { TemporadasService } from "./../../admin-ligas/adminLigasService/temporadas.service";
import { AddTeamComponent } from "../../teams/add-team/add-team.component";
import { AsignarArbitroComponent } from "./../../admin-ligas/asignar-arbitro/asignar-arbitro.component";
import { Component, inject, Input } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Team } from "../interface";
import { LinkService } from "src/app/services/linkService/link.service";

@Component({
  selector: "app-side-nav-contest-management",
  templateUrl: "./side-nav-contest-management.component.html",
  styleUrls: ["./side-nav-contest-management.component.css"]
})
export class SideNavContestManagementComponent {

  constructor(
          private dialog: MatDialog,
          private tempService: TemporadasService,
          private LinkService:LinkService
        ) { }

  @Input() teams: Team[] = [];
  @Input() referees: Referee[] = [];
  @Input() tournamentId: string = "";
  @Input() organizers: string[] = [];

  addTeam($event: Event): void {
    this.dialog.open(AddTeamComponent, {
      panelClass: "add-team-dialog",
      data: { tournamentId: this.tournamentId }
    });
    $event.stopPropagation();
  }

  removeTeam($event: Event, seasonId: string, teamToRemove: string) {
    // eliminarEquipoTemp(idTemporada: number, nombreEquipo: string) {
    this.tempService.eliminarEquipoDeTemporada(seasonId, teamToRemove).subscribe({
      next: () => {
        this.teams = this.teams.filter(team => team.name !== teamToRemove);
      },
      error: (e) => {
        alert(e);
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

  copyLink($event:Event,teamId:string,tournamentId:string){
    this.LinkService.getLink(teamId,tournamentId).subscribe({
      next:(link:string) => console.log("link",link)
    })
    $event.stopPropagation()
  }

}
