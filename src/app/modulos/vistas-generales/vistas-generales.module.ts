import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerPerfilComponent } from './ver-perfil/ver-perfil.component';
import { FooterModule } from '../footer/footer.module';
import { NavBarModule } from '../nav-bar/nav-bar.module';
import { FormsModule } from '@angular/forms';
import { BusquedaEquipoComponent } from './busqueda-equipo/busqueda-equipo.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { BusquedaUsuarioComponent } from './busqueda-usuario/busqueda-usuario.component';
import { BusquedaLigaComponent } from './busqueda-liga/busqueda-liga.component';
import { BusquedaTemporadaComponent } from './busqueda-temporada/busqueda-temporada.component';
import { EstadisticasTemporadaComponent } from './estadisticas-temporada/estadisticas-temporada.component';




@NgModule({
  declarations: [
    VerPerfilComponent,
    BusquedaEquipoComponent,
    BusquedaUsuarioComponent,
    BusquedaLigaComponent,
    BusquedaTemporadaComponent,
    EstadisticasTemporadaComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    FooterModule,
    NavBarModule,
    AngularMaterialModule
  ]
})
export class VistasGeneralesModule { }
