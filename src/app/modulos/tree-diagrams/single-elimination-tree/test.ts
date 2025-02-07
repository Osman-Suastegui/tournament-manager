import { Team } from "../../tournament/interface"
export interface Match {
  id: string;
  team1: Team;
  team2: Team;
  winner?: Team; // Initially undefined
  round: number;
  next: string | null; // Null for the final match
}

// Teams
const teams: Team[] = [
  { id: "T1", name: "Team A" },
  { id: "T2", name: "Team B" },
  { id: "T3", name: "Team C" },
  { id: "T4", name: "Team D" },
  { id: "T5", name: "Team E" },
  { id: "T6", name: "Team F" },
  { id: "T7", name: "Team G" },
  { id: "T8", name: "Team H" },
];

// Matches (Bracket System)
export const matches: Match[] = [
  // Round 1 (Quarterfinals)
  { id: "M1", team1: teams[0], team2: teams[1], round: 3, next: "M5" },
  { id: "M2", team1: teams[2], team2: teams[3], round: 3, next: "M5" },
  { id: "M3", team1: teams[4], team2: teams[5], round: 3, next: "M6" },
  { id: "M4", team1: teams[6], team2: teams[7], round: 3, next: "M6" },

  // Round 2 (Semifinals)
  { id: "M5", team1: teams[0], team2: teams[3], round: 2, next: "M7" }, // Winner M1 vs M2
  { id: "M6", team1: {} as Team, team2: {} as Team, round: 2, next: "M7" }, // Winner M3 vs M4

  // Round 3 (Finals)
  { id: "M7", team1: teams[0], team2: {} as Team, round: 1, next: null }, // Winner M5 vs M6
];





