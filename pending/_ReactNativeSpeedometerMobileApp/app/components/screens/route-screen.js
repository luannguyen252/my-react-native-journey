import { Constants, MapView } from 'expo';
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import { Odometer } from '../odometer';
import PropTypes from 'prop-types';
import { SCREENS } from '../app';
import { Variables } from '../../assets/styles/variables';
import _ from 'lodash';
import { connect } from 'react-redux';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative'
    },
    odometerContainer: {
        backgroundColor: Variables.colors.primary.fade(0.2),
        bottom: 0,
        left: 0,
        padding: Variables.spacer.base / 2,
        position: 'absolute',
        right: 0,
        zIndex: 10
    },
    statusBarBackround: {
        backgroundColor: Variables.colors.primary.fade(0.2),
        height: Constants.statusBarHeight,
        left: 0,
        position: 'absolute',
        right: 0,
        top: 0,
        zIndex: 10
    }
});

const edgePadding = {
    bottom: Variables.spacer.base + 260, // TODO: this is arbitrarily set based on the input group height;
    left: Variables.spacer.base * 2,
    right: Variables.spacer.base * 2,
    top: Variables.spacer.base * 2 + Constants.statusBarHeight
};

export class RouteScreen extends Component {

    constructor(props) {
        super(props);

        this.map = null;
        this.focusMap = this.focusMap.bind(this);
    }

    componentDidUpdate(prevProps) {
        const { screenIndex } = this.props;
        if (screenIndex === SCREENS.ROUTE && prevProps.screenIndex !== screenIndex) this.focusMap();
    }

    focusMap() {
        const { routeCoordinates } = this.props;

        const animated = true;
        const canFocus = routeCoordinates.length > 1;
        const options = { edgePadding, animated };

        const coordinates = [
            { latitude: routeCoordinates[0].latitude, longitude: routeCoordinates[0].longitude },
            { latitude: _.last(routeCoordinates).latitude, longitude: _.last(routeCoordinates).longitude },
        ];

        if (canFocus) this.map.fitToCoordinates(coordinates, options);
    }

    render() {
        const { distanceTravelled, routeCoordinates, setScreenIndex, style, unitMeasurement } = this.props;

        return (
            <View style={[styles.container, style]}>
                <View style={styles.statusBarBackround} />
                <MapView
                    style={styles.container}
                    showsUserLocation
                    followUserLocation
                    ref={ref => { this.map = ref; }}
                    initialRegion={{
                        latitude: routeCoordinates[0].latitude,
                        latitudeDelta: 0.005,
                        longitude: routeCoordinates[0].longitude,
                        longitudeDelta: 0.005
                    }}
                >
                    <MapView.Polyline
                        coordinates={routeCoordinates}
                        strokeWidth={Variables.spacer.base / 3}
                        strokeColor={Variables.colors.secondary.string()}
                        lineCap={'round'}
                    />
                </MapView>
                <View style={styles.odometerContainer}>
                    <Odometer
                        onPress={() => setScreenIndex(SCREENS.DASHBOARD)}
                        unit={unitMeasurement}
                        value={distanceTravelled}
                    />
                </View>
            </View>
        );
    }
}

RouteScreen.defaultProps = {
    distanceTravelled: 0,
    routeCoordinates: []
};

RouteScreen.propTypes = {
    distanceTravelled: PropTypes.number,
    routeCoordinates: PropTypes.arrayOf(PropTypes.object),
    screenIndex: PropTypes.number,
    setScreenIndex: PropTypes.func,
    style: PropTypes.oneOfType([ PropTypes.number, PropTypes.object ]),
    unitMeasurement: PropTypes.number
};

export default connect(
    state => Object.assign({},
        state.geolocationDuck,
        state.unitMeasurementDuck
    ),
    Object.assign({}, {})
)(RouteScreen);
