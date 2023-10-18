import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeAdminLigasComponent } from './home-admin-ligas.component';

describe('HomeAdminLigasComponent', () => {
  let component: HomeAdminLigasComponent;
  let fixture: ComponentFixture<HomeAdminLigasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeAdminLigasComponent]
    });
    fixture = TestBed.createComponent(HomeAdminLigasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
