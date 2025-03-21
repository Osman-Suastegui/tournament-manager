import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTournamentSelectTeamsComponent } from './create-tournament-select-teams.component';

describe('CreateTournamentSelectTeamsComponent', () => {
  let component: CreateTournamentSelectTeamsComponent;
  let fixture: ComponentFixture<CreateTournamentSelectTeamsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateTournamentSelectTeamsComponent]
    });
    fixture = TestBed.createComponent(CreateTournamentSelectTeamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
