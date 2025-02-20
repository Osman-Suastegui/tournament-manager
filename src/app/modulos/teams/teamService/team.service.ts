import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Team } from '../../tournament/interface';
import { Observable, Subject, tap } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AddPlayerToTeamForm, AddTeamForm } from '../interfaces';
import { Player } from '../../jugadores/interface';
import { url } from 'src/enviroments/environment.local';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  private newTeamSubject = new Subject<Team>();
  private newPlayer = new Subject<Player>();

  public newTeam$ = this.newTeamSubject.asObservable();
  public newPlayer$ = this.newPlayer.asObservable();

  constructor(private http: HttpClient) { }

  // THIS ENDPOINT ADD A TEAM IN A TOURNAMENT
  addTeam(team: Omit<Team, 'id'>, tournamentId: string, createdById: string): Observable<Team> {
    return this.http.post<Team>(`${url}/teams/createTeamInTournament`, {
      name: team.name,
      tournamentId,
      createdById
    }).pipe(
      tap((createdTeam: Team) => this.newTeamSubject.next(createdTeam))
    )
  }

  addPlayerToTeamInTournament(tournamentId: string, teamId: string, playerName: string): Observable<Player> {
    return this.http.post<Player>(`${url}/players/createPlayerInTournamentTeam`, {
      tournamentId,
      teamId,
      playerName
    }).pipe(tap((newPlayerRes: Player) => {
      this.newPlayer.next(newPlayerRes)
    }))
  }

  getPlayersInTournamentTeam(tournamentId: string, teamId: string): Observable<Player[]> {
    return this.http.get<Player[]>(`${url}/players/getPlayersInTournamentTeam?tournamentId=${tournamentId}&teamId=${teamId}`)
  }

  // deletePlayerFromTeamTournament
  deletePlayerFromTeamTournament(tournamentId: string, teamId: string, playerId: string): Observable<any> {
    return this.http.delete(`${url}/players/deletePlayerFromTeamTournament?tournamentId=${tournamentId}&teamId=${teamId}&playerId=${playerId}`)
  }

  createAddTeamForm(): FormGroup<AddTeamForm> {
    return new FormGroup<AddTeamForm>({
      name: new FormControl("", { validators: [Validators.required], nonNullable: true }),
      email: new FormControl("", { validators: [Validators.required], nonNullable: true }),
    });
  }


  createAddPlayerToTeamForm(): FormGroup<AddPlayerToTeamForm> {
    return new FormGroup<AddPlayerToTeamForm>({
      name: new FormControl("", { validators: [Validators.required], nonNullable: true }),
      email: new FormControl("", { nonNullable: true }),
      position: new FormControl("", { nonNullable: true }),
    });
  }

}
