import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { format } from 'date-fns-tz';
import { concat, partition } from 'rxjs';
import { PartidosService } from 'src/app/services/partidosService/partidos.service';
import { catchError, of } from 'rxjs';
import { JugadoresDePartidoEquipoService } from '../servicios/jugadores-de-partido-equipo.service';
@Component({
  selector: 'app-registro-de-estadisticas-de-jugadores-por-partido',
  templateUrl: './registro-de-estadisticas-de-jugadores-por-partido.component.html',
  styleUrls: ['./registro-de-estadisticas-de-jugadores-por-partido.component.css']
})
export class RegistroDeEstadisticasDeJugadoresPorPartidoComponent implements OnInit {
  claveDelPartido: number | undefined;
  nombreEquipo1 = "Miami Heat";
  nombreEquipo2 = "Denver Nuggets";
  fechaInicioPartido: any ;
  tiempoTranscurrido:String = "00:00:00";
  partidoFinalizado:boolean = false;
  mensajeTiempos:String = "Tiempo 1";
  usuarioArbitroAsignado = ""; // esta variable nos dice cual es el usuario del arbitro que esta asignado al partido
  rol:String = "";
  usuario:any;
  constructor(private route: ActivatedRoute,private PartidoService:PartidosService,private jugadorPartidoServ:JugadoresDePartidoEquipoService) {}
  
  ngOnInit(): void {
    this.route.params.subscribe(params => this.claveDelPartido = params['claveDelPartido']);
    this.usuario = localStorage.getItem('usuario');

    this.PartidoService.obtenerUsuarioArbitroAsignado(this.claveDelPartido).subscribe((data:any) => {
      this.usuarioArbitroAsignado = data.usuarioArbitro;
    });

    this.jugadorPartidoServ.obtenerTipoUsuario(this.usuario).subscribe((data: any) => {
      this.rol = data.Rol;
    });

    this.obtenerEquiposDePartido();
      this.PartidoService.obtenerGanador(this.claveDelPartido).subscribe((data:any) => {
        if(data.ganador.length !== 0){
          this.partidoFinalizado = true;
          this.tiempoTranscurrido = "El partido ha finalizado";
          return;
        }
        this.PartidoService.obtenerFechaInicio(this.claveDelPartido).subscribe((data:any) => {
          this.fechaInicioPartido = data.fechaInicio;
          let fechaInicio = new Date(this.fechaInicioPartido);
          let fechaActual = new Date();
          if(fechaInicio.getTime() > fechaActual.getTime()){
            this.partidoFinalizado = false;
            this.tiempoTranscurrido = "El partido no ha iniciado";
            return;
          }else{
            setInterval(() => {
              fechaActual = new Date();
              let tiempoTranscurrido = fechaActual.getTime() - fechaInicio.getTime();
              let segundosTranscurridos = Math.floor(tiempoTranscurrido / 1000);
              let horas = Math.floor(segundosTranscurridos / 3600);
              let minutos:any = Math.floor((segundosTranscurridos % 3600) / 60);
              let segundos:any = segundosTranscurridos % 60;
              if(minutos == 10){
                this.mensajeTiempos = "Tiempo 2";
              }else if(minutos == 20){
                this.mensajeTiempos = "Tiempo 3";
              }
              else if(minutos == 30){
                this.mensajeTiempos = "Tiempo 4";
              }
              if (segundos < 10) {
                segundos = "0" + segundos;
             }
             if (minutos < 10) {
                minutos = "0" + minutos;
              }
        
              this.tiempoTranscurrido = `${horas}:${minutos}:${segundos}`;
            }, 1000);
          }
        });
      })
      
  
       
  }
  obtenerEquiposDePartido(){

    this.PartidoService.obtenerPartido(this.claveDelPartido).subscribe((partido)=>{
      this.nombreEquipo1=partido.equipo1;
      this.nombreEquipo2=partido.equipo2;
      
    });

  }


}
