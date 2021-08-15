import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Image,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import colors from "../../../../assets/styles/colors";

const { width, height } = Dimensions.get("window");
let menuData = [
  { name: "Profile", image: require("./assets/user.png") },
  { name: "Settings", image: require("./assets/settings.png") },
  { name: "Videos", image: require("./assets/videos.png") },
  { name: "Help", image: require("./assets/help.png") },
  { name: "Logout", image: require("./assets/logout.png") },
];

export default class Sidemenu extends React.Component {
  render() {
    return (
      <View style={styles.mainView}>
        <View
          style={{
            marginTop: 60,
            marginLeft: 20,
            width: width - this.props.menuSize,
            justifyContent: "center",
            height: "90%",
          }}
        >
          {this.renderMenu()}
        </View>
      </View>
    );
  }

  renderMenu() {
    return menuData.map((item, index) => {
      return this.renderItem(item);
    });
  }

  renderItem(item) {
    return (
      <TouchableOpacity
        key={item.name}
        onPress={() => {
          this.props.onSelectMenu(item.name);
        }}
        style={{
          padding: 8,
          height: 64,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View
          style={{
            padding: 8,
            borderRadius: 28,
            backgroundColor: "rgba(0, 0, 0, 0.25)",
          }}
        >
          <Image
            source={item.image}
            style={{ tintColor: colors.white, height: 20, width: 20 }}
          />
        </View>
        <Text style={styles.titleStyle}>{item.name}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: colors.violet600,
  },
  titleStyle: {
    color: colors.white,
    fontSize: 18,
    lineHeight: 24,
    fontWeight: "500",
    marginLeft: 16,
  },
});

Sidemenu.defaultProps = {
  menuSize: 150,
};
