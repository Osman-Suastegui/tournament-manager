import { Component, OnInit,Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { EstadisticasJugador } from '../interfaces/EstadisticasJugador';
import { JugadoresDePartidoEquipoService } from '../servicios/jugadores-de-partido-equipo.service';
import { RxStompService } from '../config-rx-stomp/rx-stomp.service';
import {Message} from '@stomp/stompjs';
import { SacarJugador } from '../interfaces/SacarJugador';
import { MatDialog } from '@angular/material/dialog';
import { MeterJugarPartidoComponent } from '../meter-jugar-partido/meter-jugar-partido.component';
import { MarcadorService } from '../servicios/marcador.service';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-tabla-estadisticas-de-jugador-por-partido',
  templateUrl: './tabla-estadisticas-de-jugador-por-partido.component.html',
  styleUrls: ['./tabla-estadisticas-de-jugador-por-partido.component.css']
})
export class TablaEstadisticasDeJugadorPorPartidoComponent implements OnInit {

    @Input() nombreEquipo: string | undefined;
    @Input() claveDelPartido: number | undefined;
    @Input() enBanca: number | null;
    private puntosEquipo: number | undefined;

    statDescriptionHandlers: { [key: string]: (fila: EstadisticasJugador) => void } = {
      tirosDe2Puntos: (fila: EstadisticasJugador) => fila.tirosDe2Puntos++,
      tirosLibres: (fila: EstadisticasJugador) => fila.tirosLibres++,
      tirosDe3Puntos: (fila: EstadisticasJugador) => fila.tirosDe3Puntos++,
      asistencias: (fila: EstadisticasJugador) => fila.asistencias++,
      faltas: (fila: EstadisticasJugador) => fila.faltas++,
    };
    jugadorBase = {
      jugador: '',
      faltas: 0,
      tirosDe2Puntos: 0,
      tirosDe3Puntos: 0,
      tirosLibres: 0,
      asistencias: 0,
    };
    datosTemporales : EstadisticasJugador[] = []
    usuario: any = '';
    rol: any = '';


    data: EstadisticasJugador[] = [];

    displayedColumns: string[] = ['jugador', 'faltas', 'tirosDe2Puntos','tirosLibres', 'tirosDe3Puntos', 'asistencias'];
    tableDataSource: MatTableDataSource<EstadisticasJugador>;

    constructor(private JugadoresDePartidoEquipoService: JugadoresDePartidoEquipoService,private RxStompService: RxStompService
      ,public dialog: MatDialog,private marcadorServ: MarcadorService ) {
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
        destination: `/app/agregarPunto/${this.claveDelPartido}`,
        body: JSON.stringify(message)
      });


    }

    ngOnInit() {
      this.JugadoresDePartidoEquipoService.obtenerJugadoresDePartidoYEquipo(this.claveDelPartido, this.nombreEquipo, this.enBanca).subscribe((data) => {

        // sort by a.jugador
        data.sort((a, b) => a.jugador.localeCompare(b.jugador));
        if (data.length !== 5) {
          this.datosTemporales = Array(5 - data.length).fill(this.jugadorBase);
        }

        this.tableDataSource = new MatTableDataSource<EstadisticasJugador>([...data, ...this.datosTemporales]);

      });

      this.onSacarJugador();
      this.onMeterJugadorPartido();
      this.onActualizacionesDePuntos();
      this.marcadorServ.getPuntosEquipo(this.nombreEquipo,this.claveDelPartido).subscribe((puntos)=>{
        this.puntosEquipo=puntos;
      });
      this.usuario = localStorage.getItem('usuario');
      this.JugadoresDePartidoEquipoService.obtenerTipoUsuario(this.usuario).subscribe((data: any) => {
        this.rol = data.Rol;
      });


  }
  onActualizacionesDePuntos(){
    this.RxStompService.watch(`/topic/ActualizacionesDePuntos/${this.claveDelPartido}`).subscribe((message: Message) => {
      const response = JSON.parse(message.body);

    this.tableDataSource.data.forEach((fila: EstadisticasJugador) => {
        if (fila.jugador === response.jugador && response.descripcion in this.statDescriptionHandlers) {
          this.statDescriptionHandlers[response.descripcion](fila);

          if(response.descripcion === 'tirosDe2Puntos' || response.descripcion === 'tirosDe3Puntos' || response.descripcion === 'tirosLibres'){
            let puntosAgregar = 0
            if(response.descripcion === 'tirosDe2Puntos') puntosAgregar = 2;
            if(response.descripcion === 'tirosDe3Puntos') puntosAgregar = 3;
            if(response.descripcion === 'tirosLibres') puntosAgregar = 1;
            this.marcadorServ.actualizarPuntosEquipo(this.nombreEquipo, this.claveDelPartido, this.puntosEquipo && this.puntosEquipo + puntosAgregar);
          }
        }
        
      });

    })
  }
  onSacarJugador(){
    this.RxStompService.watch(`/topic/sacarJugador/${this.claveDelPartido}`).subscribe((message: Message) => {
      const sacarJugadorResponse : SacarJugador | undefined = JSON.parse(message.body);
      const newData = [...this.tableDataSource.data];
      let jugadorEncontrado = false;

      for (let i = 0; i < newData.length; i++) {
        if(this.nombreEquipo !== sacarJugadorResponse?.nombreEquipo){
          jugadorEncontrado = false;
          break;
        }
        if (newData[i].jugador === sacarJugadorResponse?.jugador ) {
          jugadorEncontrado = true;
          newData.splice(i, 1);
          break;
        }
      }
      if(jugadorEncontrado){
        newData.push(this.jugadorBase);
        this.tableDataSource.data = newData;
      }

   });

  }
  onMeterJugadorPartido(){
    this.RxStompService.watch(`/topic/meterJugador/${this.claveDelPartido}`).subscribe((message: Message) => {
      const newData = [...this.tableDataSource.data];
      console.log(message.body)
      const nombreEquipo = JSON.parse(message.body).nombreEquipo;

      if(nombreEquipo !== this.nombreEquipo) return;
      let newJugador:EstadisticasJugador ={
        jugador: JSON.parse(message.body).jugador,
        faltas: JSON.parse(message.body).faltas,
        tirosDe2Puntos: JSON.parse(message.body).tirosDe2Puntos,
        tirosDe3Puntos: JSON.parse(message.body).tirosDe3Puntos,
        tirosLibres: JSON.parse(message.body).tirosLibres,
        asistencias: JSON.parse(message.body).asistencias,
      }
      newData.push(newJugador);
      // sort by name but blanks last
      newData.sort((a, b) => {
        if (a.jugador === '') {
          return 1;
        }
        if (b.jugador === '') {
          return -1;
        }
        return a.jugador.localeCompare(b.jugador);
      });
      newData.splice(newData.findIndex((fila) => fila.jugador === ''), 1);
      this.tableDataSource.data = newData;
    });
  }

  meterJugadorPartido(){
    this.dialog.open(MeterJugarPartidoComponent,{
      width: '450px',
      data: {
        clavePartido: this.claveDelPartido,
        nombreEquipo: this.nombreEquipo
      }
    })
  }

}


