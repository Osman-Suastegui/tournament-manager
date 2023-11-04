import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EquiposService } from '../EquiposService/equipos.service';
import { CrearEquipoComponent } from '../crear-equipo/crear-equipo.component';
import { AdministrarJugadoresComponent } from '../administrar-jugadores/administrar-jugadores.component';

@Component({
  selector: 'app-home-admin-equipo',
  templateUrl: './home-admin-equipo.component.html',
  styleUrls: ['./home-admin-equipo.component.css']
})
export class HomeAdminEquipoComponent implements OnInit{
  usuario: any = '';
  mensaje: string = '';
  tieneEquipo: boolean = false;

  constructor(public dialog: MatDialog, private equipoServ: EquiposService, private router: Router) { }




  ngOnInit(): void {
    this.usuario = localStorage.getItem('usuario');
    this.obtenerEquipo();

    this.equipoServ.onNuevoEquipoCreado().subscribe({
      next: () => {
        this.obtenerEquipo();
      }
    });

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


}
