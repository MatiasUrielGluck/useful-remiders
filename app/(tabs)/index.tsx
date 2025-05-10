import {SafeAreaView, StyleSheet, Text} from 'react-native';
import {useDependencyInjection} from "@/hooks/useDependencyInjection";
import {useEffect, useState} from "react";
import ReminderEntity from "@/database/sqlite/entity/ReminderEntity";

export default function HomeScreen() {
  const {diContainer} = useDependencyInjection();

  const [reminders, setReminders] = useState<ReminderEntity[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const loadReminders = async () => {
    setIsLoading(true);

    const response = await diContainer.reminderService?.getAllReminders()
    if (!response) return

    setReminders(response)
    setIsLoading(false);
  }

  useEffect(() => {
    loadReminders();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {reminders.map((reminder: ReminderEntity, index: number) => (
        <Text>{reminder.title}</Text>
      ))}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
