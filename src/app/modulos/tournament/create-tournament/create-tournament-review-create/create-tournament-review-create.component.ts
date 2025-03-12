import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AdminPermissions, BasicInformationTournament, SelectTeamsTournament } from '../../interface';
import { TournamentService } from '../../tournament.service';

@Component({
  selector: 'app-create-tournament-review-create',
  templateUrl: './create-tournament-review-create.component.html',
  styleUrls: ['./create-tournament-review-create.component.css']
})
export class CreateTournamentReviewCreateComponent {
  @Input() basicInformation: FormGroup<BasicInformationTournament> = this.tournamentServ.createBasicInformationTournamentForm()
  @Input() selectTeams: FormGroup<SelectTeamsTournament> = this.tournamentServ.createSelectTeamsTournamentForm()
  @Input() adminPermissions: FormGroup<AdminPermissions> = this.tournamentServ.createAdminPermissionsForm()

  public tournamentType: string = this.tournamentServ.getContestTypeName(this.basicInformation.value.tournamentType);
  constructor(public tournamentServ:TournamentService) { }


}
