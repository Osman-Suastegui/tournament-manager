import { Component, OnInit } from '@angular/core';
import { TemporadasService } from '../adminLigasService/temporadas.service';
import { format, parse, addHours } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';

@Component({
  selector: 'app-agregar-fecha-partido',
  templateUrl: './agregar-fecha-partido.component.html',
  styleUrls: ['./agregar-fecha-partido.component.css']
})
export class AgregarFechaPartidoComponent implements OnInit{

  fechaPartido: string = "";
  horaPartido: string = "";
  idPartido: number = 0;
  mensaje: string = "";

  constructor(private tempService: TemporadasService) { }



  ngOnInit(): void {
    this.idPartido = +localStorage.getItem('idPartido')!;
  }



  agendarPartido(idPartido: number, fecha: string, hora: string) {

    try {
      // Formatea la fecha y hora en el formato "YYYY-MM-DDTHH:mm:ss.000Z" (UTC)
      const fechaHoraLocal = new Date(`${fecha} ${hora}`);
      const fechaHoraUTC = new Date(fechaHoraLocal.toISOString());

      // Formatea la fecha y hora en el formato deseado: "YYYY-MM-DD HH:mm:ss"
      const fechaHoraZonaHoraria = fechaHoraUTC.toISOString().slice(0, 19).replace('T', ' ');


      this.tempService.agendarPartido(idPartido, fechaHoraZonaHoraria).subscribe({
          next: (result) => {
            this.mensaje = result.message;
            this.tempService.emitNuevaFechaPartidoAsignada();
          }
      });
    } catch (error) {
      this.mensaje = "Error al agendar el partido";
    }
  }



}
