import React, { Component } from 'react'
import { Text, Image, View, StyleSheet, Dimensions, TouchableOpacity, Share, ScrollView } from 'react-native'
import config, { printLog } from "../config" 
import { Card, Container, Content } from 'native-base' 
import { sendUserLikeToFirebase } from '../firebase/fireConfig' 
import {sharePost} from '../Utils'

export default class InstaDetails extends Component {

    state = { 
        isOwner : 0,
    }

    static navigationOptions = { header: null };

    constructor(props){
        super(props)
        onLikeClick = this.onLikeClick.bind(this) 

        post = this.props.navigation.getParam("post", "")
        profile = this.props.navigation.getParam("profile", "")

        if(post.likeOwner == 1){
            this.state.isLiked = true
        }else{
            this.state.isLiked = false
        } 

        this.state.isOwner = profile.id == post.reactionId ? 1 : 0
    }  

    onShareClick = () => {
        sharePost(post)
    }

    onLikeClick = () => { 
         
        if (post.likeOwner == 0) {  
            post.reactionLikes = post.reactionLikes + 1 
            post.likeOwner = 1 
        } else if(post.reactionLikes == 0){
            post.reactionLikes = 0 
            post.likeOwner = 0 
        } else {
            post.reactionLikes = post.reactionLikes - 1  
            post.likeOwner = 0 
        } 

        // Change the state of Heart Image
        this.setState({}) 

        sendUserLikeToFirebase(post.rowid, post.reactionLikes, post.likeOwner)
        .then(likeCount => { 
                printLog(likeCount) 
        });
    }

    render() {

        imageWidth = Dimensions.get("window").width
        imageHeight = Dimensions.get("window").height / 3 

        var likeImage = config.images.heartIcon
        if(post.likeOwner == 1){
            likeImage = config.images.heartFilledIcon
        } 

        // var likeImage = config.images.heartIcon
        // if (this.state.isLiked) {
        //     likeImage = config.images.heartFilledIcon
        // }

        image = "https://graph.facebook.com/" + profile.id + "/picture?type=large"

        message = ""
        if(post.reactionMsg != ""){
            message = post.reactionMsg
            return ( 
                <ScrollView style={styles.parent}>
                <View>
                    <View >
                        <Image style={[styles.postImage, { width: 100 + "%", height: imageHeight, }]}
                                        source={{ uri: post.reactionImage }} />
                    </View>
    
                     <View style={styles.action}>
                            <TouchableOpacity style={styles.profileImage}> 
                                <Image style={styles.profileImageSize}source={{ uri: image }} />  
                            </TouchableOpacity>
                        {/* </View>
                     
                    <View style={styles.action}> */}
                        <View style={styles.likeImage}>
                            <TouchableOpacity onPress={this.onLikeClick}>
                                <Card style={styles.cardSize}>
                                        <Image style={styles.actionImage} source={likeImage} /> 
                                </Card>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.likeImage}>
                           <TouchableOpacity onPress={this.onShareClick}>
                                <Card style={styles.cardSize}>
                                        <Image style={styles.actionImage} source={config.images.sendIcon} />
                                </Card>
                            </TouchableOpacity>
                        </View> 
                    </View> 
    
                    {/* <Text style={styles.horizontalLine} /> */}
    
                    <Text style={styles.textName}>{post.reactionName + " says ,"}</Text>
                    <Text display='none' style={styles.textMessage}>"{message}"</Text>
                </View> 
                </ScrollView>
            ); 
        }else{
            message = "No reaction found..."
            return ( 
                <ScrollView style={styles.parent}>
                <View>
                    <View >
                        <Image style={[styles.postImage, { width: 100 + "%", height: imageHeight, }]}
                                        source={{ uri: post.reactionImage }} />
                    </View>
    
                     <View style={styles.action}>
                            <TouchableOpacity style={styles.profileImage}> 
                                <Image style={styles.profileImageSize}source={{ uri: image }} />  
                            </TouchableOpacity>
                        {/* </View>
                     
                    <View style={styles.action}> */}
                        <View style={styles.likeImage}>
                            <TouchableOpacity onPress={this.onLikeClick}>
                                <Card style={styles.cardSize}>
                                        <Image style={styles.actionImage} source={likeImage} /> 
                                </Card>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.likeImage}>
                           <TouchableOpacity onPress={this.onShareClick}>
                                <Card style={styles.cardSize}>
                                        <Image style={styles.actionImage} source={config.images.sendIcon} />
                                </Card>
                            </TouchableOpacity>
                        </View> 
                    </View> 
                    
                    <Text display='none' style={styles.textMessage}>"{message}"</Text>
                </View> 
                </ScrollView>
            ); 
        } 
    }
}

const styles = StyleSheet.create({
    parent: { 
        width: 100 + "%", 
        height:100 + "%", 
        backgroundColor: config.colors.appBgColor
    },

    likeImage: {
        width: 33 + "%", 
        textAlign:'center',
        alignItems:'center',
        marginTop: config.constants.padding20,
    },

    cardSize: {
        width: 70, height: 70, borderRadius: 70/2, 
        alignItems:'center',
        paddingTop:16,
    },

    profileImage: {
        width: 120, height: 120, borderRadius: 120/2, 
        alignItems:'center', 
        marginTop:-50,
        marginLeft:20
    },

    profileImageSize: {
        width: 100, height: 100, borderRadius: 100/2,  
        alignItems:'center',
        paddingTop:20,
    },

    actionImage: {
        width: 40,
        height: 40, 
        justifyContent:'center',
        alignItems:'center',
    },

    action : { 
        // width: 100 + "%",
        // height:100,
        // marginTop: 20,
        flexDirection: "row", 
        // alignItems:'center',
    },

    textName: {
        marginTop: config.constants.padding20,
        marginLeft: config.constants.defaultPadding,
        marginRight: config.constants.defaultPadding,
        fontSize: 24,
        color: config.colors.black
        // marginBottom: config.constants.defaultPadding, 
    },

    textMessage: {
        marginTop: config.constants.defaultPadding,
        marginLeft: config.constants.defaultPadding,
        marginRight: config.constants.defaultPadding,
        marginBottom: config.constants.defaultPadding,
        fontSize: 18,
        fontStyle:"italic",
        color: config.colors.black
        // marginBottom: config.constants.defaultPadding, 
    },

    horizontalLine: {
        width: 100 + "%",
        height: 0.5,
        marginTop: config.constants.padding20,
        backgroundColor: config.colors.tabInActiveColor
    },
})