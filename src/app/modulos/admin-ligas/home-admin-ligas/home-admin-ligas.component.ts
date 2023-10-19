import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CrearLigaComponent } from '../crear-liga/crear-liga.component';

@Component({
  selector: 'app-home-admin-ligas',
  templateUrl: './home-admin-ligas.component.html',
  styleUrls: ['./home-admin-ligas.component.css']
})
export class HomeAdminLigasComponent {
  constructor(public dialog: MatDialog) { }

  openDialog(): void {
    this.dialog.open(CrearLigaComponent,{
      width: '250px',
    })
  }
}
