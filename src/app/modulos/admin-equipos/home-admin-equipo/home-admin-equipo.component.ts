import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EquiposService } from '../EquiposService/equipos.service';
import { CrearEquipoComponent } from '../crear-equipo/crear-equipo.component';
import { AdministrarJugadoresComponent } from '../administrar-jugadores/administrar-jugadores.component';
import { EstatusPartido } from '../../arbitros/interfaces/EstatusPartido';
import { PartidoEquipos } from '../interfacesEquipos/PartidoEquipos';

@Component({
  selector: 'app-home-admin-equipo',
  templateUrl: './home-admin-equipo.component.html',
  styleUrls: ['./home-admin-equipo.component.css']
})
export class HomeAdminEquipoComponent implements OnInit{
  partidos:PartidoEquipos[] = [];
  usuario: any = '';
  mensaje: string = '';
  tieneEquipo: boolean = false;
  estatusPartidos: EstatusPartido = EstatusPartido.TODOS;
  nombreEquipo: any = '';

  constructor(public dialog: MatDialog, private equipoServ: EquiposService, private router: Router) { }




  ngOnInit(): void {
    this.usuario = localStorage.getItem('usuario');
    this.nombreEquipo = localStorage.getItem('nombreEquipo');
    this.obtenerEquipo();

    this.equipoServ.onNuevoEquipoCreado().subscribe({
      next: () => {
        this.obtenerEquipo();
      }
    });

    this.obtenerPartidos();
  }


  obtenerEquipo() {
    this.equipoServ.obtenerEquipo(this.usuario).subscribe({
      next: (data: any) => {
        this.mensaje = data.nombre;
        this.tieneEquipo = true;
        localStorage.setItem('nombreEquipo', data.nombre);
      },
      error: (error) => {
        this.mensaje = error.error[0].message;
        this.tieneEquipo = false;
      }
    });
  }


  crearEquipo(){
    this.dialog.open(CrearEquipoComponent,{
      width: '500px',
    })
  }

  administrarJugadores(){
    this.dialog.open(AdministrarJugadoresComponent,{
      width: '500px',
    })
  }

  obtenerPartidos() {
    console.log(this.estatusPartidos);
    console.log(this.nombreEquipo)
    this.equipoServ.obtenerPartidosDeEquipo(this.nombreEquipo, this.estatusPartidos).subscribe({
      next: (data: any) => {
        this.partidos = data;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }


  editarJugadoresPartido(idPartido: string) {
    console.log(idPartido);
    this.router.navigate(['/editar-jugadores-de-un-partido', idPartido]);

  }


}
