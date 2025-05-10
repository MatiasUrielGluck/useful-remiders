import ReminderEntity from "@/database/sqlite/entity/ReminderEntity";
import {ReminderRepository} from "@/database/sqlite/repository/ReminderRepository";

export class ReminderService {
  private reminderRepository: ReminderRepository;

  constructor(reminderRepository: ReminderRepository) {
    this.reminderRepository = reminderRepository;
  }

  async createReminder(reminder: ReminderEntity): Promise<number> {
    this.validateReminder(reminder);

    return await this.reminderRepository.create(reminder);
  }

  async updateReminder(reminder: ReminderEntity): Promise<void> {
    if (!reminder.id) throw new Error("Reminder must have an ID to update.");
    this.validateReminder(reminder);

    await this.reminderRepository.update(reminder);
  }

  async deleteReminder(id: number): Promise<void> {
    if (!id) throw new Error("Reminder ID is required.");
    await this.reminderRepository.delete(id);
  }

  async getReminder(id: number): Promise<ReminderEntity | null> {
    return await this.reminderRepository.findById(id);
  }

  async getAllReminders(): Promise<ReminderEntity[]> {
    return await this.reminderRepository.findAll();
  }

  private validateReminder(reminder: ReminderEntity): void {
    if (!reminder.title || reminder.title.trim() === "") {
      throw new Error("Reminder title is required.");
    }
    if (!reminder.reminderDate) {
      throw new Error("Reminder date and time are required.");
    }
  }
}
