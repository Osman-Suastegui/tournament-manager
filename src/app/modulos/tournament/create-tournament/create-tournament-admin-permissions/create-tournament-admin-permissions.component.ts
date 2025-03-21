import { Component, Input, OnInit } from "@angular/core";
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { AdminPermissions, SelectTeamsTournament, Team } from "../../interface";
import { TournamentService } from "../../tournament.service";

@Component({
  selector: "app-create-tournament-admin-permissions",
  templateUrl: "./create-tournament-admin-permissions.component.html",
  styleUrls: ["./create-tournament-admin-permissions.component.css"]
})
export class CreateTournamentAdminPermissionsComponent {

  constructor(private tournamentServ: TournamentService) { }

  @Input() adminPermissions: FormGroup<AdminPermissions> = this.tournamentServ.createAdminPermissionsForm();
  @Input() selectTeams!: FormGroup<SelectTeamsTournament>;

  // add email required
  adminEmail: FormControl<string | null> = new FormControl("", [Validators.email]);

  get admins() {
    return this.adminPermissions.get("admins")?.value || [];
  }

  set admins(admins: string[]) {
    this.adminPermissions.get("admins")?.setValue(admins);
  }

  addAdmin() {
    if (this.adminEmail.value?.length === 0 || this.adminEmail.invalid || this.admins.includes(this.adminEmail.value || "")) {
      return;
    }

    this.admins = [...this.admins, this.adminEmail.value as string];
    this.adminEmail.setValue("");
  }

  getLeaderEmailControl(t:any): FormControl<any> {
    return t.get("leaderEmail") as FormControl<any>;

  }

  displayTag(admin: string) {
    return admin;
  }

}
