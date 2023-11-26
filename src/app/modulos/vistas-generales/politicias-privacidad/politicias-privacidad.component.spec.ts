import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoliticiasPrivacidadComponent } from './politicias-privacidad.component';

describe('PoliticiasPrivacidadComponent', () => {
  let component: PoliticiasPrivacidadComponent;
  let fixture: ComponentFixture<PoliticiasPrivacidadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PoliticiasPrivacidadComponent]
    });
    fixture = TestBed.createComponent(PoliticiasPrivacidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
