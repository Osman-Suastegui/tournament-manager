import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './componenets/home/home.component';
import { LoginComponent } from './componenets/login/login.component';
import { RegisterComponent } from './componenets/register/register.component';
import { NavBarComponent } from './componenets/nav-bar/nav-bar.component';

const routes: Routes = [
  {
    path: 'home',
    component: NavBarComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
