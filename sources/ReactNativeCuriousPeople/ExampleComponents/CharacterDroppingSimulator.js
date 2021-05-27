/**
 * Copyright 2015-present 650 Industries. All rights reserved.
 *
 * @providesModule CharacterDroppingSimulator
 */

import React from 'react';
import {
  PixelRatio,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import InteractiveScrollView from 'InteractiveScrollView';

import { isIOS } from 'Platforms';

export default class CharacterDroppingSimulator extends React.Component {

  constructor(props, context) {
    super(props, context);

    this._updateText = this._updateText.bind(this);
    this.state = {
      value: '',
      lastChange: new Date(),
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.shadow}>
          <InteractiveScrollView.TextInput
            value={this.state.value}
            onChangeText={this._updateText}
            placeholder={this.props.placeholder}
            ref={(view) => { this._textInput = view; }}
            style={styles.textInput} />
        </View>

        <Text style={styles.subtitle}>
          {this.props.subtitle}
        </Text>
      </View>
    );
  }

  _updateText(text) {
    let { value, lastChange } = this.state;
    let currentChange = new Date();
    let n = parseInt(Math.random() * 10);
    let randomize = n % 2 === 0;
    const delay = isIOS ? 300 : 600;

    if (randomize && text.length >= 2 && (currentChange - lastChange) <= delay) {
      let newValue = text.substr(0, text.length - 2) + text[text.length - 1];
      this.setState({value: newValue, lastChange: currentChange});
    } else {
      this.setState({value: text, lastChange: currentChange});
    }
  }
}

let styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginBottom: 25,
  },
  shadow: {
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 2,
    shadowOffset: {width: 0, height: 2},
  },
  textInput: {
    height: 45,
    borderWidth: 1.0 / PixelRatio.get(),
    borderColor: '#DCDCDC',
    paddingHorizontal: 10,
    fontSize: 13,
  },
  subtitle: {
    color: '#9C9C9C',
    marginTop: 7,
    fontSize: 12,
  },
});
