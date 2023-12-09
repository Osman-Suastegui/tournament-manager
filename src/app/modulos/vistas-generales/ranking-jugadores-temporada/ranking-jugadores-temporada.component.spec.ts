import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RankingJugadoresTemporadaComponent } from './ranking-jugadores-temporada.component';

describe('RankingJugadoresTemporadaComponent', () => {
  let component: RankingJugadoresTemporadaComponent;
  let fixture: ComponentFixture<RankingJugadoresTemporadaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RankingJugadoresTemporadaComponent]
    });
    fixture = TestBed.createComponent(RankingJugadoresTemporadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
