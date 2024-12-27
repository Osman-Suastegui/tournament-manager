export enum TournamentType {
  SingleElimination = 'SingleElimination',
  DoubleElimination = 'DoubleElimination'
}

export interface Tournament{

  name:string;
  userId:string;
  sport:string;
}
