import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PartidosService } from 'src/app/services/partidosService/partidos.service';
@Component({
  selector: 'app-registro-de-estadisticas-de-jugadores-por-partido',
  templateUrl: './registro-de-estadisticas-de-jugadores-por-partido.component.html',
  styleUrls: ['./registro-de-estadisticas-de-jugadores-por-partido.component.css']
})
export class RegistroDeEstadisticasDeJugadoresPorPartidoComponent implements OnInit {
  claveDelPartido: number | undefined;
  nombreEquipo1 = "Miami Heat";
  nombreEquipo2 = "Denver Nuggets";

  constructor(private route: ActivatedRoute,private PartidoService:PartidosService) {}
  
  ngOnInit(): void {
    this.route.params.subscribe(params => this.claveDelPartido = params['claveDelPartido']);
    this.obtenerEquiposDePartido();
  }
  obtenerEquiposDePartido(){

    this.PartidoService.obtenerPartido(this.claveDelPartido).subscribe((partido)=>{
      this.nombreEquipo1=partido.equipo1;
      this.nombreEquipo2=partido.equipo2;
      
    });

  }


}
