import React , { Component } from 'react';

import { Platform, StyleSheet, Text, Animated, View, TouchableOpacity, Dimensions, Image } from 'react-native';

import ClapBubble from './clapBubble.js';


export default class ClapButton extends Component {

    constructor(props) {
        super();
        this.state = {
            count : 0,
            claps: []
        }
        this.clap = this.clap.bind(this);
    }

    clap() {
        let count = this.state.count;
        let claps = this.state.claps;
        count++;
        claps.push(count);
        this.setState({count});
    }

    animationEnd(totalCount) {
        claps = this.state.claps;
        claps.splice(claps.indexOf(totalCount) - 1);
        this.setState(claps);
    }

    renderClaps() {
        return this.state.claps.map(totalCount => <ClapBubble key={totalCount} count={totalCount} animationEnd={this.animationEnd.bind(this)} /> )
    }

    render() {
        return (
            <View style = {{flex:1}} >
            <TouchableOpacity onPress={this.clap} activeOpacity={0.5} style={styles.clapButton}>
                <Image source={require('../images/clap.png')} style={styles.clapImage}/>
            </TouchableOpacity>
            {this.renderClaps()}
            </View>

        )
    }

}

const styles = StyleSheet.create ( {
    clapButton : {
        position : 'absolute',
        height : 60,
        width : 60,
        borderRadius : 30,
        borderWidth : 1,
        borderColor : '#66CCCC',
        backgroundColor : '#fff',
        elevation : 5,
        bottom : 20,
        right : 20,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
    },
    clapImage : {
        height : 35,
        width : 35,
    },
});

