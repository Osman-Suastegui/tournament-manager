import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Tournament, TournamentType } from "../interface";
import { CreateTournamentService } from "./create-tournament.service";
import { getContestTypeName } from "../utils";
import { TournamentService } from "../tournament.service";

@Component({
  selector: "app-create-tournament",
  templateUrl: "./create-tournament.component.html",
  styleUrls: ["./create-tournament.component.css"]
})
export class CreateTournamentComponent implements OnInit {

  contestTypes = Object.values(TournamentType); // Extract enum values
  public createTournament!: FormGroup;


  constructor(private createTournamentServ: CreateTournamentService,private tournamentServ:TournamentService) { }

  ngOnInit(): void {
    this.createTournament = this.createTournamentServ.createTournamentForm();
  }

  get name() {
    return this.createTournament.get("name")!;
  }

  get sport() {
    return this.createTournament.get("sport")!;
  }

  get location() {
    return this.createTournament.get("location")!;
  }

  get description() {
    return this.createTournament.get("description");
  }

  get rules() {
    return this.createTournament.get("rules")!;
  }

  getContestTypeName(tournamentType: TournamentType) {
    return getContestTypeName(tournamentType);
  }

  onSubmit() {
    if (this.createTournament.invalid) {
      this.createTournament.markAllAsTouched();
    }
    const newTournament:Tournament = {
      ...this.createTournament.value,
      userId:"1"
    }
    this.tournamentServ.addTournament(newTournament).subscribe(
      (res) => {
        console.log("Response:", res);
        console.log("create tournament", newTournament)
      },
      ({error}) => {
        console.error("Error adding tournament:", error);
      }
    );

  }

}
