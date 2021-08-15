import React, { Component } from 'react';
import { ActivityIndicator, View, Text, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import config from '../config'; 

export default class StatusBarComponent extends Component { 
    
      render() {
            return (
                 <View style={ height=config.constants.STATUSBAR_HEIGHT}>
                      <StatusBar backgroundColor={config.colors.secondaryColor} barStyle="dark-content" />
                 </View>
            );
      } 
} 