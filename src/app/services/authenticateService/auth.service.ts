import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Register } from '../../models/Login/Register';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { url } from '../../url-config';
import { Credential } from '../../models/Login/Credential';
import { TokenService } from '../tokenService/token.service';




@Injectable({
  providedIn: 'root'
})
export class authService {
  constructor(private http: HttpClient, private tokenService: TokenService) {}

  registerUser(rgr: Register): Observable<any> {
    return this.http.post(url + '/auth/register', rgr, {
      observe: 'response'
    }).pipe(
      map((response: HttpResponse<any>) => {
        const token = response.body.token;

        localStorage.setItem('token', token);

        return response.body;
      }),
      catchError((error) => {
        error = error.error;
        console.error('Ocurrió un error en la solicitud:', error);
        return throwError(() => error);

      })
    );
  }

  login(creds: Credential): Observable<any> {
    return this.http.post(url + '/auth/authenticate', creds, {
      observe: 'response'
    }).pipe(
      map((response: HttpResponse<any>) => {
        const token = response.body.token;
        localStorage.setItem('token', token);
        return response.body;
      }),
      catchError((error) => {
        error = error.error;
        console.error('Ocurrió un error en la solicitud:', error);
        return throwError(() => error); // Utiliza una función de fábrica en throwError
      })
    );
  }


  getTypeOfUser(usuario: string): Observable<string> {
    const baseURL = url + '/usuarios/obtenerTipoUser?usuario=${usuario}';
    return this.http.get<string>(baseURL);
  }





}
