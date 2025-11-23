import { TeamsModule } from './../../teams/teams.module';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Team, Tournament, emptyTournament } from '../interface';
import { TeamService } from '../../teams/teamService/team.service';
import { TemporadasService } from '../../admin-ligas/adminLigasService/temporadas.service';
import { authService } from '../../../services/authenticateService/auth.service';
import { AddParticipantModalComponent } from './add-participant-modal/add-participant-modal.component';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-participants',
  templateUrl: './participants.component.html',
  styleUrls: ['./participants.component.css']
})
export class ParticipantsComponent implements OnInit {
  tournament: Tournament = emptyTournament;
  participants: Team[] = [];

  constructor(
    private activateRoute: ActivatedRoute,
    private teamService: TeamService,
    private temporadasService: TemporadasService,
    private authService: authService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getTournamentFromParent();
  }

  getTournamentFromParent(): void {
    this.activateRoute.parent?.data.subscribe(data => {
      this.tournament = data['tournament'];
      this.participants = this.tournament.teams || [];
      console.log("Tournament Data in Participants:", this.tournament);
    });
  }

  openAddParticipantModal(): void {
    const dialogRef = this.dialog.open(AddParticipantModalComponent, {
      width: '400px',
      position: {
        bottom: '20px',
        right: '20px'
      },
      panelClass: 'add-participant-modal',
      backdropClass: 'no-backdrop',
      data: {
        tournamentId: this.tournament.id
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.name) {
        this.addParticipant(result.name);
      }
    });
  }

  editParticipant(team: Team): void {
    const dialogRef = this.dialog.open(AddParticipantModalComponent, {
      width: '400px',
      position: {
        bottom: '20px',
        right: '20px'
      },
      panelClass: 'add-participant-modal',
      backdropClass: 'no-backdrop',
      data: {
        tournamentId: this.tournament.id,
        team: team
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.name) {
        this.updateParticipant(team.id, result.name);
      }
    });
  }

  removeParticipant(team: Team): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: {
        title: 'Remove Participant',
        message: `Are you sure you want to remove "${team.name}" from this tournament?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteParticipant(team.id);
      }
    });
  }

  addParticipant(name: string): void {
    const userId = this.authService.getUserId();
    this.teamService.addTeam({ name }, this.tournament.id, userId).subscribe({
      next: (newTeam: Team) => {
        // Map the response to Team format (id might be string or number)
        const participant: Team = {
          id: String(newTeam.id),
          name: newTeam.name,
          leaderEmail: newTeam.leaderEmail
        };
        this.participants.push(participant);
        this.showSnackBar('Participant added successfully!', 'Close');
      },
      error: (error) => {
        console.error('Error adding participant:', error);
        this.showSnackBar('Error adding participant. Please try again.', 'Close');
      }
    });
  }

  updateParticipant(teamId: string, name: string): void {
    this.teamService.updateTeam(teamId, name, this.tournament.id).subscribe({
      next: (updatedTeam: { id: string; name: string }) => {
        const index = this.participants.findIndex(p => p.id === teamId);
        if (index !== -1) {
          this.participants[index] = updatedTeam;
        }
        this.showSnackBar('Participant updated successfully!', 'Close');
      },
      error: (error) => {
        console.error('Error updating participant:', error);
        this.showSnackBar('Error updating participant. Please try again.', 'Close');
      }
    });
  }

  deleteParticipant(teamId: string): void {
    this.teamService.deleteParticipant(teamId, this.tournament.id).subscribe({
      next: () => {
        this.participants = this.participants.filter(p => p.id !== teamId);
        this.showSnackBar('Participant removed successfully!', 'Close');
      },
      error: (error) => {
        console.error('Error removing participant:', error);
        this.showSnackBar('Error removing participant. Please try again.', 'Close');
      }
    });
  }

  showSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
    });
  }
}
