import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from 'src/app/services/homeService/home.service';

@Component({
  templateUrl: './home.component.html',
  selector: 'app-home'
})
export class HomeComponent{

  constructor(
    private app: HomeService,
    private router: Router
  ) {}


}






