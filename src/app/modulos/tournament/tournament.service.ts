import { HttpClient, HttpErrorResponse } from "@angular/common/http";
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

  addTournament(tournament: Tournament): Observable<AddTournamentResponse> {

    const headers = this.tokenService.createHeaders();

    return this.http.post<AddTournamentResponse>(`${url}/tournaments/createTournament`,
      tournament, { headers }
    );
  }

  getTournamentById(id: string): Observable<Tournament> {

    return this.http.get<Tournament>(`${url}/${this.model}/getTournamentById?id=${id}`);
  }

  getTournaments(search: string, limit: number = 20, skip: number = 0): Observable<Tournament[]> {
    return this.http.get<Tournament[]>(`${url}/Tournament/?search=${search}&limit=${limit}&skip=${skip}`);
  }

  createBasicInformationTournamentForm(): FormGroup<BasicInformationTournament> {
    return new FormGroup<BasicInformationTournament>({
      id: new FormControl<string | undefined>("", {
        nonNullable: true,
        validators: [Validators.required],
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
      startDate: new FormControl<string | null>(null),
      endDate: new FormControl<string | null>(null),
    });
  }

  patchBasicInformationTournamentForm(data: any): FormGroup<BasicInformationTournament> {
    const form = this.createBasicInformationTournamentForm();
    form.patchValue({
      id: data.id,
      name: data.name,
      sport: data.sport,
      tournamentType: data.tournamentType,
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
    return this.http.put<Tournament>(`${url}/${this.model}/editTournament`, tournament)
  }


}
