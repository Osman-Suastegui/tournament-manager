import { TournamentType } from './../modulos/tournament/interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Match } from '../modulos/tree-diagrams/single-elimination-tree/test';
import { Observable } from 'rxjs';
import { url } from 'src/enviroments/environment.local';
@Injectable({
  providedIn: 'root'
})
export class MatchService {

  constructor(private http: HttpClient) { }

  getMatches(tournamentId: string): Observable<Match[]> {
    return this.http.get<Match[]>(`${url}/Partido/matches?tournamentId=${tournamentId}`);
  }

  generateMatches(tournamentId: string, tournamentType: TournamentType): Observable<Object> {
    return this.http.post<Object[]>(`${url}/Partido/generateMatches`, { tournamentId, tournamentType });
  }
}
