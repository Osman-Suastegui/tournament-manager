import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadisticasTemporadaComponent } from './estadisticas-temporada.component';

describe('EstadisticasTemporadaComponent', () => {
  let component: EstadisticasTemporadaComponent;
  let fixture: ComponentFixture<EstadisticasTemporadaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EstadisticasTemporadaComponent]
    });
    fixture = TestBed.createComponent(EstadisticasTemporadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
