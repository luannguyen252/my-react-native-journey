import React, {
    Component
} from 'react'

import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
} from 'react-native'

export default class FullButton extends Component {
    render() {
        return (
            <View>
                {this._renderButton()}
            </View>
        )
    }

    _renderButton() {
        return(
            <TouchableOpacity
                onPress={this.props.onPress}
                style={[styles.button, this.props.buttonStyle]}>
                <View style={styles.viewText}>
                    <Text style={[styles.textMeg, this.props.textStyle]}>{this.props.text}</Text>
                </View>
            </TouchableOpacity>
        );
    }

}

const styles = StyleSheet.create({
    viewText: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textMeg: {
        color: 'white',
        fontSize: 25,
    },
    button: {
        height: 60,
        justifyContent: 'center',
        alignItems: 'center'
    },
});