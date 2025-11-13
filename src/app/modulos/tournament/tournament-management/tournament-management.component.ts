import { TeamService } from "./../../teams/teamService/team.service";
import { Component, inject, Input, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { Referee } from "../../admin-ligas/temporada-caracteriticas/interfaces";
import { emptyTournament, Team, Tournament } from "../interface";
import { MatDialog } from "@angular/material/dialog";
import { TournamentService } from "../tournament.service";
import { CreateTournamentBasicInformationModalComponent } from "../create-tournament/create-tournament-basic-information/create-tournament-basic-information-modal/create-tournament-basic-information-modal.component";
import { ConfirmationDialogComponent } from "../confirmation-dialog/confirmation-dialog.component";
import { MatSnackBar } from "@angular/material/snack-bar";

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
  public tournamentStatus: 'Upcoming' | 'Ongoing' | "Completed" = 'Upcoming';
  // PRIVATE

  constructor(
    private dialog: MatDialog,
    private tournamentServ: TournamentService,
    private snackBar: MatSnackBar
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    if(changes["tournament"]){
      this.setTournamentStatus();
    }
  }

  ngOnInit(): void {
    console.log("Tournament Management Component Initialized", this.tournament);
    this.setTournamentStatus();
    this.setListeners();
  }

  setTournamentStatus(): void {
    if (this.tournament && this.tournament.startDate && this.tournament.endDate) {
      const now = new Date();
      const start = new Date(this.tournament.startDate);
      const end = new Date(this.tournament.endDate);

      if (now < start) {
        this.tournamentStatus = 'Ongoing';
      } else if (now >= start && now <= end) {
        this.tournamentStatus = 'Ongoing';
      } else {
        this.tournamentStatus = 'Ongoing';
      }
    }
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
    console.log("Opening Edit Tournament Modal", this.tournament);
    this.dialog.open(CreateTournamentBasicInformationModalComponent,{
      width: '800px',
      panelClass: 'custom-dialog-edit-tournament',
      data: {
        ...this.tournamentServ.patchBasicInformationTournamentForm(this.tournament),
      }
    })
  }

  openStartTournamentDialog() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: {
        title: 'Start Tournament',
        message: 'Are you sure you want to start this tournament?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.startTournament();
      }
    });
  }

  startTournament() {
    this.tournamentServ.startTournament(this.tournament.id).subscribe({
      next: (tournament) => {
        this.tournament = tournament;
        this.showSnackBar('Tournament started successfully!', 'Close');
      },
      error: (error) => {
        const errorMessage = 'Error starting tournament. Please try again.';
        this.showSnackBar(errorMessage, 'Close');
      }
    });
  }

  showSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
    });
  }

  onTabClick(arg0: string) {

  }


}
