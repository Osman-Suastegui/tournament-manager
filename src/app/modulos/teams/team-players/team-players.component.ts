import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddPlayerToTeamComponent } from '../add-player-to-team/add-player-to-team.component';
import { TeamService } from '../teamService/team.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Player } from '../../jugadores/interface';

@Component({
  selector: 'app-team-players',
  templateUrl: './team-players.component.html',
  styleUrls: ['./team-players.component.css']
})
export class TeamPlayersComponent implements OnInit {
  @Input() teamId: string = '';
  public tournamentId: string = '';
  public players:Player[] = []
  // injcet dialog
  constructor(
    private dialog: MatDialog,
    private teamServ:TeamService,
    private router:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.setListenerRoutesParams()
    this.teamServ.getPlayersInTournamentTeam(this.tournamentId,this.teamId).subscribe({
      next: (players:Player[]) => {
        this.players = players
      }
    })
  }

  openAddPlayerModal() {
    this.dialog.open(AddPlayerToTeamComponent, {
      panelClass: "add-team-dialog",
      data: { teamId: this.teamId, tournamentId: this.tournamentId }
    });
  }

  setListenerRoutesParams(){
    this.router.parent?.params.subscribe({
      next: (params) => {
        this.tournamentId = params['tournamentId']
      },
      error: (err) => {
        console.log("err",err)
      }
    })
  }

  setListenerNewPlayerAdded(){
    this.teamServ.newPlayer$.subscribe({
      next: (player:Player) => {
        this.players.push(player)
      }
    })
  }



}
