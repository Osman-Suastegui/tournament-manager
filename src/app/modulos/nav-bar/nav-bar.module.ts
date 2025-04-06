import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { ButtonComponent } from "../../shared/button/button.component";
import { NotificationsModule } from '../notifications/notifications.module';

@NgModule({
  declarations: [
    NavBarComponent,
    SidebarComponent
  ],
  imports: [
    AngularMaterialModule,
    CommonModule,
    RouterModule,
    ButtonComponent,
    NotificationsModule
],
  exports: [
    NavBarComponent
  ]
})
export class NavBarModule { }
