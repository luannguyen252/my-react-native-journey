/* @flow */
import React, { Component } from 'react';
import { Animated, View, Text, TouchableWithoutFeedback } from 'react-native';

import styles from './styles';

type DefaultProps = {
  onChange: (value: *) => void
};

type Props = DefaultProps & {
  animateDuration: number,
  tabWidth: number,
  labels: Array<string>,
  values: Array<*>,
  selected: *,
  contentContainerStyle?: any
};

class SegmentedControl extends Component<DefaultProps, Props, void> {
  static defaultProps = {
    onChange: () => {}
  };

  _scrollValue = new Animated.Value(0);

  constructor(props: Props) {
    super(props);
    (this: any)._onChange = this._onChange.bind(this);
  }

  shouldComponentUpdate() {
    return false;
  }

  _onChange(value: *, index: number) {
    this.props.onChange(value, index);
    Animated.timing(this._scrollValue, {
      toValue: index,
      duration: this.props.animateDuration
    }).start(() => this.forceUpdate());
  }

  render() {
    const { labels, values, selected } = this.props;
    const tabWidth = this.props.tabWidth;

    const translateX = this._scrollValue.interpolate({
      inputRange: values.map((_, i) => i),
      outputRange: values.map((_, i) => i * tabWidth)
    });

    return (
      <View style={this.props.contentContainerStyle}>
        <View style={styles.container}>
          {values.map((value, index) =>
            <TouchableWithoutFeedback key={value} onPress={() => this._onChange(value, index)}>
              <View style={[styles.item, { width: tabWidth }]}>
                <Text style={[styles.text, value === selected && styles.selectedText]}>
                  {labels[index]}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          )}
        </View>
        <Animated.View style={[styles.border, { width: tabWidth, transform: [{ translateX }] }]} />
      </View>
    );
  }
}

export default SegmentedControl;
