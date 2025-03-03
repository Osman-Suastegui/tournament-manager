import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTournamentBasicInformationComponent } from './create-tournament-basic-information.component';

describe('CreateTournamentBasicInformationComponent', () => {
  let component: CreateTournamentBasicInformationComponent;
  let fixture: ComponentFixture<CreateTournamentBasicInformationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateTournamentBasicInformationComponent]
    });
    fixture = TestBed.createComponent(CreateTournamentBasicInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
