import { Animated, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { Variables } from '../assets/styles/variables';

const styles = StyleSheet.create({
    container: {
        borderRadius: Variables.border.radius,
        borderWidth: Variables.border.width,
        padding: Variables.spacer.base / 2
    },
    text: {
        fontFamily: Variables.fonts.sansSerif.bold,
        fontSize: Variables.fontSizes.medium,
        lineHeight: Variables.lineHeights.medium,
        textAlign: 'center'
    }
});

export class BlockButton extends Component {

    constructor(props) {
        super(props);

        this.animateButton = this.animateButton.bind(this);
        this.getBackgroundColor = this.getBackgroundColor.bind(this);
        this.getTextColor = this.getTextColor.bind(this);
        this.getTransform = this.getTransform.bind(this);
        this.onPress = this.onPress.bind(this);
    }

    componentWillMount() {
        this.springAnimation = new Animated.Value(0);
        this.timingAnimation = new Animated.Value(0);
    }

    animateButton() {
        this.springAnimation.setValue(0);
        this.timingAnimation.setValue(0);

        Animated.spring(this.springAnimation, {
            friction: 5,
            tension: 100,
            toValue: 2
        }).start();

        Animated.timing(this.timingAnimation, {
            duration: Variables.animations.durationBase,
            easing: Variables.animations.defaultEasing,
            toValue: 2
        }).start();
    }

    getBackgroundColor() {
        const { inverted } = this.props;

        const fromValue = inverted ? Variables.colors.white : this.props.color;
        const toValue = inverted ? this.props.color : Variables.colors.white;

        const backgroundColor = this.timingAnimation.interpolate({
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

        const color = this.timingAnimation.interpolate({
            inputRange: [0, 1, 2],
            outputRange: [
                fromValue.rgb().string(),
                toValue.rgb().string(),
                fromValue.rgb().string()
            ]
        });

        return { color };
    }

    getTransform() {
        const scale = this.springAnimation.interpolate({
            inputRange: [0, 1, 2],
            outputRange: [1, 1.2, 1]
        });

        return { transform: [{ scale }] };
    }

    onPress() {
        const { onPress } = this.props;

        this.animateButton();
        if (onPress) onPress();
    }

    render() {
        const { style, value, inverted, color } = this.props;

        return (
            <View style={style}>
                <TouchableWithoutFeedback onPress={this.onPress}>
                    <Animated.View style={[styles.container,
                        { borderColor: inverted ? color : Variables.colors.white },
                        this.getBackgroundColor(),
                        this.getTransform()
                    ]}>
                        <Animated.Text style={[styles.text, this.getTextColor()]}>{value.toUpperCase()}</Animated.Text>
                    </Animated.View>
                </TouchableWithoutFeedback>
            </View>
        );
    }
}

BlockButton.defaultProps = {
    color: Variables.colors.black,
    inverted: false,
    value: 'Submit'
};

BlockButton.propTypes = {
    color: PropTypes.object,
    inverted: PropTypes.bool,
    onPress: PropTypes.func,
    style: PropTypes.oneOfType([ PropTypes.number, PropTypes.object ]),
    value: PropTypes.string
};
