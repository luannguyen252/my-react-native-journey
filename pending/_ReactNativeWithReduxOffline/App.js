/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { ActivityIndicator, StyleSheet } from "react-native";
import { PersistGate } from "redux-persist/integration/react";

import { Provider } from "react-redux";
import { store, persistor } from "./src/store";
import Index from "./src";

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate
          persistor={persistor}
          loading={
            <ActivityIndicator
              style={styles.loader}
              size="large"
              color="#333"
            />
          }
        >
          <Index />
        </PersistGate>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
