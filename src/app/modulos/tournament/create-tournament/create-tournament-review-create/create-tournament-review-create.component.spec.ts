import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTournamentReviewCreateComponent } from './create-tournament-review-create.component';

describe('CreateTournamentReviewCreateComponent', () => {
  let component: CreateTournamentReviewCreateComponent;
  let fixture: ComponentFixture<CreateTournamentReviewCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateTournamentReviewCreateComponent]
    });
    fixture = TestBed.createComponent(CreateTournamentReviewCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
