import { StackNavigator } from 'react-navigation';

import HomeScreen from './HomeScreen';
import ProfileScreen from './ProfileScreen';
import PhotoScreen from './PhotoScreen';

const AppNavigator = StackNavigator({
  Home: {
    screen: HomeScreen
  },
  Profile: {
    screen: ProfileScreen
  },
  Photo: {
    screen: PhotoScreen
  }
});

export default AppNavigator;
