import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CondicionesUsoComponent } from './condiciones-uso.component';

describe('CondicionesUsoComponent', () => {
  let component: CondicionesUsoComponent;
  let fixture: ComponentFixture<CondicionesUsoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CondicionesUsoComponent]
    });
    fixture = TestBed.createComponent(CondicionesUsoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
