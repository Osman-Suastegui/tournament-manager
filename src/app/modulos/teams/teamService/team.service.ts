import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Team } from '../../tournament/interface';
import { Observable, Subject, tap } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AddTeamForm } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  private newTeamSubject = new Subject<Team>();
  public newTeam$ = this.newTeamSubject.asObservable();
  baseUrl: string = "http://localhost:8080";

  constructor(private http: HttpClient) { }

  // THIS ENDPOINT ADD A TEAM IN A TOURNAMENT
  addTeam(team: Omit<Team, 'id'>, tournamentId: string,createdById:string): Observable<Team> {
    return this.http.post<Team>(`${this.baseUrl}/teams/createTeamInTournament`, {
      name:team.name,
      tournamentId,
      createdById
    }).pipe(
      tap((createdTeam:Team) => this.newTeamSubject.next(createdTeam) )
    )
  }

  createAddTeamForm(): FormGroup {
    return new FormGroup<AddTeamForm>({
      name: new FormControl("", { validators: [Validators.required], nonNullable: true }),
      email: new FormControl("", { validators: [Validators.required], nonNullable: true }),
    });
  }

}
