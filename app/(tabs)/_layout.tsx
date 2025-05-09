import React from 'react';
import {Tabs} from 'expo-router';

import Colors from '@/constants/Colors';
import {useColorScheme} from '@/components/useColorScheme';
import {useClientOnlyValue} from '@/components/useClientOnlyValue';
import {Navbar} from "@/components/Navbar";
import {BottomBarButton} from "@/components/BottomBarButton";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
        tabBarStyle: {height: 80},
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Reminders',
          tabBarButton: (props) => <BottomBarButton props={props} icon="bell" label="Reminders"/>,
          header: (props) => <Navbar bottomHeaderTabProps={props}/>,
        }}
      />
      <Tabs.Screen
        name="important-reminders"
        options={{
          title: 'Favorites',
          tabBarButton: (props) => <BottomBarButton props={props} icon="star" label="Favorites"/>,
          header: (props) => <Navbar bottomHeaderTabProps={props}/>,
        }}
      />
      <Tabs.Screen
        name="create-reminder"
        options={{
          title: 'Create Reminder',
          tabBarButton: (props) => <BottomBarButton props={props} icon="plus-circle" label="Create Reminder"/>,
          header: (props) => <Navbar bottomHeaderTabProps={props} headerTitle="Add a Reminder"/>,
        }}
      />
    </Tabs>
  );
}
