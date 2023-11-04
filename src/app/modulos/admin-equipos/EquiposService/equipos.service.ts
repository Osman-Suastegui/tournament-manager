import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { url } from '../../../url-config';
import { TokenService } from '../../../services/tokenService/token.service';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EquiposService {

  constructor(private http: HttpClient, private tokenService: TokenService) {}
  private nuevoEquipo  = new Subject<void>();


  onNuevoEquipoCreado() {
    return this.nuevoEquipo.asObservable();
  }

  emitNuevoEquipoCreado() {
    this.nuevoEquipo.next();
  }





  obtenerEquipo(usuario: string){
    const headers = this.tokenService.createHeaders();

    return this.http.get(url + '/Equipo/obtenerEquipoAdminEquipo', {
      headers: headers,
      params: {
        idAdminEquipo: usuario
      }
    });
  }


  crearEquipo(equipo: any): Observable<any> {
    const headers = this.tokenService.createHeaders();

    // Ajusta la estructura del equipo antes de enviarla
    const equipoAjustado = {
      nombre: equipo.nombre,
      admin_equipo: { usuario: equipo.admin_equipo },
      rama: equipo.rama,
      categoria: equipo.categoria,
    };

    return this.http.post(url + '/Equipo/crearEquipo', equipoAjustado, { headers: headers });
  }


  obtenerJugadoresParaEquipo(equipo: string){
    const headers = this.tokenService.createHeaders();

    return this.http.get(url + '/Equipo/obtenerJugadoresParaEquipo', {
      headers: headers,
      params: {
        nombreEquipo: equipo
      }
    });
  }


  agregarJugadorAEquipo(jugador: any): Observable<any> {
    const headers = this.tokenService.createHeaders();
    console.log(jugador.equipo.nombre);

    const jugadorAjustado = {
      equipo: { nombre: jugador.equipo.nombre }, // Accede a la propiedad "nombre" de "equipo"
      jugador: { usuario: jugador.jugador.usuario }, // Accede a la propiedad "usuario" de "jugador"
      posicion: jugador.posicion
    };

    return this.http.post(url + '/Equipo/agregarJugador', jugadorAjustado, { headers });
  }


}
