import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import PropTypes from 'prop-types';
import { Variables } from '../assets/styles/variables';

const styles = StyleSheet.create({

});

export class EmptyComponent extends Component {

    render() {
        const { style } = this.props;

        return (
            <View style={[style]} />
        );
    }
}

EmptyComponent.defaultProps = {

};

EmptyComponent.propTypes = {
    style: PropTypes.oneOfType([ PropTypes.number, PropTypes.object ])
};
