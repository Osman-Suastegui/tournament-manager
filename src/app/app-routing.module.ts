import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modulos/home/home/home.component';
import { LoginComponent } from './modulos/auth/login/login.component';
import { RegisterComponent } from './modulos/auth/register/register.component';
import { TemporadaCaracteriticasComponent } from './modulos/admin-ligas/temporada-caracteriticas/temporada-caracteriticas.component';
import { RegistroDeEstadisticasDeJugadoresPorPartidoComponent } from './modulos/arbitros/registro-de-estadisticas-de-jugadores-por-partido/registro-de-estadisticas-de-jugadores-por-partido.component';
import { VerPerfilComponent } from './modulos/vistas-generales/ver-perfil/ver-perfil.component';
import { JugadoresPartidoComponent } from './modulos/admin-equipos/jugadores-partido/jugadores-partido.component';
import { BusquedaUsuarioComponent } from './modulos/vistas-generales/busqueda-usuario/busqueda-usuario.component';

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
  },
  {
    path: 'perfil',
    component: VerPerfilComponent
  },
  {
    path: 'editar-jugadores-de-un-partido/:claveDelPartido',
    component: JugadoresPartidoComponent
  },
  {
    path: 'buscar-basico/:texto/:filtro',
    component: BusquedaUsuarioComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

