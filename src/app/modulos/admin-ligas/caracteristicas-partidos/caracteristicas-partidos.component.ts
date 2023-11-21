import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { TemporadasService } from '../adminLigasService/temporadas.service';
import { PartidosCaracteristicas } from '../interfaces/PartidosCaracteristicas';

@Component({
  selector: 'app-caracteristicas-partidos',
  templateUrl: './caracteristicas-partidos.component.html',
  styleUrls: ['./caracteristicas-partidos.component.css']
})
export class CaracteristicasPartidosComponent implements OnInit{

  mensaje: string = '';
  partidosCaracteristicas: PartidosCaracteristicas = {
    numeroEquiposTemporada: 0,
    cantidadDeEncuentros: 0,
    cantidadEquiposPlayOff: 0
  };


  constructor(private tempService: TemporadasService) {}


  ngOnInit(): void {
  }



  guardarDatos(partidosCaracteristicas: PartidosCaracteristicas){
    console.log(partidosCaracteristicas);

    if(partidosCaracteristicas.cantidadEquiposPlayOff > partidosCaracteristicas.numeroEquiposTemporada){
      this.mensaje = 'La cantidad de equipos en playoff no puede ser mayor a la cantidad de equipos en la temporada';
      return;
    }
    //valida que cantidad de equipos no sea 0
    if(partidosCaracteristicas.numeroEquiposTemporada < 2){
      this.mensaje = 'La cantidad de equipos no puede ser menor de 2';
      return;
    }
    //valida que cantidad de encuentros no sea 0
    if(partidosCaracteristicas.cantidadDeEncuentros == 0){
      this.mensaje = 'La cantidad de encuentros no puede ser 0';
      return;
    }
    //valida que cantidad de equipos en playoff no sea 0
    if(partidosCaracteristicas.cantidadEquiposPlayOff < 2){
      this.mensaje = 'La cantidad de equipos en playoff no puede ser menor de 2';
      return;
    }

  }


}
