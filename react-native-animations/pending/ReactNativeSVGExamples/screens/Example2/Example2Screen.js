import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import CustomVector from './CustomVector';
import NetworkSvg from './NetworkSvg';
import XmlSvg from './XmlSvg';

const Example2Screen = () => {
  return (
    <ScrollView>
      <View style={styles.section}>
        <Text style={styles.title}>1. Custom Vector</Text>
        <CustomVector />
      </View>
      <View style={styles.section}>
        <Text style={styles.title}>2. Network SVG</Text>
        <NetworkSvg />
      </View>
      <View style={styles.section}>
        <Text style={styles.title}>3. XML Strings</Text>
        <XmlSvg />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    marginBottom: 8,
  },
  section: {
    marginBottom: 16,
  },
});

export default Example2Screen;
