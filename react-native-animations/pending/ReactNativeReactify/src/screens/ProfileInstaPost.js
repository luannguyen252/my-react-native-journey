import React, { Component } from 'react'
import { Text, Image, View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import config, { printLog } from "../config"
import { Card, CardItem, Container, Content } from 'native-base'
import moment from 'moment';
import BaseComponent from '../component/BaseComponent';
import { withNavigation } from 'react-navigation';

class ProfileInstaPost extends Component {

    constructor(props){
        super(props)
        onItemClick = this.onItemClick.bind(this)  
    }

    onItemClick = () => {
        this.props.navigation.navigate('page2', {
            post : this.props.reaction,
            profile : this.props.profile,
        })
    }


    render() { 

        // const {imageHeight, imageWidth} = Dimensions.get('window');

        imageWidth = (Dimensions.get('window').width - 15) / 2;
        imageHeight = 120;

        let post = this.props.reaction
        printLog("ProfileInstaPost = " + JSON.stringify(post))

        if(post.reactionLikes > 1){
            likeData = post.reactionLikes + " Likes"
        }else{
            likeData = post.reactionLikes + " Like"
        }

        var likeImage = config.images.heartIcon
        if(post.likeOwner == 1){
            likeImage = config.images.heartFilledIcon
        } 

        return ( 
                <TouchableOpacity onPress={this.onItemClick} style={styles.parent}>
                    <Card> 
                        <View>
                            <View style={{ minWidth: imageWidth, maxWidth: imageWidth, height: imageHeight }}>
                                <Image style={styles.postImage}
                                    source={{ uri: post.reactionImage }} />
                            </View>
                            <Text numberOfLines={2} ellipsizeMode={"tail"} style={styles.textLikes}>{post.reactionMsg}</Text>
                            <View style={{ justifyContent: "space-between" , alignItems: "center", flexDirection: "row" ,
                        marginRight : config.constants.defaultPadding}}>
                                <Text style={{
                                    fontSize: config.constants.textsize_14,
                                    margin: config.constants.defaultPadding,
                                    color: config.colors.black
                                }}>{likeData}</Text> 
                                <View > 
                                    <Image style={styles.actionIcon} source={likeImage} />
                                </View>
                            </View>
                        </View> 
                    </Card>
                </TouchableOpacity> 
        );
    }
}

const styles = StyleSheet.create({
    parent: {
        justifyContent: 'space-evenly',
        width: (Dimensions.get('window').width - 15) / 2,
        margin: 1,  
    },

    postImage: {
        // marginTop: config.constants.padding10,
        position: "relative", 
        width: (Dimensions.get('window').width - 15) / 2,
        height: 100+"%",
    },

    actionIcon: {
        width: 25,
        height: 25,
    },

    textLikes: {
        marginTop: config.constants.padding10,
        marginLeft: config.constants.defaultPadding,
        marginRight: config.constants.defaultPadding,
        fontSize: 16,
        color: config.colors.black
        // marginBottom: config.constants.defaultPadding, 
    }
})

export default withNavigation(ProfileInstaPost);