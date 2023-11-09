import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarJugadorPartidoComponent } from './agregar-jugador-partido.component';

describe('AgregarJugadorPartidoComponent', () => {
  let component: AgregarJugadorPartidoComponent;
  let fixture: ComponentFixture<AgregarJugadorPartidoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgregarJugadorPartidoComponent]
    });
    fixture = TestBed.createComponent(AgregarJugadorPartidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
