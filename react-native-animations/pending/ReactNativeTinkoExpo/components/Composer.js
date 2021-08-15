/* eslint no-use-before-define: ["error", { "variables": false }] */

import PropTypes from 'prop-types';
import React from 'react';
import { Platform, StyleSheet, TextInput as Input } from 'react-native';
import TextInput from "./TextInput";
//import TextInput from "./TextInput";

const MIN_COMPOSER_HEIGHT = Platform.select({
    ios: 33,
    android: 41,
});
const DEFAULT_PLACEHOLDER = 'Type a message...';

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

export default class Composer extends React.Component {
    // static defaultProps = {
    //     onFocus: () => { },
    // }
    //
    // constructor(props) {
    //     super(props);
    //     console.log(props);
    //     props.textInputProps.ref(this);
    //     this.state = {
    //         value: this.props.text,
    //         refresh: false,
    //     };
    // }
    //
    // shouldComponentUpdate(nextProps, nextState) {
    //     if (this.state.value !== nextState.value) {
    //         return false;
    //     }
    //
    //     return true;
    // }
    //
    // componentDidUpdate(prevProps) {
    //     if (prevProps.value !== this.props.value && this.props.value === '') {
    //         this.setState({ value: '', refresh: true }, () => this.setState({ refresh: false }));
    //     }
    // }
    //
    // onFocus = (e) => {
    //     this.input.focus();
    //
    //     this.props.onFocus();
    // };

    //-----------------------------------------------------

    onContentSizeChange(e) {
        const { contentSize } = e.nativeEvent;

        // Support earlier versions of React Native on Android.
        if (!contentSize) return;

        if (
            !this.contentSize ||
            this.contentSize.width !== contentSize.width ||
            this.contentSize.height !== contentSize.height
        ) {
            this.contentSize = contentSize;
            this.props.onInputSizeChanged(this.contentSize);
        }
    }

    onChangeText(text) {
        this.props.onTextChanged(text);
    }

    // clear(){
    //     console.log('Composer clear');
    //     // if (Platform.OS === 'ios') {
    //     //     this.input.setNativeProps({ text: ' ' });
    //     // }
    //     //
    //     // setTimeout(() => {
    //     //     this.input.setNativeProps({ text: '' });
    //     // });
    //     this.input.clear();
    //     // this.input.setNativeProps({text: ''})
    //     //this.setState({value:''})
    //     // setTimeout(() => {
    //     //     this.input.setNativeProps({ text: '' });
    //     // });
    // }

    render() {

        // if (this.state.refresh) {
        //     return null;
        // }

        return (
            <TextInput
                //onFocus={this.onFocus}
                ref={(ref) => { this.input = ref; }}
                testID={this.props.placeholder}
                accessible
                accessibilityLabel={this.props.placeholder}
                placeholder={this.props.placeholder}
                placeholderTextColor={this.props.placeholderTextColor}
                multiline={this.props.multiline}
                onChange={(e) => this.onContentSizeChange(e)}
                onContentSizeChange={(e) => this.onContentSizeChange(e)}
                onChangeText={(text) => this.onChangeText(text)}
                style={[styles.textInput, this.props.textInputStyle, { height: this.props.composerHeight }]}
                autoFocus={this.props.textInputAutoFocus}
                value={this.props.text}
                //value={this.state.value}
                enablesReturnKeyAutomatically
                underlineColorAndroid="transparent"
                keyboardAppearance={this.props.keyboardAppearance}
                blurOnSubmit={true}
                //{...this.props.textInputProps}
            />
        );
    }

}

const styles = StyleSheet.create({
    textInput: {
        flex: 1,
        marginLeft: 10,
        fontSize: 16,
        lineHeight: 16,
        marginTop: Platform.select({
            ios: 6,
            android: 0,
        }),
        marginBottom: Platform.select({
            ios: 5,
            android: 3,
        }),
    },
});

Composer.defaultProps = {
    composerHeight: MIN_COMPOSER_HEIGHT,
    text: '',
    placeholderTextColor: Color.defaultProps,
    placeholder: DEFAULT_PLACEHOLDER,
    textInputProps: null,
    multiline: true,
    textInputStyle: {},
    textInputAutoFocus: false,
    keyboardAppearance: 'default',
    onTextChanged: () => {},
    onInputSizeChanged: () => {},
};

Composer.propTypes = {
    composerHeight: PropTypes.number,
    text: PropTypes.string,
    placeholder: PropTypes.string,
    placeholderTextColor: PropTypes.string,
    textInputProps: PropTypes.object,
    onTextChanged: PropTypes.func,
    onInputSizeChanged: PropTypes.func,
    multiline: PropTypes.bool,
    //textInputStyle: TextInput.propTypes.style,
    textInputAutoFocus: PropTypes.bool,
    keyboardAppearance: PropTypes.string,
};