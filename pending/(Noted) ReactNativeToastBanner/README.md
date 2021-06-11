```js
import {
  ToastBannerProvider,
  ToastBannerPresenter,
  useToastBannerToggler /* or withToastBannerToggler */,
  Transition,
} from 'react-native-toast-banner';

const MyScreen = () => {
  /* If you don't want hooks, there is also HOC 'withToastBannerToggler' */
  const { showBanner, hideBanner } = useToastBannerToggler();

  const onPress = () => {
    showBanner({
      contentView: <Text>Hello the regular banner!</Text>,
      backgroundColor: 'red' /* default: undefined */,
      duration: 2000 /* default: 3000 */,
      transitions: [
        Transition.Move,
        Transition.MoveLinear,
        Transition.FadeInOut,
      ] /* default: [Transition.Move] */,
      onPress: () => {
        console.log('banner pressed');
        // hideBanner(); // when specifying 'disableHideOnPress: true'
      } /* default: undefined */,
      disableHideOnPress: true /* default: undefined */,
    });
  };
  return <Text onPress={onPress}>Show Banner</Text>;
};

const App = () => (
  <SafeAreaProvider>
    <ToastBannerProvider>
      <MyScreen />
      <ToastBannerPresenter />
    </ToastBannerProvider>
  </SafeAreaProvider>
);
```

## Install

```bash
# install peer dependencies
yarn add react-native-safe-area-context react-native-safe-area-view
# install module
yarn add react-native-toast-banner
```