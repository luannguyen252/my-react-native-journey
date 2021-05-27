import React from "react";
import { useColorScheme } from "react-native";
import { Provider as StoreProvider } from "react-redux";
import RootNavigator from "./navigation";
import store from "./store";
import { ThemeProvider, lightTheme, darkTheme } from "./theme";

const App = () => {
  const colorScheme = useColorScheme();
  return (
    <StoreProvider store={store}>
      <ThemeProvider theme={colorScheme === "light" ? lightTheme : darkTheme}>
        <RootNavigator />
      </ThemeProvider>
    </StoreProvider>
  );
};

export default App;
