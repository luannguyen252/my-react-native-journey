import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Platform} from 'react-native';
import {Colors} from '../Assets';

const Tabs = (props) => {
  const onPressTab = (event) => {
    props.onPressTab(event);
  };

  return (
    <View
      style={[
        styles.tabsContainer,
        {borderBottomColor: props.Tabs ? Colors.borderLight : 'transparent'},
        props.ContainerStyle,
      ]}>
      {props.tabs.map((tabTitle, index) => {
        return (
          <TouchableOpacity
            key={index}
            style={[
              styles.tab,
              props.Tabs && [
                props.selectedTab == index + 1 ? styles.activeTab : null,
                props.deactivatedTabStyle,
                props.selectedTab == index + 1 ? props.activatedTabStyle : null,
              ],
            ]}
            activeOpacity={1}
            onPress={() => onPressTab(index + 1, false)}>
            <Text
              adjustsFontSizeToFit
              minimumFontScale={0.9}
              numberOfLines={1}
              style={[
                styles.tabText,
                props.selectedTab == index + 1 ? {fontWeight: 'bold'} : null,
              ]}>
              {tabTitle}
            </Text>
            {props.dots && (
              <View
                style={[
                  props.selectedTab == index + 1
                    ? styles.dotsActiveTab
                    : {
                        marginTop: 10,
                        width: 7,
                        height: 7,
                      },
                ]}
              />
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
const styles = StyleSheet.create({
  tabsContainer: {
    flexDirection: 'row',
    width: '100%',
    borderBottomWidth: 4,
    height: 66,
  },
  tab: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 3,
    borderBottomColor: Colors.MainColor,
    borderStyle: 'solid',
    marginBottom: Platform.OS === 'android' ? -4 : null,
  },
  tabText: {
    fontSize: 17,
    letterSpacing: 1,
    color: '#3E3E3E',
    fontWeight: '600',
  },
  dotsActiveTab: {
    width: 7,
    height: 7,
    backgroundColor: Colors.MainColor,
    borderRadius: 25,
    marginTop: 10,
  },
});

export {Tabs};
