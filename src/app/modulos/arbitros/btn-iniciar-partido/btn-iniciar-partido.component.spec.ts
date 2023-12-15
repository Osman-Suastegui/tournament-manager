import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnIniciarPartidoComponent } from './btn-iniciar-partido.component';

describe('BtnIniciarPartidoComponent', () => {
  let component: BtnIniciarPartidoComponent;
  let fixture: ComponentFixture<BtnIniciarPartidoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BtnIniciarPartidoComponent]
    });
    fixture = TestBed.createComponent(BtnIniciarPartidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
