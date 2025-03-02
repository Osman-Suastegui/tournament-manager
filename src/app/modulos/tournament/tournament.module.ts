import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CreateTournamentComponent } from "./create-tournament/create-tournament.component";
import { TournamentRoutingModule } from "./tournament-routing.module";
import { ReactiveFormsModule } from "@angular/forms";
import { AngularMaterialModule } from "../angular-material/angular-material.module";
import { GoogleMapsModule } from "@angular/google-maps";
import { SideNavContestManagementComponent } from "./side-nav-contest-management/side-nav-contest-management.component";
import { DirectiveModule } from "src/app/directives/directive.module";
import { TournamentManagementComponent } from "./tournament-management/tournament-management.component";
import { TreeDiagramsModule } from "../tree-diagrams/tree-diagrams.module";
import { MatchesComponent } from './matches/matches.component';
import { ButtonComponent } from "../../shared/button/button.component";
import { StepperComponent } from './stepper/stepper.component';
import { InputComponent } from "../../shared/input/input.component";
import { TournamentTypeSelectionComponent } from './create-tournament/tournament-type-selection/tournament-type-selection.component';

@NgModule({
  declarations: [
    CreateTournamentComponent,
    TournamentManagementComponent,
    SideNavContestManagementComponent,
    MatchesComponent,
    StepperComponent,
    TournamentTypeSelectionComponent,
  ],
  imports: [
    CommonModule,
    TournamentRoutingModule, // ROUTES
    ReactiveFormsModule,
    AngularMaterialModule,
    GoogleMapsModule,
    DirectiveModule,
    TreeDiagramsModule,
    ButtonComponent,
    InputComponent
],
  exports:[
    CreateTournamentComponent
  ]
})
export class TournamentModule { }
