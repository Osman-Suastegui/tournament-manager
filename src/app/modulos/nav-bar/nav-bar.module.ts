import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { ButtonComponent } from "../../shared/button/button.component";

@NgModule({
  declarations: [
    NavBarComponent,
    SidebarComponent
  ],
  imports: [
    AngularMaterialModule,
    CommonModule,
    RouterModule,
    ButtonComponent
],
  exports: [
    NavBarComponent
  ]
})
export class NavBarModule { }
