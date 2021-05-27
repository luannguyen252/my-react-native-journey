import React from 'react';
import { Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  fontStyle: {
    fontFamily: 'Helvetica',
    fontWeight: '400',
  },
  headerTitle: {
    color: '#5378D2',
    fontWeight: '500',
    opacity: 0.5,
    fontSize: 94,
    lineHeight: 0,
    letterSpacing: 0,
  },
  h1: {
    color: '#000',
    fontSize: 32,
    lineHeight: 48,
  },
  h2: {
    color: '#000',
    fontSize: 28,
    lineHeight: 34,
  },
  h3: {
    color: '#000',
    fontSize: 24,
    lineHeight: 29,
  },
  h4: {
    color: '#929292',
    fontSize: 18,
    lineHeight: 22,
  },
  h5: {
    fontSize: 14,
    color: '#000',
    opacity: 0.6,
    lineHeight: 27,
  },
  p: {
    fontSize: 17,
    color: '#929292',
    lineHeight: 17,
    lineHeight: 24,
  },
});

export function Heading1({ style, ...props }) {
  return (
    <Text 
      style={StyleSheet.flatten([styles.h1, style])}
      {...props}
    />
  );
}

export function Heading2({ style, ...props }) {
  return (
    <Text 
      style={StyleSheet.flatten([styles.h2, style])}
      {...props}
    />
  );
}

export function Heading3({ style, ...props }) {
  return (
    <Text 
      style={StyleSheet.flatten([styles.h3, style])}
      {...props}
    />
  );
}

export function Heading4({ style, ...props }) {
  return (
    <Text 
      style={StyleSheet.flatten([styles.h4, style])}
      {...props}
    />
  );
}

export function Heading5({ style, ...props }) {
  return (
    <Text 
      style={StyleSheet.flatten([styles.h5, style])}
      {...props}
    />
  );
}

export function HeaderTitle({ style, ...props }) {
  return (
    <Text 
      style={StyleSheet.flatten([styles.headerTitle, style])}
      {...props}
    />
  );
}

export function Paragraph({ style, ...props }) {
  return (
    <Text 
      style={StyleSheet.flatten([styles.p, style])}
      {...props}
    />
  );
}
