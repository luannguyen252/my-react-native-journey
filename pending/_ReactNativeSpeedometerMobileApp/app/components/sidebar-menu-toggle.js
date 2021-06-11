import { Animated, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { Variables } from '../assets/styles/variables';

const styles = StyleSheet.create({
    button: { padding: Variables.spacer.base / 4 },
    container: {
        margin: -Variables.spacer.base / 4,
        zIndex: 20
    },
    text: {
        fontFamily: Variables.fonts.appIcons.regular,
        fontSize: Variables.fontSizes.medium * 1.5,
        lineHeight: Variables.lineHeights.medium * 1.5
    }
});

export class SidebarMenuToggle extends Component {

    constructor(props) {
        super(props);

        this.animate = this.animate.bind(this);
        this.getTransform = this.getTransform.bind(this);
        this.onPress = this.onPress.bind(this);
    }

    componentWillMount() {
        this.animation = new Animated.Value(0);
    }

    animate() {
        this.animation.setValue(0);

        Animated.parallel([
            Animated.timing(this.animation, {
                easing: Variables.animations.defaultEasing,
                toValue: 1
            }),
            Animated.spring(this.animation, {
                friction: 5,
                tension: 100,
                toValue: 1
            })
        ]).start();
    }

    getTransform() {
        const scale = this.animation.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [1, 1.5, 1]
        });

        const transform = [{ scale }];

        return { transform };
    }

    onPress() {
        const { onPress } = this.props;

        this.animate();
        if (onPress) onPress();
    }

    render() {
        const { iconCharacter, style, color } = this.props;

        return (
            <View style={[styles.container, style]}>
                <TouchableWithoutFeedback onPress={this.onPress}>
                    <Animated.View style={[this.getTransform(), styles.button]}>
                        <Text style={[styles.text, { color }]}>{iconCharacter}</Text>
                    </Animated.View>
                </TouchableWithoutFeedback>
            </View>
        );
    }
}

SidebarMenuToggle.defaultProps = {
    iconCharacter: 'b',
    color: Variables.colors.white
};

SidebarMenuToggle.propTypes = {
    color: PropTypes.object,
    iconCharacter: PropTypes.string,
    onPress: PropTypes.func,
    style: PropTypes.oneOfType([ PropTypes.number, PropTypes.object ])
};
