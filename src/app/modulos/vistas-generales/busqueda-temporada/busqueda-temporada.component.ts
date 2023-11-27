import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { VistasGralService } from '../services/vistas-gral.service';
import { NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { equiposRanking } from '../interfaces/equiposRanking';



@Component({
  selector: 'app-busqueda-temporada',
  templateUrl: './busqueda-temporada.component.html',
  styleUrls: ['./busqueda-temporada.component.css']
})
export class BusquedaTemporadaComponent implements OnInit {

    constructor(private vistasService: VistasGralService, private router: Router, private route: ActivatedRoute) { }

    texto: any = '';
    temporadaId: any = '';
    equiposRanking: equiposRanking[] = [];


    ngOnInit(): void {
      // Obtén los parámetros de la ruta
      this.route.params.subscribe(params => {

        this.texto = params['texto'];
        this.temporadaId = params['temporadaId'];
        console.log("temporadaId:" + this.temporadaId)

      });
        this.obtenerRankingEquipos();


      this.router.events.pipe(
        filter(event => event instanceof NavigationEnd)
      ).subscribe(() => {
        // Obtén los nuevos parámetros de la ruta cuando cambie la URL
        this.route.params.subscribe(params => {
          this.texto = params['texto'];
          this.temporadaId = params['temporadaId'];

          //  this.partidos = [];
            //this.obtenerPartidosEquipo();
          this.obtenerRankingEquipos();
        });
      });
    }


    obtenerRankingEquipos() {
      this.vistasService.ObtenerRanking(this.temporadaId).subscribe({
        next: (data: any) => {
          console.log(data);

          // Convert the object into an array of objects
          this.equiposRanking = Object.keys(data).map(key => ({
            nombreEquipo: key,
            puntos: data[key]
          }));
          // sort by puntos
          this.equiposRanking.sort((a, b) => b.puntos - a.puntos);

          console.log(this.equiposRanking);
        },
        error: (error: any) => {
          console.log(error);
        }
      });
    }
    verEstadisticas(temporadaId: string, nombreEquipo: string) {
      this.router.navigate(['/estadisticas-temporada', temporadaId, nombreEquipo]);
    }



    }

