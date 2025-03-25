import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewTournamentComponent } from './overview-tournament.component';

describe('OverviewTournamentComponent', () => {
  let component: OverviewTournamentComponent;
  let fixture: ComponentFixture<OverviewTournamentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OverviewTournamentComponent]
    });
    fixture = TestBed.createComponent(OverviewTournamentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
