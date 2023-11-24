import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerPerfilComponent } from './ver-perfil/ver-perfil.component';
import { FooterModule } from '../footer/footer.module';
import { NavBarModule } from '../nav-bar/nav-bar.module';
import { FormsModule } from '@angular/forms';
import { BusquedaUsuarioComponent } from './busqueda-usuario/busqueda-usuario.component';




@NgModule({
  declarations: [
    VerPerfilComponent,
    BusquedaUsuarioComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    FooterModule,
    NavBarModule
  ]
})
export class VistasGeneralesModule { }
