import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import { CircleGuage } from './circle-guage';
import { MAX_SPEED } from '../config/config';
import { Odometer } from './odometer';
import PropTypes from 'prop-types';
import { SCREENS } from './app';
import { Speed } from './speed';
import { UnitSelector } from './unit-selector';
import { Variables } from '../assets/styles/variables';

const styles = StyleSheet.create({
    absolutePosition: {
        alignItems: 'center',
        backgroundColor: 'transparent',
        bottom: 0,
        left: 0,
        position: 'absolute',
        right: 0
    },
    container: { flex: 1, justifyContent: 'flex-end' }
});

export class Speedometer extends Component {

    render() {
        const { distanceTravelled, maxSpeed, setScreenIndex, speed, unit, style, toggleUnitMeasurement, topSpeed } = this.props;

        return (
            <View style={[styles.container, style]}>
                <View style={styles.absolutePosition}>
                    <CircleGuage
                        diameter={380}
                        dangerColor={Variables.colors.danger}
                        percentageFull={speed / maxSpeed * 100}
                    />
                </View>
                <View style={styles.absolutePosition}>
                    <CircleGuage
                        startColor={Variables.colors.white}
                        lastColor={Variables.colors.danger}
                        diameter={380}
                        percentageFull={topSpeed / maxSpeed * 100}
                        strokeWidth={8}
                    />
                </View>
                <View style={styles.absolutePosition}>
                    <UnitSelector onPress={toggleUnitMeasurement} unit={unit} />
                    <Speed
                        color={speed > maxSpeed ? Variables.colors.danger : Variables.colors.white}
                        unit={unit}
                        value={speed}
                    />
                    <Odometer
                        color={Variables.colors.secondary}
                        onPress={() => setScreenIndex(SCREENS.ROUTE)}
                        unit={unit}
                        value={distanceTravelled}
                    />
                </View>
            </View>
        );
    }
}

Speedometer.defaultProps = {
    distanceTravelled: 0,
    maxSpeed: MAX_SPEED,
    speed: 0,
    topSpeed: 0
};

Speedometer.propTypes = {
    distanceTravelled: PropTypes.number,
    maxSpeed: PropTypes.number,
    setScreenIndex: PropTypes.func,
    speed: PropTypes.number,
    style: PropTypes.oneOfType([ PropTypes.number, PropTypes.object ]),
    toggleUnitMeasurement: PropTypes.func,
    topSpeed: PropTypes.number,
    unit: PropTypes.number
};
