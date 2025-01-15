import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddTeamComponent } from './add-team/add-team.component';
import { AddPlayersToTeamLinkComponent } from './add-players-to-team-link/add-players-to-team-link.component';


@NgModule({
  declarations: [AddTeamComponent, AddPlayersToTeamLinkComponent],
  imports: [
    CommonModule,
    AngularMaterialModule,
    ReactiveFormsModule
  ]
})
export class TeamsModule { }
