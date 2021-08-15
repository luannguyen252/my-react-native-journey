import React, { Component } from 'react';
import { ActivityIndicator, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import config from '../config';

export default class ProgressComponent extends Component {
      constructor(props) {
            super(props);
            this.state = {
                  loading: true
            }
      }

      render() {
            return (
                  <View style={[styles.container, styles.horizontal]}>
                        <ActivityIndicator size="large" color={config.colors.appColor} />
                  </View>
            );
      }

      showLoading = () => {
            this.setState({ loading: true })
      }

      hideLoading = () => {
            this.setState({ loading: false })
      }
}

const styles = StyleSheet.create({
      container: {
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center', 
            backgroundColor: 'rgb(255,255,255)',
      },
      horizontal: {
            flexDirection: 'row',
            justifyContent: 'space-around',
            padding: 10
      }
})