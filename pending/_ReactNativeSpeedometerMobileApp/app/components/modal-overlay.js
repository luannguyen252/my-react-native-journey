import { Animated, Dimensions, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import React, { Component } from 'react';

import { BlockButton } from './block-button';
import { GlowingActivityIndicator } from './glowing-activity-indicator';
import { MODAL_LEVELS } from '../ducks/modal';
import PropTypes from 'prop-types';
import { Variables } from '../assets/styles/variables';
import { closeModal } from '../ducks/modal';
import { connect } from 'react-redux';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    activityIndictator: {
        alignSelf: 'center',
        marginVertical: Variables.spacer.base
    },
    buttonContainer: { padding: Variables.spacer.base / 4 },
    container: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        padding: Variables.spacer.base / 2
    },
    heading: {
        color: Variables.colors.white,
        fontFamily: Variables.fonts.sansSerif.bold,
        fontSize: Variables.fontSizes.medium,
        textAlign: 'center',
        lineHeight: Variables.lineHeights.medium
    },
    headingContainer: {
        padding: Variables.spacer.base / 2,
        borderBottomColor: Variables.colors.primaryLight,
        borderBottomWidth: Variables.border.width
    },
    modal: {
        backgroundColor: Variables.colors.primaryDark,
        borderRadius: Variables.border.radius * 3,
        borderTopWidth: Variables.border.width * 6,
        shadowColor: Variables.colors.secondary,
        shadowOffset: {
            height: Variables.spacer.base / 6,
            width: 0
        },
        shadowOpacity: 0.5,
        shadowRadius: Variables.spacer.base / 2,
        width: width - Variables.spacer.base * 4
    },
    text: {
        color: Variables.colors.white,
        fontFamily: Variables.fonts.sansSerif.regular,
        fontSize: Variables.fontSizes.small,
        textAlign: 'center',
        lineHeight: Variables.lineHeights.small
    },
    textContainer: {
        padding: Variables.spacer.base / 2
    }
});

class ModalOverlay extends Component {

    constructor(props) {
        super(props);

        this.animate = this.animate.bind(this);
        this.getOpacity = this.getOpacity.bind(this);
        this.getLevelColor = this.getLevelColor.bind(this);
        this.handleButtonPress = this.handleButtonPress.bind(this);
        this.handleOnPress = this.handleOnPress.bind(this);
    }

    componentWillMount() {
        const { modalIsActive } = this.props;
        const value = modalIsActive ? 1 : 0;

        this.animation = new Animated.Value(value);
    }

    componentDidUpdate() {
        this.animate();
    }

    animate() {
        const { modalIsActive } = this.props;
        const toValue = modalIsActive ? 1 : 0;

        Animated.timing(this.animation, {
            duration: Variables.animations.durationBase,
            easing: Variables.animations.defaultEasing,
            toValue: toValue
        }).start();
    }

    getLevelColor() {
        const { modalLevel } = this.props;
        let levelColor;

        switch(modalLevel) {
            case MODAL_LEVELS.SUCCESS: levelColor = Variables.colors.secondary; break;
            case MODAL_LEVELS.ERROR: levelColor = Variables.colors.danger; break;
            default: levelColor = Variables.colors.tertiary;
        }

        return levelColor;
    }

    getOpacity() {
        const opacity = this.animation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1]
        });

        return { opacity };
    }

    handleButtonPress() {
        const { modalButtonFunction, closeModal } = this.props;

        if (modalButtonFunction) modalButtonFunction();
        closeModal();
    }

    handleOnPress() {
        const { closeModal } = this.props;
        closeModal();
    }

    render() {
        const { backgroundColor, backgroundFade, modalButtonFunction, modalButtonLabel, modalHasLoadIndicator, modalHeading, modalIsActive, modalMessage, style, zIndex } = this.props;

        return (
            <TouchableWithoutFeedback disabled={!modalIsActive} onPress={this.handleOnPress}>
                <Animated.View
                    pointerEvents={modalIsActive ? 'auto' : 'none'}
                    style={[
                        StyleSheet.absoluteFill,
                        style,
                        styles.container,
                        this.getOpacity(),
                        { backgroundColor: backgroundColor.fade(backgroundFade) },
                        { zIndex }
                    ]}
                >
                    <View style={[styles.modal, { borderTopColor: this.getLevelColor() }]}>
                        <View style={styles.headingContainer}>
                            <Text style={styles.heading}>{modalHeading}</Text>
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={styles.text}>{modalMessage}</Text>
                        </View>
                        {modalHasLoadIndicator &&
                            <GlowingActivityIndicator style={styles.activityIndictator} />
                        }
                        {modalButtonFunction &&
                            <View style={styles.buttonContainer}>
                                <BlockButton
                                    value={modalButtonLabel}
                                    onPress={this.handleButtonPress}
                                    color={Variables.colors.primaryDark}
                                />
                            </View>
                        }
                    </View>
                </Animated.View>
            </TouchableWithoutFeedback>
        );
    }
}

ModalOverlay.defaultProps = {
    backgroundColor: Variables.colors.primary,
    backgroundFade: 0.3,
    modalHasLoadIndicator: false,
    modalHeading: 'Heading',
    modalIsActive: false,
    modalLevel: MODAL_LEVELS.WARNING,
    modalMessage: 'This is the modal message.',
    zIndex: 3
};

ModalOverlay.propTypes = {
    backgroundColor: PropTypes.object,
    backgroundFade: PropTypes.number,
    closeModal: PropTypes.func,
    modalButtonFunction: PropTypes.func,
    modalButtonLabel: PropTypes.string,
    modalHasLoadIndicator: PropTypes.bool,
    modalHeading: PropTypes.string,
    modalIsActive: PropTypes.bool,
    modalLevel: PropTypes.number,
    modalMessage: PropTypes.string,
    style: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.number,
        PropTypes.object
    ]),
    zIndex: PropTypes.number
};

export default connect(
    state => Object.assign({}, state.modalDuck),
    Object.assign({}, { closeModal })
)(ModalOverlay);
