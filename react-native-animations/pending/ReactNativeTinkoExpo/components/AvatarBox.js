import React from 'react';
import {StyleSheet,View,Image,Text} from 'react-native';

export default class AvatarBox extends React.Component {
    render() {
        //console.log(this.props);
        return (
            <View style={styles.outerDiv}>
                <Image
                    style={styles.image}
                    source={{uri:this.props.userData.photoURL}}/>
                <Text style={{marginTop:5,fontSize:22,color:"rgb(54,53,59)",fontWeight:"bold"}}>{this.props.userData.username}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    outerDiv:{
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 130,
        height: 130,
        marginTop:40,
        borderRadius: 25
    }
});