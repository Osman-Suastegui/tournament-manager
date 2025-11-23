import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { Team } from '../interface';
import { Match } from '../../tree-diagrams/single-elimination-tree/test';

export interface BracketMatch {
  id: string;
  team1: Team | null;
  team2: Team | null;
  score1?: number;
  score2?: number;
  date: Date | string;
  status: 'Completed' | 'Live' | 'Scheduled' | 'Pending';
  round: number;
  next: string | null;
}

@Component({
  selector: 'app-brackets',
  templateUrl: './brackets.component.html',
  styleUrls: ['./brackets.component.css']
})
export class BracketsComponent implements OnInit, OnChanges {
   matches: BracketMatch[] = [];
  matchesTree: Match[] = [];
  rounds: { name: string; matches: BracketMatch[] }[] = [];

  ngOnInit(): void {
    this.initializeMockData();
    this.organizeMatchesByRound();
  }

  private initializeMockData(): void {
    // Mock teams
    const teams = {
      phoenixFire: { id: '1', name: 'Phoenix Fire' },
      amsterdamAdmirals: { id: '2', name: 'Amsterdam Admirals' },
      berlinBears: { id: '3', name: 'Berlin Bears' },
      madridMonarchs: { id: '4', name: 'Madrid Monarchs' },
      londonLightning: { id: '5', name: 'London Lightning' },
      parisPatriots: { id: '6', name: 'Paris Patriots' },
      athensArchers: { id: '7', name: 'Athens Archers' }
    };

    // Round 1 (round 4) - Completed matches
    this.matches = [
      {
        id: 'M1',
        team1: teams.phoenixFire,
        team2: teams.amsterdamAdmirals,
        score1: 72,
        score2: 65,
        date: new Date('2023-08-10T14:00:00'),
        status: 'Completed',
        round: 3,
        next: 'M5'
      },
      {
        id: 'M2',
        team1: teams.berlinBears,
        team2: teams.madridMonarchs,
        score1: 68,
        score2: 54,
        date: new Date('2023-08-10T16:00:00'),
        status: 'Completed',
        round: 3,
        next: 'M5'
      },
      {
        id: 'M3',
        team1: teams.londonLightning,
        team2: teams.parisPatriots,
        score1: 81,
        score2: 73,
        date: new Date('2023-08-11T14:00:00'),
        status: 'Completed',
        round: 3,
        next: 'M6'
      },
      // Round 2 (round 3) - Completed matches
      {
        id: 'M4',
        team1: teams.phoenixFire,
        team2: teams.berlinBears,
        score1: 70,
        score2: 68,
        date: new Date('2023-08-13T15:00:00'),
        status: 'Completed',
        round: 3,
        next: 'M6'
      },
      {
        id: 'M5',
        team1: teams.londonLightning,
        team2: teams.athensArchers,
        score1: 77,
        score2: 65,
        date: new Date('2023-08-13T18:00:00'),
        status: 'Completed',
        round: 2,
        next: 'M7'
      },
      // Round 3 (round 2) - Live and Scheduled matches
      {
        id: 'M6',
        team1: teams.phoenixFire,
        team2: teams.londonLightning,
        score1: 85,
        score2: 82,
        date: new Date('2023-08-15T19:00:00'),
        status: 'Live',
        round: 2,
        next: 'M7'
      },
      {
        id: 'M7',
        team1: teams.berlinBears,
        team2: teams.athensArchers,
        score1: 0,
        score2: 0,
        date: new Date('2023-08-16T15:00:00'),
        status: 'Scheduled',
        round: 1,
        next: null
      },
      // // Final (round 1) - Pending match
      // {
      //   id: 'M8',
      //   team1: {id: "M9"} as Team,
      //   team2: {id: "M10"} as Team,
      //   date: new Date('2023-08-17T19:00:00'),
      //   status: 'Pending',
      //   round: 4
      // }
    ];
    this.matchesTree = this.matches.map(match => ({
      id: match.id,
      team1: match.team1 as Team,
      team2: match.team2 as Team,
      winner: undefined as Team | undefined,
      round: match.round,
      next: match.id === 'M7' ? null : match.next
    }));
    console.table(this.matchesTree);
  }

  ngOnChanges(): void {
    this.organizeMatchesByRound();
  }

  private organizeMatchesByRound(): void {
    if (!this.matches || this.matches.length === 0) {
      this.rounds = [];
      return;
    }

    // Group matches by roundName if provided, otherwise by round number
    const matchesByRoundName = new Map<string, BracketMatch[]>();
    const matchesByRoundNumber = new Map<number, BracketMatch[]>();

    this.matches.forEach(match => {
        // Group by round number
        const round = match.round;
        if (!matchesByRoundNumber.has(round)) {
          matchesByRoundNumber.set(round, []);
        }
        matchesByRoundNumber.get(round)!.push(match);
    });

    const roundsArray: { name: string; matches: BracketMatch[]; order: number }[] = [];

    // Process matches with custom roundName
    matchesByRoundName.forEach((matches, roundName) => {
      const firstMatch = matches[0];
      roundsArray.push({
        name: roundName,
        matches: matches.sort((a, b) => {
          const dateA = a.date ? new Date(a.date).getTime() : 0;
          const dateB = b.date ? new Date(b.date).getTime() : 0;
          return dateA - dateB;
        }),
        order: firstMatch.round
      });
    });

    // Process matches grouped by round number
    matchesByRoundNumber.forEach((matches, roundNumber) => {
      const firstMatch = matches[0];

      let roundName = '';
      const maxRound = Math.max(...Array.from(matchesByRoundNumber.keys()));
      const roundPosition = maxRound - roundNumber + 1;

      if (roundNumber === 1) {
        roundName = 'Final';
      } else {
        roundName = `Round ${roundPosition}`;
      }

      roundsArray.push({
        name: roundName,
        matches: matches.sort((a, b) => {
          const dateA = a.date ? new Date(a.date).getTime() : 0;
          const dateB = b.date ? new Date(b.date).getTime() : 0;
          return dateA - dateB;
        }),
        order: roundNumber
      });
    });

    // Sort by order (descending - highest round number first)
    this.rounds = roundsArray
      .sort((a, b) => b.order - a.order)
      .map(({ name, matches }) => ({ name, matches }));
  }

  formatDate(date: Date | string): string {
    if (!date) return '';
    const d = new Date(date);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = months[d.getMonth()];
    const day = d.getDate();
    const year = d.getFullYear();
    const hours = d.getHours().toString().padStart(2, '0');
    const minutes = d.getMinutes().toString().padStart(2, '0');
    return `${month} ${day}, ${year} ${hours}:${minutes}`;
  }

  getTeamName(team: Team | null): string {
    if (!team || !team.name) return 'TBD';
    return team.name;
  }

  getTeamScore(match: BracketMatch, teamNumber: 1 | 2): number {
    if (match.status === 'Pending') return 0;
    if (teamNumber === 1) return match.score1 ?? 0;
    return match.score2 ?? 0;
  }
}
