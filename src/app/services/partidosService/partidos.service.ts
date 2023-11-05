import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url } from 'src/app/url-config';
import { Partido } from './interfaces/Partido';
import {Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PartidosService {

  constructor(private http: HttpClient) {}

  obtenerPartido(clavePartido:number |undefined ):Observable<Partido> {
   return this.http.get<Partido>(`${url}/Partido/obtenerPartido?clavePartido=${clavePartido}`);
  }

}
