import { MODAL_LEVELS, setModal } from '../ducks/modal';
import React, { Component } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { startTimer, stopTimer } from '../ducks/timer';

import { AdMobBanner } from 'expo';
import DashboardScreen from './screens/dashboard-screen';
import ModalOverlay from './modal-overlay';
import { Permissions } from 'expo';
import { PreloaderScreen } from './screens/preloader-screen';
import PropTypes from 'prop-types';
import RouteScreen from './screens/route-screen';
import { SidebarMenuContainer } from './sidebar-menu-container';
import { TransitionContainer } from './transition-container';
import { Variables } from '../assets/styles/variables';
import { connect } from 'react-redux';
import { listenToAcceleration }  from '../ducks/acceleration';
import { watchCurrentPosition } from '../ducks/geolocation';

export const SCREENS = {
    PRELOADER: 0,
    DASHBOARD: 1,
    ROUTE: 2,
    SETTINGS: 3,
    ABOUT: 4
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Variables.colors.primary,
        flex: 1,
        position: 'relative'
    },
    preloader: {
        bottom: 0,
        left: 0,
        position: 'absolute',
        right: 0,
        top: 0
    }
});

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            appIsLoaded: false,
            menuOpen: false,
            screenIndex: SCREENS.PRELOADER
        };

        this.setScreenIndex = this.setScreenIndex.bind(this);
        this.toggleSidebarMenu = this.toggleSidebarMenu.bind(this);
    }

    componentWillMount() {
        const { listenToAcceleration, setModal, startTimer, watchCurrentPosition } = this.props;

        Permissions.askAsync(Permissions.LOCATION).then(response => {
            const { status } = response;

            if (status === 'granted') {
                listenToAcceleration();
                startTimer();
                watchCurrentPosition();
            } else {
                setModal({
                    heading: 'Allow Location Permissions',
                    level: MODAL_LEVELS.ERROR,
                    message: 'Your location is used to calculate speed, distance and route in "Speedometer & Route Tracker."  Please enable location services for this application.'
                });
            }
        });
    }

    componentDidUpdate() {
        const { routeCoordinates } = this.props;
        const { appIsLoaded } = this.state;

        // TODO: find better way to make the preloader wait
        // at least three seconds before fading out
        if (routeCoordinates[0] && !appIsLoaded) {
            setTimeout(() => {
                this.setState({
                    appIsLoaded: true,
                    screenIndex: SCREENS.DASHBOARD
                });
            }, 1000);
        }
    }

    componentWillUnmount() {
        const { stopTimer } = this.props;
        stopTimer();
    }

    setScreenIndex(index) {
        this.setState({ screenIndex: index || SCREENS.DASHBOARD });
    }

    toggleSidebarMenu() {
        const { menuOpen } = this.state;
        this.setState({ menuOpen: !menuOpen });
    }

    render() {
        const { menuOpen, screenIndex } = this.state;

        return (
            <View style={styles.container}>
                <StatusBar barStyle={'light-content'} />
                <ModalOverlay />
                <SidebarMenuContainer menuOpen={menuOpen}>
                    <TransitionContainer setScreenIndex={this.setScreenIndex} screenIndex={screenIndex}>
                        <PreloaderScreen
                            loadingMessage={'Getting location...'}
                            style={styles.preloader}
                            backgroundColor={Variables.colors.primaryDark}
                        />
                        <DashboardScreen toggleSidebarMenu={this.toggleSidebarMenu} />
                        <RouteScreen />
                    </TransitionContainer>
                </SidebarMenuContainer>
                {/* <AdMobBanner
                    bannerSize="fullBanner"
                    adUnitID="ca-app-pub-6589226904266047/9099572271"
                    testDeviceID="EMULATOR"
                    didFailToReceiveAdWithError={() => console.log('error')}
                /> */}
            </View>
        );
    }
}

App.propTypes = {
    listenToAcceleration: PropTypes.func,
    routeCoordinates: PropTypes.array,
    setModal: PropTypes.func,
    startTimer: PropTypes.func,
    stopTimer: PropTypes.func,
    watchCurrentPosition: PropTypes.func,
    watchPosition: PropTypes.func
};

export default connect(
    state => Object.assign({}, state.geolocationDuck ),
    Object.assign({}, { listenToAcceleration, setModal, startTimer, stopTimer, watchCurrentPosition })
)(App);
