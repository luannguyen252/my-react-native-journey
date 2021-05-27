import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';

const Square = ({value, setSquare, index}) => {
    if(value == 1){
        return(
            <TouchableOpacity style={styles.containerBlue} ></TouchableOpacity>
        );
    } else if(value == 2){
        return(
            <TouchableOpacity style={styles.containerRed}></TouchableOpacity>
        );
    } else {
        return(
            <TouchableOpacity style={styles.containerGrey} onPress={() => {setSquare(index)}}></TouchableOpacity>
        );
    }
    
}

const styles = StyleSheet.create({
    containerGrey:{
        height: 80,
        width: 80,
        backgroundColor: '#e6e6e6',
        borderColor: '#000000',
        borderWidth: 3,
        borderRadius: 10,
        margin: 10
    },
    containerBlue:{
        height: 80,
        width: 80,
        backgroundColor: 'blue',
        borderColor: '#000000',
        borderWidth: 3,
        borderRadius: 10,
        margin: 10

    },
    containerRed:{
        height: 80,
        width: 80,
        backgroundColor: 'tomato',
        borderColor: '#000000',
        borderWidth: 3,
        borderRadius: 10,
        margin: 10

    }
});

export default Square;