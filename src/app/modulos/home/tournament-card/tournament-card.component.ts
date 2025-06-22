import { Component, Input } from '@angular/core';
import { Tournament } from '../../tournament/interface';
import { TournamentService } from '../../tournament/tournament.service';

@Component({
  selector: 'app-tournament-card',
  templateUrl: './tournament-card.component.html',
  styleUrls: ['./tournament-card.component.css']
})
export class TournamentCardComponent {
  @Input() tournament: Tournament = {} as Tournament

  constructor(public tournamentService: TournamentService) { }

}
