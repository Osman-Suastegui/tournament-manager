import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalizarPartidoComponent } from './finalizar-partido.component';

describe('FinalizarPartidoComponent', () => {
  let component: FinalizarPartidoComponent;
  let fixture: ComponentFixture<FinalizarPartidoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FinalizarPartidoComponent]
    });
    fixture = TestBed.createComponent(FinalizarPartidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
