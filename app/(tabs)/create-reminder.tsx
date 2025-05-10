import {SafeAreaView, StyleSheet} from 'react-native';
import {TextInput, Button, Text} from "react-native-paper";
import {SetStateAction, useState} from "react";
import DateTimePicker from '@react-native-community/datetimepicker';
import ReminderEntity from "@/database/sqlite/entity/ReminderEntity";
import DependencyInjectionContainer from "@/dependency-injection";

export default function CreateReminderScreen() {
  const diContainer = DependencyInjectionContainer.instance;

  const [title, setTitle] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const [date, setDate] = useState<Date>(new Date(Date.now()));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
    if (mode === 'date') {
      showMode('time')
    }
  };

  const showMode = (currentMode: SetStateAction<string>) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  const handleOnSave = async () => {
    const reminder: ReminderEntity = ReminderEntity.builder()
      .withTitle(title)
      .withDescription(description)
      .withReminderDate(new Date(Date.now()).toISOString())
      .build();

    console.log(reminder)
    const createdId = await diContainer.reminderService?.createReminder(reminder);
    console.log('SAVED REMINDER: ', createdId);
    // TODO: Crear las notificaciones
  }

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        label="Title"
        value={title}
        onChangeText={text => setTitle(text)}
      />

      <TextInput
        multiline
        numberOfLines={15}
        label="Description"
        value={description}
        onChangeText={text => setDescription(text)}
      />

      <Button onPress={showDatepicker} mode="contained" icon="calendar">
        Select date and time
      </Button>
      <Button onPress={showTimepicker} mode="contained">
        Change the time
      </Button>

      <Button onPress={handleOnSave} mode="contained" icon="content-save">
        Save
      </Button>

      <Text>selected: {date.toLocaleString()}</Text>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          onChange={onChange}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 16,
    padding: 20,
  },
});
