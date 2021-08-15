import React, {
    Component
} from 'react'

import {
    View,Text,StyleSheet
} from 'react-native'
import Expo, { SQLite } from 'expo';
import * as firebase from 'firebase';
import { ListItem } from 'react-native-elements';
import { Entypo, SimpleLineIcons } from '@expo/vector-icons';
import Colors from "../constants/Colors";


require("firebase/firestore");

const db = SQLite.openDatabase('db.db');

let friendList = [];

export default class FriendListView extends Component {

    constructor(props){
        super(props);
        let user = firebase.auth().currentUser;
        let uid = user.uid;
        this.getSql = this.getSql.bind(this);
        props.onRef(this);
        this.state = {
            userUid:uid,
            sqlRows: [],
            rows: [],
            selectedUid:'',
            overlayIsVisible:false,
        };
    }

    componentDidMount(){
        this.getSql();
    }

    getSql(){
        const { userUid } = this.state;
        //console.log('friendsListView userUid', userUid);
        db.transaction(
            tx => {
                tx.executeSql(`select * from friend_list${userUid} WHERE isFriend = 1`, [], (_, { rows }) => {
                    let dataArr =  rows['_array'],
                        rtnArr = [];
                    console.log(dataArr);
                    for (let i = 0; i <dataArr.length;i++){
                        rtnArr.push({
                            photoURL:dataArr[i].avatarUrl,
                            uid:dataArr[i].userId,
                            username:dataArr[i].username
                        });
                        friendList.push(dataArr[i].userId)
                    }
                    this.setState({
                        sqlRows: rtnArr
                    });
                    if(rtnArr.length===0){
                        this.props.isFriendsListNone(true);
                    }else{
                        this.props.isFriendsListNone(false);
                    }
                });
            },
            null,
            null
        )
    }


    goToDetailPage(uid){
        //console.log(key);
        //this.props.navigation.navigate('UserDetail', {uid:key});
        this.props.showThisUser(uid, this.props.navigation,this.updateUserDetail.bind(this));

    }


    updateUserDetail(){
        this.getSql();
    }

    render() {
        const{sqlRows} = this.state;

        return (
            <View>
                <View style={{width:"90%",marginTop:35,marginLeft:"5%"}}>
                    {sqlRows.map((data) => (
                        <ListItem
                            leftAvatar={{ rounded: true, size:40, source: { uri: data.photoURL } }}
                            key={data.uid}
                            title={data.username}
                            onPress={() => this.goToDetailPage(data.uid)}
                        />
                    ))}
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create(
    {
        separator:
            {
                height: 2,
                backgroundColor: 'rgba(0,0,0,0.5)',
                width: '100%'
            },

        text:
            {
                fontSize: 18,
                color: 'black',
                padding: 15
            }
    });