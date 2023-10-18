import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeAnonimoComponent } from './home-anonimo.component';

describe('HomeAnonimoComponent', () => {
  let component: HomeAnonimoComponent;
  let fixture: ComponentFixture<HomeAnonimoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeAnonimoComponent]
    });
    fixture = TestBed.createComponent(HomeAnonimoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
