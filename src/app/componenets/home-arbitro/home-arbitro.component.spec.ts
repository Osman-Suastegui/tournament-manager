import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeArbitroComponent } from './home-arbitro.component';

describe('HomeArbitroComponent', () => {
  let component: HomeArbitroComponent;
  let fixture: ComponentFixture<HomeArbitroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeArbitroComponent]
    });
    fixture = TestBed.createComponent(HomeArbitroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
