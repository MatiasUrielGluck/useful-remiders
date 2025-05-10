import * as SQLite from 'expo-sqlite';
import Migration_1 from "@/database/sqlite/migrations/migration_1";
import {IMigration} from "@/database/sqlite/migrations/IMigration";
import {SQLiteConfig} from "@/config/SQLiteConfig";

export const executeMigrations = async () => {
  const db = await SQLite.openDatabaseAsync(SQLiteConfig.databaseName);
  const migration_1 = new Migration_1(db);

  const migrations: Array<IMigration> = Array.of(migration_1);

  migrations.forEach(migration => {
    migration.execute();
  })
}
