import { FormControl } from "@angular/forms";

export interface AddTeamForm {
  name: FormControl<string>;
  email: FormControl<string>;
}
