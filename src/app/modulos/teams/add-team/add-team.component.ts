import { Component, Inject } from "@angular/core";
import { OnInit } from "@angular/core";
import { TeamService } from "../teamService/team.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormGroup } from "@angular/forms";
import { AddTeamForm } from "../interfaces";
import { Team } from "../../tournament/interface";
import { authService } from "src/app/services/authenticateService/auth.service";

// MODAL FOR ADDING A TEAM TO A TOURNAMENT
@Component({
  selector: "app-add-team",
  templateUrl: "./add-team.component.html",
  styleUrls: ["./add-team.component.css"]
})
export class AddTeamComponent {

  constructor(
    private teamServ: TeamService,
    @Inject(MAT_DIALOG_DATA) public data: { tournamentId: string },
  ) { }

  public addTeamForm: FormGroup<AddTeamForm> = this.teamServ.createAddTeamForm();

  addTeam(): void {
    if(this.addTeamForm.invalid) return;
    const teamToAdd: Team = this.mapAddTeamFormToTeam(this.addTeamForm);
    this.teamServ.newTeamSubject.next(teamToAdd);
    this.addTeamForm.reset();
    console.log(this.addTeamForm.value);
  }

  mapAddTeamFormToTeam(addTeamForm: FormGroup<AddTeamForm>): Team {
    const { name } = addTeamForm.value;
    const team: Team = {
      id: "",
      name: name ?? "",
      leaderEmail: "",
    };
    return team;
  }

  // agregarEquipoTemp(tempId: number, nombreEquipo: string) {

  //   this.tempService.asignarEquipoATemporada(tempId, nombreEquipo).subscribe({
  //     next: () => {
  //       this.mensaje = "Equipo agregado correctamente";
  //       this.selectedEquipo = '';
  //       this.tempService.emitNuevoEquipoAsignado();
  //     },
  //     error: () => {
  //       if(nombreEquipo == '')
  //         this.mensaje = "Seleccione un equipo";
  //     }
  //   });
  // }

  // obtenerEquiposSinTemporada(idTemporada: number) {
  //   this.tempService.obtenerEquiposNoEnTemporada(idTemporada).subscribe({
  //     next: (result) => {
  //       result.forEach((element: any) => {
  //         this.equipos.push(element);
  //       })
  //     }
  //   });
  // }

}

