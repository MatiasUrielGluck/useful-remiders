import NotificationEntity from "@/database/sqlite/entity/NotificationEntity";
import {NotificationRepository} from "@/database/sqlite/repository/NotificationRepository";
import {ReminderRepository} from "@/database/sqlite/repository/ReminderRepository";

export class NotificationService {
  private notificationRepository: NotificationRepository;
  private reminderRepository: ReminderRepository;

  constructor() {
    this.notificationRepository = new NotificationRepository();
    this.reminderRepository = new ReminderRepository();
  }

  async createNotification(notification: NotificationEntity): Promise<number> {
    this.validateNotification(notification);

    return await this.notificationRepository.create(notification);
  }

  async updateNotification(notification: NotificationEntity): Promise<void> {
    if (!notification.id) throw new Error("Notification must have an ID to update.");
    this.validateNotification(notification);

    await this.notificationRepository.update(notification);
  }

  async deleteNotification(id: number): Promise<void> {
    if (!id) throw new Error("Notification ID is required.");
    await this.notificationRepository.delete(id);
  }

  async getNotification(id: number): Promise<NotificationEntity | null> {
    return await this.notificationRepository.findById(id);
  }

  async getNotificationsByReminderId(reminderId: number): Promise<NotificationEntity[]> {
    return await this.notificationRepository.findByReminderId(reminderId);
  }

  private validateNotification(notification: NotificationEntity): void {
    if (!notification.notificationDate || !notification.notificationTime || !notification.type) {
      throw new Error("Notification must have date, time, and type.");
    }
    if (!notification.reminderId) {
      throw new Error("Notification must be associated with a reminder.");
    }

    const reminderEntity = this.reminderRepository.findById(notification.reminderId);
    if (reminderEntity === null) {
      throw new Error("Notification must be associated with a valid reminder.");
    }
  }
}
