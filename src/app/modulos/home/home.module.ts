import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { AdminLigasModule } from '../admin-ligas/admin-ligas.module';
import { AdminEquiposModule } from '../admin-equipos/admin-equipos.module';
import { ArbitrosModule } from '../arbitros/arbitros.module';
import { JugadoresModule } from '../jugadores/jugadores.module';
import { NavBarModule } from '../nav-bar/nav-bar.module';
import { FooterModule } from '../footer/footer.module';
import { ButtonComponent } from 'src/app/shared/button/button.component';
import { TournamentCardComponent } from './tournament-card/tournament-card.component';
import { TournamentListComponent } from './tournament-list/tournament-list.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HomeComponent,
    TournamentCardComponent,
    TournamentListComponent
  ],
  imports: [
    CommonModule,
    AdminLigasModule,
    AdminEquiposModule,
    ArbitrosModule,
    JugadoresModule,
    NavBarModule,
    FooterModule,
    ButtonComponent,
    FormsModule
  ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule { }
