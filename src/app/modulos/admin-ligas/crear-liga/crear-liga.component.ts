import { Component } from '@angular/core';

@Component({
  selector: 'app-crear-liga',
  templateUrl: './crear-liga.component.html',
  styleUrls: ['./crear-liga.component.css']
})
export class CrearLigaComponent {


  crearLiga(){
    console.log("Liga creada");
  }
}
