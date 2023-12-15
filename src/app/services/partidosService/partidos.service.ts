import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url } from 'src/app/url-config';
import { Partido } from './interfaces/Partido';
import {Observable} from 'rxjs';
import { format } from 'date-fns-tz';
@Injectable({
  providedIn: 'root'
})
export class PartidosService {

  constructor(private http: HttpClient) {}

  obtenerPartido(clavePartido:number |undefined ):Observable<Partido> {
   return this.http.get<Partido>(`${url}/Partido/obtenerPartido?clavePartido=${clavePartido}`);
  }

  obtenerFechaInicio(clavePartido:number |undefined ):Observable<String> {
    return this.http.get<String>(`${url}/Partido/obtenerFechaInicio?clavePartido=${clavePartido}`);
   }

   obtenerGanador(clavePartido:number | undefined):Observable<String>{
    return this.http.get<String>(`${url}/Partido/obtenerGanador?clavePartido=${clavePartido}`);
   }

   finalizarPartido(claveDelPartido:number | undefined):Observable<String>{
    // return this.http.get<String>(`${url}/Partido/finalizarPartido?clavePartido=${claveDelPartido}`);
    // put
    console.log("partiodo " , claveDelPartido)
    return this.http.put<String>(`${url}/Partido/finalizarPartido`,{clavePartido:claveDelPartido});
   }
   obtenerUsuarioArbitroAsignado(clavePartido:number | undefined):Observable<String>{
    return this.http.get<String>(`${url}/Partido/obtenerUsuarioArbitroAsignado?clavePartido=${clavePartido}`);
   }

   arbitroIniciaPartidoFecha(clavePartido:number | undefined):Observable<String>{
    
    return this.http.put<String>(`${url}/Partido/arbitroIniciaPartidoFecha`,{
      clavePartido:clavePartido,
      fechaInicio: format(new Date(), 'yyyy-MM-dd HH:mm:ss')
    });
  }
  obtenerFecharArbitroIniciaPartido(clavePartido:number | undefined):Observable<String>{
    return this.http.get<String>(`${url}/Partido/obtenerArbitroIniciaPartidoFecha?clavePartido=${clavePartido}`);
  }
}
