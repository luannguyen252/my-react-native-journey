import React, { PropTypes } from 'react';
import { View, Text, Switch } from 'react-native';
import styles from '../styles';

const Options = (props) => {
    const { onValueChange, isFahrenheit } = props;
    return (
      <View style={styles.options}>
        <View style={styles.optionWrapper}>
          <Text style={styles.weatherInfo}>{'°C   '}</Text>
          <Switch onValueChange={onValueChange} value={isFahrenheit} />
          <Text style={styles.weatherInfo}>{'   °F'}</Text>
        </View>
      </View>);
};

// Options.propTypes = {
//     onValueChange: PropTypes.func.isRequired,
//     isFahrenheit: PropTypes.bool.isRequired,
// };

export default Options;
