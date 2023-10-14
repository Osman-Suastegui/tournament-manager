import { Component, OnInit } from '@angular/core';
import { AppService } from '../../services/loginService/login.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../../models/User';
import { Router } from '@angular/router';
import { HomeService } from 'src/app/services/homeService/home.service';

@Component({
  templateUrl: './home.component.html',
  selector: 'app-home'
})
export class HomeComponent implements OnInit {
  users?: User[];

  constructor(
    private app: HomeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.app.getUsers()
      .subscribe(users => {
        this.users = users;
      })
  }






}
