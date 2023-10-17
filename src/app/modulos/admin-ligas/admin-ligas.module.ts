import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeAdminLigasComponent } from '../../componenets/home-admin-ligas/home-admin-ligas.component';




@NgModule({
  declarations: [
    HomeAdminLigasComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HomeAdminLigasComponent
  ]
})
export class AdminLigasModule { }
