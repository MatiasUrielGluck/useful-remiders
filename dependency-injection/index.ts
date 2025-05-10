import * as SQLite from 'expo-sqlite';
import {SQLiteDatabase} from "expo-sqlite";
import {SQLiteConfig} from "@/config/SQLiteConfig";
import {ReminderRepository} from "@/database/sqlite/repository/ReminderRepository";
import {ReminderService} from "@/database/sqlite/service/ReminderService";

export default class DependencyInjectionContainer {
  static #instance: DependencyInjectionContainer;

  // Database Connection
  private _db: SQLiteDatabase | undefined;

  // Reminder Context
  private _reminderRepository: ReminderRepository | undefined;
  private _reminderService: ReminderService | undefined;

  // Notification Context

  private constructor() {
  }

  public static get instance(): DependencyInjectionContainer {
    if (!DependencyInjectionContainer.#instance) {
      DependencyInjectionContainer.#instance = new DependencyInjectionContainer();
    }

    return DependencyInjectionContainer.#instance;
  }

  public async initialize() {
    this._db = await SQLite.openDatabaseAsync(SQLiteConfig.databaseName);
    this._reminderRepository = new ReminderRepository(this._db);
    this._reminderService = new ReminderService(this._reminderRepository)
  }


  get db(): SQLiteDatabase | undefined {
    return this._db;
  }

  set db(value: SQLiteDatabase | undefined) {
    this._db = value;
  }

  get reminderRepository(): ReminderRepository | undefined {
    return this._reminderRepository;
  }

  set reminderRepository(value: ReminderRepository | undefined) {
    this._reminderRepository = value;
  }

  get reminderService(): ReminderService | undefined {
    return this._reminderService;
  }

  set reminderService(value: ReminderService | undefined) {
    this._reminderService = value;
  }
}
