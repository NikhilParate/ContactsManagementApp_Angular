import { Component, OnInit } from '@angular/core';
import { NotificationService, Notification } from 'src/app/services/notification.service';
// import { NotificationService, Notification } from '../notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
})
export class NotificationComponent implements OnInit {
  notifications: Notification[] = [];

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    this.notificationService.getNotifications().subscribe(notifications => {
      this.notifications = notifications;
    });
  }

  remove(notification: Notification) {
    this.notificationService.removeNotification(notification);
  }
}
