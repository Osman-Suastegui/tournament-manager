import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Liga } from '../../models/Ligas/Ligas';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { url } from '../../url-config';
import { TokenService } from '../tokenService/token.service';
import { HttpErrorResponse } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class LigasServiceService {

  constructor(private http: HttpClient, private tokenService: TokenService) {}


  createLiga(liga: Liga): Observable<string> {
    const headers = this.tokenService.createHeaders();

    return this.http.post(url + '/Ligas/crearLiga', liga, {
      headers: headers,
      observe: 'response'
    }).pipe(
      map(() => {
        return 'Liga creada exitosamente.';
      }),
      catchError((error) => {
          return throwError(() => error);
      })
    );
  }

}
