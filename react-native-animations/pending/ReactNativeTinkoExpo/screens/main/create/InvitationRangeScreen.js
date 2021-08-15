import _ from 'lodash';
import React from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
    Keyboard,
    TextInput, Dimensions,
    Switch,
} from 'react-native';
import {
    Input,
    Button,
    Text,
    Card,
    ButtonGroup,
    Tile,
    Col,
    Row,
    Icon,
    Avatar, ListItem,
} from 'react-native-elements';
import Expo, { SQLite } from 'expo';
import {getUserData} from "../../../modules/CommonUtility";


const db = SQLite.openDatabase('db.db');

import * as firebase from "firebase";

export default class InvitationRangeScreen extends React.Component{

    static navigationOptions = ({ navigation }) => {
        const params = navigation.state.params || {};

        return {
            // Correct Header Button modifyzationn: https://reactnavigation.org/docs/header-buttons.html
            headerLeft:(<Button title="Back"
                                clear
                                onPress={params.back}
            />),
            headerStyle:{backgroundColor:'#AED6F1'}
            //headerStyle:{ position: 'absolute', backgroundColor: 'transparent', zIndex: 100, top: 0, left: 0, right: 0, headerLeft:null, boarderBottomWidth: 0}
        };
    };

    constructor(props){
        super(props);
        let user = firebase.auth().currentUser;
        let uid = user.uid;
        const {allFriends, allowPeopleNearby, allowParticipantsInvite, selectedFriendsList, editingMode} = props.navigation.state.params;
        this.state = {
            userUid:uid,
            sqlRows: [],
            allFriends: allFriends,
            allowPeopleNearby: allowPeopleNearby,
            allowParticipantsInvite: allowParticipantsInvite,
            selectedFriendsList: selectedFriendsList,
            notFriendsList:selectedFriendsList,
            notFriendsListData:[],
            editingMode:editingMode,
        };
    }

    componentDidMount(){
        this.props.navigation.setParams({back:this.onBackButtonPressed.bind(this)});
        this.getSql();
    }

    componentWillUnmount(){
        const {allFriends, allowPeopleNearby, allowParticipantsInvite, sqlRows, editingMode, notFriendsListData, userUid} = this.state;
        console.log('componentWillUnmount:', allFriends, allowPeopleNearby, allowParticipantsInvite);
        var selectedFriendsList = [];
        sqlRows.map((l,i) => {
            if(l.selected){
                selectedFriendsList.push(l.key);
            }
        });
        if(editingMode){
            notFriendsListData.map((userData)=>{
                if(userData.selected){
                    selectedFriendsList.push(userData.uid);
                }
            });
            selectedFriendsList.push(userUid);
        }
        this.props.navigation.state.params.setInvitationRange({
            allFriends:allFriends,
            allowPeopleNearby:allowPeopleNearby,
            allowParticipantsInvite:allowParticipantsInvite,
            selectedFriendsList:selectedFriendsList,
            userPicked: true,
        })
    }

    onBackButtonPressed(){
        this.props.navigation.goBack();
    }


    getSql(){
        const{ userUid, selectedFriendsList, editingMode, notFriendsList} = this.state;
        db.transaction(
            tx => {
                tx.executeSql(`select * from friend_list${userUid} WHERE isFriend = 1`, [], (_, { rows }) => {
                    let dataArr =  rows['_array'],
                        rtnArr = [];
                    for (let i = 0; i <dataArr.length;i++){
                        let selected = selectedFriendsList.indexOf(dataArr[i].userId) !== -1;

                        if(editingMode && selected){
                            let index = notFriendsList.indexOf(dataArr[i].userId);
                            if (index > -1) {
                                notFriendsList.splice(index, 1);
                            }
                        }

                        rtnArr.push({
                            avatar:dataArr[i].avatarUrl,
                            key:dataArr[i].userId,
                            title:dataArr[i].username,
                            selected: selected,
                        });
                    }
                    this.setState({ sqlRows: rtnArr });

                    if(editingMode){
                        let index = notFriendsList.indexOf(userUid);
                        if (index > -1) {
                            notFriendsList.splice(index, 1);
                        }
                        this.setState({notFriendsList:notFriendsList});
                        this.getNotFriendsListData(notFriendsList)
                    }
                });
            },
            null,
            this.update
        )

    }

    getNotFriendsListData(notFriendsList){
        notFriendsList.map((uid)=>{
            getUserData(uid).fork(
                (error) => {
                    console.log(error);
                },
                (userData) => {
                    this.setState((state)=>{
                        let listData=state.notFriendsListData;
                        userData.selected = true;
                        listData.push(userData);
                        return {notFriendsListData:listData};
                    })
                }
            );
        })
    }

    onAllFriendsToggled(allFriends){
        const {sqlRows} = this.state;
        this.setState({allFriends});
        sqlRows.map((l,i) => {
            l.selected = allFriends;
            sqlRows[i] = l;

        })
        this.setState({sqlRows});
    }


    render(){
        const { sqlRows, allFriends, allowPeopleNearby, allowParticipantsInvite,editingMode,notFriendsListData } = this.state;
        console.log(sqlRows);
        return(
            <ScrollView style={styles.container}>
                <ListItem
                    title='All Friends'
                    rightIcon={
                        <Switch
                            value={allFriends}
                            onValueChange={this.onAllFriendsToggled.bind(this)}
                        />
                    }
                />
                <ListItem
                    title='Allow People Nearby'
                    rightIcon={
                        <Switch
                            value={allowPeopleNearby}
                            onValueChange={(allowPeopleNearby) => this.setState({allowPeopleNearby})}
                        />
                    }
                />
                <ListItem
                    title='Allow Participants Invite Friends'
                    rightIcon={
                        <Switch
                            value={allowParticipantsInvite}
                            onValueChange={(allowParticipantsInvite) => this.setState({allowParticipantsInvite})}
                        />
                    }
                />

                {editingMode && notFriendsListData.length !==0 &&
                <View style={{marginTop:30}}>
                    <Text>Not Friends</Text>
                    {notFriendsListData.map((userData, i) => (
                        <ListItem
                            key={userData.uid}
                            leftAvatar={{ rounded: true, size:40, source: { uri: userData.photoURL } }}
                            title={userData.username}
                            rightIcon = {userData.selected ? {name:'done'} : null}
                            onPress={() => {
                                //console.log(l, i);
                                userData.selected = !userData.selected;
                                notFriendsListData[i] = userData;
                                this.setState({notFriendsListData});
                            }}
                        />
                    ))}
                </View>
                }
                {(sqlRows===null || sqlRows.length ===0) ?
                    null
                    :
                    (<View style={{marginTop:30}}>
                        <Text>Friends List</Text>
                        {sqlRows.map((l, i) => (
                            <ListItem
                                key={l.key}
                                leftAvatar={{ rounded: true, size:40, source: { uri: l.avatar } }}
                                title={l.title}
                                rightIcon = {l.selected ? {name:'done'} : null}
                                onPress={() => {
                                    //console.log(l, i);
                                    l.selected = !l.selected;
                                    sqlRows[i] = l;
                                    this.setState({sqlRows});
                                }}
                            />
                        ))}
                    </View>)}

            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});