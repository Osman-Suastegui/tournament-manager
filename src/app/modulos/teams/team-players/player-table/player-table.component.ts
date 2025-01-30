import { TeamService } from './../../teamService/team.service';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-player-table',
  templateUrl: './player-table.component.html',
  styleUrls: ['./player-table.component.css']
})
export class PlayerTableComponent  {
  @Input() players: any[] = [];
  @Input() tournamentId: string = '';
  @Input() teamId: string = '';

  constructor(private teamServ:TeamService) { }

  editPlayer(player: any) {
    console.log("edit player", player);
  }
  deletePlayer(player: any) {
    this.teamServ.deletePlayerFromTeamTournament(this.tournamentId, this.teamId, player.id).subscribe({
      next: () => {
        this.players = this.players.filter(p => p.id !== player.id)
      },
      error: (err) => {
        console.log('Error deleting player:', err);
      }
    })
    console.log('Delete player:', player);
    // Logic to delete the player
  }


}
