import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { url } from 'src/app/url-config';

@Injectable({
  providedIn: 'root'
})
export class LinkService {
  private http = inject(HttpClient);

  getLink(teamId:string,tournamentId:string):Observable<string>{
    return this.http.get<string>(`${url}/team-tournament-links/getLink/${teamId}/${tournamentId}`);
  }

}
