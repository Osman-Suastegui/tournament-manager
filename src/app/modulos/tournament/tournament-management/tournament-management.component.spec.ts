import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TournamentManagementComponent } from './tournament-management.component';

describe('ContestManagementComponent', () => {
  let component: TournamentManagementComponent;
  let fixture: ComponentFixture<TournamentManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TournamentManagementComponent]
    });
    fixture = TestBed.createComponent(TournamentManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
