import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Notification {
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
}

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private notifications: Notification[] = [];
  private notificationsSubject = new BehaviorSubject<Notification[]>(this.notifications);

  getNotifications() {
    return this.notificationsSubject.asObservable();
  }

  addNotification(notification: Notification) {
    this.notifications.push(notification);
    this.notificationsSubject.next(this.notifications);
    setTimeout(() => this.removeNotification(notification), 5000); // Auto-remove after 5 seconds
  }

  removeNotification(notification: Notification) {
    this.notifications = this.notifications.filter(n => n !== notification);
    this.notificationsSubject.next(this.notifications);
  }
}
