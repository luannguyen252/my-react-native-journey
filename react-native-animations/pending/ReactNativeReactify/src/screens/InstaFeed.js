import React, { Component } from 'react';
import { View, StyleSheet, FlatList, RefreshControl, StatusBar, TouchableOpacity, Image, AsyncStorage } from 'react-native';
import InstaPost from "./InstaPost";
import config, { printLog } from "../config"
import BarProgressComponent from "../component/BarProgressComponent"
import EmptyComponent from "../component/EmptyComponent"
import { getUserReaction } from '../firebase/fireConfig';
import firebase from 'react-native-firebase'; 
import BaseComponent from '../component/BaseComponent';
import StatusBarComponent from '../component/StatusBarComponent';   

export default class InstaFeed extends Component {

    state = {   
        isLoading: true,
        dataSource: [],
        refreshing: false, 
        isOnFireAdded: false
    };

    constructor(props) {
        super(props)

        getUserReactionsFromAPI = this.getUserReactionsFromAPI.bind(this)
        initFirebase = this.initFirebase.bind(this) 
        refreshFirebaseChanges = this.refreshFirebaseChanges.bind(this) 

        AsyncStorage.getItem(config.constants.LOGIN).then((profile) => {
            profile = JSON.parse(profile) 
            this.state.profile = profile
        })  
    } 

    static navigationOptions = ({ navigation }) => {
        isShow = navigation.state.params ? navigation.state.params.isShow : false
        if (isShow) {
            return {
                // title: `${config.constants.appName}`,
                headerTitle: `${config.constants.appName}`,
                // headerTitleStyle: { textAlign: 'center', alignSelf: 'center', fontWeight: 'bold' },
                // headerStyle: {
                //     backgroundColor: 'white',
                // },
                headerRight: (
                    <TouchableOpacity onPress={() => { this.getUserReactionsFromAPI(true) }}>
                        <Image source={config.images.sync} style={styles.navSendActive} />
                    </TouchableOpacity>
                ),
            }
        } else {
            return { 
                 headerTitle: `${config.constants.appName}`, 
                 headerRight: (
                     <BarProgressComponent/>
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
            this.refreshFirebaseChanges(data, true)
            // this.getUserReactionsFromAPI(false);          
        });
        
        reactionRef.on('child_removed', function (data) {
            printLog("child_removed = " + JSON.stringify(data))
            this.refreshFirebaseChanges(data, false) 
            // this.getUserReactionsFromAPI(false);         
        });
    }

    refreshFirebaseChanges = (data, isChangeNotDelete) => {
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
            this.setState({})
        }else{
            this.setState({
                empty: true,
            })
        }
    }

    componentDidMount() {
        this.initFirebase()
        this.getUserReactionsFromAPI(false);         
    }

    getUserReactionsFromAPI = (isPullRefresh) => {

        if(isPullRefresh){
           this.props.navigation.setParams({ isShow: false }); 
        }
        getUserReaction()
            .then(listReactions => {

            if (listReactions.length > 0) { 

                // Reverse the list to show the latest post first.
                listReactions.reverse() 

                this.setState({
                    isLoading: false,
                    empty: false,
                    dataSource: listReactions,
                    refreshing: false
                })
            }else{
                this.setState({
                    isLoading: false,
                    empty: true,
                    dataSource: listReactions,
                    refreshing: false
                })
            }

            // This enables the onAdded function to be triggered if needed.
            this.state.isOnFireAdded = true

            setTimeout(() => {  
                this.props.navigation.setParams({ isShow: true }); 
            }, 100); 
        }) 
    }

    _onRefresh = () => {
        // this.setState({refreshing: true, dataSource : []});
        this.getUserReactionsFromAPI(false);
    }

    render() {

        // if (this.state.isLoading) {
        //     return (
        //         <View>
        //             <StatusBarComponent/>
        //             <EmptyComponent />
        //         </View>
        //     );
        // } else
         if (this.state.empty) {
            return (
                <View>
                    <StatusBarComponent/>
                    <EmptyComponent />
                </View>
            );
        } else {
            return (
                <View style={styles.parent}>
                    <StatusBarComponent/>
                    {/* <Header style={styles.header} >
                    <Text style={styles.title}>ReactInstagram</Text>
                    </Header> */}
                    <FlatList 
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.refreshing}
                                colors={["#FFFFFF"]}
                                tintColor={"#FFFFFF"}
                                progressBackgroundColor={config.colors.appColor}
                                onRefresh={this._onRefresh} />
                        }
                        // data={[{ key: 'a' }, { key: 'b' }, { key: 'm' }, { key: 'c' }, { key: 'd' }, { key: 'e' }, { key: 'f' }, { key: 'g' }, { key: 'h' }]}
                        data={this.state.dataSource}
                        renderItem={({ item }) => <InstaPost reaction={item} profile={this.state.profile} />}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>

                // <View style={styles.progress}>
                //     <ProgressComponent />
                // </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    parent: {
        width: 100 + "%",
        height: 100 + "%",
        backgroundColor: config.colors.appBgColor
    },

    header: {
        width: 100 + "%",
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: config.constants.padding10
    },

    title: {
        fontSize: 20,
        fontFamily: "Cochin",
    },
    
    navSendActive: {
        width: 30,
        height: 30,
        tintColor: 'white',
        marginRight: config.constants.defaultPadding
    },
}) 