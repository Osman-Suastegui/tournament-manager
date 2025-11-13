import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {  Tournament, BasicInformationTournament, SelectTeamsTournament, AdminPermissions, TeamForm } from "./interface";
import { Observable } from "rxjs";
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { TournamentType } from "./interface";
import { url } from "src/enviroments/environment.local";
import { TokenService } from "src/app/services/tokenService/token.service";
@Injectable({
  providedIn: "root"
})
export class TournamentService {

  private model: string = "Tournament";
  constructor(private http: HttpClient,
    private tokenService: TokenService
  ) { }

  public canEditCreateTournamentComponent(userId: string, tournament: Tournament): boolean {

    // return tournament.users.some(user => {
    //   return user.id == userId && user.role === "ORGANIZER";
    // });
    return true;

  }

  addTournament(tournament: Tournament): Observable<Tournament> {

    const headers = this.tokenService.createHeaders();

    return this.http.post<Tournament>(`${url}/${this.model}`,
      tournament, { headers }
    );
  }

  getTournamentById(id: string): Observable<Tournament> {

    return this.http.get<Tournament>(`${url}/${this.model}/getTournamentById?id=${id}`);
  }

  getTournaments(filters: { limit?: number; skip?: number; q?: string,status?:string } = {}): Observable<Tournament[]> {
    const { limit = 20, skip = 0, q = '',status = '' } = filters;
    const params = new URLSearchParams({
      limit: limit.toString(),
      skip: skip.toString(),
      q: q,
      status:status
    });
    return this.http.get<Tournament[]>(`${url}/Tournament/?${params.toString()}`);
  }

  createBasicInformationTournamentForm(): FormGroup<BasicInformationTournament> {
    return new FormGroup<BasicInformationTournament>({
      id: new FormControl<string | undefined >(undefined,{
       nonNullable: true
      }),
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
      startDate: new FormControl<string | null>(null,[Validators.required]),
      endDate: new FormControl<string | null>(null,[Validators.required]),
    });
  }

  patchBasicInformationTournamentForm(data: any): FormGroup<BasicInformationTournament> {
    const form = this.createBasicInformationTournamentForm();
    form.patchValue({
      id: data.id,
      name: data.name,
      sport: data.sport,
      tournamentType: TournamentType.SingleElimination,
      description: data.description,
      location: data.location,
      rules: data.rules,
      startDate: data.startDate ? new Date(data.startDate).toISOString().split('T')[0] : null,
      endDate: data.endDate ? new Date(data.endDate).toISOString().split('T')[0] : null
    });
    return form;
  }

  createSelectTeamsTournamentForm(): FormGroup<SelectTeamsTournament> {
    return new FormGroup<SelectTeamsTournament>({
      teams: new FormArray<FormGroup<TeamForm>>([]),
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

    if (!type) return "Not specified";
    if (type === TournamentType.SingleElimination) return "Single Elimination";
    if (type === TournamentType.DoubleElimination) return "Double Elimination";

    return "No Match";
  };

  getContestTypeDescription = (type: TournamentType): string => {

    if (type === TournamentType.SingleElimination) return "Teams are eliminated after a single loss";
    if (type === TournamentType.DoubleElimination) return "Teams must lose twice to be eliminated";

    return "No Match";
  }

  editTournament(tournament: any):Observable<Tournament> {
    // const headers = this.tokenService.createHeaders();
    return this.http.put<Tournament>(`${url}/${this.model}/editTournament`, tournament)
  }

  startTournament(tournamentId: string): Observable<Tournament> {
    return this.http.post<Tournament>(`${url}/${this.model}/${tournamentId}/start`, {})
  }

}
