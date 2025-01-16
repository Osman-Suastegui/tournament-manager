import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LinkResponse, LinkService } from 'src/app/services/linkService/link.service';
import { url } from 'src/app/url-config';
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
    navigator.clipboard.writeText(this.link)
  }

  getLink(teamId:string,tournamentId:string){
    this.linkServ.getLink(teamId,tournamentId).subscribe({
      next:(link:LinkResponse) =>{
        this.link = `${url}/${link.token}` ;
      }
    })
  }

  closeModal() {
    this.dialogRef.close()
  }


}
