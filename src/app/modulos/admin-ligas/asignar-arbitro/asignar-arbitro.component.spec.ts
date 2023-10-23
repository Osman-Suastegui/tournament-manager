import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarArbitroComponent } from './asignar-arbitro.component';

describe('AsignarArbitroComponent', () => {
  let component: AsignarArbitroComponent;
  let fixture: ComponentFixture<AsignarArbitroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AsignarArbitroComponent]
    });
    fixture = TestBed.createComponent(AsignarArbitroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
