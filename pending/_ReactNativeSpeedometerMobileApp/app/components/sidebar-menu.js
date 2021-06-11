import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import PropTypes from 'prop-types';
import { SidebarMenuButton } from './sidebar-menu-button';
import { Variables } from '../assets/styles/variables';

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: Variables.colors.primaryDark,
        flex: 1,
        justifyContent: 'center'
    }
});

export class SidebarMenu extends Component {

    render() {
        const { style } = this.props;

        return (
            <View style={[styles.container, style]}>
                <SidebarMenuButton
                    color={Variables.colors.tertiary}
                    value={'Speed'}
                />
                <SidebarMenuButton
                    color={Variables.colors.secondary}
                    value={'Route'}
                />
                <SidebarMenuButton
                    color={Variables.colors.warning}
                    value={'Compass'}
                />
                <SidebarMenuButton
                    color={Variables.colors.danger}
                    value={'Altitude'}
                />
            </View>
        );
    }
}

SidebarMenu.defaultProps = {

};

SidebarMenu.propTypes = {
    style: PropTypes.oneOfType([ PropTypes.number, PropTypes.object ])
};
