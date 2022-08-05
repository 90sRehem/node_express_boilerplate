import { Notifiable, Notification } from "@/shared/notifications";

export class InvalidNotificationUsingObject extends Notifiable {
  constructor() {
    super();
    this.AddNotification(
      new Notification("InvalidUsingObject.test", "Notificação de teste"),
    );
  }
}
