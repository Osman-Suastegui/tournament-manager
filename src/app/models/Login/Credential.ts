import { FormControl, FormGroup, Validators } from "@angular/forms";

export interface Credential {
  email: string;
  password: string;
}

export const createEmptyCredentials = (): Credential => ({
  email: "",
  password: "",
});

// ✅ Function to create a strongly-typed FormGroup
export function createCredentialForm(): FormGroup<{
  email: FormControl<string>;
  password: FormControl<string>;
}> {
  return new FormGroup({
    email: new FormControl("", { nonNullable: true, validators: [Validators.required] }),
    password: new FormControl("", { nonNullable: true, validators: [Validators.required] }),
  });
}
