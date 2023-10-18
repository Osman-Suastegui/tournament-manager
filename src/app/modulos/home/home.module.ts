import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { AdminLigasModule } from '../admin-ligas/admin-ligas.module';
import { AdminEquiposModule } from '../admin-equipos/admin-equipos.module';
import { ArbitrosModule } from '../arbitros/arbitros.module';
import { JugadoresModule } from '../jugadores/jugadores.module';
import { AnonimoModule } from '../anonimo/anonimo.module';
import { NavBarModule } from '../nav-bar/nav-bar.module';



@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    AdminLigasModule,
    AdminEquiposModule,
    ArbitrosModule,
    JugadoresModule,
    AnonimoModule,
    NavBarModule
  ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule { }
