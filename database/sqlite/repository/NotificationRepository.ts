import * as SQLite from 'expo-sqlite';
import {SQLiteConfig} from "@/config/SQLiteConfig";
import NotificationEntity from '@/database/sqlite/entity/NotificationEntity'

const db = await SQLite.openDatabaseAsync(SQLiteConfig.databaseName);

export class NotificationRepository {

  async create(notification: NotificationEntity): Promise<number> {
    const result = await db.runAsync(
      `INSERT INTO notifications (reminder_id, notification_date, notification_time, type)
       VALUES (?, ?, ?, ?)`,
      [
        notification.reminderId,
        notification.notificationDate,
        notification.notificationTime,
        notification.type
      ]
    );
    return result.lastInsertRowId!;
  }

  async findById(id: number): Promise<NotificationEntity | null> {
    const result = await db.getFirstAsync<NotificationEntity>(
      `SELECT *
       FROM notifications
       WHERE id = ?`,
      [id]
    );
    return result ?? null;
  }

  async findByReminderId(reminderId: number): Promise<NotificationEntity[]> {
    const results = await db.getAllAsync<NotificationEntity>(
      `SELECT *
       FROM notifications
       WHERE reminder_id = ?`,
      [reminderId]
    );
    return results;
  }

  async update(notification: NotificationEntity): Promise<void> {
    await db.runAsync(
      `UPDATE notifications
       SET reminder_id       = ?,
           notification_date = ?,
           notification_time = ?,
           type              = ?
       WHERE id = ?`,
      [
        notification.reminderId,
        notification.notificationDate,
        notification.notificationTime,
        notification.type,
        notification.id
      ]
    );
  }

  async delete(id: number): Promise<void> {
    await db.runAsync(
      `DELETE
       FROM notifications
       WHERE id = ?`,
      [id]
    );
  }

  async deleteByReminderId(reminderId: number): Promise<void> {
    await db.runAsync(
      `DELETE
       FROM notifications
       WHERE reminder_id = ?`,
      [reminderId]
    );
  }

  async deleteAll(): Promise<void> {
    await db.runAsync(`DELETE
                       FROM notifications`);
  }
}
