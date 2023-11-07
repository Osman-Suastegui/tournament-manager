import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeAdminEquipoComponent } from './home-admin-equipo/home-admin-equipo.component';
import { CrearEquipoComponent } from './crear-equipo/crear-equipo.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { AdministrarJugadoresComponent } from './administrar-jugadores/administrar-jugadores.component';
import { JugadoresPartidoComponent } from './jugadores-partido/jugadores-partido.component';



@NgModule({
  declarations: [
    HomeAdminEquipoComponent,
    CrearEquipoComponent,
    AdministrarJugadoresComponent,
    JugadoresPartidoComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule
  ],
  exports: [
    HomeAdminEquipoComponent
  ]
})
export class AdminEquiposModule { }
