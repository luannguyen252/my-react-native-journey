import React, { Component } from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';

import PropTypes from 'prop-types';
import { Variables } from '../assets/styles/variables';
import { connect } from 'react-redux';
import { formatSecondsToTime } from '../util/format-seconds-to-time';

const styles = StyleSheet.create({
    container: { position: 'relative' },
    label: {
        backgroundColor: 'transparent',
        color: Variables.colors.white,
        fontFamily: Variables.fonts.sansSerif.bold,
        fontSize: Variables.fontSizes.small,
        lineHeight: Variables.lineHeights.small,
        textAlign: 'center'
    },
    labelContainer: {
        alignItems: 'center',
        borderBottomLeftRadius: Variables.border.radius,
        borderBottomRightRadius: Variables.border.radius,
        justifyContent: 'center',
        paddingVertical: Variables.spacer.base / 6
    },
    timeContainer: { position: 'relative' },
    time: {
        backgroundColor: 'transparent',
        fontFamily: Variables.fonts.digital.regular,
        fontSize: Variables.fontSizes.medium * 2,
        lineHeight: Variables.fontSizes.medium * 2,
        textAlign: 'right'
    },
    timeBackground: { opacity: 0.2 },
    timeForeground: {
        position: 'absolute',
        right: 0
    },
    valueBackground: {
        alignItems: 'center',
        backgroundColor: Variables.colors.primaryDark,
        borderRadius: Variables.border.radius,
        borderTopLeftRadius: Variables.border.radius,
        borderTopRightRadius: Variables.border.radius,
        paddingVertical: Variables.spacer.base / 4,
        paddingHorizontal: Variables.spacer.base / 2,
        position: 'relative'
    }
});

export class Timer extends Component {

    constructor(props) {
        super(props);
        this.state = { colonVisible: true };

        this.blink = this.blink.bind(this);
    }

    componentWillMount() {
        this.blink = setInterval(this.blink, 750);
    }

    componentWillUnmount() {
        clearInterval(this.blink);
    }

    blink() {
        this.setState(previousState => {
            return { colonVisible: !previousState.colonVisible };
        });
    }

    render() {
        const { color, label, onPress, style, timerSecondsElapsed } = this.props;
        const { colonVisible } = this.state;

        return (
            <TouchableWithoutFeedback onPress={onPress} style={[styles.container, style]}>
                <View>
                    <View style={styles.valueBackground}>
                        <View style={styles.timeContainer}>
                            <Text style={[styles.time, styles.timeBackground, { color }]}>88:88</Text>
                            {colonVisible && <Text style={[styles.time, styles.timeForeground, { color }]}>{'\u00a0\u00a0:\u00a0\u00a0'}</Text>}
                            <Text style={[styles.time, styles.timeForeground, { color }]}>{formatSecondsToTime(timerSecondsElapsed)}</Text>
                        </View>
                    </View>
                    <View style={styles.labelContainer}>
                        <Text style={styles.label}>{label.toUpperCase()}</Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

Timer.defaultProps = {
    color: Variables.colors.white,
    label: 'Lab',
    onPress: () => {},
    timerSecondsElapsed: 0
};

Timer.propTypes = {
    color: PropTypes.object,
    label: PropTypes.string,
    onPress: PropTypes.func,
    startTimer: PropTypes.func,
    style: PropTypes.oneOfType([ PropTypes.number, PropTypes.object ]),
    timerSecondsElapsed: PropTypes.number
};

export default connect(
    state => Object.assign({}, state.timerDuck ),
    Object.assign({}, {})
)(Timer);
