import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AddTournamentResponse, Tournament, BasicInformationTournament, SelectTeamsTournament, Team, AdminPermissions, User, TeamForm } from "./interface";
import { Observable } from "rxjs";
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { TournamentType } from "./interface";
import { url } from "src/enviroments/environment.local";
import { TokenService } from "src/app/services/tokenService/token.service";
import { minimumTeamsValidator } from "src/app/shared/validators";
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

  createBasicInformationTournamentForm(): FormGroup<BasicInformationTournament> {
    return new FormGroup<BasicInformationTournament>({
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
      location: new FormControl<string>("", {
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

  createSelectTeamsTournamentForm(): FormGroup<SelectTeamsTournament> {
    return new FormGroup<SelectTeamsTournament>({
      teams: new FormArray<FormGroup<TeamForm>>([], { // Validators should be part of the FormArray options object
        validators: [minimumTeamsValidator(2)],
      }),
    });
  }

  createAdminPermissionsForm(): FormGroup<AdminPermissions> {
    return new FormGroup<AdminPermissions>({
      admins: new FormControl<string[]>([], {
        nonNullable: true,
        validators: [Validators.email],
      }),
    });
  }

  getContestTypeName = (type: TournamentType | null | undefined): string => {

    if(!type) return "Not specified";
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
