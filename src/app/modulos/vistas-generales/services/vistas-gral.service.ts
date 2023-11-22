import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { url } from '../../../url-config';
import { TokenService } from '../../../services/tokenService/token.service';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class VistasGralService {

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  // obtenerEquiposTemporada(idTemporada: number): Observable<any> {
  //   const headers = this.tokenService.createHeaders();

  //   return this.http.get(url + '/EquipoTemporada/obtenerEquiposTemporada', {
  //     headers: headers,
  //     params: {
  //       temporadaId: idTemporada
  //     }
  //   });
  // }
    // http://localhost:8080/usuarios/obtenerUsuario?usuario=tntjarcor02
  ObtenerPerfilUsuario(user: any){
    const headers = this.tokenService.createHeaders();
    return this.http.get(url + '/usuarios/obtenerUsuario', {
      headers: headers,
      params: {
        usuario: user
      }
    });
  }

  modificarDatosUsuario(user: any, nombre: string, apellido: string){
    const headers = this.tokenService.createHeaders();
    const body = {
      usuario: user,
      nombre: nombre,
      apellido: apellido
    };

    return this.http.put(url + '/usuarios/ActualizarUsuario', body,{
      headers: headers
    });
  }









}
