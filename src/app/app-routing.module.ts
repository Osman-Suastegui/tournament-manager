import { NgModule } from "@angular/core";
import { provideRouter, RouterModule, Routes, withComponentInputBinding } from "@angular/router";
import { HomeComponent } from "./modulos/home/home/home.component";
import { SignInComponent } from "./modulos/auth/sign-in/sign-in.component";
import { SignUpComponent } from "./modulos/auth/sign-up/sign-up.component";
import { TemporadaCaracteriticasComponent } from "./modulos/admin-ligas/temporada-caracteriticas/temporada-caracteriticas.component";
import { RegistroDeEstadisticasDeJugadoresPorPartidoComponent } from "./modulos/arbitros/registro-de-estadisticas-de-jugadores-por-partido/registro-de-estadisticas-de-jugadores-por-partido.component";
import { VerPerfilComponent } from "./modulos/vistas-generales/ver-perfil/ver-perfil.component";
import { JugadoresPartidoComponent } from "./modulos/admin-equipos/jugadores-partido/jugadores-partido.component";
import { BusquedaEquipoComponent } from "./modulos/vistas-generales/busqueda-equipo/busqueda-equipo.component";
import { BusquedaLigaComponent } from "./modulos/vistas-generales/busqueda-liga/busqueda-liga.component";
import { BusquedaTemporadaComponent } from "./modulos/vistas-generales/busqueda-temporada/busqueda-temporada.component";
import { BusquedaUsuarioComponent } from "./modulos/vistas-generales/busqueda-usuario/busqueda-usuario.component";
import { EstadisticasTemporadaComponent } from "./modulos/vistas-generales/estadisticas-temporada/estadisticas-temporada.component";
import { CondicionesUsoComponent } from "./modulos/vistas-generales/condiciones-uso/condiciones-uso.component";
import { PoliticiasPrivacidadComponent } from "./modulos/vistas-generales/politicias-privacidad/politicias-privacidad.component";
import { RankingJugadoresTemporadaComponent } from "./modulos/vistas-generales/ranking-jugadores-temporada/ranking-jugadores-temporada.component";
import { ErrorMessageComponent } from "./shared/error-message/error-message.component";

const routes: Routes = [
  {
    path: "home",
    component: HomeComponent
  },
  {
    path: "signin",
    component: SignInComponent
  },
  {
    path: "signup",
    component: SignUpComponent
  },
  {
    path: "temporadaCaracteristicas/:idTemporada/:idLiga",
    component: TemporadaCaracteriticasComponent
  },
  {
    path:"tournament",
    loadChildren:() => import("./modulos/tournament/tournament.module").then(m => m.TournamentModule)
  },
  { path: "ver-estadisticas-de-jugador-por-partido/:claveDelPartido",
    component: RegistroDeEstadisticasDeJugadoresPorPartidoComponent
  },
  {
    path: "perfil",
    component: VerPerfilComponent
  },
  {
    path: "editar-jugadores-de-un-partido/:claveDelPartido",
    component: JugadoresPartidoComponent
  },
  {
    path: "buscar-equipo/:texto",
    component: BusquedaEquipoComponent
  },
  {
    path: "buscar-liga/:texto/:ligaId",
    component: BusquedaLigaComponent
  },
  {
    path: "buscar-temporada/:texto/:temporadaId",
    component: BusquedaTemporadaComponent
  },
  {
    path: "buscar-usuario/:texto",
    component: BusquedaUsuarioComponent
  },
  {
    path: "estadisticas-temporada/:temporadaId/:nombreEquipo",
    component: EstadisticasTemporadaComponent
  },
  {
    path: "condiciones-uso",
    component: CondicionesUsoComponent
  },
  {
    path: "politica-privacidad",
    component: PoliticiasPrivacidadComponent
  },
  {
    path: "ranking-jugadores-temporada/:temporadaId",
    component: RankingJugadoresTemporadaComponent
  },
  {
    path: "invalid",
    component: ErrorMessageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { bindToComponentInputs: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

