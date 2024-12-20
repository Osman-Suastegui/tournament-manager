import { Component, OnInit } from "@angular/core";
import { TemporadasService } from "../../admin-ligas/adminLigasService/temporadas.service";
import { LigasServiceService } from "../../admin-ligas/adminLigasService/ligas-service.service";
import { Referee, Team } from "../../admin-ligas/temporada-caracteriticas/interfaces";
import { ActivatedRoute, Params } from "@angular/router";

@Component({
  selector: "app-tournament-management",
  templateUrl: "./tournament-management.component.html",
  styleUrls: ["./tournament-management.component.css"]
})
export class TournamentManagementComponent implements OnInit {
  constructor(private tempService: TemporadasService, private ligaService: LigasServiceService, private route: ActivatedRoute) { }
  // PUBLIC
  public teams: Team[] = [];
  public referees: Referee[] = [];
  public organizers: any[] = [];
  public seasonId: number = 0;
  // PRIVATE
  ngOnInit(): void {
    const params = this.route.snapshot.params;
    this.seasonId = +params["idTemporada"];
    localStorage.setItem("idTemporada", this.seasonId.toString());
    const ligaId: number = +params["idLiga"];
    this.initializeContest(ligaId, this.seasonId);
  }

  initializeContest(ligaid: number, seasonId: number) {
    this.getReferees(seasonId);
    this.getTeams(seasonId);
    this.getOrganizers(ligaid);
    this.setListeners();
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
    this.tempService.onNuevoEquipoAsignado().subscribe(() => {
      this.getTeams(this.seasonId);
    });

    this.tempService.onNuevoArbitroAsignado().subscribe(() => {
      this.getReferees(this.seasonId);
    });
  }

}
