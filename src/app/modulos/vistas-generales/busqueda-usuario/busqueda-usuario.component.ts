import { Component } from '@angular/core';
import { VistasGralService } from '../services/vistas-gral.service';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-busqueda-usuario',
  templateUrl: './busqueda-usuario.component.html',
  styleUrls: ['./busqueda-usuario.component.css']
})
export class BusquedaUsuarioComponent implements OnInit {
  constructor(private tempService: VistasGralService, private router: Router, private route: ActivatedRoute) { }

  filtro: any = '';
  texto: any = '';



  ngOnInit(): void {
    // Obtén los parámetros de la ruta
    this.route.params.subscribe(params => {
      this.filtro = params['filtro'];
      this.texto = params['texto'];

      // Realiza la lógica necesaria con this.filtro y this.texto
      // Por ejemplo, puedes llamar a una función de búsqueda
      this.performSearch();
    });
  }
  performSearch() {
    console.log(this.filtro);
    console.log(this.texto);
  }
}
