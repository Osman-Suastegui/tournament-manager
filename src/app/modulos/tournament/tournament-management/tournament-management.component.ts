import { Component, OnInit } from "@angular/core";
import { TemporadasService } from "../../admin-ligas/adminLigasService/temporadas.service";
import { LigasServiceService } from "../../admin-ligas/adminLigasService/ligas-service.service";
import { Referee, Team } from "../../admin-ligas/temporada-caracteriticas/interfaces";
import { ActivatedRoute } from "@angular/router";
import { TournamentService } from "../tournament.service";
import { Tournament } from "../interface";

@Component({
  selector: "app-tournament-management",
  templateUrl: "./tournament-management.component.html",
  styleUrls: ["./tournament-management.component.css"]
})
export class TournamentManagementComponent implements OnInit {

  constructor(
    private tempService: TemporadasService,
    private ligaService: LigasServiceService,
    private route: ActivatedRoute,
    private tournamentServ: TournamentService
  ) { }

  // PUBLIC
  public teams: Team[] = [];
  public referees: Referee[] = [];
  public organizers: string[] = [];
  public tournamentId: string = "";
  // PRIVATE
  ngOnInit(): void {
    const params = this.route.snapshot.params;
    this.tournamentId = params["tournamentId"];
    localStorage.setItem("idTemporada", this.tournamentId.toString());
    this.initializeTournament(this.tournamentId);
  }

  initializeTournament(tournamentId: string) {
    console.log("tournamentId => ", tournamentId);
    this.tournamentServ.getTournamentById(tournamentId).subscribe({
      next: (tournament: Tournament) => this.organizers = this.filterOrganizers(tournament),
      error: ({ error }) => console.log("error getting tournament", error)
    });
    this.setListeners();
  }

  filterOrganizers(tournament: Tournament): string[] {
    return tournament.users.filter(user => user.role === "ORGANIZER").map(user => user.name + " " + user.lastName);
  }

  getOrganizers(ligaId: number) {
    this.ligaService.obtenerAdminsDeLiga(ligaId).subscribe({
      next: (organizers) => {
        this.organizers = organizers;
      }
    });
  }

  getTeams(seasonId: number) {
    this.tempService.obtenerEquiposTemporada(seasonId).subscribe({
      next: (teams) => {
        this.teams = Object.keys(teams).map(key => ({ nombreEquipo: key, equipo: teams[key] }));
      }
    });
  }

  getReferees(seasonId: number) {
    this.tempService.obtenerArbitros(seasonId).subscribe({
      next: (referees) => {
        this.referees = referees;
      }
    });
  }

  setListeners() {
    // this.tempService.onNuevoEquipoAsignado().subscribe(() => {
    //   this.getTeams(this.tournamentId);
    // });

    // this.tempService.onNuevoArbitroAsignado().subscribe(() => {
    //   this.getReferees(this.tournamentId);
    // });
  }

}
