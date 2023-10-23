import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Liga } from '../../../models/Ligas/Ligas';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { url } from '../../../url-config';
import { TokenService } from '../../../services/tokenService/token.service';
import { Subject } from 'rxjs';
import { Temporadas } from './../interfaces/Temporadas';


@Injectable({
  providedIn: 'root'
})
export class TemporadasService {
  private nuevaTemporadaSubject = new Subject<void>();
  constructor(private http: HttpClient, private tokenService: TokenService) {}


  onNuevaTemporadaCreada() {
    return this.nuevaTemporadaSubject.asObservable();
  }

  emitNuevaTemporadaCreada() {
    this.nuevaTemporadaSubject.next();
  }



  obtenerArbitros(idTemporada: number): Observable<any> {
    const headers = this.tokenService.createHeaders();

    return this.http.get(url + '/Temporadas/obtenerArbitros', {
      headers: headers,
      params: {
        idTemporada: idTemporada
      }
    });
  }


  obtenerArbitrosSinTemporada(idTemporada: number): Observable<any> {
    const headers = this.tokenService.createHeaders();

    return this.http.get(url + '/Temporadas/obtenerArbitrosNoEnTemporada', {
      headers: headers,
      params: {
        idTemporada: idTemporada
      }
    });

  }




  asignarArbitro(idTemporada: number, usuario: string): Observable<any> {
    const headers = this.tokenService.createHeaders();

    const body = {
      temporadaId: idTemporada,
      arbitroId: usuario
    };

    return this.http.post(url + '/Temporadas/agregarArbitro', body, {
      headers: headers
    });
  }



  crearTemporada(temporada: Temporadas): Observable<any> {
    const headers = this.tokenService.createHeaders();

    return this.http.post(url + '/Temporadas/crearTemporada', temporada, {
      headers: headers
    });
  }


  asignarTemporada(idTemporada: number, idLiga: number): Observable<any> {
    const headers = this.tokenService.createHeaders();

    const body = {
      ligaId: idLiga,
      temporadaId: idTemporada
    };

    return this.http.put(url + '/Temporadas/asignarLiga', body, {
      headers: headers
    });
  }


}
