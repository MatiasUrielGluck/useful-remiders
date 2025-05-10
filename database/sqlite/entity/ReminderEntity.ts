import NotificationEntity from "@/database/sqlite/entity/NotificationEntity";

export default class ReminderEntity {
  private _id: number;
  private _title: string;
  private _description: string;
  private _reminderDate: string;
  private _reminderTime: string;
  private _notifications: NotificationEntity[]

  constructor(id: number, title: string, description: string, reminderDate: string, reminderTime: string, notifications: NotificationEntity[]) {
    this._id = id;
    this._title = title;
    this._description = description;
    this._reminderDate = reminderDate
    this._reminderTime = reminderTime;
    this._notifications = notifications;
  }

  static builder(): ReminderEntityBuilder {
    return new ReminderEntityBuilder();
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

  get reminderDate(): string {
    return this._reminderDate;
  }

  set reminderDate(value: string) {
    this._reminderDate = value;
  }

  get reminderTime(): string {
    return this._reminderTime;
  }

  set reminderTime(value: string) {
    this._reminderTime = value;
  }

  get notifications(): NotificationEntity[] {
    return this._notifications;
  }

  set notifications(value: NotificationEntity[]) {
    this._notifications = value;
  }
}

class ReminderEntityBuilder {
  private readonly reminder: ReminderEntity;

  constructor() {
    this.reminder = new ReminderEntity(0, "", "", "", "", []);
  }

  withId(id: number): ReminderEntityBuilder {
    this.reminder.id = id;
    return this;
  }

  withTitle(title: string): ReminderEntityBuilder {
    this.reminder.title = title;
    return this;
  }

  withDescription(description: string): ReminderEntityBuilder {
    this.reminder.description = description;
    return this;
  }

  withReminderDate(date: string): ReminderEntityBuilder {
    this.reminder.reminderDate = date;
    return this;
  }

  withReminderTime(time: string): ReminderEntityBuilder {
    this.reminder.reminderTime = time;
    return this;
  }

  withNotifications(notifications: NotificationEntity[]): ReminderEntityBuilder {
    this.reminder.notifications = notifications;
    return this;
  }

  build(): ReminderEntity {
    return this.reminder;
  }
}

