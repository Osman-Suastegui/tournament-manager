import { AddTournamentResponse } from './../interface';
import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { AddTournament, Tournament, TournamentType } from "../interface";
import { CreateTournamentService } from "./create-tournament.service";
import { getContestTypeName } from "../utils";
import { TournamentService } from "../tournament.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-create-tournament",
  templateUrl: "./create-tournament.component.html",
  styleUrls: ["./create-tournament.component.css"]
})
export class CreateTournamentComponent implements OnInit {

  contestTypes = Object.values(TournamentType); // Extract enum values
  public createTournament!: FormGroup;

  constructor(private createTournamentServ: CreateTournamentService, private tournamentServ: TournamentService, private router: Router) { }

  ngOnInit(): void {
    this.createTournament = this.createTournamentServ.createTournamentForm();
  }

  get name() {
    return this.createTournament.get("name")!;
  }

  getContestTypeName(tournamentType: TournamentType) {
    return getContestTypeName(tournamentType);
  }

  onSubmit() {
    if (this.createTournament.invalid) {
      this.createTournament.markAllAsTouched();
    }

    const newTournament: AddTournament = {
      tournament: this.createTournament.value,
      userId: "1"
    };

    this.addTournament(newTournament);
  }

  addTournament(newTournament: AddTournament) {

    this.tournamentServ.addTournament(newTournament).subscribe({
      next: (response: AddTournamentResponse) => {
        console.log("Response:", response);
        const { tournament } = response
        this.router.navigate(["/tournament", tournament.id])
      },
      error: ({ error }) => {
        console.error("Error adding tournament:", error);
      }
    })
  }

}
