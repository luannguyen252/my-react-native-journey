###### IMPORTANT! You need install them.

```
"react": ">= 16.x.x",
"react-native": ">= 0.55.x",
"react-native-linear-gradient": ">= 2.5.6",
"@freakycoder/react-native-helpers": ">= 0.1.2",
```

## Basic Usage

```jsx
import GradientHeader from "react-native-gradient-header";

<GradientHeader />;
```

## Advanced Usage

```jsx
import GradientHeader from "react-native-gradient-header";

<GradientHeader
  title="Title"
  subtitle="Have a nice day Kuray"
  gradientColors={["#00416A", "#E4E5E6"]}
  imageSource={require("./assets/profile.jpg")}
/>;
```

## Configuration - Props

| Property               |   Type    |              Default              | Description                                                                |
| ---------------------- | :-------: | :-------------------------------: | -------------------------------------------------------------------------- |
| title                  |  string   |               Today               | change the title                                                           |
| subtitle               |  string   |          Have a nice day          | change the subtitle                                                        |
| gradient               |  boolean  |               true                | if you do not want gradient background, simply make this prop false        |
| gradientColors         | [colors]  | ["#12c2e9", "#c471ed", "#f64f59"] | change the gradient colors                                                 |
| start                  |    x,y    |          { x: 0, y: 0 }           | change the gradient's direction of start                                   |
| end                    |    x,y    |          { x: 1, y: 0 }           | change the gradient's direction of end                                     |
| shapeColor             |   color   |              #ba75df              | change solid background color, it is available when gradient prop is false |
| imageSource            |   image   |           profile image           | change the circle image                                                    |
| imageOnPress           | function  |               null                | set the onPress function for profile image                                 |
| position               |   style   |                top                | set the background shape's position                                        |
| headerContentComponent | component |          chech the code           | set your own design for the header content                                 |
| shadowStyle            |   style   |              shadow               | set your own shadow style instead of the implemented one                   |
| shadowColor            |   color   |              "#000"               | change the shadow color                                                    |