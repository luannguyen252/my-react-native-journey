# React Native ScrollView

## Props of ScrollView

`alwaysBounceVertical`

`contentContainerStyle`

`onScrollBeginDrag`

`onScrollBeginDrag`

`onScrollEndDrag`

`pagingEnabled`

`snapToStart`

`onScroll`

`scrollEnabled`

`onContentSizeChange`

`onContentSizeChange`

`centerContent`

`scrollsToTop`

`snapToEnd`

`horizontal`

`bouncesZoom`

`maximumZoomScale`

`maximumZoomScale`

`contentInset`

`snapToAlignment`

`indicatorStyle`

`zoomScale`

`minimumZoomScale`

`minimumZoomScale`

`refreshControl`

`showsHorizontalScrollIndicator`

`showsHorizontalScrollIndicator`

## React Native ScrollView Example

```javascript
import React, { Component } from "react";
import {
  AppRegistry,
  ScrollView,
  Image,
  Text,
  Button,
  StyleSheet,
} from "react-native";

export default class ScrolledViewExample extends Component {
  onPressButton() {
    alert("You clicked the button!");
  }

  render() {
    return (
      <ScrollView>
        <Text style={{ fontSize: 20 }}>Scroll me plz</Text>
        <Button title={"Button 1"} onPress={this.onPressButton} />
        <Text style={{ fontSize: 20 }}>React Native Example of ScrollView</Text>
        <Button title={"Button 2"} onPress={this.onPressButton} />
        <Text style={{ fontSize: 20 }}>React Native ScrollView Example</Text>
        <Button title={"Button 3"} onPress={this.onPressButton} />
        <Text style={{ fontSize: 20 }}>If you like</Text>
        <Button title={"Button 4"} onPress={this.onPressButton} />
        <Text style={{ fontSize: 20 }}>Scrolling down</Text>
        <Button title={"Button 5"} onPress={this.onPressButton} />
        <Text style={{ fontSize: 20 }}>Scrolling down</Text>
        <Button title={"Button 6"} onPress={this.onPressButton} />
        <Text style={{ fontSize: 20 }}>What's the best</Text>
        <Button title={"Button 7"} onPress={this.onPressButton} />
        <Text style={{ fontSize: 20 }}>What's the best</Text>
        <Button title={"Button 8"} onPress={this.onPressButton} />
        <Text style={{ fontSize: 20 }}>Framework around?</Text>
        <Button title={"Button 9"} onPress={this.onPressButton} />
        <Text style={{ fontSize: 20 }}>Framework around?</Text>
        <Button title={"Button 10"} onPress={this.onPressButton} />
        <Text style={{ fontSize: 20 }}>React Native</Text>
        <Button title={"Button 11"} onPress={this.onPressButton} />
        <Text style={{ fontSize: 20 }}>Scroll me plz</Text>
        <Button title={"Button 12"} onPress={this.onPressButton} />
        <Text style={{ fontSize: 20 }}>Scroll me plz</Text>
        <Button title={"Button 13"} onPress={this.onPressButton} />
        <Text style={{ fontSize: 20 }}>If you like</Text>
        <Button title={"Button 14"} onPress={this.onPressButton} />
        <Text style={{ fontSize: 20 }}>If you like</Text>
        <Button title={"Button 15"} onPress={this.onPressButton} />
        <Text style={{ fontSize: 20 }}>Scrolling down</Text>
        <Button title={"Button 16"} onPress={this.onPressButton} />
      </ScrollView>
    );
  }
}
```

## React Native Horizontal ScrollView Example

```javascript
import React, { Component } from "react";
import {
  AppRegistry,
  ScrollView,
  View,
  Image,
  Text,
  Button,
  StyleSheet,
} from "react-native";

export default class ScrolledViewExample extends Component {
  onPressButton() {
    alert("You clicked the button!");
  }

  render() {
    return (
      <ScrollView horizontal={true} style={styles.container}>
        <Text style={{ fontSize: 22, padding: 10 }}>Horizontal ScrollView</Text>
        <View style={[{ width: 220, height: 70, padding: 10 }]}>
          <Button
            onPress={this.onPressButton}
            title="Button 1"
            color="#FF3D00"
          />
        </View>
        <Text style={{ fontSize: 22, padding: 10 }}>javatpoint</Text>
        <View style={[{ width: 220, height: 70, padding: 10 }]}>
          <Button
            onPress={this.onPressButton}
            title="Button 2"
            color="#3D00FF"
          />
        </View>
        <Text style={{ fontSize: 22, padding: 10 }}>
          React Native ScrollView Example
        </Text>
        <View style={[{ width: 220, height: 70, padding: 10 }]}>
          <Button
            onPress={this.onPressButton}
            title="Button 3"
            color="#FFFF3D"
          />
        </View>
        <Text style={{ fontSize: 22, padding: 10 }}>If you like</Text>
        <View style={[{ width: 220, height: 70, padding: 10 }]}>
          <Button
            onPress={this.onPressButton}
            title="Button 4"
            color="#FF3DFF"
          />
        </View>
        <Text style={{ fontSize: 22, padding: 10 }}>Scrolling horizontal</Text>
        <View style={[{ width: 220, height: 70, padding: 10 }]}>
          <Button
            onPress={this.onPressButton}
            title="Button 5"
            color="#3DFF00"
          />
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  /*    buttonStyle:{ 
        height: 50, 
        width: 70, 
    }*/
});
```
