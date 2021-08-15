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
    Switch, Alert,
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
import { NavigationActions } from 'react-navigation';
import {getPostRequest} from "../../../modules/CommonUtility";


const db = SQLite.openDatabase('db.db');

import * as firebase from "firebase";

export default class InvitationRangeScreen extends React.Component{

    static navigationOptions = ({ navigation }) => {
        const params = navigation.state.params || {};

        return {
            // Correct Header Button modifyzationn: https://reactnavigation.org/docs/header-buttons.html
            headerTitle:'Invite',
            headerLeft:(<Button title="Cancel"
                                clear
                                onPress={params.back}
            />),
            headerRight:(<Button title="Done"
                                clear
                                onPress={params.done}
            />),
            headerStyle:{backgroundColor:'#AED6F1'}
            //headerStyle:{ position: 'absolute', backgroundColor: 'transparent', zIndex: 100, top: 0, left: 0, right: 0, headerLeft:null, boarderBottomWidth: 0}
        };
    };

    constructor(props){
        super(props);
        console.log(props);
        let user = firebase.auth().currentUser;
        let uid = user.uid;
        this.state = {
            meetId:props.navigation.state.params.meetId,
            userUid:uid,
            sqlRows: [],
        };
    }

    componentDidMount(){
        this.props.navigation.setParams({
            back:this.onBackButtonPressed.bind(this),
            done:this.onDoneButtonPressed.bind(this),
        });
        this.getSql();
    }



    onBackButtonPressed(){
        this.props.navigation.dispatch(NavigationActions.back())
    }

    onDoneButtonPressed(){
        const {userUid, sqlRows, meetId} = this.state;
        let inviteList=[];
        sqlRows.map((user) => {
            if(user.selected){
                inviteList.push(user.key);
            }
        });
        let bodyData = {
            inviter:userUid,
            inviteList:inviteList,
            meetId:meetId,
        };
        console.log(bodyData);
        getPostRequest('handleParticipantsInvite', bodyData,
            () => {

            },
            (error) => {
                console.log(error);
                Alert.alert('error', error);
            });
        this.props.navigation.dispatch(NavigationActions.back())
    }

    getSql(){
        const{ userUid } = this.state;
        db.transaction(
            tx => {
                tx.executeSql(`SELECT * FROM friend_list${userUid} WHERE isFriend = 1`, [], (_, { rows }) => {
                    let dataArr =  rows['_array'],
                        rtnArr = [];
                    for (let i = 0; i <dataArr.length;i++){
                        rtnArr.push({
                            avatar:dataArr[i].avatarUrl,
                            key:dataArr[i].userId,
                            title:dataArr[i].username,
                            selected: false,
                        });
                    }
                    this.setState({ sqlRows: rtnArr });
                });
            },
            null,
            this.update
        )

    }



    render(){
        const { sqlRows} = this.state;
        console.log(sqlRows);

        return(
            <ScrollView style={styles.container}>
                {(sqlRows===null || sqlRows.length ===0) ?
                    <Text>Add some friends and come back</Text>
                    :
                    (<View style={{marginTop:30}}>
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