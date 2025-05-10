export default class NotificationEntity {
  private _id: number;
  private _reminderId: number;
  private _notificationDate: string;
  private _notificationTime: string;
  private _type: string;

  constructor(
    id: number,
    reminderId: number,
    notificationDate: string,
    notificationTime: string,
    type: string
  ) {
    this._id = id;
    this._reminderId = reminderId;
    this._notificationDate = notificationDate;
    this._notificationTime = notificationTime;
    this._type = type;
  }

  static builder(): NotificationEntityBuilder {
    return new NotificationEntityBuilder();
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get reminderId(): number {
    return this._reminderId;
  }

  set reminderId(value: number) {
    this._reminderId = value;
  }

  get notificationDate(): string {
    return this._notificationDate;
  }

  set notificationDate(value: string) {
    this._notificationDate = value;
  }

  get notificationTime(): string {
    return this._notificationTime;
  }

  set notificationTime(value: string) {
    this._notificationTime = value;
  }

  get type(): string {
    return this._type;
  }

  set type(value: string) {
    this._type = value;
  }
}


class NotificationEntityBuilder {
  private readonly notification: NotificationEntity;

  constructor() {
    this.notification = new NotificationEntity(0, 0, "", "", "");
  }

  withId(id: number): NotificationEntityBuilder {
    this.notification.id = id;
    return this;
  }

  withReminderId(reminderId: number): NotificationEntityBuilder {
    this.notification.reminderId = reminderId;
    return this;
  }

  withNotificationDate(date: string): NotificationEntityBuilder {
    this.notification.notificationDate = date;
    return this;
  }

  withNotificationTime(time: string): NotificationEntityBuilder {
    this.notification.notificationTime = time;
    return this;
  }

  withType(type: string): NotificationEntityBuilder {
    this.notification.type = type;
    return this;
  }

  build(): NotificationEntity {
    return this.notification;
  }
}
