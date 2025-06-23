import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Tournament } from '../../tournament/interface';
import { TournamentService } from '../../tournament/tournament.service';
import { Router } from '@angular/router';
import { debounceTime } from 'rxjs';

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
    if (changes['search']) {
      this.handleSearchInputChange(changes['search'].currentValue);
    }
    console.log('Search input changed:', changes);
  }

  ngOnInit(): void {
  }

  handleSearchInputChange(search: string): void {
    this.tournamentService.getTournaments(search, 21, 0).pipe(debounceTime(200)).subscribe({
      next: (data) => {
        this.tournaments = data;
        console.log('Filtered tournaments:', this.tournaments);
      },
      error: (error) => {
        console.error('Error filtering tournaments:', error);
      }
    });

  }

}
