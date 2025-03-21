import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function minimumTeamsValidator(minTeams: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const teams = control.value as any[];
    return teams.length >= minTeams ? null : { minTeams: { requiredTeams: minTeams, actualTeams: teams.length } };
  };
}
