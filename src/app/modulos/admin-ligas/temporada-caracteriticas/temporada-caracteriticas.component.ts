import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TemporadasService } from '../adminLigasService/temporadas.service';
import { ActivatedRoute } from '@angular/router';
import { Arbitros } from '../interfaces/Arbitros';
import { AsignarArbitroComponent } from '../asignar-arbitro/asignar-arbitro.component';
import { Equipos } from '../interfaces/Equipos';
import { AgregarEquipoComponent } from '../agregar-equipo/agregar-equipo.component';
import { Partidos } from '../interfaces/Partidos';
import { AgregarArbitroPartidoComponent } from '../agregar-arbitro-partido/agregar-arbitro-partido.component';
import { AgregarFechaPartidoComponent } from '../agregar-fecha-partido/agregar-fecha-partido.component';

@Component({
  selector: 'app-temporada-caracteriticas',
  templateUrl: './temporada-caracteriticas.component.html',
  styleUrls: ['./temporada-caracteriticas.component.css']
})
export class TemporadaCaracteriticasComponent implements OnInit{

  constructor(public dialog: MatDialog, private tempService: TemporadasService, private router: Router, private route: ActivatedRoute) { }

  idTemporada: number = 0;
  arbitrosTemp: Arbitros[] = [];
  equiposTemp: Equipos[] = [];
  equiposTempList: any[] = []; // Declaración e inicialización
  cantidadEquipos: number = 0;
  mensajeEquipos: string = "No hay equipos Asignados";
  mensajeArbitros: string = "No hay arbitros Asignados";
  estadoTemporada: string = "";
  mensajePartidos: string = "";
  partidosTemporada: Partidos[] = [];
  idPartido: number = 0;


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.idTemporada = +params['idTemporada'];
      localStorage.setItem('idTemporada', this.idTemporada.toString());
      this.obtenerArbitrosTemp(this.idTemporada);
      this.obtenerEquiposTemp(this.idTemporada);
    });

    this.tempService.onNuevaTemporadaCreada().subscribe({
      next: () => {
        this.obtenerArbitrosTemp(this.idTemporada);
      }
    });

    this.tempService.onNuevoArbitroAsignado().subscribe({
      next: () => {
        this.obtenerArbitrosTemp(this.idTemporada);
      }
    });

    this.tempService.onNuevoEquipoAsignado().subscribe({
      next: () => {
        this.obtenerEquiposTemp(this.idTemporada);
      }
    });

    this.obtenerEstadoTemporada(this.idTemporada);

    this.tempService.onEstadoTemporadaActualizado().subscribe({
      next: () => {
        this.obtenerEstadoTemporada(this.idTemporada);
      }
    });

    this.obtenerPartidosTemporada();

    this.tempService.onNuevoArbitroPartidoAsignado().subscribe({
      next: () => {
        this.obtenerPartidosTemporada();
      }
    });

    this.tempService.onNuevaFechaPartidoAsignada().subscribe({
      next: () => {
        this.obtenerPartidosTemporada();
      }
    });

  }


  obtenerArbitrosTemp(idTemporada: number) {
    this.tempService.obtenerArbitros(idTemporada).subscribe({
      next: (data) => {
        this.arbitrosTemp = data;
      }
    });
  }

  openDialogArbitros(): void {
    this.dialog.open(AsignarArbitroComponent,{
      width: '250px',
    })
  }


  obtenerEquiposTemp(idTemporada: number) {
    this.tempService.obtenerEquiposTemporada(idTemporada).subscribe({
      next: (data) => {
        this.equiposTemp = data;
        this.equiposTempList = Object.keys(data).map(key => ({ nombreEquipo: key, equipo: data[key] }));
        this.cantidadEquipos = this.equiposTempList.length;
        if (this.cantidadEquipos === 8) {
          this.dialog.closeAll();
        }
      }
    });
  }

  eliminarEquipoTemp(idTemporada: number, nombreEquipo: string) {
    this.tempService.eliminarEquipoDeTemporada(idTemporada, nombreEquipo).subscribe({
      next: () => {
        this.tempService.emitNuevoEquipoAsignado();
      }
    });
  }

  eliminarArbitroTemp(idTemporada: number, idArbitro: string) {
    this.tempService.eliminarArbitroDeTemporada(idTemporada, idArbitro).subscribe({
      next: () => {
        this.tempService.emitNuevoArbitroAsignado();
      }
    });
  }




  openDialogEquipos(): void {
    this.dialog.open(AgregarEquipoComponent,{
      width: '250px',
    })
  }

  obtenerEstadoTemporada(idTemporada: number) {
    this.tempService.obtenerEstadoTemporada(idTemporada).subscribe({
      next: (result) => {
        this.estadoTemporada = result.estado;
      }
    });

  }

  generarPartidos(idTemporada: number) {
    this.tempService.generarPartidos(idTemporada).subscribe({
      next: (result) => {
        this.mensajePartidos = result.message;
        this.tempService.emitEstadoTemporadaActualizado();
      },
      error: (err) => {
        this.mensajePartidos = err.error[0].message;
      }
    });
  }

  obtenerPartidosTemporada() {
    this.tempService.obtenerPartidosTemporada(this.idTemporada).subscribe({
      next: (result) => {
        this.partidosTemporada = result;
      }
    });
  }

  agregarArbitroPartido(idPartido: number): void {
    localStorage.setItem('idPartido', idPartido.toString());
    this.dialog.open(AgregarArbitroPartidoComponent,{
      width: '250px',
    })
  }



  agregarFechaPartido(idPartido: number): void {
    localStorage.setItem('idPartido', idPartido.toString());
    this.dialog.open(AgregarFechaPartidoComponent,{
      width: '250px',
    })
  }


}


