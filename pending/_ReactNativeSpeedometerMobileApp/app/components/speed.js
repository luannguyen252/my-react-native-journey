import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { convertMetersPerSecondToKilometersPerHour, convertMetersPerSecondToMilesPerHour } from '../util/convert-units';

import { NumberEasing } from './number-easing';
import PropTypes from 'prop-types';
import { UNIT_MEASUREMENT } from '../ducks/unit-measurement';
import { Variables } from '../assets/styles/variables';

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        alignItems: 'center'
    },
    text: {
        backgroundColor: 'transparent',
        fontFamily: Variables.fonts.digital.regular,
        textAlign: 'right'
    },
    textBackground: { opacity: 0.2 },
    textForeground: {
        position: 'absolute',
        right: 0
    }
});

export class Speed extends Component {

    constructor(props) {
        super(props);
        this.convertValue = this.convertValue.bind(this);
    }

    shouldComponentUpdate(nextProps) {
        const { unit, value } = nextProps;
        return (unit !== this.props.unit || value !== this.props.value);
    }

    convertValue() {
        const { unit, value } = this.props;
        const conversion = unit === UNIT_MEASUREMENT.KILOMETERS ? convertMetersPerSecondToKilometersPerHour : convertMetersPerSecondToMilesPerHour;

        return Math.round(conversion(value));
    }

    render() {
        const { color, fontSize, lineHeight, style } = this.props;

        return (
            <View style={[styles.container, style]}>
                <Text style={[styles.text, styles.textBackground, { color, fontSize, lineHeight }]}>888</Text>
                <NumberEasing style={[styles.text, styles.textForeground, { color, fontSize, lineHeight }]} value={this.convertValue()} />
            </View>
        );
    }
}

Speed.defaultProps = {
    color: Variables.colors.white,
    fontSize: Variables.fontSizes.large,
    lineHeight: Variables.lineHeights.large,
    unit: UNIT_MEASUREMENT.KILOMETERS,
    value: 0
};

Speed.propTypes = {
    color: PropTypes.object,
    fontSize: PropTypes.number,
    lineHeight: PropTypes.number,
    style: PropTypes.oneOfType([ PropTypes.number, PropTypes.object ]),
    unit: PropTypes.number,
    value: PropTypes.number
};
