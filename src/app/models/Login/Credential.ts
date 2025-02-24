import { FormControl, FormGroup, Validators } from "@angular/forms";

export interface Credential {
  usuario: string;
  password: string;
}

export const createEmptyCredentials = (): Credential => ({
  usuario: "",
  password: "",
});

// ✅ Function to create a strongly-typed FormGroup
export function createCredentialForm(): FormGroup<{
  usuario: FormControl<string>;
  password: FormControl<string>;
}> {
  return new FormGroup({
    usuario: new FormControl("", { nonNullable: true, validators: [Validators.required] }),
    password: new FormControl("", { nonNullable: true, validators: [Validators.required] }),
  });
}
