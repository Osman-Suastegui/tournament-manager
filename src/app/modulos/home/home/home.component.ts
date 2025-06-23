import { Form } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from 'src/app/services/homeService/home.service';
import { authService } from '../../../services/authenticateService/auth.service';
import { FormControl } from '@angular/forms';

@Component({
  templateUrl: './home.component.html',
  selector: 'app-home',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public search: FormControl<string> = new FormControl<string>('', { nonNullable: true });

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

