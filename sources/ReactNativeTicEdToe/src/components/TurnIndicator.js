import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const TurnIndicator = ({isRedTurn}) => {
    if(isRedTurn){
        return(
            <View style={styles.container}>
                <Text style={styles.redText}>Red's Turn</Text>
            </View>
        );
    } else {
        return(
            <View style={styles.container}>
                <Text style={styles.blueText}>Blue's Turn</Text>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container:{
        alignSelf: 'center'
    },
    redText:{
        fontSize: 40,
        color: 'tomato',
        fontFamily: "monospace",

    },
    blueText:{
        fontFamily: "monospace",
        fontSize: 40,
        color: 'blue'
    }
});

export default TurnIndicator;