import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  baseUrl: string = "http://localhost:8080";
  constructor(private http: HttpClient) { }

  // addTeam(team: addTeam): Observable<AddTournamentResponse> {
  //   return this.http.post<AddTournamentResponse>(`${this.baseUrl}/tournaments/createTournament`, tournament);
  // }
}
