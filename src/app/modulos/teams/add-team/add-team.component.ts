import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { TemporadasService } from '../../admin-ligas/adminLigasService/temporadas.service';
// MODAL FOR ADDING A TEAM TO A TOURNAMENT
@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.css']
})
export class AddTeamComponent implements OnInit{

  constructor(private tempService: TemporadasService) {}

  temporadaId: number = 0;

  equipos: string[] = [];
  mensaje: string = "";
  selectedEquipo: string = '';

  ngOnInit(): void {
    this.temporadaId = +localStorage.getItem('idTemporada')!;
    this.obtenerEquiposSinTemporada(this.temporadaId);

    this.tempService.onNuevoEquipoAsignado().subscribe({
      next: () => {
        this.equipos = [];
        this.obtenerEquiposSinTemporada(this.temporadaId);
      }
    });

  }
  addTeam():void {

  }

  agregarEquipoTemp(tempId: number, nombreEquipo: string) {

    this.tempService.asignarEquipoATemporada(tempId, nombreEquipo).subscribe({
      next: () => {
        this.mensaje = "Equipo agregado correctamente";
        this.selectedEquipo = '';
        this.tempService.emitNuevoEquipoAsignado();
      },
      error: () => {
        if(nombreEquipo == '')
          this.mensaje = "Seleccione un equipo";
      }
    });
  }

  obtenerEquiposSinTemporada(idTemporada: number) {
    this.tempService.obtenerEquiposNoEnTemporada(idTemporada).subscribe({
      next: (result) => {
        result.forEach((element: any) => {
          this.equipos.push(element);
        })
      }
    });
  }

}

