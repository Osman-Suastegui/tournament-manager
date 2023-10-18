import { Component } from '@angular/core';
import { Register } from '../../../models/Login/Register';
import { Router } from '@angular/router';
import { authService } from 'src/app/services/authenticateService/auth.service';
import { Gender } from '../../../models/Login/Gender';
import { Role } from '../../../models/Login/Role';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registro: Register = {
    usuario: '',
    nombre: '',
    fechaNacimiento: new Date(),
    apellido: '',
    email: '',
    password: '',
    genero: Gender.MASCULINO,
    rol: Role.ANONIMO
  };

  error: any;

  constructor(
    private service: authService,
    private router: Router
  ) { }


  register() {
    this.service.registerUser(this.registro).subscribe({
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





