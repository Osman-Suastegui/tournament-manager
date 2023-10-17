import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from '../../componenets/nav-bar/nav-bar.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { AdminLigasModule } from '../admin-ligas/admin-ligas.module';
import { AdminEquiposModule } from '../admin-equipos/admin-equipos.module';
import { ArbitrosModule } from '../arbitros/arbitros.module';
import { JugadoresModule } from '../jugadores/jugadores.module';
import { AnonimoModule } from '../anonimo/anonimo.module';



@NgModule({
  declarations: [
    NavBarComponent,
  ],
  imports: [
    AngularMaterialModule,
    CommonModule,
    AdminLigasModule,
    AdminEquiposModule,
    ArbitrosModule,
    JugadoresModule,
    AnonimoModule
  ]
})
export class NavBarModule { }
