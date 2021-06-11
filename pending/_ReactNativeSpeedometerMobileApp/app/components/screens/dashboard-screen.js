import { Constants, KeepAwake } from 'expo';
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { resetSpeeds, resetTopSpeed } from '../../ducks/speed';

import { Compass } from '../compass';
import { LineChart } from '../line-chart';
import PropTypes from 'prop-types';
import { SidebarMenuToggle } from '../sidebar-menu-toggle';
import { SignalStrength } from '../signal-strength';
import { SmallGuage } from '../small-guage';
import { Speedometer } from '../speedometer';
import Timer from '../timer';
import { Variables } from '../../assets/styles/variables';
import _ from 'lodash';
import { connect } from 'react-redux';
import { resetTimer } from '../../ducks/timer';
import { setModal } from '../../ducks/modal';
import { toggleUnitMeasurement } from '../../ducks/unit-measurement';

const styles = StyleSheet.create({
    container: {
        backgroundColor: Variables.colors.primary,
        flex: 1
    },
    compass: {
        position: 'absolute',
        right: Variables.spacer.base / 2,
        top: Constants.statusBarHeight + Variables.spacer.base / 2
    },
    sidebarMenuToggle: {
        position: 'absolute',
        left: Variables.spacer.base / 2,
        top: Constants.statusBarHeight + Variables.spacer.base / 2
    },
    signalStrength: {
        position: 'absolute',
        right: Variables.spacer.base / 2,
        top: Constants.statusBarHeight + Variables.spacer.base / 2
    }
});

export class DashboardScreen extends Component {

    constructor(props) {
        super(props);

        this.openAverageResetModal = this.openAverageResetModal.bind(this);
        this.openMaxResetModal = this.openMaxResetModal.bind(this);
        this.openresetTimerModal = this.openresetTimerModal.bind(this);
    }


    openAverageResetModal() {
        const { resetSpeeds, setModal } = this.props;

        setModal({
            buttonFunction: resetSpeeds,
            buttonLabel: 'Reset Average',
            heading: 'Reset Average Speed',
            message: 'Do you want to reset your average speed?'
        });
    }

    openMaxResetModal() {
        const { resetTopSpeed, setModal } = this.props;

        setModal({
            buttonFunction: resetTopSpeed,
            buttonLabel: 'Reset Max',
            heading: 'Reset Max Speed',
            message: 'Do you want to reset your maximum speed?'
        });
    }

    openresetTimerModal() {
        const { resetTimer, setModal } = this.props;

        setModal({
            buttonFunction: resetTimer,
            buttonLabel: 'Reset Timer',
            heading: 'Reset Timer',
            message: 'Do you want to reset your timer?'
        });
    }

    render() {
        const { accuracy, distanceTravelled, heading, setScreenIndex, speeds, style, toggleSidebarMenu, toggleUnitMeasurement, topSpeed, unitMeasurement, lastCalculatedSpeed } = this.props;

        return (
            <View style={[styles.container, style]}>
                <KeepAwake />
                {/* <SignalStrength accuracy={accuracy} style={styles.signalStrength} /> */}
                {/* <SidebarMenuToggle
                    onPress={toggleSidebarMenu}
                    style={styles.sidebarMenuToggle}
                /> */}
                <Compass heading={heading} style={styles.compass} />
                <Speedometer
                    distanceTravelled={distanceTravelled}
                    setScreenIndex={setScreenIndex}
                    speed={lastCalculatedSpeed}
                    style={{ flex: 8 }}
                    toggleUnitMeasurement={toggleUnitMeasurement}
                    topSpeed={topSpeed}
                    unit={unitMeasurement}
                />
                <LineChart
                    speed={lastCalculatedSpeed}
                    style={{ flex: 3 }}
                    topSpeed={topSpeed}
                    unit={unitMeasurement}
                />
                <View style={{ flex: 2, paddingHorizontal: Variables.spacer.base, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <SmallGuage
                        color={Variables.colors.secondary}
                        label={'Avg'}
                        onPress={this.openAverageResetModal}
                        unit={unitMeasurement}
                        value={_.mean(speeds)}
                    />
                    <SmallGuage
                        color={Variables.colors.secondary}
                        label={'Max'}
                        onPress={this.openMaxResetModal}
                        unit={unitMeasurement}
                        value={topSpeed}
                    />
                    <Timer
                        color={Variables.colors.secondary}
                        label={'Duration'}
                        onPress={this.openresetTimerModal}
                        value={topSpeed}
                    />
                </View>
            </View>
        );
    }
}

DashboardScreen.defaultProps = {
    distanceTravelled: 0,
    lastCalculatedSpeed: 0,
    speeds: [0],
    topSpeed: 0
};

DashboardScreen.propTypes = {
    accuracy: PropTypes.number,
    distanceTravelled: PropTypes.number,
    heading: PropTypes.number,
    lastCalculatedSpeed: PropTypes.number,
    resetSpeeds: PropTypes.func,
    resetTimer: PropTypes.func,
    resetTopSpeed: PropTypes.func,
    setModal: PropTypes.func,
    setScreenIndex: PropTypes.func,
    speeds: PropTypes.array,
    style: PropTypes.oneOfType([ PropTypes.number, PropTypes.object ]),
    toggleSidebarMenu: PropTypes.func,
    toggleUnitMeasurement: PropTypes.func,
    topSpeed: PropTypes.number,
    unitMeasurement: PropTypes.number
};

export default connect(
    state => Object.assign({},
        state.geolocationDuck,
        state.speedDuck,
        state.unitMeasurementDuck
    ),
    Object.assign({}, {
        resetSpeeds,
        resetTimer,
        resetTopSpeed,
        setModal,
        toggleUnitMeasurement
    })
)(DashboardScreen);
