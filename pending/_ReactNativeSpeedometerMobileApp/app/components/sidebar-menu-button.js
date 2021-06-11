import { Animated, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { Variables } from '../assets/styles/variables';

const styles = StyleSheet.create({
    buttonContainer: {
        padding: Variables.spacer.base / 2,
        alignSelf: 'stretch'
    },
    container: {
        alignSelf: 'stretch'
    },
    text: {
        fontFamily: Variables.fonts.sansSerif.bold,
        fontSize: Variables.fontSizes.medium,
        lineHeight: Variables.lineHeights.medium,
        textAlign: 'left'
    }
});

export class SidebarMenuButton extends Component {

    constructor(props) {
        super(props);

        this.animate = this.animate.bind(this);
        this.getBackgroundColor = this.getBackgroundColor.bind(this);
        this.getTextColor = this.getTextColor.bind(this);
        this.onPress = this.onPress.bind(this);
    }

    componentWillMount() {
        this.animation = new Animated.Value(0);
    }

    animate() {
        this.animation.setValue(0);

        Animated.timing(this.animation, {
            duration: Variables.animations.durationBase,
            easing: Variables.animations.defaultEasing,
            toValue: 2
        }).start();
    }

    getBackgroundColor() {
        const { inverted } = this.props;

        const fromValue = inverted ? Variables.colors.white : this.props.color;
        const toValue = inverted ? this.props.color : Variables.colors.white;

        const backgroundColor = this.animation.interpolate({
            inputRange: [0, 1, 2],
            outputRange: [
                fromValue.rgb().string(),
                toValue.rgb().string(),
                fromValue.rgb().string()
            ]
        });

        return { backgroundColor };
    }

    getTextColor() {
        const { inverted } = this.props;

        const fromValue = inverted ? this.props.color : Variables.colors.white;
        const toValue = inverted ? Variables.colors.white : this.props.color;

        const color = this.animation.interpolate({
            inputRange: [0, 1, 2],
            outputRange: [
                fromValue.rgb().string(),
                toValue.rgb().string(),
                fromValue.rgb().string()
            ]
        });

        return { color };
    }

    onPress() {
        const { onPress } = this.props;

        this.animate();
        if (onPress) onPress();
    }

    render() {
        const { style, value, inverted, color } = this.props;

        return (
            <View style={[styles.container, style]}>
                <TouchableWithoutFeedback onPress={this.onPress}>
                    <Animated.View style={[
                        styles.buttonContainer,
                        this.getBackgroundColor()
                    ]}>
                        <Animated.Text style={[styles.text, this.getTextColor()]}>{value.toUpperCase()}</Animated.Text>
                    </Animated.View>
                </TouchableWithoutFeedback>
            </View>
        );
    }
}

SidebarMenuButton.defaultProps = {
    color: Variables.colors.black,
    inverted: false,
    value: 'Button'
};

SidebarMenuButton.propTypes = {
    color: PropTypes.object,
    inverted: PropTypes.bool,
    onPress: PropTypes.func,
    style: PropTypes.oneOfType([ PropTypes.number, PropTypes.object ]),
    value: PropTypes.string
};
