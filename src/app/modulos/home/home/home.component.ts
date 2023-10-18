import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from 'src/app/services/homeService/home.service';
import { authService } from '../../../services/authenticateService/auth.service';

@Component({
  templateUrl: './home.component.html',
  selector: 'app-home'
})
export class HomeComponent implements OnInit{

  constructor(
    private app: HomeService,
    private router: Router,
    private auth: authService
  ) {}
  usuario: string = localStorage.getItem('usuario') || '';
  tipoUsuario: string = '';


  ngOnInit(): void {
    this.getRoleUser(this.usuario);
  }

  getRoleUser(usuario: string) {
    this.auth.getTypeOfUser(usuario).subscribe({
      next: (tipo) => {
        this.tipoUsuario = tipo;
      },
      error: (error) => {
        this.tipoUsuario = "ANONIMO";
      }
    });
}


}






