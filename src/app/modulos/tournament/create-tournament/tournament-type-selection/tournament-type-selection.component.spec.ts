import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TournamentTypeSelectionComponent } from './tournament-type-selection.component';

describe('TournamentTypeSelectionComponent', () => {
  let component: TournamentTypeSelectionComponent;
  let fixture: ComponentFixture<TournamentTypeSelectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TournamentTypeSelectionComponent]
    });
    fixture = TestBed.createComponent(TournamentTypeSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
