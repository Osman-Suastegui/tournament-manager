import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarArbitroPartidoComponent } from './agregar-arbitro-partido.component';

describe('AgregarArbitroPartidoComponent', () => {
  let component: AgregarArbitroPartidoComponent;
  let fixture: ComponentFixture<AgregarArbitroPartidoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgregarArbitroPartidoComponent]
    });
    fixture = TestBed.createComponent(AgregarArbitroPartidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
