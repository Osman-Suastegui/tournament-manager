import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearLigaComponent } from './crear-liga.component';

describe('CrearLigaComponent', () => {
  let component: CrearLigaComponent;
  let fixture: ComponentFixture<CrearLigaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrearLigaComponent]
    });
    fixture = TestBed.createComponent(CrearLigaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
