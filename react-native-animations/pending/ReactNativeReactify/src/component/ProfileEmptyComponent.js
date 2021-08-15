import React, { Component } from 'react';
import { ActivityIndicator, View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import config from '../config';
import { withNavigation } from 'react-navigation';

class ProfileEmptyComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <TouchableOpacity style={styles.container} onPress={() => {
                this.props.navigation.navigate("camera") 
            }}>
                <Image style={styles.userPic}
                    source={config.images.addReaction}/>

                <View style={styles.subHeader}>
                    <Text style={styles.subHeaderText}>Add Reactions...</Text>
                </View> 
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '70%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: "column",
        backgroundColor : "white"
    },

    subHeaderText: {
        fontSize: 16,
        marginTop : config.constants.padding10,
        color: config.colors.black
    },

    userPic: {
        width: 60,
        height: 60, 
    },
})

export default withNavigation(ProfileEmptyComponent);