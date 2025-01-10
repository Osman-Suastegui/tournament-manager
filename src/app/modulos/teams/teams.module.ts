import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { FormsModule } from '@angular/forms';
import { AddTeamComponent } from './add-team/add-team.component';


@NgModule({
  declarations: [AddTeamComponent],
  imports: [
    CommonModule,
    AngularMaterialModule,
  ]
})
export class TeamsModule { }
