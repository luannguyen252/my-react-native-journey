import React, { Component } from 'react';
import {
    View, StyleSheet, Text, Button, Image, TouchableOpacity, TextInput, ScrollView,
    AsyncStorage, FlatList, Platform, RefreshControl, StatusBar
} from 'react-native';
import ProfileInstaPost from "./ProfileInstaPost";
import config, { printLog } from "../config"
import { getUserSpecificReaction } from '../firebase/fireConfig'
import moment from 'moment'
import ProfileEmptyComponent from '../component/ProfileEmptyComponent';
import StatusBarComponent from '../component/StatusBarComponent';
import { Left } from 'native-base'; 
import firebase from 'react-native-firebase'; 
import BaseComponent from '../component/BaseComponent';

export default class Profile extends Component {

    state = {
        isLoading: true,
        profile: "",
        dataSource: [],
        refreshing: false,
        isOnFireAdded : false,
    };

    constructor(props) {
        super(props)
        getUserReactionsFromAPI = this.getUserReactionsFromAPI.bind(this)
        refreshFireChanges = this.refreshFireChanges.bind(this) 
    }

    static navigationOptions = ({ navigation }) => {
        isIconShow = navigation.state.params ? navigation.state.params.isIconShow : false
        if (!isIconShow) {
            return {
                // title: `${config.constants.profileTitle}`,
                headerTitle: `${config.constants.profileTitle}`,
                // headerTitleStyle: { textAlign: 'center', alignSelf: 'center' },
                // headerStyle: {
                //     backgroundColor: 'white',
                // },
            }
        } else {
            return {
                // title: `${config.constants.profileTitle}`,
                headerTitle: `${config.constants.profileTitle}`,
                // headerTitleStyle: { textAlign: 'center', alignSelf: 'center' },
                // headerStyle: {
                //     backgroundColor: 'white',
                // },
                headerRight: (
                    <TouchableOpacity onPress={() => { }} >
                        <Image source={config.images.sendIcon} style={styles.navSend} />
                    </TouchableOpacity>
                ),
            }
        }
    };

    initFirebase = () => {
        var reactionRef = firebase.database().ref().child(config.constants.reactionFirePath);
        reactionRef.on("child_added", (data) => {
            
            if(this.state.isOnFireAdded){
                printLog("child_added = " + JSON.stringify(data.val)) 
                this.getUserReactionsFromAPI(false);  
            }
        });

        reactionRef.on('child_changed', function (data) {
            printLog("child_changed = " + JSON.stringify(data))
            this.refreshFireChanges(data, true)
            // this.getUserReactionsFromAPI(false);          
        });
        
        reactionRef.on('child_removed', function (data) {
            printLog("child_removed = " + JSON.stringify(data))
            this.refreshFireChanges(data, false) 
            // this.getUserReactionsFromAPI(false);         
        });
    }

    componentDidMount() {
        AsyncStorage.getItem(config.constants.LOGIN).then((profile) => {

            profile = JSON.parse(profile)
            this.setState({
                isLoading: true,
                profile: profile,
                dataSource: [],
                refreshing: false
            }) 

            this.initFirebase()
            this.getUserReactionsFromAPI(false);  
        })
    }

    refreshFireChanges = (data, isChangeNotDelete) => {
        listPost = this.state.dataSource
        for (let i = 0; i < listPost.length; i++) {
            if(listPost[i].rowid == data.key){
                if(isChangeNotDelete){
                    this.state.dataSource[i].reactionLikes = data.val().reactionLikes
                    this.state.dataSource[i].likeOwner = data.val().likeOwner
                }else{
                    this.state.dataSource.splice(i, 1);
                } 
            } 
        }

        if(this.state.dataSource.length > 0){
            this.setState({
                isLoading: false,  
                refreshing: false,
                dataSource: this.state.dataSource,
            })
        }else{
            this.setState({
                isLoading: true,
                refreshing: false
            })
        }
    }

    getUserReactionsFromAPI = () => {
        getUserSpecificReaction(this.state.profile).then((list) => {

            if(list.length > 0){

                // Reverse the list to show the latest post first.
                list.reverse() 

                this.setState({
                    isLoading: false, 
                    dataSource: list,
                    refreshing: false
                })
            }

            // This enables the onAdded function to be triggered if needed.
            this.state.isOnFireAdded = true

            // else{
            //     this.setState({
            //         isLoading: true,
            //         profile: profile,
            //         dataSource: list,
            //         refreshing: false
            //     })
            // }
        })
    }


    _onRefresh = () => {
        this.setState({refreshing: true});
        this.getUserReactionsFromAPI();
    }

    render() {

        var profile = this.state.profile
        const image = "https://graph.facebook.com/" + profile.id + "/picture?type=large"

        if (this.state.isLoading) {
            return (
                <View style={styles.parent}>
                    <StatusBarComponent/>
                    <View style={styles.mView}>
                        <Image style={styles.pickerImage} source={{ uri: image }} />
 
                        <Text style={styles.subHeaderText}>{profile.name}</Text> 

                        <Text style={styles.horizontalLine} /> 
                    </View>     

                    <ProfileEmptyComponent />
                </View>
            );
        } else {  
            return (
                <ScrollView style={styles.parent} 
                            refreshControl={
                                <RefreshControl
                                    refreshing={this.state.refreshing}
                                    colors={['white']}
                                    tintColor={'white'}
                                    progressBackgroundColor={config.colors.appColor}
                                    onRefresh={this._onRefresh} />
                            }> 
                    <View style={styles.emptyView}>
                        <StatusBarComponent/>
                        <View style={styles.emptyView}>
                            <Image style={styles.pickerImage} source={{ uri: image }} />

                            <View>
                                <Text style={styles.subHeaderText}>{profile.name}</Text>
                            </View>

                            <Text style={styles.horizontalLine} />

                            <View style={styles.flatList} >
                                <FlatList
                                    data={this.state.dataSource}
                                    renderItem={({ item }) => <ProfileInstaPost reaction={item} profile={this.state.profile} />}
                                    keyExtractor={(item, index) => index.toString()}
                                    numColumns={2}
                                    extraData={this.state}
                                />
                            </View>

                        </View>
                    </View>
                </ScrollView >
            );
        }
    }
}

const styles = StyleSheet.create({
    parent: {
        width: 100 + "%",
        height: 100 + "%",
        backgroundColor: config.colors.appBgColor,
        flexDirection: "column"
    },

    emptyView: {
        width: 100 + "%",
        height: 100 + "%",
        backgroundColor: config.colors.appBgColor,
        alignItems: "center",
        flexDirection: "column"
    },

    mView: {
        width: 100 + "%",
        height: 32 + "%",
        backgroundColor: config.colors.appBgColor,
        alignItems: "center",
        flexDirection: "column"
    },

    pickerImage: {
        height: 100,
        width: 100,
        borderRadius: 80,
        marginTop: config.constants.padding20,
    },

    navSend: {
        width: 24,
        height: 24,
        marginRight: config.constants.defaultPadding
    },

    subHeaderText: {
        fontSize: 20,
        color: config.colors.black,
        marginTop: config.constants.padding10,
    },

    horizontalLine: {
        width: 100 + "%",
        height: 0.5,
        marginTop: config.constants.padding20,
        backgroundColor: config.colors.tabBgColor
    },

    flatList: { 
        flex: 1,
        alignItems: "flex-start", 
    },

})