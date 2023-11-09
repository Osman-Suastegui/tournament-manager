import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SacarJugadorPartidoComponent } from './sacar-jugador-partido.component';

describe('SacarJugadorPartidoComponent', () => {
  let component: SacarJugadorPartidoComponent;
  let fixture: ComponentFixture<SacarJugadorPartidoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SacarJugadorPartidoComponent]
    });
    fixture = TestBed.createComponent(SacarJugadorPartidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
