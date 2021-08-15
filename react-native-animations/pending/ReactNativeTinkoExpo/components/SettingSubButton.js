import React from 'react';
import {StyleSheet,View, TouchableOpacity} from 'react-native';
import { Entypo, Ionicons, Feather, MaterialIcons} from '@expo/vector-icons'
export default class SettingSubButton extends React.Component {
    constructor(props){
        super(props);
        this.renderIcon = this.renderIcon.bind(this);
    }
    renderIcon(){
        switch(this.props.index){
            case 0:
                return (
                    <Ionicons
                        name='md-person-add'
                        size={26}
                        color="#626567"
                    />);
            case 1:
                return (
                    <MaterialIcons
                name='details'
                size={26}
                color="#626567"
            />);
            case 2:
                return (<Feather
                    name='share'
                    size={26}
                    color="#626567"
                />);
            default:
                return (<Entypo
                    name='add-user'
                    size={26}
                    color="#626567"
                />);
        }

    }
    render() {
        //console.log(this.props);
        return (
            <TouchableOpacity
                onPress={() => this.props.onPress()}
                style={[styles.SettingBTN, this.props.ViewStyle]}>

                <this.renderIcon />

            </TouchableOpacity>



        );
    }
}

const styles = StyleSheet.create({
    SettingBTN: {
        flex:1,
        height:55,
        justifyContent:'center',
        alignItems:'center'
    }
});