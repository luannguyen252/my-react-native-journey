import React, { Component } from "react";
import {
  Switch,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import Constants from "expo-constants";
import * as Animatable from "react-native-animatable";
import Collapsible from "./Collapsible";
import Accordion from "./Accordion";
import colors from "../../../../assets/styles/colors";

const DUMB_TEXT =
  "The quick brown fox jumps over the lazy dog is an English-language pangram—a sentence that contains all of the letters of the English alphabet. Owing to its brevity and coherence, it has become widely known.";

const CONTENT = [
  {
    title: "First",
    content: DUMB_TEXT,
  },
  {
    title: "Second",
    content: DUMB_TEXT,
  },
  {
    title: "Third",
    content: DUMB_TEXT,
  },
  {
    title: "Fourth",
    content: DUMB_TEXT,
  },
  {
    title: "Fifth",
    content: DUMB_TEXT,
  },
];

const SELECTORS = [
  {
    title: "First",
    value: 0,
  },
  {
    title: "Second",
    value: 1,
  },
  {
    title: "Third",
    value: 2,
  },
  {
    title: "Fourth",
    value: 3,
  },
  {
    title: "None",
  },
];

export default class ReactNativeCollapsible extends Component {
  state = {
    activeSections: [],
    collapsed: true,
    multipleSelect: false,
  };

  toggleExpanded = () => {
    this.setState({ collapsed: !this.state.collapsed });
  };

  setSections = (sections) => {
    this.setState({
      activeSections: sections.includes(undefined) ? [] : sections,
    });
  };

  renderHeader = (section, _, isActive) => {
    return (
      <Animatable.View
        duration={400}
        style={[styles.header, isActive ? styles.active : styles.inactive]}
        transition="backgroundColor"
      >
        <Text style={styles.headerText}>{section.title}</Text>
      </Animatable.View>
    );
  };

  renderContent(section, _, isActive) {
    return (
      <Animatable.View
        duration={400}
        style={[styles.content, isActive ? styles.active : styles.inactive]}
        transition="backgroundColor"
      >
        <Animatable.Text
          animation={isActive ? "bounceIn" : undefined}
          style={{
            fontSize: 14,
            lineHeight: 16,
            fontWeight: "400",
            color: colors.coolGray600,
          }}
        >
          {section.content}
        </Animatable.Text>
      </Animatable.View>
    );
  }

  render() {
    const { multipleSelect, activeSections } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.selectors}>
          {SELECTORS.map((selector) => (
            <TouchableOpacity
              key={selector.title}
              onPress={() => this.setSections([selector.value])}
            >
              <View style={styles.selector}>
                <Text
                  style={[
                    activeSections.includes(selector.value) &&
                      styles.activeSelector,
                    {
                      fontSize: 16,
                      lineHeight: 22,
                      fontWeight: "700",
                      color: colors.coolGray900,
                    },
                  ]}
                >
                  {selector.title}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity onPress={this.toggleExpanded}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Single Collapsible</Text>
          </View>
        </TouchableOpacity>
        <Collapsible collapsed={this.state.collapsed} align="center">
          <View style={styles.content}>
            <Text
              style={{
                fontSize: 14,
                lineHeight: 16,
                fontWeight: "400",
                color: colors.coolGray600,
              }}
            >
              {DUMB_TEXT}
            </Text>
          </View>
        </Collapsible>
        <Accordion
          activeSections={activeSections}
          sections={CONTENT}
          touchableComponent={TouchableOpacity}
          expandMultiple={multipleSelect}
          renderHeader={this.renderHeader}
          renderContent={this.renderContent}
          duration={400}
          onChange={this.setSections}
          renderAsFlatList={false}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: Constants.statusBarHeight,
    justifyContent: "flex-start",
  },
  title: {
    textAlign: "center",
    fontSize: 24,
    lineHeight: 32,
    fontWeight: "700",
    marginBottom: 16,
  },
  header: {
    backgroundColor: colors.coolGray100,
    padding: 16,
  },
  headerText: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "700",
    textAlign: "center",
  },
  content: {
    padding: 24,
    backgroundColor: colors.white,
  },
  active: {
    backgroundColor: colors.coolGray200,
  },
  inactive: {
    backgroundColor: colors.coolGray100,
  },
  selectors: {
    marginBottom: 16,
    flexDirection: "row",
    justifyContent: "center",
  },
  selector: {
    backgroundColor: colors.coolGray100,
    padding: 16,
  },
  activeSelector: {
    fontWeight: "bold",
  },
  multipleToggle: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 32,
    alignItems: "center",
  },
  multipleToggle__title: {
    fontSize: 16,
    marginRight: 8,
  },
});
