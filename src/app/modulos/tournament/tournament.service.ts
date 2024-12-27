import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tournament } from './interface';


@Injectable({
  providedIn: 'root'
})
export class TournamentService {
  baseUrl:string = "http://localhost:8080"
  constructor(private http:HttpClient) { }

  addTournament(tournament:Tournament){
    return this.http.post(`${this.baseUrl}/tournaments/createTournament`, tournament); // Send a POST request
  }

}
