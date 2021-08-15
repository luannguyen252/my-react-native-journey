# @tapston/react-native-animation

### Make your UI animated. Just use ``` animateLayout() ``` before changing your state
<img src="https://tapston.com/git/%40tapston/react-native-animation/main.gif" alt="@tapston/react-native-animation" width="260px" height="auto" />

## Installation

```bash
$ npm i @tapston/react-native-animation
```
##### Or

```bash
$ yarn add @tapston/react-native-animation
```
## Basic Usage

- Add ```initialAnimation()``` to `myproject/index.js` file:

```jsx
//...
import { initialAnimation } from '@tapston/react-native-animation';
//...

const defaultAnimationConfig = {
  duration: 250,
  type: 'easeInEaseOut',
  property: 'opacity',
};

initialAnimation(defaultAnimationConfig);

//AppRegistry.registerComponent(appName, () => AppContainer);
```

- Now you can use ```animateLayout()``` in any component:

```jsx
//...
import { animateLayout } from '@tapston/react-native-animation';
//...

const MyComponent = () => {
  const [data, setData] = useState([]);

  const animationConfig = {
    duration: 250,
    type: 'easeInEaseOut',
    property: 'opacity',
  };

  const getData = () => {
    const result = YourAPI.get();
    //just add animateLayout() to animate getData()
    animateLayout();
    setData(result);
  };

  useEffect(() => {
    getData();
  }, []);

//...
```

## Properties

#### animateLayout config

|                |type    |default                      |description                         |
|----------------|--------------|-----------------|-----------------------------|
|duration|`number`           | 250 |Animation duration             | 
|type|`string`           | `easeInEaseOut` |Type of animation           | 
|property|`string`           | `opacity` |Animation property| 

#### initialAnimation config 

|                |type    |default                      |description                         |
|----------------|--------------|-----------------|-----------------------------|
|duration|`number`           | 250 |Animation duration             | 
|type|`string`           | `easeInEaseOut` |Type of animation           | 
|property|`string`           | `opacity` |Animation property| 

#### Types for config

|Types|
|----------------|
|spring|
|linear|
|easeInEaseOut|
|easeIn|
|easeOut|
|keyboard|

#### Properties for config

|Properties|
|----------------|
|opacity|
|scaleXY|

## Contribution

- [@r.ravkov](mailto:hello@tapston.com) The main author.