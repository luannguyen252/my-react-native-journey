import React, { Component } from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { convertMetersToKilometers, convertMetersToMiles } from '../util/convert-units';

import PropTypes from 'prop-types';
import { UNIT_MEASUREMENT } from '../ducks/unit-measurement';
import { Variables } from '../assets/styles/variables';

const styles = StyleSheet.create({
    value: {
        backgroundColor: 'transparent',
        fontFamily: Variables.fonts.digital.regular,
        fontSize: Variables.fontSizes.medium * 1.3,
        lineHeight: Variables.lineHeights.medium * 1.3
    },
    valueBackground: {
        opacity: 0.2,
        position: 'absolute',
    },
    valueContainer: {
        backgroundColor: Variables.colors.primaryDark,
        borderBottomLeftRadius: Variables.border.radius,
        borderTopLeftRadius: Variables.border.radius,
        paddingHorizontal: Variables.spacer.base / 4,
        paddingVertical: Variables.spacer.base / 8
    },
    unit: {
        color: Variables.colors.primaryDark,
        fontFamily: Variables.fonts.sansSerif.bold,
        fontSize: Variables.fontSizes.medium,
        lineHeight: Variables.lineHeights.medium
    },
    unitContainer: {
        backgroundColor: Variables.colors.white,
        borderBottomRightRadius: Variables.border.radius,
        borderTopRightRadius: Variables.border.radius,
        paddingHorizontal: Variables.spacer.base / 4,
        paddingVertical: Variables.spacer.base / 8
    }
});

export class Odometer extends Component {

    constructor(props) {
        super(props);

        this.convertValue = this.convertValue.bind(this);
        this.renderValue = this.renderValue.bind(this);
    }

    shouldComponentUpdate(nextProps) {
        const { unit, value } = nextProps;
        return (unit !== this.props.unit || value !== this.props.unit);
    }

    convertValue() {
        const { unit, value } = this.props;
        const conversion = unit === UNIT_MEASUREMENT.KILOMETERS ? convertMetersToKilometers : convertMetersToMiles;

        return conversion(value);
    }

    renderValue() {
        const value = Math.round(this.convertValue() * 100) / 100;
        let result = value.toFixed(2);

        switch (true) {
            case value < 0: result = '    ' + result; break;
            case value < 10: result = '   ' + result; break;
            case value < 100: result = '  ' + result; break;
            case value < 1000: result = ' ' + result; break;
            case value > 9999.99: result = value; break;
        }

        return result;
    }

    render() {
        const { color, onPress, style, unit } = this.props;
        const unitLabel = unit === UNIT_MEASUREMENT.KILOMETERS ? 'km' : 'mi';

        return (
            <View style={[style]}>
                <TouchableWithoutFeedback onPress={onPress}>
                    <View style={{ flexDirection:'row', flexWrap:'wrap' }}>
                        <View style={styles.valueContainer}>
                            <View style={{ position: 'relative' }}>
                                <Text style={[styles.value, styles.valueBackground, { color }]}>8888.88</Text>
                                <Text style={[styles.value, { color }]}>{this.renderValue()}</Text>
                            </View>
                        </View>
                        <View style={styles.unitContainer}>
                            <Text style={styles.unit}>{unitLabel.toLowerCase()}</Text>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        );
    }
}

Odometer.defaultProps = {
    color: Variables.colors.white,
    onPress: () => {},
    unit: UNIT_MEASUREMENT.MILES,
    value: 0
};

Odometer.propTypes = {
    color: PropTypes.object,
    onPress: PropTypes.func,
    style: PropTypes.oneOfType([ PropTypes.number, PropTypes.object ]),
    unit: PropTypes.number,
    value: PropTypes.number
};
