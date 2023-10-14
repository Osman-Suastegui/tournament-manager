import { Component, OnInit } from '@angular/core';
import { AppService } from '../../services/loginService/login.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Credential } from '../../models/Credential';



@Component({
  templateUrl: './login.component.html'
})
export class LoginComponent {
  creds: Credential = {
    usuario: '',
    password: ''
  };



  constructor(
    private app: AppService,
    private http: HttpClient,
    private router: Router
  ) {
  }

  login(form: NgForm){
    console.log('form value', form.value);

    this.app.login(this.creds)
    .subscribe(response => {
      this.router.navigate(['/home']);
  })
}


}
