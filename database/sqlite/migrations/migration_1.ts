import * as SQLite from 'expo-sqlite';
import {IMigration} from "@/database/sqlite/migrations/IMigration";

class Migration implements IMigration {
  private db: SQLite.SQLiteDatabase;

  constructor(db: SQLite.SQLiteDatabase) {
    this.db = db;
  }

  async execute(): Promise<void> {
    await this.db.withTransactionAsync(async () => {
      // language=SQL format=false
      await this.db.execAsync(`
        CREATE TABLE IF NOT EXISTS reminders (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT,
        reminder_date TEXT NOT NULL,
        reminder_time TEXT NOT NULL
      );`)
      // language=SQL format=false
      await this.db.execAsync(`
        CREATE TABLE IF NOT EXISTS notifications (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        reminder_id INTEGER NOT NULL,
        notification_date TEXT NOT NULL,
        notification_time TEXT NOT NULL,
        type TEXT NOT NULL,
        FOREIGN KEY (reminder_id) REFERENCES reminders(id) ON DELETE CASCADE
      );`)
    })
  }
}

export default Migration;
