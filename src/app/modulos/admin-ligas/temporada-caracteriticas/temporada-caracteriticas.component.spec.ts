import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemporadaCaracteriticasComponent } from './temporada-caracteriticas.component';

describe('TemporadaCaracteriticasComponent', () => {
  let component: TemporadaCaracteriticasComponent;
  let fixture: ComponentFixture<TemporadaCaracteriticasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TemporadaCaracteriticasComponent]
    });
    fixture = TestBed.createComponent(TemporadaCaracteriticasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
