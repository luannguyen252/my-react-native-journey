import * as React from "react";
import { View, StyleSheet } from "react-native";
import { createTabNavigator } from "react-navigation-tabs";
import BottomTabBar from "./BottomTabBar";
import ResourceSavingScene from "./ResourceSavingScene";

class TabNavigationView extends React.PureComponent {
  static defaultProps = {
    lazy: true,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const { index } = nextProps.navigation.state;

    return {
      // Set the current tab to be loaded if it was not loaded before
      loaded: prevState.loaded.includes(index)
        ? prevState.loaded
        : [...prevState.loaded, index],
    };
  }

  state = {
    loaded: [this.props.navigation.state.index],
  };

  _renderTabBar = () => {
    const {
      tabBarComponent: TabBarComponent = BottomTabBar,
      tabBarOptions,
      navigation,
      screenProps,
      getLabelText,
      getAccessibilityLabel,
      getButtonComponent,
      getTestID,
      renderIcon,
      onTabPress,
    } = this.props;

    const { descriptors } = this.props;
    const { state } = this.props.navigation;
    const route = state.routes[state.index];
    const descriptor = descriptors[route.key];
    const options = descriptor.options;

    if (options.tabBarVisible === false) {
      return null;
    }

    return (
      <TabBarComponent
        {...tabBarOptions}
        jumpTo={this._jumpTo}
        navigation={navigation}
        screenProps={screenProps}
        onTabPress={onTabPress}
        getLabelText={getLabelText}
        getButtonComponent={getButtonComponent}
        getAccessibilityLabel={getAccessibilityLabel}
        getTestID={getTestID}
        renderIcon={renderIcon}
      />
    );
  };

  _jumpTo = (key) => {
    const { navigation, onIndexChange } = this.props;

    const index = navigation.state.routes.findIndex(
      (route) => route.key === key
    );

    onIndexChange(index);
  };

  render() {
    const { navigation, renderScene, lazy } = this.props;
    const { routes } = navigation.state;
    const { loaded } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.pages}>
          {routes.map((route, index) => {
            if (lazy && !loaded.includes(index)) {
              // Don't render a screen if we've never navigated to it
              return null;
            }

            const isFocused = navigation.state.index === index;

            return (
              <ResourceSavingScene
                key={route.key}
                style={[
                  StyleSheet.absoluteFill,
                  { opacity: isFocused ? 1 : 0 },
                ]}
                isVisible={isFocused}
              >
                {renderScene({ route })}
              </ResourceSavingScene>
            );
          })}
        </View>
        {this._renderTabBar()}
        {this.props.crossTabsComponent}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: "hidden",
  },
  pages: {
    flex: 1,
  },
});

export default createTabNavigator(TabNavigationView);
