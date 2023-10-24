import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modulos/home/home/home.component';
import { LoginComponent } from './modulos/auth/login/login.component';
import { RegisterComponent } from './modulos/auth/register/register.component';
import { TemporadaCaracteriticasComponent } from './modulos/admin-ligas/temporada-caracteriticas/temporada-caracteriticas.component';
import { RegistroDeEstadisticasDeJugadoresPorPartidoComponent } from './modulos/arbitros/registro-de-estadisticas-de-jugadores-por-partido/registro-de-estadisticas-de-jugadores-por-partido.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'temporadaCaracteristicas/:idTemporada',
    component: TemporadaCaracteriticasComponent
  },
  { path: 'ver-estadisticas-de-jugador-por-partido/:claveDelPartido',
    component: RegistroDeEstadisticasDeJugadoresPorPartidoComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

