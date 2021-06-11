import * as Animatable from 'react-native-animatable';

import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Constants } from 'expo';
import { GlowingActivityIndicator } from '../glowing-activity-indicator';
import PropTypes from 'prop-types';
import { Variables } from '../../assets/styles/variables';

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        paddingBottom: Variables.spacer.base,
        paddingHorizontal: Variables.spacer.base,
        paddingTop: Constants.statusBarHeight + Variables.spacer.base
    },
    activityIndictator: { marginBottom: Variables.spacer.base },
    text: {
        color: Variables.colors.white,
        fontFamily: Variables.fonts.sansSerif.medium,
        fontSize: Variables.fontSizes.medium,
        lineHeight: Variables.lineHeights.medium,
        backgroundColor: 'transparent'
    }
});

export class PreloaderScreen extends Component {

    render() {
        const { backgroundColor, loadingMessage, style } = this.props;

        return (
            <View style={[styles.container, { backgroundColor }, style]}>
                <Animatable.View
                    duration={Variables.animations.durationBase}
                    animation={'fadeInUp'}
                    useNativeDriver
                >
                    <GlowingActivityIndicator style={styles.activityIndictator} />
                </Animatable.View>
                <Animatable.View
                    duration={Variables.animations.durationBase}
                    animation={'fadeInUp'}
                    delay={Variables.animations.durationBase / 6}
                    useNativeDriver
                >
                    <Text style={styles.text}>{loadingMessage}</Text>
                </Animatable.View>
            </View>
        );
    }
}

PreloaderScreen.defaultProps = {
    backgroundColor: Variables.colors.loading,
    loadingMessage: 'Loading...'
};

PreloaderScreen.propTypes = {
    backgroundColor: PropTypes.object,
    loadingMessage: PropTypes.string,
    style: PropTypes.oneOfType([ PropTypes.number, PropTypes.object ])
};
