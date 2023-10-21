import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CrearLigaComponent } from '../crear-liga/crear-liga.component';
import { OnInit } from '@angular/core';
import { LigasServiceService } from '../../../services/ligasService/ligas-service.service';
import { LigasAdmin } from '../interfaces/Ligas'
import { TemporadasLigas } from '../interfaces/TemporadasLigas';

@Component({
  selector: 'app-home-admin-ligas',
  templateUrl: './home-admin-ligas.component.html',
  styleUrls: ['./home-admin-ligas.component.css']
})
export class HomeAdminLigasComponent implements OnInit{
  ligasAdministrador: LigasAdmin[] = [];
  temporadasPorLiga: { [key: number]: TemporadasLigas[] } = {};

  usuario: any = '';
  ligasAsignadas: number = 0;
  idLiga: number = 0;

  constructor(public dialog: MatDialog, private ligaService: LigasServiceService) { }

  openDialog(): void {
    this.dialog.open(CrearLigaComponent,{
      width: '250px',
    })
  }

  ngOnInit(): void {
    this.usuario = localStorage.getItem('usuario');
    this.obtenerLigas();

    this.ligaService.onNuevaLigaCreada().subscribe(() => {

      this.obtenerLigas();
    });
  }


  obtenerLigas() {
    this.ligaService.getLigas(this.usuario).subscribe({
      next: (data) => {
        this.ligasAdministrador = data;
        this.ligasAsignadas = data.length;

        // Ahora que tienes la lista de ligas, obtén las temporadas para cada una
        this.ligasAdministrador.forEach((liga) => {
          this.obtenerTemporadas(liga.idLiga);
        });
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  obtenerTemporadas(idLiga: number) {
    this.ligaService.getTemporadas(idLiga).subscribe({
      next: (data) => {
        console.log(data);
        this.temporadasPorLiga[idLiga] = data;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }


  verTemporada(idLiga: number, idTemporada: number) {
    console.log(idLiga,idTemporada);
  }




}
