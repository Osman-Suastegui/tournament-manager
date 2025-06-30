import { Component, Input, OnInit } from '@angular/core';
import { Tournament } from '../../tournament/interface';
import { TournamentService } from '../../tournament/tournament.service';

@Component({
  selector: 'app-tournament-card',
  templateUrl: './tournament-card.component.html',
  styleUrls: ['./tournament-card.component.css']
})
export class TournamentCardComponent implements OnInit {
  @Input() tournament: Tournament = {} as Tournament
  public tournamentStatus: 'Upcoming' | 'Ongoing' | "Completed" = 'Upcoming';
  constructor(public tournamentService: TournamentService) { }
  ngOnInit(): void {
    this.setTournamentStatus();
  }

  setTournamentStatus(): void {
    if (this.tournament && this.tournament.startDate && this.tournament.endDate) {
      const now = new Date();
      const start = new Date(this.tournament.startDate);
      const end = new Date(this.tournament.endDate);

      if (now < start) {
        this.tournamentStatus = 'Upcoming';
      } else if (now >= start && now <= end) {
        this.tournamentStatus = 'Ongoing';
      } else {
        this.tournamentStatus = 'Completed';
      }
    }
  }

}
