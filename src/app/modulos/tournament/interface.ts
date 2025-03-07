import { Form, FormControl } from "@angular/forms";

export enum TournamentType {
  SingleElimination = "SingleElimination",
  DoubleElimination = "DoubleElimination"
}

export interface Team {
  id:   string;
  name: string;
}

export interface Tournament {
  id:             string;
  name:           string;
  sport:          string;
  estado:         string;
  description:    string;
  rules:          string;
  users:          User[];
  teams:          Team[];
  tournamentType: TournamentType
}

export interface BasicInformationTournament {
  name: FormControl<string>;
  sport: FormControl<string>;
  tournamentType: FormControl<TournamentType>;
  description: FormControl<string>;
  location: FormControl<string | null>;
  rules: FormControl<string | null>;
  startDate: FormControl<string | null>;
  endDate: FormControl<string | null>;
}

export interface SelectTeamsTournament {
  teams: FormControl<Team[]>;
}

export const emptyTournament: Tournament = {
  id:          "",
  name:        "",
  sport:       "",
  estado:      "",
  description: "",
  rules:       "",
  users:       [],
  teams:       [],
  tournamentType: TournamentType.SingleElimination
};

export interface User {
  id:       string;
  username: string;
  role:     "ORGANIZER" | "REFEREE";
  name:     string;
  lastName: string;
}


export interface AddTournamentResponse{
  message: string;
  tournament: Tournament
}
