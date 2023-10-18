import { Component, OnInit } from '@angular/core';
import { authService } from '../../../services/authenticateService/auth.service';
import { Router } from '@angular/router';
import { Credential } from '../../../models/Login/Credential';




@Component({
  templateUrl: './login.component.html'

})
export class LoginComponent {
  creds: Credential = {
    usuario: '',
    password: ''
  };
  error: any;


  constructor(
    private auth: authService,
    private router: Router
  ) {
  }

  login() {
    this.auth.login(this.creds).subscribe({
      next: () => {
        // Manejo de respuesta exitosa
        this.router.navigate(['/home']);
      },
      error: (error) => {
        this.error = error;
      }
    });
  }

}
