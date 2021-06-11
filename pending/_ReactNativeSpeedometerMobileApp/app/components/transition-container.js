import { Fade, createTransition } from 'react-native-transition';
import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { Variables } from '../assets/styles/variables';

const styles = StyleSheet.create({
    container: { flex: 1 }
});

const Transition = createTransition(Fade);

export class TransitionContainer extends Component {

    shouldComponentUpdate(nextProps) {
        const { screenIndex } = nextProps;
        return screenIndex !== this.props.screenIndex;
    }

    componentDidUpdate() {
        const { screenIndex, children, setScreenIndex } = this.props;
        const child = React.cloneElement(children[screenIndex], {setScreenIndex});

        Transition.show(child);
    }

    render() {
        const { children, style } = this.props;

        return (
            <Transition
                duration={Variables.animations.durationBase}
                easing={Variables.animations.defaultEasing}
                style={[styles.container, style]}
            >
                {children[0]}
            </Transition>
        );
    }
}

TransitionContainer.defaultProps = {

};

TransitionContainer.propTypes = {
    children: PropTypes.array.isRequired,
    screenIndex: PropTypes.number,
    setScreenIndex: PropTypes.func,
    style: PropTypes.oneOfType([ PropTypes.number, PropTypes.object ])
};
