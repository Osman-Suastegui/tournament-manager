import { Component } from "@angular/core";
import { authService } from "../../../services/authenticateService/auth.service";
import { Router, ActivatedRoute } from "@angular/router";
import { createCredentialForm, Credential } from "../../../models/Login/Credential";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  templateUrl: "./sign-in.component.html",
  styleUrls: ["./sign-in.component.css"],
  selector: "app-sign-in",
})
export class SignInComponent {
  signInForm = createCredentialForm();

  constructor(
    private auth: authService,
    private router: Router,
    private route: ActivatedRoute
  ){}

  login() {
    if (this.signInForm.invalid) {
      this.signInForm.markAllAsTouched();
      return;
    }
    const credentials:Credential = this.signInForm.getRawValue();

    this.auth.login(credentials).subscribe({
      next: (data) => {
        const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
        this.router.navigate([returnUrl]);
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
