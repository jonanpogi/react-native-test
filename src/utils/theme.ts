import { MD3LightTheme as DefaultTheme } from "react-native-paper";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#1e88e5",
    secondary: "#66A3FF",
    grey: {
      light: "#e0e0e0",
      main: "#9e9e9e",
      dark: "#616161",
    },
    blue: {
      light: "#4b9fea",
      main: "#1e88e5",
      dark: "#155fa0",
    },
  },
};

export type AppTheme = typeof theme;

export default theme;
