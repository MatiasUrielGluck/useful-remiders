import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import {Tabs} from 'expo-router';

import Colors from '@/constants/Colors';
import {useColorScheme} from '@/components/useColorScheme';
import {useClientOnlyValue} from '@/components/useClientOnlyValue';
import {Navbar} from "@/components/Navbar";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{marginBottom: -3}} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Reminders',
          tabBarIcon: ({color}) => <TabBarIcon name="bell" color={color}/>,
          header: (props) => <Navbar bottomHeaderTabProps={props}/>,
        }}
      />
      <Tabs.Screen
        name="important-reminders"
        options={{
          title: 'Favorites',
          tabBarIcon: ({color}) => <TabBarIcon name="star" color={color}/>,
          header: (props) => <Navbar bottomHeaderTabProps={props}/>,
        }}
      />
      <Tabs.Screen
        name="create-reminder"
        options={{
          title: 'Create Reminder',
          tabBarIcon: ({color}) => <TabBarIcon name="plus-circle" color={color}/>,
          header: (props) => <Navbar bottomHeaderTabProps={props} headerTitle="Add a Reminder"/>,
        }}
      />
    </Tabs>
  );
}
