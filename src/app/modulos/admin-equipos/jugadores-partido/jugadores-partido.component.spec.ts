import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JugadoresPartidoComponent } from './jugadores-partido.component';

describe('JugadoresPartidoComponent', () => {
  let component: JugadoresPartidoComponent;
  let fixture: ComponentFixture<JugadoresPartidoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JugadoresPartidoComponent]
    });
    fixture = TestBed.createComponent(JugadoresPartidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
