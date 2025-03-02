import { Component, EventEmitter, Output } from '@angular/core';
import { TournamentType } from '../../interface';
import { TournamentService } from '../../tournament.service';

@Component({
  selector: 'app-tournament-type-selection',
  templateUrl: './tournament-type-selection.component.html',
  styleUrls: ['./tournament-type-selection.component.css']
})
export class TournamentTypeSelectionComponent {
  tournamentTypes = Object.values(TournamentType); // Extract enum values
  tournamentTypeSelected: TournamentType = TournamentType.SingleElimination;
  @Output() selectedType = new EventEmitter<TournamentType>();
  constructor(
    public tournamentServ: TournamentService,
  ) {
    this.tournamentServ = tournamentServ;
  }

  onSelectTypeTournament(type: TournamentType) {
    this.tournamentTypeSelected = type;
    console.log(this.tournamentTypeSelected);
    this.selectedType.emit(this.tournamentTypeSelected);
  }

}
