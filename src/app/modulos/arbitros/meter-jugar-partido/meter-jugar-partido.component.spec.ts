import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeterJugarPartidoComponent } from './meter-jugar-partido.component';

describe('MeterJugarPartidoComponent', () => {
  let component: MeterJugarPartidoComponent;
  let fixture: ComponentFixture<MeterJugarPartidoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MeterJugarPartidoComponent]
    });
    fixture = TestBed.createComponent(MeterJugarPartidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
