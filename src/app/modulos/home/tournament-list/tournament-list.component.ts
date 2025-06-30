import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Tournament } from '../../tournament/interface';
import { TournamentService } from '../../tournament/tournament.service';
import { Router } from '@angular/router';
import { debounceTime, startWith, Subject, switchMap } from 'rxjs';

@Component({
  selector: 'app-tournament-list',
  templateUrl: './tournament-list.component.html',
  styleUrls: ['./tournament-list.component.css']
})
export class TournamentListComponent implements OnInit, OnChanges {

  @Input() search: string = '';
  @Input() status: 'ongoing' | "upcoming" | "completed" | "" = "";
  private search$ = new Subject<string>();
  tournaments: Tournament[] = []

  constructor(private tournamentService: TournamentService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['search'] || changes['status']) {
      this.search$.next(changes['search']?.currentValue || '');
    }
  }

  ngOnInit(): void {
    this.initSearchListener();
  }

  initSearchListener(): void {
    this.search$
      .pipe(
        debounceTime(300),
        startWith(''),
        switchMap(q =>
          this.tournamentService.getTournaments({
            limit: 20,
            skip: 0,
            q: q,
            status: this.status
          })
        )
      )
      .subscribe({
        next: data => (this.tournaments = data),
        error: err => console.error('Error fetching tournaments', err)
      });
  }

}
