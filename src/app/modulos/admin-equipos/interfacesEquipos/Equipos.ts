export interface Equipo {
    nombre: string;
    admin_equipo: string;
    rama: Rama;
    categoria: Categoria;
}

export enum Categoria {
  PREBENJAMIN,
  BENJAMIN,
  ALEVIN,
  INFANTIL,
  CADETE,
  JUNIOR,
  SUB22,
  SENIOR
}

export enum Rama {
  MASCULINO,
  FEMENINO
}

