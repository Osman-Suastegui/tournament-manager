import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeJugadorComponent } from 'src/app/componenets/home-jugador/home-jugador.component';



@NgModule({
  declarations: [
    HomeJugadorComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HomeJugadorComponent
  ]
})
export class JugadoresModule { }
