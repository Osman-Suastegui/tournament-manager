import { Component } from '@angular/core';
import { Liga } from '../../../models/Ligas/Ligas';
import { LigasServiceService } from '../../../services/ligasService/ligas-service.service';

@Component({
  selector: 'app-crear-liga',
  templateUrl: './crear-liga.component.html',
  styleUrls: ['./crear-liga.component.css']
})
export class CrearLigaComponent {
  liga: Liga = {
    nombre: ''
  }

  resul: any = "";
  mensaje: string = "";


  constructor(private ligaService: LigasServiceService) {}

  crearLiga() {

    this.ligaService.createLiga(this.liga).subscribe({
      next: () => {
        // Manejo de respuesta exitosa
        console.log('Liga creada exitosamente.');
        this.mensaje = 'Liga creada exitosamente.';
      },
      error: (error) => {
        this.resul = error;
        if(this.resul.status === 200){
          console.log('Liga creada exitosamente.');
          this.mensaje = 'Liga creada exitosamente.';
        }else {
          console.log(this.resul.error[0].message);
          this.mensaje = this.resul.error[0].message;
        }
      }
    });
  }

}
