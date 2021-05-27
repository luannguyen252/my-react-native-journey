import React from 'react';
import { Platform, KeyboardAvoidingView } from 'react-native';

const KeyboardView = ({ style, children }) => (
  <KeyboardAvoidingView style={style} behavior={behavior}>
    {children}
  </KeyboardAvoidingView>
);

const behavior = (Platform.OS === 'ios') ? 'padding' : null;

export { KeyboardView };
