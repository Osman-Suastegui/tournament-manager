import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EquiposService } from '../EquiposService/equipos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { JugadoresParaPartido } from '../interfacesEquipos/JugadoresPartido';
import { JugadoresPart } from '../interfacesEquipos/JugadoresPartido';

@Component({
  selector: 'app-jugadores-partido',
  templateUrl: './jugadores-partido.component.html',
  styleUrls: ['./jugadores-partido.component.css']
})
export class JugadoresPartidoComponent implements OnInit{

  constructor(public dialog: MatDialog, private equipoServ: EquiposService, private route: ActivatedRoute, private router: Router ) { }

  nombreEquipo: any = '';
  jugadoresDeEquipoNoEnPartido: string[] = [];
  jugadoresUsuario: string[] = [];
  selectedJugador: string = '';
  mensaje: string = '';
  jugadoresEnPartido: JugadoresPart[] = [];;
  clavePartido: any = '';
  equipo1: string = '';
  equipo2: string = '';
  jugadorParaPartido : JugadoresParaPartido = {
    equipo: '',
    jugador: {
      usuario: ''
    },
    partido: {
      clavePartido: 0
    }
  };


  ngOnInit(): void {
    this.nombreEquipo = localStorage.getItem('nombreEquipo');
    this.route.params.subscribe(params => {
      this.clavePartido = params['claveDelPartido'];
    });
    this.obtenerJugadoresdeEquipo();
    //obten el valor de clabe partido de la url

    this.obtenerEquipo1Equipo2();
    this.obtenerJugadoresDelPartido();
  }


  obtenerJugadoresdeEquipo() {
    this.equipoServ.obtenerJugadoresDeEquipoNoEnPartido(this.nombreEquipo, this.clavePartido).subscribe({
      next: (result: any) => {
        this.jugadoresDeEquipoNoEnPartido = result;
      }
    });
  }

  agregarJugadorAlPartido(jugador: string){
    this.jugadorParaPartido.equipo = this.nombreEquipo;
    this.jugadorParaPartido.jugador.usuario = jugador;
    this.jugadorParaPartido.partido.clavePartido = this.clavePartido;
    this.equipoServ.agregarJugadorPartido(this.jugadorParaPartido).subscribe({
      next: (result) => {
        console.log(result);
      }
    });
  }

  obtenerEquipo1Equipo2(){
    this.equipoServ.obtenerEquipo1Equipo2(this.clavePartido).subscribe({
      next: (result) => {
        this.equipo1 = (result as any).equipo1;
        this.equipo2 = (result as any).equipo2;
      }
    });
  }


  obtenerJugadoresDelPartido() {
    this.equipoServ.obtenerJugadoresDePartidoyEquipo(this.nombreEquipo, this.clavePartido).subscribe({
      next: (result: any) => {
        console.log(result);
        this.jugadoresEnPartido = result.map((item: any) => ({ jugador: item.jugador }));
      }
    });
  }



}
