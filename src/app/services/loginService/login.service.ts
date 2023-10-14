import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Credential } from '../../models/Credential';
import { map } from 'rxjs/operators';
import { TokenService } from '../tokenService/token.service';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  constructor(private http: HttpClient, private tokenService: TokenService ) {}



  login(creds: Credential): Observable<any> {
    return this.http.post('http://localhost:8080/auth/authenticate', creds, {
      observe: 'response'
    }).pipe(
      map((response: HttpResponse<any>) => {
        const token = response.body.token;

        localStorage.setItem('token', token);
        const headers = this.tokenService.createHeaders();
        return response.body;
      })
    );
  }





}
