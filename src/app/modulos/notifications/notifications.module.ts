import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationsDropdownComponent } from './notifications-dropdown/notifications-dropdown.component';
import { NotificationsDropdownCardComponent } from './notifications-dropdown/notifications-dropdown-card/notifications-dropdown-card.component';



@NgModule({
  declarations: [
    NotificationsDropdownComponent,
    NotificationsDropdownCardComponent
  ],
  imports: [
    CommonModule
  ],exports: [
    NotificationsDropdownComponent
  ]
})
export class NotificationsModule { }
