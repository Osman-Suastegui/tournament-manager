import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeAnonimoComponent } from './home-anonimo/home-anonimo.component';


@NgModule({
  declarations: [
    HomeAnonimoComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HomeAnonimoComponent
  ]
})
export class AnonimoModule { }
