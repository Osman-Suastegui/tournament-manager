import { Gender } from '../Login/Gender';
import { Role } from '../Login/Role';

export interface Register {
usuario: string;
email: string;
password: string;
rol: Role;
fechaNacimiento: Date;
genero: Gender;
nombre: string;
apellido: string;
}

