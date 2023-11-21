import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaracteristicasPartidosComponent } from './caracteristicas-partidos.component';

describe('CaracteristicasPartidosComponent', () => {
  let component: CaracteristicasPartidosComponent;
  let fixture: ComponentFixture<CaracteristicasPartidosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CaracteristicasPartidosComponent]
    });
    fixture = TestBed.createComponent(CaracteristicasPartidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
