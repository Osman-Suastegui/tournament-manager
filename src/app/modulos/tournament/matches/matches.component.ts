import { OnInit } from "@angular/core";
import { Component, Input } from "@angular/core";
import { MatchService } from "src/app/services/match.service";
import { Match } from "../../tree-diagrams/single-elimination-tree/test";
import { HttpErrorResponse } from "@angular/common/http";
import { ActivatedRoute } from "@angular/router";
import { emptyTournament, Tournament } from "../interface";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-matches",
  templateUrl: "./matches.component.html",
  styleUrls: ["./matches.component.css"]
})
export class MatchesComponent implements OnInit {

  private tournament: Tournament = emptyTournament
  protected matches: Match[] = [];

  constructor(private matchService: MatchService,
    private activateRoute: ActivatedRoute,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getTournamentFromParent();
    this.getMatches();
  }

  private getMatches(): void {
    this.matchService.getMatches(this.tournament.id).subscribe({
      next: (matches: Match[]) => {
        this.matches = matches;
        console.log("Matches:", this.matches);
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      }
    });
  }

  protected generateMatches(): void {
    this.matchService.generateMatches(this.tournament.id, this.tournament.tournamentType).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err: HttpErrorResponse) => {
        let errorMessage = "Something went wrong";

        if (err.status === 400) {
          errorMessage = err.error[0]?.message ?? errorMessage;
          this.showSnackBar(errorMessage, 'Close')
          return
        }

        this.showSnackBar(errorMessage, 'Close')

      }
    });
  }

  getTournamentFromParent(): void {
    this.activateRoute.parent?.data.subscribe(data => {
      this.tournament = data['tournament'];
      console.log("Tournament Data in Child:", this.tournament);
    });
  }


  showSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000, // Message stays for 2 seconds
      horizontalPosition: 'end', // Aligns snackbar to the right
      verticalPosition: 'top',   // Aligns snackbar to the top
      panelClass: ['green-snackbar'] // Custom class to make it green
    });
  }

}
