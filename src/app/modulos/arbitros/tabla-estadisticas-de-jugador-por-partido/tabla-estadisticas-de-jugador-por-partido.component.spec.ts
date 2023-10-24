import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaEstadisticasDeJugadorPorPartidoComponent } from './tabla-estadisticas-de-jugador-por-partido.component';

describe('TablaEstadisticasDeJugadorPorPartidoComponent', () => {
  let component: TablaEstadisticasDeJugadorPorPartidoComponent;
  let fixture: ComponentFixture<TablaEstadisticasDeJugadorPorPartidoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TablaEstadisticasDeJugadorPorPartidoComponent]
    });
    fixture = TestBed.createComponent(TablaEstadisticasDeJugadorPorPartidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
