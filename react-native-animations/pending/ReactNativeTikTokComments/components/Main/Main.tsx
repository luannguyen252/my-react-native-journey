import * as React from "react";
import { useColorScheme, View } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "../../config/theme";
import { CommentsSection } from "../CommentsButton/CommentsSection";
import { Test } from "./Test";
import { Spinner } from "../Spinner/Spinner";
import { MaskTest } from "./MaskTest";
import { ClipTest } from "./ClipTest";

const Main = () => {
  const colorScheme = useColorScheme();

  return (
    <NavigationContainer>
      <ThemeProvider theme={darkTheme}>
        <SafeAreaProvider>
          <SafeAreaView style={{ flex: 1 }}>
            <View
              style={{
                flex: 1,
                alignItems: "flex-end",
                justifyContent: "center",
                padding: 16,
              }}
            >
              <CommentsSection />
              {/* <Test /> */}
              {/* <MaskTest /> */}
              {/* <ClipTest /> */}
              {/* <Spinner /> */}
            </View>
          </SafeAreaView>
        </SafeAreaProvider>
      </ThemeProvider>
    </NavigationContainer>
  );
};

export default Main;
