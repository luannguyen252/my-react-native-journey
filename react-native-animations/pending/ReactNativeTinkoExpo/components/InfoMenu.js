import React from 'react';
import {StyleSheet,View,Text} from 'react-native';
import {
    Feather
} from '@expo/vector-icons';

export default class InfoMenu extends React.Component {

    constructor(props){
        super();
        this.iconName = props.icon;
    }

    render() {
        return (
            <View style={styles.outerDiv}>
                <View style={styles.settingOuter}>
                    <Feather name={this.iconName} size={25} style={{lineHeight:55,marginLeft:15}} color="white" />
                    <Text style={styles.textColor}>添加好友</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    outerDiv:{
        justifyContent: 'center',
        alignItems: 'center',
    },
    settingOuter: {
        width:"90%",
        marginTop:10,
        backgroundColor:"rgb(54,53,59)",
        height:55,
        borderRadius:10,
        flexDirection: 'row'
    },
    textColor:{
        fontSize:16,
        fontWeight:"bold",
        color:"white",
        width: '100%',
        lineHeight: 55,
        marginLeft:15
    }
});