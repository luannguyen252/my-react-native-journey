import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  text: {
    color: '#3A9C4A',
    fontSize: 18,
  },
  button: {
    paddingLeft: 80,
    paddingRight: 80,
    height: 50,
    borderWidth: 2,
    borderColor: '#3A9C4A',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default class Button extends PureComponent {
  render() {
    const { text, onPress } = this.props;
    return (
      <TouchableOpacity onPress={onPress}>
        <View style={StyleSheet.flatten(styles.button)}>
          <Text style={StyleSheet.flatten(styles.text)}>
            {text}
          </Text>
        </View>
      </TouchableOpacity>
    ) 
  }
}