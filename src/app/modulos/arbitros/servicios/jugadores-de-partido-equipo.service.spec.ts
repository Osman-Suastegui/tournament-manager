import { TestBed } from '@angular/core/testing';

import { JugadoresDePartidoEquipoService } from './jugadores-de-partido-equipo.service';

describe('JugadoresDePartidoEquipoService', () => {
  let service: JugadoresDePartidoEquipoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JugadoresDePartidoEquipoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
