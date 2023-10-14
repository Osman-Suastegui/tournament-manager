import { Component } from '@angular/core';
import { NavbarService } from '../../services/navbarService/navbar.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent {

  constructor(
    private app: NavbarService,
    private router: Router
  ) {}


  logout() {
    this.app.logout();


  
    this.router.navigate(['/login']);
  }

  register() {
    this.router.navigate(['/register']);
  }

}
