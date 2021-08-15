import React from 'react';
import {StyleSheet,View,Text,TouchableWithoutFeedback} from 'react-native';
import {Octicons} from '@expo/vector-icons';

export default class CreateStoryButton extends React.Component {
    render() {
        return (
            <View style={styles.outerDiv}>
                <TouchableWithoutFeedback>
                    <View style={styles.settingOuter}>
                        <View style={{
                            width: '60%',
                            flexDirection: 'row',
                            height:45
                        }}>
                            <Octicons name="plus" size={25} style={{lineHeight:45}} color="white" />
                            <Text style={styles.textColor}>创建新的故事</Text>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
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
        width:"55%",
        marginTop:15,
        backgroundColor:"rgb(54,53,59)",
        height:45,
        borderRadius:22.5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textColor:{
        fontSize:16,
        fontWeight:"bold",
        color:"white",
        width: '100%',
        lineHeight: 45,
        marginLeft:4
    }
});