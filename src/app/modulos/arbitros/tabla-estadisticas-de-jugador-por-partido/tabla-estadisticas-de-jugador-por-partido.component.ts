import { Component, OnInit,Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { EstadisticasJugador } from '../interfaces/EstadisticasJugador';
import { JugadoresDePartidoEquipoService } from '../servicios/jugadores-de-partido-equipo.service';
import { RxStompService } from '../config-rx-stomp/rx-stomp.service';
import {Message} from '@stomp/stompjs';
@Component({
  selector: 'app-tabla-estadisticas-de-jugador-por-partido',
  templateUrl: './tabla-estadisticas-de-jugador-por-partido.component.html',
  styleUrls: ['./tabla-estadisticas-de-jugador-por-partido.component.css']
})
export class TablaEstadisticasDeJugadorPorPartidoComponent implements OnInit {
  
    @Input() nombreEquipo: string | undefined;
    @Input() claveDelPartido: number | undefined;
    @Input() enBanca: number | null;
    statDescriptionHandlers: { [key: string]: (fila: EstadisticasJugador) => void } = {
      tirosDe2Puntos: (fila: EstadisticasJugador) => fila.tirosDe2Puntos++,
      tirosLibres: (fila: EstadisticasJugador) => fila.tirosLibres++,
      tirosDe3Puntos: (fila: EstadisticasJugador) => fila.tirosDe3Puntos++,
      asistencias: (fila: EstadisticasJugador) => fila.asistencias++,
      faltas: (fila: EstadisticasJugador) => fila.faltas++,
    };
    datosTemporales : EstadisticasJugador[] = [];
    

    data: EstadisticasJugador[] = [];

    displayedColumns: string[] = ['jugador', 'faltas', 'tirosDe2Puntos','tirosLibres', 'tirosDe3Puntos', 'asistencias'];
    tableDataSource: MatTableDataSource<EstadisticasJugador>;

    constructor(private JugadoresDePartidoEquipoService: JugadoresDePartidoEquipoService,private RxStompService: RxStompService ) {
      this.tableDataSource = new MatTableDataSource<EstadisticasJugador>();
      this.enBanca = null;
    }
    
    ngOnDestroy() {
      this.RxStompService.deactivate();
    }

    agregarPuntoDeJugador(jugador: string, columna: string) {
      
      const message = {
        "clavePartido": this.claveDelPartido,
        "jugador" : jugador,
        "descripcion" : columna 
      }
      this.RxStompService.publish({
        destination: '/app/agregarPunto',
        body: JSON.stringify(message)
      });


    }

    ngOnInit() {
      this.JugadoresDePartidoEquipoService.obtenerJugadoresDePartidoYEquipo(this.claveDelPartido, this.nombreEquipo, this.enBanca).subscribe((data) => {
        console.log(data);
        this.tableDataSource = new MatTableDataSource<EstadisticasJugador>([...data, ...this.datosTemporales]);
        
      });

      this.RxStompService.watch('/topic/ActualizacionesDePuntos').subscribe((message: Message) => {
        const response = JSON.parse(message.body);
        
        this.tableDataSource.data.forEach((fila: EstadisticasJugador) => {
          if (fila.jugador === response.jugador && response.descripcion in this.statDescriptionHandlers) {
            this.statDescriptionHandlers[response.descripcion](fila);
          }
        });      
    })
  }
}


