import { Component } from '@angular/core';
import { NavbarService } from '../../../services/navbarService/navbar.service';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { authService } from '../../../services/authenticateService/auth.service';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit{

  constructor(
    private app: NavbarService,
    private router: Router,
    private auth: authService
  ) {}
    usuario: string = localStorage.getItem('usuario') || '';
    tipoUsuario: string = '';

  logout() {
    this.app.logout();
    this.tipoUsuario = "ANONIMO";
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);
  }

  login(){
    this.router.navigate(['/login']);
  }

  register() {
    this.router.navigate(['/register']);
  }

  goHome(){
    this.router.navigate(['/home']);
  }


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
