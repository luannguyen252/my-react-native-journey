import { Animated, Dimensions, StyleSheet, View } from 'react-native';
import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { SidebarMenu } from './sidebar-menu';
import { Variables } from '../assets/styles/variables';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    absolutePosition: {
        bottom: 0,
        flex: 1,
        left: 0,
        position: 'absolute',
        right: 0,
        top: 0,
    },
    container: {
        flex: 1,
        position: 'relative'
    }
});

export class SidebarMenuContainer extends Component {

    constructor(props) {
        super(props);

        this.animate = this.animate.bind(this);
        this.getChildrenTransform = this.getChildrenTransform.bind(this);
        this.getMenuTransform = this.getMenuTransform.bind(this);
    }

    componentWillMount() {
        const { menuOpen } = this.props;
        const value = menuOpen ? 1 : 0;

        this.animation = new Animated.Value(value);
    }

    componentDidMount() {
        this.animate();
    }

    componentWillReceiveProps() {
        this.animate();
    }

    animate() {
        const { delay, duration, menuOpen } = this.props;
        const toValue = menuOpen ? 1 : 0;

        Animated.timing(this.animation, {
            delay: delay,
            duration: duration,
            easing: Variables.animations.defaultEasing,
            toValue: toValue,
            useNativeDriver: true
        }).start();
    }

    getChildrenTransform() {
        const { menuWidth } = this.props;

        const interpolatedAnimation = this.animation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, menuWidth]
        });

        const transform = [{ translateX: interpolatedAnimation }];

        return { transform };
    }

    getMenuTransform() {
        const { menuWidth } = this.props;

        const interpolatedAnimation = this.animation.interpolate({
            inputRange: [0, 1],
            outputRange: [-menuWidth, 0]
        });

        const transform = [{ translateX: interpolatedAnimation }];

        return { transform };
    }

    render() {
        const { children, menuWidth, style } = this.props;

        return (
            <View style={[styles.container, style]}>
                <Animated.View style={[styles.absolutePosition, { width: menuWidth }, this.getMenuTransform()]}>
                    <SidebarMenu />
                </Animated.View>
                <Animated.View style={[styles.absolutePosition, this.getChildrenTransform()]}>{children}</Animated.View>
            </View>
        );
    }
}

SidebarMenuContainer.defaultProps = {
    delay: 0,
    duration: Variables.animations.durationBase,
    menuOpen: false,
    menuWidth: width * (2 / 3)
};

SidebarMenuContainer.propTypes = {
    children: PropTypes.object.isRequired,
    delay: PropTypes.number,
    duration: PropTypes.number,
    menuOpen: PropTypes.bool,
    menuWidth: PropTypes.number,
    style: PropTypes.oneOfType([ PropTypes.number, PropTypes.object ])
};
