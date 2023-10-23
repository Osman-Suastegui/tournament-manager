import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarLigaComponent } from './modificar-liga.component';

describe('ModificarLigaComponent', () => {
  let component: ModificarLigaComponent;
  let fixture: ComponentFixture<ModificarLigaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModificarLigaComponent]
    });
    fixture = TestBed.createComponent(ModificarLigaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
