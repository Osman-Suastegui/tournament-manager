import { Component, Inject } from '@angular/core';
import { TeamService } from '../teamService/team.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';
import { AddPlayerToTeamForm } from '../interfaces';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-player-to-team',
  templateUrl: './add-player-to-team.component.html',
  styleUrls: ['./add-player-to-team.component.css']
})
export class AddPlayerToTeamComponent {

  constructor(
    private teamServ: TeamService,
    @Inject(MAT_DIALOG_DATA) public data: { teamId: string, tournamentId: string },
    private dialogRef: MatDialogRef<AddPlayerToTeamComponent>
  ) { }

  public addPlayerToTeamForm: FormGroup<AddPlayerToTeamForm> = this.teamServ.createAddPlayerToTeamForm()

  addPlayerToTeam(teamId: string,tournamentId:string): void {
    if (this.addPlayerToTeamForm.invalid) {
      return
    }
    const name  = this.addPlayerToTeamForm.value.name as string
    console.log("name",name)
    this.teamServ.addPlayerToTeamInTournament(tournamentId,teamId,name).subscribe({
      next: (res) => {
        console.log("res",res)
        this.closeModal()
      },
      error: (err:HttpErrorResponse) => {
        console.log("err",err)
      }
    })
  }

  closeModal() {
    this.dialogRef.close()
  }

}
