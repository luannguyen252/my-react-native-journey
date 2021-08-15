import React from 'react';
import { TextInput as Input, Platform,View } from 'react-native';

export default class TextInput extends React.Component {
    static defaultProps = {
        onFocus: () => { },
    }

    constructor(props) {
        super(props);

        this.state = {
            value: this.props.value,
            refresh: false,
        };
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.state.value !== nextState.value) {
            return false;
        }

        return true;
    }

    componentDidUpdate(prevProps) {
        if (prevProps.value !== this.props.value && this.props.value === '') {
            this.setState({ value: '', refresh: true }, () => {
                this.setState({ refresh: false }, ()=> this.input.focus());
            });
        }
    }

    onFocus = (e) => {
        this.input.focus();

        this.props.onFocus();
    }

    clear(){
        this.input.clear();
    }

    render() {

        if(Platform.OS==='android'){

            return(
                <Input
                {...this.props}
                ref={(ref) => { this.input = ref; }}
                onFocus={this.onFocus}
            />);

        } else {
            if (this.state.refresh) {
                return null;
            }
            return(
                <Input
                    {...this.props}
                    ref={(ref) => { this.input = ref; }}
                    value={this.state.value}
                    onFocus={this.onFocus}
                />);
        }


    }
}