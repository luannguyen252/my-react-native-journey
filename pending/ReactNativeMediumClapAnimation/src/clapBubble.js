import React , { Component } from 'react';

import { Platform, StyleSheet, Text, Animated, View, TouchableOpacity, Dimensions, Image } from 'react-native';

export default class ClapBubble extends Component {

    constructor() {
        super()
        this.state = {
            yPosition : new Animated.Value(0),
            opacity : new Animated.Value(0)
        }
    }
    
    componentDidMount() {
        Animated.parallel([
            Animated.timing(this.state.yPosition, {
              toValue: -120,
              duration: 500,
            }),
            Animated.timing(this.state.opacity, {
              toValue: 1,
              duration: 500,
            })
          ]
        ).start(() => {
            setTimeout(() => {
              this.props.animationEnd(this.props.count)
            }, 5000);
          })
    }
    
    render() {
        const animationStyles = {
            transform : [{translateY : this.state.yPosition}],
            opacity: this.state.opacity
        }
    
        return (
            <Animated.View style={[styles.clapBubble , animationStyles]} >
                <Text style={styles.clapText}> +{this.props.count} </Text>
            </Animated.View>
        )
    }
}

const styles = StyleSheet.create ( {
    clapBubble : {
        position : 'absolute',
        height : 60,
        width : 60,
        borderRadius : 30,
        backgroundColor : '#66CCCC',
        bottom : 20,
        right : 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    clapText : {
        color : 'white',
        fontSize : 16
    }
});
