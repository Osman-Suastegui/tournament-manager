import { Component } from '@angular/core';
import { NavbarService } from '../../services/navbarService/navbar.service';
import { Router } from '@angular/router';
import { authService } from '../../services/authenticateService/auth.service';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent {

  constructor(
    private app: NavbarService,
    private auth: authService,
    private router: Router
  ) {}
    role: string = '';
    usuario: string = '';
    tipoUsuario: string = '';

  logout() {
    this.app.logout();
    this.router.navigate(['/login']);
  }

  register() {
    this.router.navigate(['/register']);
  }

  goToHome() {

  }



  getRoleUser(usuario: string) {
    this.auth.getTypeOfUser(usuario).subscribe({
      next: (tipo) => {
        this.tipoUsuario = tipo;
      },
      error: (error) => {
        console.error('Error al obtener el tipo de usuario:', error);
      }
    });
}

}
