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
  mensajeEquipos: string = "No hay equipos Asignados";
  mensajeArbitros: string = "No hay arbitros Asignados";

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




  openDialogEquipos(): void {
    this.dialog.open(AgregarEquipoComponent,{
      width: '250px',
    })
  }


}


