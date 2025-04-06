import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationsDropdownComponent } from './notifications-dropdown.component';

describe('NotificationsDropdownComponent', () => {
  let component: NotificationsDropdownComponent;
  let fixture: ComponentFixture<NotificationsDropdownComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotificationsDropdownComponent]
    });
    fixture = TestBed.createComponent(NotificationsDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
