import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import PropTypes from 'prop-types';
import { Svg } from 'expo';
import { Variables } from '../assets/styles/variables';
import { convertHeadingToPercent } from '../util/convert-heading-to-percent';
import eases from 'eases';

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
    },
    circle: { transform: [ { rotate: '-90deg' }] },
    directionContainer: { position: 'relative' },
    direction: {
        backgroundColor: 'transparent',
        fontFamily: Variables.fonts.digital.regular,
        fontSize: Variables.fontSizes.medium * 2,
        lineHeight: Variables.fontSizes.medium * 2,
        textAlign: 'center'
    },
    directionBackground: { opacity: 0.2 },
    directionForeground: {
        position: 'absolute',
    },
    valueContainer: {
        position: 'absolute',
        transform: [{ translateY: -Math.round(Variables.fontSizes.medium * 2 / 2) }]
    }
});

export class Compass extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentHeadingPercentage: 0,
            previousHeadingPercentage: 0
        };

        this.renderDirectionValue = this.renderDirectionValue.bind(this);
        this.renderSegments = this.renderSegments.bind(this);
        this.updateHeadingPercentage = this.updateHeadingPercentage.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        const { currentHeadingPercentage } = this.state;
        const { heading } = this.props;

        if (nextProps.heading === heading) return;

        this.setState({ previousHeadingPercentage: currentHeadingPercentage });
        this.startAnimationTime = (new Date()).getTime();
        this.updateHeadingPercentage();
    }

    shouldComponentUpdate(nextState) {
        return nextState.currentHeadingPercentage !== this.state.currentHeadingPercentage;
    }

    componentWillUnmount() {
        clearTimeout(this.timeout);
    }

    updateHeadingPercentage() {
        const { ease, speed, heading } = this.props;
        const { previousHeadingPercentage } = this.state;

        const value = convertHeadingToPercent(heading);
        const now = (new Date()).getTime();
        const elapsedTime = Math.min(speed, (now - this.startAnimationTime));
        const progress = eases[ease](elapsedTime / speed);
        const currentDisplayValue = Math.round((value - previousHeadingPercentage) * progress + previousHeadingPercentage);

        this.setState({ currentHeadingPercentage: currentDisplayValue });

        if (elapsedTime < speed) {
            this.timeout = setTimeout(this.updateHeadingPercentage, 16);
        } else {
            this.setState({ previousHeadingPercentage: value });
        }
    }

    renderDirectionValue() {
        const { heading } = this.props;

        let result;

        switch(true) {
            case heading > 0 && heading <= 22.5: result = ' N'; break;
            case heading > 22.5 && heading <= 67.5: result = 'NE'; break;
            case heading > 67.5 && heading <= 112.5: result = ' E'; break;
            case heading > 112.5 && heading <= 157.5: result = 'SE'; break;
            case heading > 157.7 && heading <= 202.5: result = ' S'; break;
            case heading > 202.5 && heading <= 247.5: result = 'SW'; break;
            case heading > 247.5 && heading <= 292.5: result = ' W'; break;
            case heading > 292.5 && heading <= 337.5: result = 'NW'; break;
            case heading > 337.5 && heading <= 360: result = ' N'; break;
            default: result = '--';
        }

        return result;
    }

    renderSegments() {
        const { color, diameter, strokeWidth, heading } = this.props;
        const { currentHeadingPercentage } = this.state;

        const radius = diameter / 2;
        const radiusAdjusted = radius - (strokeWidth * 2);
        const circumfrenceAdjusted = Math.PI * (radiusAdjusted * 2);
        const radiusShift = circumfrenceAdjusted / diameter;

        const min = currentHeadingPercentage - 10;
        const max = currentHeadingPercentage + 10;

        const results = [];

        for (let index = 0; index < diameter; index++) {

            if (!(index % 2)) {

                let strokeColor = Variables.colors.white.fade(0.9);

                if (heading > -1) {
                    if (index > min && index < max
                        || max - 100 > 0 && (index < max - 100 || index > min)
                        || min < 0 && index > diameter + min) {
                        strokeColor = color;
                    }
                }

                results.push(
                    <Svg.Circle
                        cx={'50%'}
                        cy={'50%'}
                        key={index}
                        fill={'none'}
                        r={radiusAdjusted}
                        stroke={strokeColor.string()}
                        strokeDasharray={[radiusShift, circumfrenceAdjusted]}
                        strokeDashoffset={-radiusShift * index}
                        strokeWidth={strokeWidth}
                    />
                );
            }
        }

        return results;
    }

    render() {
        const { diameter, style, color } = this.props;

        return (
            <View style={[styles.container, style]}>
                <Svg height={diameter} width={diameter} style={styles.circle}>
                    {this.renderSegments()}
                </Svg>
                <Text></Text>
                <View style={[styles.valueContainer, { top: diameter / 2 }]}>
                    <View style={styles.directionContainer}>
                        <Text style={[styles.direction, styles.directionBackground, { color }]}>88</Text>
                        <Text style={[styles.direction, styles.directionForeground, { color }]}>{this.renderDirectionValue()}</Text>
                    </View>
                </View>
            </View>
        );
    }
}

Compass.defaultProps = {
    color: Variables.colors.secondary,
    diameter: 100,
    ease: 'quintInOut',
    heading: -1, // set to -1 to prevent flash of 0 degrees of ('N') on the compass on load,
    speed: 500,
    strokeWidth: 9
};

Compass.propTypes = {
    color: PropTypes.object,
    diameter: PropTypes.number,
    ease: PropTypes.string,
    heading: PropTypes.number,
    speed: PropTypes.number,
    strokeWidth: PropTypes.number,
    style: PropTypes.oneOfType([ PropTypes.number, PropTypes.object ])
};
