import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTournamentAdminPermissionsComponent } from './create-tournament-admin-permissions.component';

describe('CreateTournamentAdminPermissionsComponent', () => {
  let component: CreateTournamentAdminPermissionsComponent;
  let fixture: ComponentFixture<CreateTournamentAdminPermissionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateTournamentAdminPermissionsComponent]
    });
    fixture = TestBed.createComponent(CreateTournamentAdminPermissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
