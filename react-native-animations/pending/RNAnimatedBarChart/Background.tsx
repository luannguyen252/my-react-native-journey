import React, { Component } from 'react';
import { View } from 'react-native';

import styles from './styles'

class Background extends Component {
  _view: any;

  constructor(props: any) {
    super(props);
    (this: any).setNativeProps = this.setNativeProps.bind(this);
  }

  shouldComponentUpdate() {
    return false;
  }

  setNativeProps(props: Object) {
    return this._view.setNativeProps(props);
  }

  render() {
    return <View ref={c => (this._view = c)} style={styles.background} />;
  }
}

export default Background;