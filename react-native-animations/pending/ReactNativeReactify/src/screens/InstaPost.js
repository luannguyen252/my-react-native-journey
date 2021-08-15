import React, { Component } from 'react'
import { Text, Image, View, StyleSheet, Dimensions, TouchableOpacity, Animated, Easing } from 'react-native'
import config, { printLog } from "../config"
import { Card, CardItem, Container, Content } from 'native-base'
import moment from 'moment';
import { sendUserLikeToFirebase } from '../firebase/fireConfig'
import BaseComponent from '../component/BaseComponent';
import { withNavigation } from 'react-navigation';
import { sharePost } from '../Utils'
import CircleTransition from '../component/CircleTransition'

class InstaPost extends BaseComponent {

    constructor(props) {
        super(props)
        onLikeClick = this.onLikeClick.bind(this)
        onItemClick = this.onItemClick.bind(this)
        this.circleTransition = CircleTransition()
    }

    state = {
        isOwner: 0,
    }

    onItemClick = () => {

        this.circleTransition.start("#698FB2", this.changeColor.bind(this, "#698FB2"));

        // this.props.navigation.navigate('page2', {
        //     post : this.props.reaction,
        //     profile : this.props.profile,
        // }) 
    }

    changeColor(newColor) {
        this.setState({

        });
    }

    onLikeClick = () => {

        post = this.props.reaction

        if (post.likeOwner == 0) {
            post.reactionLikes = post.reactionLikes + 1
            post.likeOwner = 1
        } else if (post.reactionLikes == 0) {
            post.reactionLikes = 0
            post.likeOwner = 0
        } else {
            post.reactionLikes = post.reactionLikes - 1
            post.likeOwner = 0
        }

        sendUserLikeToFirebase(post.rowid, post.reactionLikes, post.likeOwner)
            .then(likeCount => {
                printLog(likeCount)

                // this.setState({
                //     isLoading: false,
                //     empty: false,
                //     likeCount: likeCount
                // }) 
            });
    }

    onShareClick = () => {
        sharePost(this.props.reaction)
    }

    componentDidMount() {

        // AppState.addEventListener('change', (state) => {
        //     if (state === 'active') {
        //        console.log('state active');
        //     } 
        //    if(state === 'background'){
        //        console.log('background');
        //    }
        // });

        // this.setState({
        //     isLiked: false,
        //     isOwner: 0, 
        // }) 

        let post = this.props.reaction
        printLog("InstaPost = " + JSON.stringify(post))

        // if(post.likeOwner == 1){
        //     this.state.isLiked = true
        // }else{
        //     this.state.isLiked = false
        // }

        let profile = this.props.profile
        this.state.isOwner = profile.id == post.reactionId ? 1 : 0
    }

    render() {
        imageWidth = Dimensions.get("window").width
        imageHeight = Dimensions.get("window").width / 2

        let post = this.props.reaction
        image = "https://graph.facebook.com/" + post.reactionId + "/picture?type=large"

        var likeImage = config.images.heartIcon
        if (post.likeOwner == 1) {
            likeImage = config.images.heartFilledIcon
        }

        // var likeImage = config.images.heartIcon
        // if (this.state.isLiked) {
        //     likeImage = config.images.heartFilledIcon
        // }

        var likeData = ""
        if (post.reactionLikes > 1) {
            likeData = post.reactionLikes + " Likes"
        } else {
            likeData = post.reactionLikes + " Like"
        }

        return (
            <View >
                <CircleTransition
                    ref={(circle) => { this.circleTransition = circle }}
                />

                <View >
                    <Container style={styles.parent}>
                        <TouchableOpacity onPress={this.onItemClick}>
                            <Card>

                                <View >
                                    <View style={[styles.header, { paddingTop: config.constants.padding10 }]}>
                                        <Image style={styles.userPic} source={{ uri: image }} />

                                        <View style={styles.subHeader}>
                                            <Text style={styles.subHeaderText}>{post.reactionName}</Text>
                                            <Text style={styles.subHeaderText1}>{moment(post.reactionDate).format("DD MMM YYYY @ hh:mm a")}</Text>
                                        </View>
                                    </View>
                                    <View >
                                        <Image style={[styles.postImage, { width: 100 + "%", height: imageHeight, }]}
                                            source={{ uri: post.reactionImage }} />
                                    </View>
                                    <Text numberOfLines={3} ellipsizeMode={"tail"} style={styles.textLikes}>{post.reactionMsg}</Text>
                                    <View style={[styles.header, { justifyContent: "space-between" }]}>
                                        <Text style={{
                                            fontSize: 14,
                                            color: config.colors.black
                                        }}>{likeData}</Text>

                                        <View style={{ alignItems: "flex-end", flexDirection: "row" }}>
                                            <TouchableOpacity onPress={this.onLikeClick}>
                                                <Image style={styles.actionIcon} source={likeImage} />
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={this.onShareClick}>
                                                <Image style={[styles.actionIcon, { marginLeft: config.constants.padding20 }]} source={config.images.sendIcon} />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </Card>
                        </TouchableOpacity>
                    </Container>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    parent: {
        flex: 1,
        width: 100 + "%",
        height: 100 + "%",
        paddingLeft: config.constants.padding8,
        paddingRight: config.constants.padding8,
        paddingBottom: config.constants.padding8,
        backgroundColor: config.colors.appBgColor
    },

    header: {
        flexDirection: "row",
        width: 100 + "%",
        height: 50,
        paddingHorizontal: config.constants.defaultPadding,
        alignItems: "center",
    },

    subHeader: {
        flexDirection: "column",
        alignItems: "flex-start",
    },

    subHeaderText: {
        marginLeft: config.constants.defaultPadding,
        fontSize: 18,
        color: config.colors.black
    },

    subHeaderText1: {
        marginLeft: config.constants.defaultPadding,
        fontSize: 12,
        marginTop: config.constants.padding15,
        // color: config.colors.black
    },

    userPic: {
        width: 40,
        height: 40,
        borderRadius: 20
    },

    postImage: {
        marginTop: config.constants.padding10,
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

export default withNavigation(InstaPost);