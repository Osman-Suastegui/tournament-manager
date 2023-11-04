import { Component } from '@angular/core';
import { EquiposService } from '../EquiposService/equipos.service';
import { OnInit } from '@angular/core';
import { Jugador } from '../interfacesEquipos/Jugador';
import { NuevoJugador } from '../interfacesEquipos/NuevoJugador';



@Component({
  selector: 'app-administrar-jugadores',
  templateUrl: './administrar-jugadores.component.html',
  styleUrls: ['./administrar-jugadores.component.css']
})
export class AdministrarJugadoresComponent implements OnInit{

  constructor(private equiposService: EquiposService) {}

  nombreEquipo: string = '';
  jugadoresUsuario: string[] = [];
  selectedJugador: string = '';
  mensaje: string = '';
  jugadorNuevo: NuevoJugador = {
    equipo: {
      nombre: this.nombreEquipo
    },
    jugador: {
      usuario: this.selectedJugador
    },
    posicion: ''
  };


  ngOnInit(): void {
    this.nombreEquipo = localStorage.getItem('nombreEquipo')!;
    this.obtenerJugadoresParaEquipo(this.nombreEquipo);
  }



  obtenerJugadoresParaEquipo(equipo: string) {
    this.equiposService.obtenerJugadoresParaEquipo(equipo).subscribe({
      next: (result) => { // No especifica el tipo en la función next
        this.jugadoresUsuario = (result as Jugador[]).map(jugador => jugador.usuario);
        console.log(result);
      }
    });
  }


  agregarJugador(jugador: string, posicion: string) {
    this.jugadorNuevo.equipo.nombre = this.nombreEquipo;
    this.jugadorNuevo.jugador.usuario = jugador;
    this.jugadorNuevo.posicion = posicion;
    this.equiposService.agregarJugadorAEquipo(this.jugadorNuevo).subscribe({
      next: (result) => {
        console.log(result);
      }
    });

  }

}
