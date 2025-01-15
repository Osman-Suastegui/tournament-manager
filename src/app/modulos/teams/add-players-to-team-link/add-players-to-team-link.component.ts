import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { authService } from 'src/app/services/authenticateService/auth.service';
import { TeamService } from '../teamService/team.service';
import { LinkService } from 'src/app/services/linkService/link.service';

@Component({
  selector: 'app-add-players-to-team-link',
  templateUrl: './add-players-to-team-link.component.html',
  styleUrls: ['./add-players-to-team-link.component.css']
})
export class AddPlayersToTeamLinkComponent implements OnInit {

  public link:string = "";
  constructor(
    private linkServ:LinkService,
    @Inject(MAT_DIALOG_DATA) public data: { tournamentId: string , teamId:string },
    private dialogRef: MatDialogRef<AddPlayersToTeamLinkComponent>
  ) { }

  ngOnInit(): void {
    this.getLink(this.data.teamId,this.data.tournamentId)
  }

  copyLink(){
    console.log("link copy -> ",this.link)
  }

  getLink(teamId:string,tournamentId:string){
    this.linkServ.getLink(teamId,tournamentId).subscribe({
      next:(link:string) =>{
        this.link = link
        console.log("link",link)
      }
    })
  }

  closeModal() {
    this.dialogRef.close()
  }


}
