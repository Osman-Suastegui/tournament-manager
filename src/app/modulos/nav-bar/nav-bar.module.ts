import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from '../../componenets/nav-bar/nav-bar.component';
import { HomeComponent } from 'src/app/componenets/home/home.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';



@NgModule({
  declarations: [
    NavBarComponent,
    HomeComponent
  ],
  imports: [
    AngularMaterialModule,
    CommonModule
  ]
})
export class NavBarModule { }
