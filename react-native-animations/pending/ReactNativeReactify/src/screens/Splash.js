import React, { Component } from 'react'
import { View, Text } from 'react-native';

export default class Splash extends Component {

    static navigationOptions = { header: null };

    constructor(props) {
        super(props); 
        navigation = props.navigation;
    }

    componentDidMount() { 
        setTimeout(() => {  
            navigation.navigate("feed")
        }, 2000);
    }

    render() {
        return (
            <View>
                <Text>SPLASH</Text>
            </View>
        );
    }
}