import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeAdminLigasComponent } from './home-admin-ligas/home-admin-ligas.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { CrearLigaComponent } from './crear-liga/crear-liga.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';



@NgModule({
  declarations: [
    HomeAdminLigasComponent,
    CrearLigaComponent
  ],
  imports: [
    AngularMaterialModule,
    CommonModule,
    BrowserAnimationsModule,

  ],
  exports: [
    HomeAdminLigasComponent,
    CrearLigaComponent
  ]
})
export class AdminLigasModule { }
