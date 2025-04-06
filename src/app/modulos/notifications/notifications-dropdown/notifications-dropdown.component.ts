import { Component } from '@angular/core';

@Component({
  selector: 'app-notifications-dropdown',
  templateUrl: './notifications-dropdown.component.html',
  styleUrls: ['./notifications-dropdown.component.css']
})
export class NotificationsDropdownComponent {

  public notifications:any[] = [
    {
      title: 'Match starting soon',
      description: 'Your match between Phoenix Fire vs London Lightning starts in 30 minutes!',
      date: '2025-04-05:16:00',
      read: false,
      type: 'soon'
    },
    {
      title: 'Notificación 2',
      description: 'Descripción de la notificación 2',
      date: '2023-10-02',
      read: false,
      type: 'alert'
    },
    {
      title: 'Notificación 3',
      description: 'Descripción de la notificación 3',
      date: '2023-10-03',
      read: true,
      type: 'info'
    },
    {
      title: 'Notificación 4',
      description: 'Descripción de la notificación 3',
      date: '2023-10-03',
      read: true,
      type: 'request'
    }
  ];
}
