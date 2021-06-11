import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import PropTypes from 'prop-types';
import { Svg } from 'expo';
import { Variables } from '../assets/styles/variables';
import eases from 'eases';

const styles = StyleSheet.create({
    circle: {
        top: Variables.spacer.base * 2,
        transform: [ { rotate: '150deg' }]
    },
    container: { position: 'relative' }
});

export class CircleGuage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            previousPercentageFull: 0,
            currentPercentageFull: 0
        };

        this.renderSegments = this.renderSegments.bind(this);
        this.startAnimationTime = null;
        this.timeout = null;
        this.updateNumber = this.updateNumber.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        const { currentPercentageFull } = this.state;
        const { percentageFull } = this.props;

        if (nextProps.percentageFull === percentageFull) return;

        this.setState({ previousPercentageFull: currentPercentageFull });
        this.startAnimationTime = (new Date()).getTime();
        this.updateNumber();
    }

    shouldComponentUpdate(nextState) {
        return nextState.currentPercentageFull !== this.state.currentPercentageFull;
    }

    componentWillUnmount() {
        clearTimeout(this.timeout);
    }

    updateNumber() {
        const { ease, speed, percentageFull } = this.props;
        const { previousPercentageFull } = this.state;

        const now = (new Date()).getTime();
        const elapsedTime = Math.min(speed, (now - this.startAnimationTime));
        const progress = eases[ease](elapsedTime / speed);
        const currentDisplayValue = Math.round((percentageFull - previousPercentageFull) * progress + previousPercentageFull);

        this.setState({ currentPercentageFull: currentDisplayValue });

        if (elapsedTime < speed) {
            this.timeout = setTimeout(this.updateNumber, 16);
        } else {
            this.setState({ previousPercentageFull: percentageFull });
        }
    }

    renderSegments() {
        const { dangerColor, diameter, lastColor, mixColor, startColor, strokeWidth } = this.props;
        const { currentPercentageFull } = this.state;

        const radius = diameter / 2;
        const radiusAdjusted = radius - (strokeWidth * 2);
        const circumfrenceAdjusted = Math.PI * (radiusAdjusted * 2);
        const radiusShift = circumfrenceAdjusted / diameter;
        const limit = diameter * (4 / 6);
        const segmentsFull = Math.ceil(currentPercentageFull * limit) / 100;

        const results = [];

        for (let index = 0; index < limit; index++) {

            if (!(index % 2)) {

                // TODO: This could be cleaned up
                let color = mixColor ? startColor.mix(mixColor, index * (1 / limit)) : startColor;

                if (dangerColor && index < segmentsFull && index > limit - 36) color = dangerColor;
                if (lastColor && index > segmentsFull - 18) color = lastColor;
                if (index > segmentsFull) color = Variables.colors.white.fade(0.9);

                results.push(
                    <Svg.Circle
                        cx={'50%'}
                        cy={'50%'}
                        key={index}
                        fill={'none'}
                        r={radiusAdjusted}
                        stroke={color.string()}
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
        const { diameter } = this.props;

        return (
            <View style={styles.container}>
                <Svg height={diameter} width={diameter} style={styles.circle}>
                    {this.renderSegments()}
                </Svg>
            </View>
        );
    }
}

CircleGuage.defaultProps = {
    diameter: 360,
    ease: 'quintInOut',
    hasDangerZone: false,
    percentageFull: 0,
    speed: 500,
    startColor: Variables.colors.secondary,
    strokeWidth: 15
};

CircleGuage.propTypes = {
    dangerColor: PropTypes.object,
    diameter: PropTypes.number,
    ease: PropTypes.string,
    lastColor: PropTypes.object,
    hasDangerZone: PropTypes.bool,
    mixColor: PropTypes.object,
    percentageFull: PropTypes.number,
    speed: PropTypes.number,
    startColor: PropTypes.object,
    strokeWidth: PropTypes.number
};
