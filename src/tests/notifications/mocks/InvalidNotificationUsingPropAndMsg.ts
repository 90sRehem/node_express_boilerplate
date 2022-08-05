import { Notifiable } from "@/shared/notifications";

export class InvalidNotificationUsingPropAndMsg extends Notifiable {
  constructor() {
    super();
    this.AddNotification("InvalidUsingString.test", "Notificação de teste");
  }
}
