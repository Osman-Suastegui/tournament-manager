import { AddTournamentResponse, AdminPermissions, BasicInformationTournament, SelectTeamsTournament } from "./../interface";
import { Component, Input, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import {  Tournament, TournamentType } from "../interface";
import { getContestTypeName } from "../utils";
import { TournamentService } from "../tournament.service";
import { ActivatedRoute, Router } from "@angular/router";
import { authService } from "src/app/services/authenticateService/auth.service";

@Component({
  selector: "app-create-tournament",
  templateUrl: "./create-tournament.component.html",
  styleUrls: ["./create-tournament.component.css"]
})
export class CreateTournamentComponent implements OnInit {

  // THIS INPUT IS USED BY THE COMPONENT TO DETERMINE IF IT IS IN EDITING MODE.
  // IF UNDEFINED, IT INDICATES A NEW TOURNAMENT; OTHERWISE, IT'S FOR EDITING.
  @Input() tournament?: Tournament;

  // PUBLIC
  tournamentTypes = Object.values(TournamentType); // Extract enum values
  public basicInformation: FormGroup<BasicInformationTournament> = this.tournamentServ.createBasicInformationTournamentForm()
  public selectTeams: FormGroup<SelectTeamsTournament> = this.tournamentServ.createSelectTeamsTournamentForm()
  public adminPermissions: FormGroup<AdminPermissions> = this.tournamentServ.createAdminPermissionsForm()

  public isReadOnly: boolean = false;
  public stepperOption: number = 4;
  // PRIVATE

  constructor(
    private tournamentServ: TournamentService,
    private route: ActivatedRoute,
    private router: Router,
    private authServ: authService
  ) { }

  ngOnInit(): void {

    this.route.parent?.data.subscribe((tournamentObj: any) => {

      const tournament: Tournament =  tournamentObj.tournament;
      if (tournament) {
        this.tournament = tournament;
      }

      if (this.isEditing()) {
        this.isReadOnly = !this.tournamentServ.canEditCreateTournamentComponent(this.authServ.getUserId(),this.tournament!);
        this.patchTournament();
      }
    });

  }

  // IF THE INPUT TOURNAMENT IT'S NOT UNDEFINED THEN IT'S EDITING
  isEditing(): boolean {
    return this.tournament !== undefined;
  }

  patchTournament(): void {
    if (!this.tournament) return;
    this.basicInformation.patchValue(this.tournament);
  }

  back(){
    if(this.stepperOption === 1) return;
    this.stepperOption--;
  }

  continue(){
    // Basic information Component step 1
    if(this.stepperOption === 1 && this.basicInformation.invalid){
      this.basicInformation.markAllAsTouched();
      return;
    }
    // Select teams Component step 2
    if(this.stepperOption === 2 && this.selectTeams.invalid){
      this.selectTeams.markAllAsTouched();
      return;
    }
    // Admin permissions Component step 3
    if(this.stepperOption === 3 && this.adminPermissions.invalid){
      // print whats invalid
      console.log(this.adminPermissions.errors);
      this.adminPermissions.markAllAsTouched();
      return;
    }

    this.stepperOption++;

  }

  onSubmit(): void {

    console.log("New tournament:");

    const newTournament: Tournament = this.basicInformation.value as Tournament

    if (this.isEditing()) {
      this.editTournament();
    } else {
      this.addTournament(newTournament);
    }

  }

  addTournament(tournament: Tournament): void {
    console.log("Adding tournament:", tournament);
    this.tournamentServ.addTournament(tournament).subscribe({
      next: (response: AddTournamentResponse) => {
        console.log("Response:", response);
        const { tournament } = response;
        this.router.navigate(["/tournament", tournament.id]);
      },
      error: ({ error }) => {
        console.error("Error adding tournament:", error);
      }
    });
  }

  get name() {
    return this.basicInformation.get("name")!;
  }

  getTournamentTypeName(tournamentType: TournamentType) {
    return getContestTypeName(tournamentType);
  }
  getStepperOption($event: Event) {
    console.log($event);
  }

  editTournament() {
    console.log("editing tournament");

  }

}
