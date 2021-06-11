import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import PropTypes from 'prop-types';
import { Variables } from '../assets/styles/variables';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginLeft: 1
    }
});

export class SignalStrengthBar extends Component {

    shouldComponentUpdate(nextProps) {
        const { active } = nextProps;
        return active !== this.props.active;
    }

    render() {
        const { activeColor, active, inactiveColor, style, heightPercentage } = this.props;
        const backgroundColor = active ? activeColor : inactiveColor;
        const height = `${heightPercentage}%`;

        return (
            <View style={[styles.container, { backgroundColor, height }, style]} />
        );
    }
}

SignalStrengthBar.defaultProps = {
    active: false,
    heightPercentage: 100,
    activeColor: Variables.colors.white,
    inactiveColor: Variables.colors.white.fade(0.9)
};

SignalStrengthBar.propTypes = {
    active: PropTypes.bool,
    heightPercentage: PropTypes.number,
    activeColor: PropTypes.object,
    inactiveColor: PropTypes.object,
    style: PropTypes.oneOfType([ PropTypes.number, PropTypes.object ])
};
