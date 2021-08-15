import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import colors from "../../../../assets/styles/colors";

import SidemenuAnimation from "./SideMenuAnimation";
import Sidemenu from "./Sidemenu";

export default class ReactNativeAnimateSideMenu extends React.Component {
  constructor() {
    super();
    this.state = {
      screenName: "Hello, Luan Nguyen",
    };
  }

  onMenuAction() {
    this.menu.openMenu();
  }

  render() {
    const { screenName } = this.state;

    return (
      <View style={styles.mainView}>
        <SidemenuAnimation
          ref={(menu) => (this.menu = menu)}
          menuSize={150}
          menuView={
            <Sidemenu
              onSelectMenu={(name) => {
                this.setState({ screenName: name });
                this.menu.openMenu();
              }}
            />
          }
        >
          <TouchableOpacity
            onPress={() => {
              this.onMenuAction();
            }}
            style={styles.menuView}
          >
            <Image
              source={require("./assets/menu.png")}
              style={styles.menuIcon}
            />
          </TouchableOpacity>
          <View style={styles.innerView}>
            <Text style={styles.text}>{screenName}</Text>
          </View>
        </SidemenuAnimation>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: colors.white,
  },
  text: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: "700",
    color: colors.coolGray900,
    textAlign: "center",
    alignSelf: "center",
  },
  innerView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  menuView: {
    marginLeft: 20,
    marginTop: 40,
  },
  menuIcon: {
    height: 30,
    width: 30,
  },
});
