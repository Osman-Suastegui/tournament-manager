import { Component, Input, OnInit } from '@angular/core';
import { formatDistanceToNow } from 'date-fns';

@Component({
  selector: 'app-notifications-dropdown-card',
  templateUrl: './notifications-dropdown-card.component.html',
  styleUrls: ['./notifications-dropdown-card.component.scss']
})
export class NotificationsDropdownCardComponent implements OnInit {
  @Input() notification: any;
  public distanceToNow: string = '';
  constructor() {
  }

  ngOnInit(): void {
    console.log('Notification:', this.notification);
    this.distanceToNow = formatDistanceToNow(this.notification.date, { addSuffix: true });
    const date = new Date('2025-03-27T11:00:00'); // your date here

  }

  acceptRequest(notificationId: string) {
    console.log('Accepted request:', this.notification);
    // Add your logic to accept the request here
  }

  rejectRequest(notificationId: string) {
    console.log('Rejected request:', this.notification);
    // Add your logic to reject the request here
  }
}
