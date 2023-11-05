import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenService } from 'src/app/services/tokenService/token.service';
import { EstatusPartido } from '../interfaces/EstatusPartido';
import { Observable } from 'rxjs';
import { url } from 'src/app/url-config';
import { PartidoArbitroHome } from '../interfaces/PartidosArbitroHome';

@Injectable({
  providedIn: 'root'
})
export class ArbitroService {

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  obtenerPartidos(usuarioArbitro:string | undefined ,estatusPartido:EstatusPartido | null):Observable<PartidoArbitroHome[]>{
    if(estatusPartido === EstatusPartido.TODOS){
      estatusPartido = null;
    }
    return this.http.get<any>(url + "/Partido/obtenerPartidosArbitro?idArbitro="+usuarioArbitro+"&estatusPartido="+estatusPartido)
    
  }
}
