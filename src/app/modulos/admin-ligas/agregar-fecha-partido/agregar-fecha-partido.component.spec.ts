import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarFechaPartidoComponent } from './agregar-fecha-partido.component';

describe('AgregarFechaPartidoComponent', () => {
  let component: AgregarFechaPartidoComponent;
  let fixture: ComponentFixture<AgregarFechaPartidoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgregarFechaPartidoComponent]
    });
    fixture = TestBed.createComponent(AgregarFechaPartidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
