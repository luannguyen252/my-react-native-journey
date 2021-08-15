/* eslint-disable no-undef */
import {ReactElement} from 'react';
import * as Font from 'expo-font';
import {NavigationContainerProps as RNavContainerProps} from '@react-navigation/native';
export declare type FontSource = Parameters<typeof Font.loadAsync>[0];
interface NavigationContainerProps extends RNavContainerProps {
  fonts?: FontSource;
  assets?: number[];
  stickyNav?: boolean;
  children: ReactElement | ReactElement[];
}
declare const NavigationContainer: ({
  assets,
  fonts,
  children,
  initialState,
  onStateChange,
  stickyNav,
  ...props
}: NavigationContainerProps) => JSX.Element;
export default NavigationContainer;
