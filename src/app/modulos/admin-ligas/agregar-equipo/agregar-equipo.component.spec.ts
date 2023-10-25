import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarEquipoComponent } from './agregar-equipo.component';

describe('AgregarEquipoComponent', () => {
  let component: AgregarEquipoComponent;
  let fixture: ComponentFixture<AgregarEquipoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgregarEquipoComponent]
    });
    fixture = TestBed.createComponent(AgregarEquipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
