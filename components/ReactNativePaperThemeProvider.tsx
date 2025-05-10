import React from "react";
import {PaperProvider, MD3LightTheme as DefaultPaperTheme} from "react-native-paper";

interface Props {
  children: React.ReactNode;
}

export const ReactNativePaperThemeProvider = ({children}: Props) => {
  const reactNativePaperTheme = {
    ...DefaultPaperTheme,
    colors: {
      ...DefaultPaperTheme.colors,
      primary: '#084fe8',
    },
  };

  return (
    <PaperProvider theme={reactNativePaperTheme}>
      {children}
    </PaperProvider>
  );
};
