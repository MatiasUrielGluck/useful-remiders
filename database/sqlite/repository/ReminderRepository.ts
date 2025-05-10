import ReminderEntity from '@/database/sqlite/entity/ReminderEntity'
import NotificationEntity from "@/database/sqlite/entity/NotificationEntity";
import {SQLiteDatabase} from "expo-sqlite";

export class ReminderRepository {
  private _db: SQLiteDatabase;

  constructor(db: SQLiteDatabase) {
    this._db = db;
  }

  async create(reminder: ReminderEntity): Promise<number> {
    const result = await this._db.runAsync(
      `INSERT INTO reminders (title, description, reminder_date, reminder_time)
       VALUES (?, ?, ?, ?)`,
      [reminder.title, reminder.description, reminder.reminderDate, reminder.reminderTime]
    );
    return result.lastInsertRowId!;
  }

  async findById(id: number): Promise<ReminderEntity | null> {
    const reminderResult = await this._db.getFirstAsync<ReminderEntity>(
      `SELECT *
       FROM reminders
       WHERE id = ?`,
      [id]
    );

    if (!reminderResult) return null;

    const notificationsResult = await this._db.getAllAsync<NotificationEntity>(
      `SELECT *
       FROM notifications
       WHERE reminder_id = ?`,
      [id]
    );

    reminderResult.notifications = notificationsResult;

    return reminderResult ?? null;
  }

  async findAll(): Promise<ReminderEntity[]> {
    const results = await this._db.getAllAsync<ReminderEntity>(
      `SELECT *
       FROM reminders`
    );
    return results;
  }

  async update(reminder: ReminderEntity): Promise<void> {
    await this._db.runAsync(
      `UPDATE reminders
       SET title         = ?,
           description   = ?,
           reminder_date = ?,
           reminder_time = ?
       WHERE id = ?`,
      [
        reminder.title,
        reminder.description,
        reminder.reminderDate,
        reminder.reminderTime,
        reminder.id
      ]
    );
  }

  async delete(id: number): Promise<void> {
    await this._db.runAsync(
      `DELETE
       FROM reminders
       WHERE id = ?`,
      [id]
    );
  }

  async deleteAll(): Promise<void> {
    await this._db.runAsync(`DELETE
                             FROM reminders`);
  }
}
