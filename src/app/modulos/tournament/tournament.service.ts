import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AddTournamentResponse, Tournament, TournamentForm } from "./interface";
import { Observable } from "rxjs";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { TournamentType } from "./interface";
import { url } from "src/enviroments/environment.local";
import { TokenService } from "src/app/services/tokenService/token.service";
@Injectable({
  providedIn: "root"
})
export class TournamentService {

  constructor(private http: HttpClient,
    private tokenService: TokenService
  ) { }

  public canEditCreateTournamentComponent(userId: string, tournament: Tournament): boolean {

    return tournament.users.some(user => {
      return user.id == userId && user.role === "ORGANIZER";
    });

  }

  addTournament(tournament: Tournament): Observable<AddTournamentResponse> {

    const headers = this.tokenService.createHeaders();

    return this.http.post<AddTournamentResponse>(`${url}/tournaments/createTournament`,
      tournament, { headers }
    );
  }

  getTournamentById(id: string): Observable<Tournament> {

    return this.http.get<Tournament>(`${url}/tournaments/getTournament?tournamentId=${id}`);
  }

  getTournaments(userId: string, page: number = 0, size: number = 10): Observable<Tournament[]> {
    return this.http.get<Tournament[]>(`${url}/tournaments/getTournaments?userId=${userId}&page=${page}&size=${size}`);
  }

  createTournamentForm(): FormGroup<TournamentForm> {
    return new FormGroup<TournamentForm>({
      name: new FormControl<string>("", {
        nonNullable: true,
        validators: [Validators.required, Validators.minLength(1)],
      }),
      sport: new FormControl<string>("football", {
        nonNullable: true,
        validators: [Validators.required],
      }),
      tournamentType: new FormControl<TournamentType>(TournamentType.SingleElimination, {
        nonNullable: true,
        validators: [Validators.required],
      }),
      description: new FormControl<string>("", {
        nonNullable: true,
        validators: [Validators.maxLength(500)],
      }),
      location: new FormControl<string | null>("", {
        nonNullable: true,
        validators: [Validators.maxLength(500)],
      }),
      rules: new FormControl<string>("", {
        nonNullable: false,
        validators: [Validators.maxLength(500)],
      }),
      startDate: new FormControl<string | null>(null),
      endDate: new FormControl<string | null>(null),
    });
  }

  getContestTypeName = (type: TournamentType): string => {

    if (type === TournamentType.SingleElimination) return "Single Elimination";
    if (type === TournamentType.DoubleElimination) return "Double Elimination";

    return "No Match";
  };
  getContestTypeDescription = (type: TournamentType): string => {

    if (type === TournamentType.SingleElimination) return "Teams are eliminated after a single loss";
    if (type === TournamentType.DoubleElimination) return "Teams must lose twice to be eliminated";

    return "No Match";
  }


}
