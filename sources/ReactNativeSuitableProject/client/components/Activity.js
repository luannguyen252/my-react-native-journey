import React from 'react';
import PropTypes from 'prop-types';
import { Text, StyleSheet } from 'react-native'
import { Card, Button } from 'react-native-elements';
import { primaryColor } from '../styles/common';

const Activity = ({ activity, onPress }) => {
  const { details } = activity;
  return (
    <Card containerStyle={styles.card} >
      <Text style={styles.title}>
        {details.title}
      </Text>
      <Text style={styles.description}>
        {details.description}
      </Text>
      <Button
        icon={{ name:'check', color:'#ffffff' }}
        backgroundColor={primaryColor}
        buttonStyle={styles.button}
        title='Mark Activity Complete'
        onPress={() => onPress(activity)}
      />
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 0,
    marginTop: 10,
    marginBottom: 1
  },
  title: {
    fontWeight: 'bold', 
    marginBottom: 10
  },
  description: {
    marginBottom: 15
  },
  button: {
    borderRadius: 0,
    marginBottom: 15,
  }
});

Activity.propTypes = {
  activity: PropTypes.object,
  onPress: PropTypes.func
}


export default Activity;