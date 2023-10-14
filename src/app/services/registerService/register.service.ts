import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Register } from '../../models/Register';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { TokenService } from '../tokenService/token.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  constructor(private http: HttpClient, private tokenService: TokenService) {}


  registerUser(rgr: Register): Observable<any> {


    return this.http.post('http://localhost:8080/auth/register', rgr, {
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
