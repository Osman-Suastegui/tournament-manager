import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeAdminEquipoComponent } from './home-admin-equipo.component';

describe('HomeAdminEquipoComponent', () => {
  let component: HomeAdminEquipoComponent;
  let fixture: ComponentFixture<HomeAdminEquipoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeAdminEquipoComponent]
    });
    fixture = TestBed.createComponent(HomeAdminEquipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
