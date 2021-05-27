# React Native Passing Value between Screen

## Example

```javascript
// navigation.navigate
this.props.navigation.navigate("RouteName", {
  /* params go here */
});

this.props.navigation.getParam(paramName, defaultValue);
```

## HomeScreen.js

```javascript
import React from "react";
import { StyleSheet, View, Button, TextInput } from "react-native";

export default class HomeScreen extends React.Component {
  constructor(props) {
    // Constructor to set default state
    super(props);
    this.state = {
      username: "",
    };
  }

  static navigationOptions = {
    title: "Home",
    headerStyle: {
      backgroundColor: "#f4511e",
    },
    //headerTintColor: '#0ff',
    headerTitleStyle: {
      fontWeight: "bold",
    },
  };

  render() {
    const { navigate } = this.props.navigation;

    return (
      // View to hold our multiple components
      <View style={styles.container}>
        {/* Input to get the value from the user */}
        <TextInput
          value={this.state.username}
          onChangeText={(username) => this.setState({ username })}
          placeholder={"Enter Any value"}
          style={styles.textInput}
        />
        <View style={styles.buttonStyle}>
          <Button
            title="Submit"
            // color="#00B0FF"
            onPress={() =>
              this.props.navigation.navigate("Profile", {
                userName: this.state.username,
                otherParam: "101",
              })
            }
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    padding: 16,
  },
  textInput: {
    height: 45,
    width: "95%",
    borderColor: "gray",
    borderWidth: 1,
    fontSize: 20,
  },
  buttonStyle: {
    width: "93%",
    marginTop: 50,
    backgroundColor: "red",
  },
});
```

## ProfileScreen.js

```javascript
import React from "react";
import { StyleSheet, View, Text, Button } from "react-native";

export default class ProfileScreen extends React.Component {
  static navigationOptions = {
    title: "Profile",
    headerStyle: {
      backgroundColor: "#f4511e",
    },
    //headerTintColor: '#0ff',
    headerTitleStyle: {
      fontWeight: "bold",
    },
  };
  render() {
    // Using the navigation prop we can get the value passed from the previous screen
    const { navigation } = this.props;
    const user_name = navigation.getParam("userName", "NO-User");
    const other_param = navigation.getParam("otherParam", "some default value");

    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text style={{ marginTop: 16, fontSize: 20 }}>
          This is Profile Screen and we receive value from Home Screen
        </Text>
        <Text style={styles.textStyle}>
          User Name: {JSON.stringify(user_name)}
        </Text>
        <Text style={styles.textStyle}>
          Other Param: {JSON.stringify(other_param)}
        </Text>
        <View style={styles.buttonStyle}>
          <Button
            title="Go back"
            onPress={() => this.props.navigation.goBack()}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 23,
    textAlign: "center",
    color: "#f00",
  },

  buttonStyle: {
    width: "93%",
    marginTop: 50,
    backgroundColor: "red",
  },
});
```

## App.js

```javascript
import React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
import HomeScreen from "./HomeScreen";
import ProfileScreen from "./ProfileScreen";

const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Profile: ProfileScreen,
  },
  {
    initialRouteName: "Home",
  }
);

export default createAppContainer(AppNavigator);
```

## HomeScreen.js

```javascript
onPress={() =>
    navigate('Profile', {
        JSON_ListView_Clicked_Item: this.state.username,
    })
}
```

## ProfileScreen.js

```javascript
// 1. This screen read the value in two ways without checking
{
  this.props.navigation.state.params.JSON_ListView_Clicked_Item;
}
// 2. Or checking the input value is null or not
{
  this.props.navigation.state.params.JSON_ListView_Clicked_Item
    ? this.props.navigation.state.params.JSON_ListView_Clicked_Item
    : "No Value Passed";
}
// 3.
<Text style={styles.textStyle}>
    {this.props.navigation.state.params.JSON_ListView_Clicked_Item}
</Text>
<Text style={{ marginTop: 16,fontSize: 20, }}>With Check</Text>
// If you want to check the value is passed or not, you can use conditional operator.
<Text style={styles.textStyle}>
    {this.props.navigation.state.params.JSON_ListView_Clicked_Item ? this.props.navigation.state.params.JSON_ListView_Clicked_Item : 'No Value Passed'}
</Text>
```
