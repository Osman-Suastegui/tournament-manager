import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AddTournament, AddTournamentResponse, Tournament } from "./interface";
import { Observable } from "rxjs";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { TournamentType } from "./interface";
import { url } from "src/enviroments/environment.local";
@Injectable({
  providedIn: "root"
})
export class TournamentService {

  constructor(private http: HttpClient) { }

  public canEditCreateTournamentComponent(userId: string, tournament: Tournament): boolean {

    return tournament.users.some(user => {
      return user.id == userId && user.role === 'ORGANIZER'
    })

  }

  addTournament(tournament: AddTournament): Observable<AddTournamentResponse> {
    return this.http.post<AddTournamentResponse>(`${url}/tournaments/createTournament`, tournament);
  }

  getTournamentById(id: string): Observable<Tournament> {

    return this.http.get<Tournament>(`${url}/tournaments/getTournament?tournamentId=${id}`);
  }

  getTournaments(userId: string, page: number = 0, size: number = 10):Observable<Tournament[]> {
    return this.http.get<Tournament[]>(`${url}/tournaments/getTournaments?userId=${userId}&page=${page}&size=${size}`);
  }

  createTournamentForm(): FormGroup {
    return new FormGroup({
      name: new FormControl<string>("", [
        Validators.required,
        Validators.minLength(1)
      ]),
      sport: new FormControl('football', [
        Validators.required
      ]),
      tournamentType: new FormControl<TournamentType>(TournamentType.SingleElimination, [
        Validators.required // Reglas obligatorias
      ]),
      description: new FormControl<string>('', [
        Validators.maxLength(500)
      ]),
      rules: new FormControl('', [
        Validators.maxLength(500)
      ]),
      startDate: new FormControl('', [
      ]),
      endDate: new FormControl('', [
      ]),
    });
  }

}
