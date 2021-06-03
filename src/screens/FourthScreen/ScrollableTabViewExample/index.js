import React, { PureComponent } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import ScrollableTabView, {
  DefaultTabBar,
  ScrollableTabBar,
} from "react-native-scrollable-tab-view";
import Icon from "react-native-vector-icons/Ionicons";

class SimpleExample extends PureComponent {
  render() {
    return (
      <ScrollableTabView
        style={{ marginTop: 20 }}
        initialPage={1}
        renderTabBar={() => <DefaultTabBar />}
      >
        <Text tabLabel="Tab #1">My</Text>
        <Text tabLabel="Tab #2">favorite</Text>
        <Text tabLabel="Tab #3">project</Text>
      </ScrollableTabView>
    );
  }
}

class ScrollableTabsExample extends PureComponent {
  render() {
    return (
      <ScrollableTabView
        style={{ marginTop: 20 }}
        initialPage={0}
        renderTabBar={() => <ScrollableTabBar />}
      >
        <Text tabLabel="Tab #1">My</Text>
        <Text tabLabel="Tab #2 word word">favorite</Text>
        <Text tabLabel="Tab #3 word word word">project</Text>
        <Text tabLabel="Tab #4 word word word word">favorite</Text>
        <Text tabLabel="Tab #5">project</Text>
      </ScrollableTabView>
    );
  }
}

class OverlayExample extends PureComponent {
  render() {
    return (
      <ScrollableTabView
        style={styles.container}
        renderTabBar={() => (
          <DefaultTabBar backgroundColor="rgba(255, 255, 255, 0.7)" />
        )}
        tabBarPosition="overlayTop"
      >
        <ScrollView tabLabel="iOS">
          <View style={{ flexDirection: "row" }}>
            <Icon
              name="logo-apple"
              color="black"
              size={120}
              style={styles.icon}
            />
            <Icon
              name="ios-phone-portrait"
              color="black"
              size={120}
              style={styles.icon}
            />
            <Icon
              name="logo-apple"
              color="#DBDDDE"
              size={120}
              style={styles.icon}
            />
            <Icon
              name="ios-phone-portrait"
              color="#DBDDDE"
              size={120}
              style={styles.icon}
            />
          </View>
        </ScrollView>
        <ScrollView tabLabel="Android">
          <View style={{ flexDirection: "row" }}>
            <Icon
              name="logo-android"
              color="#A4C639"
              size={120}
              style={styles.icon}
            />
            <Icon
              name="logo-android"
              color="black"
              size={120}
              style={styles.icon}
            />
            <Icon
              name="logo-android"
              color="brown"
              size={120}
              style={styles.icon}
            />
          </View>
        </ScrollView>
      </ScrollableTabView>
    );
  }
}

class FacebookTabBar extends PureComponent {
  icons = [];

  constructor(props) {
    super(props);
    this.icons = [];
  }

  componentDidMount() {
    this._listener = this.props.scrollValue.addListener(
      this.setAnimationValue.bind(this)
    );
  }

  setAnimationValue({ value }) {
    this.icons.forEach((icon, i) => {
      const progress = value - i >= 0 && value - i <= 1 ? value - i : 1;
      icon.setNativeProps({
        style: {
          color: this.iconColor(progress),
        },
      });
    });
  }

  //color between rgb(59,89,152) and rgb(204,204,204)
  iconColor(progress) {
    const red = 59 + (204 - 59) * progress;
    const green = 89 + (204 - 89) * progress;
    const blue = 152 + (204 - 152) * progress;
    return `rgb(${red}, ${green}, ${blue})`;
  }

  render() {
    return (
      <View style={[styles.tabs, this.props.style]}>
        {this.props.tabs.map((tab, i) => {
          return (
            <TouchableOpacity
              key={tab}
              onPress={() => this.props.goToPage(i)}
              style={styles.tab}
            >
              <Icon
                name={tab}
                size={30}
                color={
                  this.props.activeTab === i
                    ? "rgb(59,89,152)"
                    : "rgb(204,204,204)"
                }
                ref={(icon) => {
                  this.icons[i] = icon;
                }}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }
}

class FacebookExample extends PureComponent {
  render() {
    return (
      <ScrollableTabView
        style={{ marginTop: 20 }}
        initialPage={1}
        renderTabBar={() => <FacebookTabBar />}
      >
        <ScrollView tabLabel="newspaper" style={styles.tabView}>
          <View style={styles.card}>
            <Text>News</Text>
          </View>
        </ScrollView>
        <ScrollView tabLabel="ios-people" style={styles.tabView}>
          <View style={styles.card}>
            <Text>Friends</Text>
          </View>
        </ScrollView>
        <ScrollView tabLabel="chatbox" style={styles.tabView}>
          <View style={styles.card}>
            <Text>Messenger</Text>
          </View>
        </ScrollView>
        <ScrollView tabLabel="ios-notifications" style={styles.tabView}>
          <View style={styles.card}>
            <Text>Notifications</Text>
          </View>
        </ScrollView>
        <ScrollView tabLabel="ios-list" style={styles.tabView}>
          <View style={styles.card}>
            <Text>Other nav</Text>
          </View>
        </ScrollView>
      </ScrollableTabView>
    );
  }
}

export default class ScrollableTabViewExample extends PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView>
          <StatusBar style="auto" />
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 80 }}
          >
            <View style={{ height: 300, backgroundColor: "#F4F4F4" }}>
              <SimpleExample />
            </View>
            <View style={{ height: 300, backgroundColor: "#E9E9E9" }}>
              <ScrollableTabsExample />
            </View>
            <View style={{ height: 300, backgroundColor: "#E9E9E9" }}>
              <OverlayExample />
            </View>
            <View style={{ height: 300, backgroundColor: "#E9E9E9" }}>
              <FacebookExample />
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  text: {},
  icon: {
    width: 120,
    height: 120,
    alignSelf: "center",
  },
  tabView: {
    flex: 1,
    padding: 10,
    backgroundColor: "rgba(0,0,0,0.01)",
  },
  card: {
    borderWidth: 1,
    backgroundColor: "#fff",
    borderColor: "rgba(0,0,0,0.1)",
    margin: 5,
    height: 150,
    padding: 15,
    shadowColor: "#ccc",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 10,
  },
  tabs: {
    height: 45,
    flexDirection: "row",
    paddingTop: 5,
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomColor: "rgba(0,0,0,0.05)",
  },
});
