import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusquedaLigaComponent } from './busqueda-liga.component';

describe('BusquedaLigaComponent', () => {
  let component: BusquedaLigaComponent;
  let fixture: ComponentFixture<BusquedaLigaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BusquedaLigaComponent]
    });
    fixture = TestBed.createComponent(BusquedaLigaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
