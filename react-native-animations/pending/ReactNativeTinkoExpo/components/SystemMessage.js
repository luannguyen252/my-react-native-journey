import React from 'react';
import { StyleSheet, Text, View, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';

const Color = {
    defaultColor: '#b2b2b2',
    backgroundTransparent: 'transparent',
    defaultBlue: '#0084ff',
    leftBubbleBackground: '#f0f0f0',
    white: '#fff',
    carrot: '#e67e22',
    emerald: '#2ecc71',
    peterRiver: '#3498db',
    wisteria: '#8e44ad',
    alizarin: '#e74c3c',
    turquoise: '#1abc9c',
    midnightBlue: '#2c3e50',
    optionTintColor: '#007AFF',
    timeTextColor: '#aaa',
};

export default function SystemMessage({ currentMessage, containerStyle, wrapperStyle, textStyle }) {
    return (
        <View style={[styles.container, containerStyle]}>
            <View style={[styles.wrapper, wrapperStyle]}>
                <Text style={[styles.text, textStyle]}>{currentMessage.text}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        marginTop: 5,
        marginBottom: 10,
    },
    text: {
        backgroundColor: Color.backgroundTransparent,
        color: Color.defaultColor,
        fontSize: 12,
        fontWeight: '300',
    },
});

SystemMessage.defaultProps = {
    currentMessage: {
        system: false,
    },
    containerStyle: {},
    wrapperStyle: {},
    textStyle: {},
};

SystemMessage.propTypes = {
    currentMessage: PropTypes.object,
    containerStyle: ViewPropTypes.style,
    wrapperStyle: ViewPropTypes.style,
    textStyle: Text.propTypes.style,
};