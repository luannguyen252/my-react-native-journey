import { Animated, StyleSheet, View } from 'react-native';
import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { Variables } from '../assets/styles/variables';

const styles = StyleSheet.create({
    container: {
        position: 'relative'
    },
    glowPrimary: {
        shadowColor: Variables.colors.secondary,
        shadowOffset: { width: -Variables.spacer.base / 3, height: 0 }
    },
    glowSecondary: {
        position: 'absolute',
        shadowColor: Variables.colors.tertiary,
        shadowOffset: { width: Variables.spacer.base / 3, height: 0 }
    },
    glowTertiary: {
        position: 'absolute',
        shadowColor: Variables.colors.danger,
        shadowOffset: { width: 0, height: -Variables.spacer.base / 3 }
    },
    glowQuatrenary: {
        position: 'absolute',
        shadowColor: Variables.colors.secondary.rotate(40),
        shadowOffset: { width: 0, height: Variables.spacer.base / 3 }
    },
    shadow: {
        borderRadius: Variables.spacer.base * 2,
        height: Variables.spacer.base * 2,
        shadowOpacity: 1,
        shadowRadius: Variables.spacer.base / 3,
        width: Variables.spacer.base * 2
    }
});

export class GlowingActivityIndicator extends Component {

    constructor(props) {
        super(props);

        this.animate = this.animate.bind(this);
        this.getTransform = this.getTransform.bind(this);
    }

    componentWillMount() {
        this.animation = new Animated.Value(0);
    }

    componentDidMount() {
        this.animate();
    }

    animate() {
        const { delay, duration } = this.props;

        Animated.loop(
            Animated.timing(this.animation, {
                delay: delay,
                duration: duration,
                toValue: 1,
                useNativeDriver: true
            })
        ).start();
    }

    getTransform() {
        const interpolatedAnimation = this.animation.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg']
        });

        const transform = [{ rotate: interpolatedAnimation }];

        return { transform };
    }

    render() {
        const { style } = this.props;

        return (
            <View style={[styles.container, style]}>
                <Animated.View style={[ styles.shadow, this.getTransform(), styles.glowPrimary ]}>
                    <Animated.View style={[ styles.shadow, this.getTransform(), styles.glowSecondary ]}>
                        <Animated.View style={[ styles.shadow, this.getTransform(), styles.glowTertiary ]}>
                            <Animated.View style={[ styles.shadow, this.getTransform(), styles.glowQuatrenary ]} />
                        </Animated.View>
                    </Animated.View>
                </Animated.View>
            </View>
        );
    }
}

GlowingActivityIndicator.defaultProps = {
    delay: 0,
    duration: Variables.animations.durationBase * 10
};

GlowingActivityIndicator.propTypes = {
    delay: PropTypes.number,
    duration: PropTypes.number,
    style: PropTypes.oneOfType([ PropTypes.number, PropTypes.object ])
};
