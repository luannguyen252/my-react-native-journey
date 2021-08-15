### Props

| Key                      | Type   | Default                                                                           |
| ------------------------ | ------ | --------------------------------------------------------------------------------- |
| data                     | Array  | [ {title : 'Title',subTitle:'Dance with',image : ''},{title : 'Title',image :''}] |
| height                   | Number | height/2                                                                          |
| width                    | Number | width-120                                                                         |
| title                    | String | Title                                                                             |
| subTitle                 | String | Subtitle                                                                          |
| primaryBackgroundColor   | String | '#4528AC'                                                                         |
| secondaryBackgroundColor | String | '#fff'                                                                            |

### Usage

```
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Dimensions,
  View,
  Text,
  StatusBar,
} from 'react-native';
import AnimationFlatlist from 'react-native-animated-image-list'

const { width, height } = Dimensions.get('window');

let SampleData = [
  {title : 'Spiderman',image :'' ,subTitle:'Dance with'},
  {title : 'Stormtrooper',image :'https://i.picsum.photos/id/425/200/300.jpg?hmac=P1vjZ6T-wo-aULK7NbbLYxIaV92_0q56o0BFWcWOdmo'},
  {title : 'Woody toy',image :'https://i.picsum.photos/id/425/200/300.jpg?hmac=P1vjZ6T-wo-aULK7NbbLYxIaV92_0q56o0BFWcWOdmo'},
  {title : 'Wolverine',image :'https://i.picsum.photos/id/425/200/300.jpg?hmac=P1vjZ6T-wo-aULK7NbbLYxIaV92_0q56o0BFWcWOdmo'}
  ]


const ITEM_SIZE = width-120
const ITEM_HEIGHT = height/2

class App extends React.Component
{
  render()
  {
    return(
      <View style = {{flex:1}}>
      <AnimationFlatlist
       data={SampleData}
       height={ITEM_HEIGHT}
       width={ITEM_SIZE}
       title={'Welcome'}
       subTitle={'Choose your character'}
       primaryBackgroundColor = '#4528AC'
       secondaryBackgroundColor = '#d3d3d3'
       textPrimaryColor = '#fff'
       textSecondaryColor = '#000'
      />
      </View>
    )
  }
}

export default App;
```
