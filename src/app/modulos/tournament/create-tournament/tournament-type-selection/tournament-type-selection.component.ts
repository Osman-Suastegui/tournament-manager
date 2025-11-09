import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TournamentType } from '../../interface';
import { TournamentService } from '../../tournament.service';

@Component({
  selector: 'app-tournament-type-selection',
  templateUrl: './tournament-type-selection.component.html',
  styleUrls: ['./tournament-type-selection.component.css']
})
export class TournamentTypeSelectionComponent {
  tournamentTypes = Object.values(TournamentType); // Extract enum values
  @Input() tournamentTypeSelected: TournamentType = TournamentType.DoubleElimination;
  @Output() tournamentTypeSelectedChange = new EventEmitter<TournamentType>();
  constructor(
    public tournamentServ: TournamentService,
  ) { }

  onSelectTypeTournament(type: TournamentType) {
    this.tournamentTypeSelected = type;
    this.tournamentTypeSelectedChange.emit(this.tournamentTypeSelected);
  }

}
