import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Tournament } from '../../tournament/interface';
import { TournamentService } from '../../tournament/tournament.service';

@Component({
  selector: 'app-tournament-list',
  templateUrl: './tournament-list.component.html',
  styleUrls: ['./tournament-list.component.css']
})
export class TournamentListComponent implements OnInit, OnChanges {

  @Input() search: string = '';
  tournaments: Tournament[] = []

  constructor(private tournamentService: TournamentService) { }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('Search input changed:', changes);
  }

  ngOnInit(): void {
    this.tournamentService.getTournaments("", 20, 0).subscribe({
      next: (data) => {
        this.tournaments = data;
        console.log('Tournaments fetched successfully:', this.tournaments);
      },
      error: (error) => {
        console.error('Error fetching tournaments:', error);
      }
    });
  }

}
