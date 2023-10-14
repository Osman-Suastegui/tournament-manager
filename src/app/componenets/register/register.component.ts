import { Component } from '@angular/core';
import { Register } from '../../models/Register';
import { RegisterService } from '../../services/registerService/register.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';


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
    genero: '',
    rol: '',
  };

  constructor(
    private service: RegisterService,
    private router: Router
  ) { }



  register(form: NgForm) {
    console.log('registro value', this.registro);

    this.service.registerUser(this.registro)
      .subscribe(response => {
        this.router.navigate(['/home']);
      })
  }



}
