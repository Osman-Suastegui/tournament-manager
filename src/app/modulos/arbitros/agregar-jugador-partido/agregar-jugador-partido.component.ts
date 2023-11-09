import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-agregar-jugador-partido',
  templateUrl: './agregar-jugador-partido.component.html',
  styleUrls: ['./agregar-jugador-partido.component.css']
})
export class AgregarJugadorPartidoComponent {
  @Input() claveDelPartido: number | undefined;
  @Input() nombreEquipo: string | undefined;

  constructor() { }


  agregarJugadorAPartido(){
    console.log(this.claveDelPartido);
    console.log(this.nombreEquipo);
  }

}
