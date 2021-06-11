import  React, { Component } from 'react';

import PropTypes from 'prop-types';
import { Text } from 'react-native';
import eases from 'eases';

export class NumberEasing extends Component {

    constructor(props) {
        super(props);
        this.state = {
            previousValue: 0,
            displayValue: 0
        };

        this.startAnimationTime = null;
        this.timeout = null;
        this.updateNumber = this.updateNumber.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        const { value } = this.props;
        const { displayValue } = this.state;

        if (parseInt(nextProps.value, 10) === value) return;

        this.setState({ previousValue: displayValue });
        this.startAnimationTime = (new Date()).getTime();
        this.updateNumber();
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextState.displayValue !== this.state.displayValue;
    }

    componentWillUnmount() {
        clearTimeout(this.timeout);
    }

    updateNumber() {
        const { ease, speed, value } = this.props;
        const { previousValue } = this.state;

        const now = (new Date()).getTime();
        const elapsedTime = Math.min(speed, (now - this.startAnimationTime));
        const progress = eases[ease](elapsedTime / speed);
        const currentDisplayValue = Math.round((value - previousValue) * progress + previousValue);

        this.setState({ displayValue: currentDisplayValue });

        if (elapsedTime < speed) {
            this.timeout = setTimeout(this.updateNumber, 16);
        } else {
            this.setState({ previousValue: value });
        }
    }

    render() {
        const { style } = this.props;
        const { displayValue } = this.state;

        return (
            <Text style={style}>{displayValue}</Text>
        );
    }
}

NumberEasing.defaultProps = {
    ease: 'quintInOut',
    speed: 500
};

NumberEasing.propTypes = {
    ease: PropTypes.oneOf(Object.keys(eases)),
    speed: PropTypes.number,
    style: PropTypes.oneOfType([ PropTypes.number, PropTypes.object ]),
    value: PropTypes.any.isRequired
};
