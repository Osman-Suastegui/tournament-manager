import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Usuario } from '../interfaces/perfil';

@Component({
  selector: 'app-ver-perfil',
  templateUrl: './ver-perfil.component.html',
  styleUrls: ['./ver-perfil.component.css']
})
export class VerPerfilComponent implements OnInit{

  error: string = '';
  user: Usuario = {
    usuario: '',
    nombre: '',
    apellido: '',
    genero: '',
    rol: '',
    fechaNacimiento: ''
  };




  ngOnInit() {
  }


  guardarDatosPerfil(){

  }

}
