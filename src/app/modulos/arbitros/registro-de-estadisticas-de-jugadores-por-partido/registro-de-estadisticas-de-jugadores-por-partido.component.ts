import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-registro-de-estadisticas-de-jugadores-por-partido',
  templateUrl: './registro-de-estadisticas-de-jugadores-por-partido.component.html',
  styleUrls: ['./registro-de-estadisticas-de-jugadores-por-partido.component.css']
})
export class RegistroDeEstadisticasDeJugadoresPorPartidoComponent implements OnInit {
  claveDelPartido: number | undefined;
  nombreEquipo1 = "Equipo Aguilas del Infierno";
  nombreEquipo2 = "Chivas";

  constructor(private route: ActivatedRoute) {}
  
  ngOnInit(): void {
    this.route.params.subscribe(params => this.claveDelPartido = params['claveDelPartido']);
  
  }
  


}
