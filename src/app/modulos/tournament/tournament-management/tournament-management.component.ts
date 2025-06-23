import { TeamService } from "./../../teams/teamService/team.service";
import { Component, inject, Input, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { Referee } from "../../admin-ligas/temporada-caracteriticas/interfaces";
import { BasicInformationTournament, emptyTournament, Team, Tournament, User } from "../interface";
import { MatDialog } from "@angular/material/dialog";
import { CreateTournamentBasicInformationComponent } from "../create-tournament/create-tournament-basic-information/create-tournament-basic-information.component";
import { FormGroup } from "@angular/forms";
import { TournamentService } from "../tournament.service";

@Component({
  selector: "app-tournament-management",
  templateUrl: "./tournament-management.component.html",
  styleUrls: ["./tournament-management.component.css"]
})
export class TournamentManagementComponent implements OnInit,OnChanges {
  private teamServ = inject(TeamService);

  public isOpen: boolean = false;

  // PUBLIC
  public teams: Team[] = [];
  public referees: Referee[] = [];
  public organizers: string[] = [];
  @Input() tournament: Tournament = emptyTournament;
  // PRIVATE

  constructor(private dialog:MatDialog,private tournamentServ:TournamentService){}
  ngOnChanges(changes: SimpleChanges): void {
  //   if(changes["tournament"]){
  //     this.updateTournamentUI(this.tournament);
  //   }
  }

  ngOnInit(): void {
    console.log("Tournament Management Component Initialized", this.tournament);
    // this.updateTournamentUI(this.tournament);
    this.setListeners();
  }

  // private updateTournamentUI(tournament: Tournament) {
  //   this.organizers = this.filterOrganizers(tournament);
  //   this.referees = this.filterReferees(tournament);
  //   this.teams = tournament.teams;
  // }

  // private filterOrganizers(tournament: Tournament): string[] {
  //   return tournament.users.filter(user => user.role === "ORGANIZER").map(user => user.name + " " + user.lastName);
  // }

  // private filterReferees(tournament: Tournament): Referee[] {
  //   return tournament.users.filter(user => user.role === "REFEREE").map((user: User) => user as Referee);
  // }

  toggleSideNav() {
    this.isOpen = !this.isOpen;
  }

  // getTeams(seasonId: number) {
  //   this.tempService.obtenerEquiposTemporada(seasonId).subscribe({
  //     next: (teams) => {
  //       this.teams = Object.keys(teams).map(key => ({ nombreEquipo: key, equipo: teams[key] }));
  //     }
  //   });
  // }

  // getReferees(seasonId: number) {
  //   this.tempService.obtenerArbitros(seasonId).subscribe({
  //     next: (referees) => {
  //       this.referees = referees;
  //     }
  //   });
  // }

  setListeners() {
    this.teamServ.newTeam$.subscribe({
      next:(newTeam: Team) => this.teams.push(newTeam)
    });
    // this.tempService.onNuevoEquipoAsignado().subscribe(() => {
    //   this.getTeams(this.tournamentId);
    // });

    // this.tempService.onNuevoArbitroAsignado().subscribe(() => {
    //   this.getReferees(this.tournamentId);
    // });
  }

  openEditTournamentModal() {

    this.dialog.open(CreateTournamentBasicInformationComponent,{
      width: '800px',
      panelClass: 'custom-dialog-edit-tournament',
      data: this.tournamentServ.patchBasicInformationTournamentForm(this.tournament)
    })
  }


}
