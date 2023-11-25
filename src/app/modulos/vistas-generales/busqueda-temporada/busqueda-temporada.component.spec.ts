import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusquedaTemporadaComponent } from './busqueda-temporada.component';

describe('BusquedaTemporadaComponent', () => {
  let component: BusquedaTemporadaComponent;
  let fixture: ComponentFixture<BusquedaTemporadaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BusquedaTemporadaComponent]
    });
    fixture = TestBed.createComponent(BusquedaTemporadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
