<img src="http://www.danijelgrabez.com/public-links/github/react-native-promo-slider/promo-slider.gif" width="240" alt= "Example usage of PromoSlider component">

# Promo Slider
React Native slider component with dismiss functionality.
Demo 👉[Expo Snack](https://snack.expo.io/@danijelgrabez/cHJvbW).

### Install
```npm i promo-slider -S```

or,

```yarn add promo-slider```

### Usage
#### Props:
| Property 	| Description 	| isRequired 	|
|------------------	|--------------------------------------------------------------------------------------------------------------------------------------	|------------	|
| `slides` 	| An array of slide components 	| yes 	|
| `onClose` 	| Callback which would be called after clicking on the close button on the last slide (e.g. remembering slider dismissal to async storage) 	| no 	|
| `dotColor` 	| The active color of progress dot, by default it is `#000` (inactive color has the same color, but 25% opaque) 	| no 	|
| `progressStyles` 	| Override progress dots positioning. By default, progress dots are placed at the bottom of the component 	| no 	|
| `withoutClose` 	| A boolean which indicates weather close button should be shown on the last slide 	| no 	|

```js
import PromoSlider from 'promo-slider';

  <PromoSlider
    onClose={() => console.log('It\'s closing time') || this.handleNotification()}
    dotColor="#000"
    progressStyles={{ bottom: 10 }}
    withoutClose={false}
    slides={[<SlideOneComponent>, <SlideTwoComponent>, <SlideThreeComponent>]}
  />
```


## TODO
- [ ] Provide previous/back actions
- [ ] Improve style override for progress component
- [ ] Add tests


## Suggestions?
[Shoot me an email](mailto:danijel.grabez@gmail.com), or [submit an issue](https://github.com/danijelgrabez/promo-slider/issues) 🚀
