import React, { Component } from 'react';
import {
    StyleSheet, Text, View, Image, ScrollView, Dimensions, TouchableOpacity, StatusBar
} from 'react-native';
import { Button } from 'react-native-elements'
import { Font } from 'expo';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const IMAGE_SIZE = SCREEN_WIDTH - 80;

export default class CustomButton extends Component {
    constructor(props) {
        super(props);

        //console.log(props.title);
        props.onRef(this);

        this.state = {
            selected: false,
            title:props.title
        };
    }

    componentDidMount() {
        const { selected, title } = this.props;

        this.setState({selected, title});
    }

    setSelectedFalse(){
        this.setState({selected:false});
    }

    returnTitle(){
        return this.state.title;
    }

    render() {
        const { title } = this.props;
        const { selected } = this.state;

        return (
            <Button
                title={title}
                titleStyle={selected ? {fontSize: 15, color: '#2471A3', fontFamily: 'regular' } : {fontSize: 15, color: '#7F8C8D', fontFamily: 'regular' }}
                buttonStyle={{ backgroundColor: '#EAEDED', borderRadius: 5, elevation:0 }}
                //buttonStyle={selected ? { backgroundColor: 'rgba(213, 100, 140, 1)', borderRadius: 100, width: 80, elevation:0 } : { borderWidth: 1, borderColor: 'rgba(213, 100, 140, 1)', borderRadius: 30, width: 80, backgroundColor: 'transparent',elevation:0 }}
                containerStyle={{ marginRight: 10 }}
                onPress={() => {
                    this.setState({selected: !selected});
                    this.props.onPress(this.props.title);
                }}
            />
        );
    }
}