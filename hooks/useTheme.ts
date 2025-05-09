import AsyncStorage from '@react-native-async-storage/async-storage';
import {useColorScheme} from "react-native";
import {darkTheme} from "@/theme/darkTheme";
import {lightTheme} from "@/theme/lightTheme";
import {LocalStorageKey} from "@/enum/LocalStorageKey";
import {Theme} from "@/theme/theme";
import {useEffect, useState} from "react";

export const useTheme = () => {
  const colorSchemeName = useColorScheme();
  
  const [theme, setTheme] = useState<Theme>(colorSchemeName === 'light' ? lightTheme : darkTheme)

  const setAppTheme = async () => {
    const savedColorScheme = await AsyncStorage.getItem(LocalStorageKey.THEME.toString())

    if (savedColorScheme) {
      setTheme(savedColorScheme === 'light' ? lightTheme : darkTheme)
    } else {
      setTheme(colorSchemeName === 'light' ? lightTheme : darkTheme)
    }
  }

  useEffect(() => {
    setAppTheme()
  }, []);

  return {
    theme,
  }
};
