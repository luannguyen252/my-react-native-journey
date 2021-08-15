import { Navigation } from 'react-native-navigation';

import FeedScreen from './FeedScreen';
import ExploreScreen from './ExploreScreen';
import LoginScreen from './LoginScreen';

import WithProvider from '../components/WithProvider';

// register all screens of the app (including internal ones)
export function registerScreens() {
  Navigation.registerComponent('instagramApp.FeedScreen', () => WithProvider(FeedScreen));
  Navigation.registerComponent('instagramApp.ExploreScreen', () => WithProvider(ExploreScreen));
  Navigation.registerComponent('instagramApp.LoginScreen', () => WithProvider(LoginScreen));
}
