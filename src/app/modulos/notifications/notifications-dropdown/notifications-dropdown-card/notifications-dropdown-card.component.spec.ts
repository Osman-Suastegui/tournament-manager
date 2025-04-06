import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationsDropdownCardComponent } from './notifications-dropdown-card.component';

describe('NotificationsDropdownCardComponent', () => {
  let component: NotificationsDropdownCardComponent;
  let fixture: ComponentFixture<NotificationsDropdownCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotificationsDropdownCardComponent]
    });
    fixture = TestBed.createComponent(NotificationsDropdownCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
