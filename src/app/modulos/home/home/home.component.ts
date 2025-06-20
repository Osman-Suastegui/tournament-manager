import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from 'src/app/services/homeService/home.service';
import { authService } from '../../../services/authenticateService/auth.service';

@Component({
  templateUrl: './home.component.html',
  selector: 'app-home',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public search: string = '';

  constructor(
    private app: HomeService,
    private router: Router,
    private auth: authService
  ) { }

  usuario: string = localStorage.getItem('usuario') || '';
  tipoUsuario: any = '';

  ngOnInit(): void {
  }

  goToCreateTournament() {
    this.router.navigate(['/tournament']);
  }



}

