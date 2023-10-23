import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TemporadasService } from '../adminLigasService/temporadas.service';
import { ActivatedRoute } from '@angular/router';
import { Arbitros } from '../interfaces/Arbitros';
import { AsignarArbitroComponent } from '../asignar-arbitro/asignar-arbitro.component';

@Component({
  selector: 'app-temporada-caracteriticas',
  templateUrl: './temporada-caracteriticas.component.html',
  styleUrls: ['./temporada-caracteriticas.component.css']
})
export class TemporadaCaracteriticasComponent implements OnInit{

  constructor(public dialog: MatDialog, private tempService: TemporadasService, private router: Router, private route: ActivatedRoute) { }

  idTemporada: number = 0;
  arbitrosTemp: Arbitros[] = [];


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.idTemporada = +params['idTemporada'];
      localStorage.setItem('idTemporada', this.idTemporada.toString());
      this.obtenerArbitrosTemp(this.idTemporada);
    });
  }


  obtenerArbitrosTemp(idTemporada: number) {
    this.tempService.obtenerArbitros(idTemporada).subscribe({
      next: (data) => {
        this.arbitrosTemp = data;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  openDialogArbitros(): void {
    this.dialog.open(AsignarArbitroComponent,{
      width: '250px',
    })
  }

}


