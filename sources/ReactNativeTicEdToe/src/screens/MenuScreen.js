import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const MenuScreen = ({setIsPlaying}) => {
    return(
        <View style={styles.container}>
            <Text style={styles.titleText}>Tic-Ed-Toe</Text>
            <TouchableOpacity 
            style={styles.buttonContainer}
            onPress={() => {
                setIsPlaying(true);
            }}
            > 
                <Text style={styles.buttonText}>Start</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignSelf: "center",
        flex: 1
    },
    titleText:{
        fontFamily: "monospace",
        fontSize: 50,
        textDecorationLine: 'underline'
    },
    buttonContainer:{
        paddingVertical: 10,
        paddingHorizontal: 50,
        backgroundColor: 'tomato',
        borderColor: '#000000',
        borderWidth: 3,
        alignSelf: "center",
        borderRadius: 10,
    },
    buttonText:{
        fontFamily: "monospace",
        color: 'white',
        fontSize: 40
    }
});

export default MenuScreen;