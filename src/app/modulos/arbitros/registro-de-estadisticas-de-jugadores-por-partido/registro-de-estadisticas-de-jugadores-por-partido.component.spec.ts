import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroDeEstadisticasDeJugadoresPorPartidoComponent } from './registro-de-estadisticas-de-jugadores-por-partido.component';

describe('RegistroDeEstadisticasDeJugadoresPorPartidoComponent', () => {
  let component: RegistroDeEstadisticasDeJugadoresPorPartidoComponent;
  let fixture: ComponentFixture<RegistroDeEstadisticasDeJugadoresPorPartidoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistroDeEstadisticasDeJugadoresPorPartidoComponent]
    });
    fixture = TestBed.createComponent(RegistroDeEstadisticasDeJugadoresPorPartidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
