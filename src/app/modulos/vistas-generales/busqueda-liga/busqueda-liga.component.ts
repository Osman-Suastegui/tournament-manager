import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { VistasGralService } from '../services/vistas-gral.service';
import { NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-busqueda-liga',
  templateUrl: './busqueda-liga.component.html',
  styleUrls: ['./busqueda-liga.component.css']
})
export class BusquedaLigaComponent implements OnInit {

  constructor(private vistasService: VistasGralService, private router: Router, private route: ActivatedRoute) { }

  texto: any = '';


  ngOnInit(): void {
    // Obtén los parámetros de la ruta
    this.route.params.subscribe(params => {

      this.texto = params['texto'];

    });
      //this.obtenerPartidosEquipo();


    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      // Obtén los nuevos parámetros de la ruta cuando cambie la URL
      this.route.params.subscribe(params => {
        this.texto = params['texto'];

        //  this.partidos = [];
          //this.obtenerPartidosEquipo();

      });
    });
  }
}
