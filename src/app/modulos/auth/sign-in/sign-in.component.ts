import { Component } from "@angular/core";
import { authService } from "../../../services/authenticateService/auth.service";
import { Router } from "@angular/router";
import { createCredentialForm, Credential } from "../../../models/Login/Credential";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  templateUrl: "./sign-in.component.html",
  styleUrls: ["./sign-in.component.css"],
  selector: "app-sign-in",
})
export class SignInComponent {
  signInForm = createCredentialForm(); // ✅ Uses helper function from the model

  constructor(
    private auth: authService,
    private router: Router
  ){}

  login() {
    if (this.signInForm.invalid) {
      return;
    }
    const credentials:Credential = this.signInForm.getRawValue();

    this.auth.login(credentials).subscribe({
      next: () => {
        this.router.navigate(["/home"]);
      },
      error: (error: HttpErrorResponse) => {
        if(error.status === 400){
          this.signInForm.setErrors({ invalidCredentials: true });
          console.log("invalid ",this.signInForm.errors)
        }
      }
    });
  }

}
