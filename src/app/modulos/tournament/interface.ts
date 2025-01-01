export enum TournamentType {
  SingleElimination = 'SingleElimination',
  DoubleElimination = 'DoubleElimination'
}

export interface Tournament {
  id:     string;
  name:   string;
  sport:  string;
  estado: string;
  users:  User[];
}

export interface User {
  id:       number;
  username: string;
  role:     string;
  name:     string;
  lastName: string;
}



export interface AddTournament {
  tournament: Tournament
  userId: string
}
export interface AddTournamentResponse{
  message:string;
  tournament:Tournament
}
