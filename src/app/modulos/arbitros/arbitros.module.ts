import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeArbitroComponent } from './home-arbitro/home-arbitro.component';
import { RegistroDeEstadisticasDeJugadoresPorPartidoComponent } from './registro-de-estadisticas-de-jugadores-por-partido/registro-de-estadisticas-de-jugadores-por-partido.component';
import { TablaEstadisticasDeJugadorPorPartidoComponent } from './tabla-estadisticas-de-jugador-por-partido/tabla-estadisticas-de-jugador-por-partido.component';
import {MatTableModule} from '@angular/material/table';
import { MatGridListModule } from '@angular/material/grid-list';
import { RxStompService } from './config-rx-stomp/rx-stomp.service';
import { rxStompServiceFactory } from './config-rx-stomp/rx-stomp-service-factory';
import { NavBarModule } from '../nav-bar/nav-bar.module';
import { FooterModule } from '../footer/footer.module';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
@NgModule({
  declarations: [
    HomeArbitroComponent,
    RegistroDeEstadisticasDeJugadoresPorPartidoComponent,
    TablaEstadisticasDeJugadorPorPartidoComponent
    
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatGridListModule,
    NavBarModule,
    FooterModule,
    AngularMaterialModule
  ],
  exports: [
    HomeArbitroComponent,
    RegistroDeEstadisticasDeJugadoresPorPartidoComponent
  ],
  providers: [{provide:RxStompService,useFactory:rxStompServiceFactory}]
})
export class ArbitrosModule { }
