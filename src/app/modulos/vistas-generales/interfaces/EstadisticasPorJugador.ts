// Crear un archivo, por ejemplo, estadisticas.interface.ts

export interface EstadisticasPorJugador {
  [jugadorId: string]: {
    asistenciasPorTemporada: number;
    faltasPorTemporada: number;
    tirosDe2puntosPorTemporada: number;
    tirosDe3puntosPorTemporada: number;
    tirosLibresPorTemporada: number;
    totalPuntosPorTemporada: number;
  };
}
