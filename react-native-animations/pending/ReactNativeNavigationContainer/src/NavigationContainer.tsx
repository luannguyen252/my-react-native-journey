import React, { ReactElement, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppLoading from "expo-app-loading";
import { Asset } from "expo-asset";
import * as Font from "expo-font";
import {
  InitialState,
  NavigationState,
  NavigationContainer as RNavContainer,
  NavigationContainerProps as RNavContainerProps,
} from "@react-navigation/native";

const NAVIGATION_STATE_KEY = "NAVIGATION_STATE_KEY";

export type FontSource = Parameters<typeof Font.loadAsync>[0];

interface NavigationContainerProps extends RNavContainerProps {
  fonts?: FontSource;
  assets?: number[];
  stickyNav?: boolean;
  children: ReactElement | ReactElement[];
}

/**
 * Executes an array of promises then a callback function
 *
 * @param promises Array of promises to execute
 * @param cb Function to execute after resolving promises
 */
const usePromiseAll = (promises: Promise<void | any[]>[], cb: () => void) =>
  useEffect(() => {
    (async () => {
      await Promise.all(promises); // await all promises
      cb(); // invoke callback
    })();
  });

/**
 * Resolves asset and font load functions and sets ready state
 *
 * @param assets Array of static assets.
 * @param fonts Array of fonts.
 */
const useLoadAssets = (assets: number[], fonts: FontSource): boolean => {
  const [ready, setReady] = useState(false);
  usePromiseAll(
    [
      Font.loadAsync(fonts),
      ...assets.map((asset: number) => Asset.loadAsync(asset)),
    ],
    () => setReady(true)
  );
  return ready;
};

// Navigation Container Wrapper
const NavigationContainer = ({
  assets,
  fonts,
  children,
  initialState,
  onStateChange,
  stickyNav,
  ...props
}: NavigationContainerProps) => {
  // StickyNav only available in development mode
  const [isNavigationReady, setIsNavigationReady] = useState(!__DEV__);

  const [stickyNavInitialState, setStickyNavInitialState] = useState<
    InitialState | undefined
  >();

  const ready = useLoadAssets(assets || [], fonts || {});

  useEffect(() => {
    /**
     * Sets the initial state to the previously saved state from Async Storage
     *
     */
    const restoreState = async () => {
      try {
        const savedStateString = await AsyncStorage.getItem(
          NAVIGATION_STATE_KEY
        );
        const state = savedStateString
          ? JSON.parse(savedStateString)
          : undefined;
        setStickyNavInitialState(state);
      } finally {
        setIsNavigationReady(true);
      }
    };

    if (!isNavigationReady) {
      restoreState();
    }
  }, [isNavigationReady]);

  /**
   * Function to save navigation state eveytime navigation is changed
   *
   * @param state The new navigation state to be saved.
   */
  const stickyNavOnStateChange = (state: NavigationState | undefined) =>
    AsyncStorage.setItem(NAVIGATION_STATE_KEY, JSON.stringify(state));

  if (!ready || !isNavigationReady) {
    return <AppLoading />;
  }

  return (
    <RNavContainer
      onStateChange={stickyNav ? stickyNavOnStateChange : onStateChange}
      initialState={stickyNav ? stickyNavInitialState : initialState}
      {...props}
    >
      {children}
    </RNavContainer>
  );
};

export default NavigationContainer;
