import React from 'react';
import { StyleSheet, Text, View, UIManager, Platform } from 'react-native';
import { StackNavigator } from 'react-navigation';

import MainScreen from './js/MainScreen';
import TimingAnimation from './js/TimingAnimation';
import StaggerAnimation from './js/StaggerAnimation';
import SpringAnimation from './js/SpringAnimation';
import SpinningAnimation from './js/SpinningAnimation';
import SequenceAnimation from './js/SequenceAnimation';
import ParallelAnimation from './js/ParallelAnimation';
import DecayAnimation from './js/DecayAnimation';
import TinderAnimation from './js/TinderAnimation';
import DragAnimation from './js/DragAnimation';
import BounceAnimation from './js/BounceAnimation';
import CompositeAnimation from './js/CompositeAnimation';
import EasingAnimation from './js/EasingAnimation';
import ChasingAnimation from './js/ChasingAnimation';
import LayoutAnimation1 from './js/LayoutAnimation1';
import LayoutAnimation2 from './js/LayoutAnimation2';
import LayoutAnimation3 from './js/LayoutAnimation3';
import LayoutEventAnimation from './js/LayoutEventAnimation';
import PagingAnimation from './js/PagingAnimation';
import PanResponderExample from './js/PanResponderExample';

const AppNavigator = StackNavigator({
  MainScreen: { screen: MainScreen },
  TimingScreen: { screen: TimingAnimation },
  StaggerScreen: { screen: StaggerAnimation },
  SpringScreen: { screen: SpringAnimation },
  SpinningScreen: { screen: SpinningAnimation },
  SequenceScreen: { screen: SequenceAnimation },
  ParallelScreen: { screen: ParallelAnimation },
  DecayScreen: { screen: DecayAnimation },
  TinderScreen: { screen: TinderAnimation },
  DragScreen: { screen: DragAnimation },
  BounceScreen: { screen: BounceAnimation },
  CompositeScreen: { screen: CompositeAnimation },
  EasingScreen: { screen: EasingAnimation },
  ChasingScreen: { screen: ChasingAnimation },
  Layout1Screen: { screen: LayoutAnimation1 },
  Layout2Screen: { screen: LayoutAnimation2 },
  Layout3Screen: { screen: LayoutAnimation3 },
  LayoutEventScreen: { screen: LayoutEventAnimation },
  PagingScreen: { screen: PagingAnimation },
  PanResponderScreen: { screen: PanResponderExample },
});

// In order to enable LayoutAnimation on Android, we need to set the following flag to true
// Enable LayoutAnimation under Android
if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default class App extends React.Component {
  render() {
    return <AppNavigator />;
  }
}
