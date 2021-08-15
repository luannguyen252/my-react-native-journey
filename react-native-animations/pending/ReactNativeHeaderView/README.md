##### IMPORTANT! You need install them.

```bash
"react-native-gorgeous-header": ">= 0.1.0",
"react-native-classic-header": ">= 0.1.0",
"react-native-modern-header": ">= 0.1.0",
"react-native-apple-header": ">= 0.1.0",
"react-native-profile-header": ">= 0.1.0",
```

# Usage

## Gorgeous Header Usage

```jsx
import { GorgeousHeader } from "@freakycoder/react-native-header-view";

<GorgeousHeader onChangeText={(text) => console.log(text)} />;
```

## Apple Header Usage

```jsx
import { AppleHeader } from "@freakycoder/react-native-header-view";

<AppleHeader />;
```

## Modern Header Usage

```jsx
import { ModernHeader } from "@freakycoder/react-native-header-view";

<ModernHeader />;
```

### Advanced Usage

```jsx
import { ModernHeader } from "@freakycoder/react-native-header-view";

<ModernHeader
  text="Profile"
  rightIconType="Ionicons"
  backgroundColor="#fdfdfd"
  rightIconName="ios-settings"
  rightIconColor={colors.light.primary}
  leftIconComponent={your - icon - component}
  rightIconComponent={your - icon - component}
  leftIconOnPress={() => NavigationService.back()}
/>;
```

## Classic Header Usage

### Basic Usage

```jsx
import { ClassicHeader } from "@freakycoder/react-native-header-view";

<ClassicHeader
  headerTitle="Header"
  rightComponentDisable
  leftComponentOnPress={() => {}}
  hitSlops={
    top: 30,
    bottom: 30,
    left: 30,
    right: 30
  }
/>
```

#### Advanced Custom Usage

```jsx
import { ClassicHeader } from "@freakycoder/react-native-header-view";

<ClassicHeader
  headerTitle="Header"
  leftComponent={
    <TouchableOpacity onPress={() => {}}>
      <Icon name="ios-arrow-back" type="Ionicons" size={30} color="blue" />
    </TouchableOpacity>
  }
  rightComponent={
    <TouchableOpacity onPress={() => {}}>
      <Icon name="github" type="AntDesign" size={30} color="purple" />
    </TouchableOpacity>
  }
/>;
```

## Profile Header Usage

```jsx
import { ProfileHeader } from "@freakycoder/react-native-header-view";

<ProfileHeader />;
```

# Configuration - Props

## Gorgeous Header Props

| Property            |   Type   |            Default             | Description                                                             |
| ------------------- | :------: | :----------------------------: | ----------------------------------------------------------------------- |
| title               |  string  |             Order              | change the title                                                        |
| subtitle            |  string  | Healthy food can keep you fit. | change the subtitle                                                     |
| searchIcon          |  asset   |            default             | set your own icon for the search one                                    |
| titleTextStyle      |  style   |            default             | set your own style for title text                                       |
| subtitleTextStyle   |  style   |            default             | set your own style for subtitle text                                    |
| searchBarStyle      |  style   |            default             | set your own style for search text input container                      |
| searchInputStyle    |  style   |            default             | set your own style for search text input                                |
| menuImageStyle      |  style   |            default             | set your own style for hamburger menu image                             |
| menuImageSource     |  asset   |            default             | set your own image instead of default hamburger menu image              |
| menuImageOnPress    | function |           undefined            | use this to set your own function for pressing the hamburger menu image |
| profileImageStyle   |  style   |            default             | set your own style for profile image                                    |
| profileImageSource  |  asset   |           undefined            | use this to set your own image for profile image                        |
| profileImageOnPress | function |           undefined            | use this to set your own function for pressing the profile image        |

## Apple Header Props

| Property             |   Type   |       Default       | Description                                                                           |
| -------------------- | :------: | :-----------------: | ------------------------------------------------------------------------------------- |
| dateTitle            |  string  | MONDAY, 27 NOVEMBER | set your own string instead of date title                                             |
| largeTitle           |  string  |       For You       | set your own large title                                                              |
| imageSource          |  image   |        image        | set your own image                                                                    |
| onPress              | function |        null         | use this to set onPress functionality                                                 |
| backgroundColor      |  color   |     transparent     | use this to change the main container's background color                              |
| borderColor          |  color   |       #EFEFF4       | use this to change the bottom border color                                            |
| dateTitleFontColor   |  color   |       #8E8E93       | use this to change the date title's font color                                        |
| dateTitleFontSize    |  number  |         13          | use this to set the date title's font size                                            |
| dateTitleFontWeight  |  string  |        "600"        | use this to set the date title's font weight                                          |
| largeTitleFontColor  |  color   |    default color    | use this to change the large title's font color                                       |
| largeTitleFontSize   |  number  |         34          | use this to set the large title's font size                                           |
| largeTitleFontWeight |  string  |       "bold"        | use this to set the large title's font weight                                         |
| dateTitleStyle       |  style   |    default style    | use this to set your own style for date title (DO NOT RECOMMENDED!)                   |
| largeTitleStyle      |  style   |    default style    | use this to set your own style for large title (DO NOT RECOMMENDED!)                  |
| containerStyle       |  style   |    default style    | use this to set your own style for whole container (DO NOT RECOMMENDED!)              |
| avatarStyle          |  style   |    default style    | use this to set your own style for avatar style (DO NOT FORGET TO ADD BORDER-RADIUS!) |

## Modern Header Props

| Property           |       Type       |    Default     | Description                                                     |
| ------------------ | :--------------: | :------------: | --------------------------------------------------------------- |
| height             | string OR number |       70       | change the height of the header                                 |
| width              | string OR number |     "100%"     | change the width of the header                                  |
| backgroundColor    |      string      |      #fff      | change the background color of the header                       |
| styles             |      styles      |     styles     | use this to change main style of the header                     |
| text               |      string      |  Header Title  | set the header's title                                          |
| textStyle          |      style       |     style      | set your own style for the header's text                        |
| left               |      number      |       16       | use this to set left icon's align                               |
| right              |      number      |       16       | use this to set right icon's align                              |
| leftIconName       |      string      | ios-arrow-back | change the left icon depends on the React Native Vector Icons   |
| leftIconType       |      string      |    Ionicons    | change the left icon's type                                     |
| leftIconSize       |      number      |       25       | change the left icon's size                                     |
| leftIconColor      |      color       |    #bbbabe     | change the left icon's color                                    |
| rightIconName      |      string      |     heart      | change the right icon depends on the React Native Vector Icons  |
| rightIconType      |      string      |     Entypo     | change the right icon's type                                    |
| rightIconSize      |      number      |       25       | change the right icon's size                                    |
| rightIconColor     |      color       |    #23c4c1     | change the right icon's color                                   |
| leftIconComponent  |    component     |      Icon      | use your own component instead of the integrated Icon component |
| rightIconComponent |    component     |      Icon      | use your own component instead of the integrated Icon component |
| leftIconOnPress    |     function     |    function    | set the function for left icon's onPress                        |
| rightIconOnPress   |     function     |    function    | set the function for right icon's onPress                       |
| leftDisable        |     boolean      |     false      | disable the left icon component                                 |
| rightDisable       |     boolean      |     false      | disable the right icon component                                |

## Classic Header Props

| Property              |   Type    |  Default   | Description                                                                  |
| --------------------- | :-------: | :--------: | ---------------------------------------------------------------------------- |
| styles                |  styles   |   styles   | use this to change main style of the header                                  |
| height                |  number   |     50     | use this to change the header's height                                       |
| width                 |  number   |    100%    | use this to change the header's width                                        |
| statusBarHidden       |  boolean  |   false    | use this to let Header Component itself re-arrange depends on the status bar |
| hitSlops              |  object   | object: 30 | use this to change the header's left and right components' hitSlots          |
| bottomStick           |  boolean  |   false    | stick the header to bottom side                                              |
| headerTitle           |  string   |     ""     | use this to set header's title                                               |
| backgroundColor       |   color   |  #ffffff   | use this to change the header's background color                             |
| leftComponent         | component |    Icon    | set the left component                                                       |
| leftComponentStyle    |   style   |   style    | set the left component's style                                               |
| leftComponentDisable  |  boolean  |   false    | disable the left component                                                   |
| leftComponentOnPress  | function  |    null    | set the left component's onPress function                                    |
| rightComponent        | component |    Icon    | set the right component                                                      |
| rightComponentStyle   |   style   |   style    | set the right component's style                                              |
| rightComponentDisable |  boolean  |   false    | disable the right component                                                  |
| rightComponentOnPress | function  |    null    | set the right component's onPress function                                   |
| centerComponent       | component |    Icon    | set the center component                                                     |
| centerComponentStyle  |   style   |   style    | set the center component's style                                             |

## ProfileHeader Props

| Property                     |   Type    |  Default  | Description                                                                             |
| ---------------------------- | :-------: | :-------: | --------------------------------------------------------------------------------------- |
| onLeftButtonPress            | function  | undefined | set the logic for left aligned button                                                   |
| onProfilePicPress            | function  | undefined | set the logic for profile picture                                                       |
| onFirstIconPress             | function  | undefined | set the logic for first icon button                                                     |
| onSecondIconPress            | function  | undefined | set the logic for second icon button                                                    |
| onThirdIconPress             | function  | undefined | set the logic for third icon button                                                     |
| profileImageSource           |   image   |  default  | change the profile image source                                                         |
| leftAlignedButtonImageSource |   image   |  default  | change the left aligned button image source                                             |
| firstIconImageSource         |   image   |  default  | change the first icon image source                                                      |
| secondIconImageSource        |   image   |  default  | change the second icon image source                                                     |
| thirdIconImageSource         |   image   |  default  | change the third icon image source                                                      |
| titleText                    |  string   | undefined | change the title text                                                                   |
| height                       |  number   |    50     | change the profile header's height                                                      |
| backgroundColor              |   color   |   #fff    | change the profile header's background color                                            |
| leftButtonComponent          | component |   Image   | set your own component instead of default left aligned Button Image                     |
| disableFirstIcon             |  boolean  |   false   | disable the first icon                                                                  |
| disableSecondIcon            |  boolean  |   false   | disable the second icon                                                                 |
| disableThirdIcon             |  boolean  |   false   | disable the third icon                                                                  |
| disableLeftAlignedButton     |  boolean  |   false   | disable the left aligned icon                                                           |
| ImageComponent               | component |   Image   | set your own Image component instead of default react native Image such as; `FastImage` |
