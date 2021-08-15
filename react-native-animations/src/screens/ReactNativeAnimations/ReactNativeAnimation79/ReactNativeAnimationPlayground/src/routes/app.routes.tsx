import React from 'react';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import { enableScreens } from 'react-native-screens';

import Header from '../components/Header';
import Home from '../screens/Home';
import AnimatedWallet from '../screens/AnimatedWallet';
import AnimatedAccordion from '../screens/AnimatedAccordion';
import HeadphoneCarousel from '../screens/HeadphoneCarousel';
import MoviesCarousel from '../screens/MoviesCarousel';
import TinderCards from '../screens/TinderCards';
import WebView from '../screens/WebView';
import PathMorphing from '../screens/PathMorphing';
import PlacesTransition from '../screens/PlacesTransition';
import PlacesDetailScreen from '../screens/PlacesTransition/PlacesDetailScreen';

// Commented examples due to buggy behavior
// import SkewScroll from '../screens/SkewScroll';
// import ListPicker from '../screens/ListPicker';
// import DotInversion from '../screens/DotInversion';

interface AppRoutesProps {
  switchTheme: () => void;
}

enableScreens();
const App = createSharedElementStackNavigator();

const AppRoutes: React.FC<AppRoutesProps> = ({ switchTheme }) => {
  return (
    <App.Navigator
      screenOptions={{
        header: ({ scene, navigation }) => {
          return (
            <Header
              routeName={scene.route.name}
              switchTheme={switchTheme}
              goBack={navigation.goBack}
            />
          );
        },
      }}>
      <App.Screen name="Animation Playground" component={Home} />
      <App.Screen name="GitHub" component={WebView} />
      <App.Screen name="Animated Accordion" component={AnimatedAccordion} />
      <App.Screen name="Animated Wallet" component={AnimatedWallet} />
      <App.Screen name="Tinder Cards" component={TinderCards} />
      <App.Screen name="Headphone Carousel" component={HeadphoneCarousel} />
      <App.Screen name="Movies Carousel" component={MoviesCarousel} />
      <App.Screen name="Places Transition" component={PlacesTransition} />
      <App.Screen
        name="Places Transition Detail"
        options={{ headerShown: false }}
        component={PlacesDetailScreen}
      />
      <App.Screen name="Path Morphing" component={PathMorphing} />

      {/* Buggy Behavior */}
      {/* <App.Screen name="Dot Inversion" component={DotInversion} /> */}
      {/* <App.Screen name="List Picker" component={ListPicker} /> */}
      {/* <App.Screen name="Skew Scroll" component={SkewScroll} /> */}
    </App.Navigator>
  );
};

export default AppRoutes;
