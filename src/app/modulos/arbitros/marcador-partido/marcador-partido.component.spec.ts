import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarcadorPartidoComponent } from './marcador-partido.component';

describe('MarcadorPartidoComponent', () => {
  let component: MarcadorPartidoComponent;
  let fixture: ComponentFixture<MarcadorPartidoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MarcadorPartidoComponent]
    });
    fixture = TestBed.createComponent(MarcadorPartidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
