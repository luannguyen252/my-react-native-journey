import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import PropTypes from 'prop-types';
import { SignalStrengthBar } from './signal-strength-bar';
import { Variables } from '../assets/styles/variables';

const styles = StyleSheet.create({
    barContainer: {
        alignItems: 'flex-end',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    container: {
        height: Variables.spacer.base * (3/4),
        width: Variables.spacer.base * (3/4)
    }
});

export class SignalStrength extends Component {

    render() {
        const { accuracy, style } = this.props;

        return (
            <View style={[styles.container, style]}>
                <View style={styles.barContainer}>
                    <SignalStrengthBar active={accuracy < 20} heightPercentage={25} />
                    <SignalStrengthBar active={accuracy < 15} heightPercentage={50} />
                    <SignalStrengthBar active={accuracy < 10} heightPercentage={75} />
                    <SignalStrengthBar active={accuracy < 5} heightPercentage={100} />
                </View>
            </View>
        );
    }
}

SignalStrength.defaultProps = {
    accuracy: 40
};

SignalStrength.propTypes = {
    accuracy: PropTypes.number,
    style: PropTypes.oneOfType([ PropTypes.number, PropTypes.object ])
};
