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
import {firestoreDB, getPostRequest, getUserData, getUserDataFromDatabase} from "../../../modules/CommonUtility";
import {Ionicons} from '@expo/vector-icons'


const db = SQLite.openDatabase('db.db');

import * as firebase from "firebase";

export default class BlackListScreen extends React.Component{

    static navigationOptions = ({ navigation }) => {
        const params = navigation.state.params || {};

        return {
            // Correct Header Button modifyzationn: https://reactnavigation.org/docs/header-buttons.html
            headerTitle:'Black List',
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
        console.log(props);
        let user = firebase.auth().currentUser;
        let uid = user.uid;
        this.state = {
            userUid:uid,
            blackList:[]
        };
        this.renderRightElement=this.renderRightElement.bind(this);
    }

    componentDidMount(){
        console.log(this.state.userUid);
        this.getBlackListData();
        this.props.navigation.setParams({
            back:this.onBackButtonPressed.bind(this)
        });
    }

    getBlackListData(){
        let firebaseDb = firestoreDB();
        let docRef = firebaseDb.collection("Users").doc(this.state.userUid).collection("Black_List");
        docRef.get().then(async (querySnapshot) => {
            let usersData = [];
            let docs = querySnapshot.docs;
            await docs.reduce((p,doc,i) => p.then(async () => {
                console.log("BlackList: ", doc.data());
                let userUid = doc.id;
                await getUserDataFromDatabase(userUid,
                    (userData) => {
                        //console.log(userData);
                        usersData.push(userData);
                    },
                    (error) => {
                        Alert.alert('Error', error);
                    });
            }),Promise.resolve());
            this.setState({blackList:usersData})
        });

    }



    onBackButtonPressed(){

        this.props.navigation.goBack();
    }


    deleteUser(userData){
        let blackListUserRef = firestoreDB().collection("Users").doc(this.state.userUid).collection("Black_List").doc(userData.uid);
        blackListUserRef.delete();
        this.props.navigation.goBack();
    }


    renderRightElement({userData,i}){
        console.log(userData,i);
        if(userData.uid===this.state.userUid){
            return (null);
        } else {
            return (
                <Ionicons.Button
                    name='ios-remove-circle-outline'
                    size={26}
                    color={'red'}
                    backgroundColor={'transparent'}
                    onPress={()=>{
                        Alert.alert("Alert", "Are you sure to remove this user?",
                            [
                                {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                                {text: 'Yes', onPress: () => this.deleteUser(userData), style:"destructive"},
                            ]);
                    }}
                />
            )
        }
    }



    render(){
        const {blackList, userUid} = this.state;
        console.log(blackList);
        return(
            <ScrollView style={styles.container}>
                {
                    blackList.map((userData, i) => (
                        <ListItem
                            title={userData.username}
                            key={userData.uid}
                            leftAvatar={{ rounded: true, size:40, source: { uri: userData.photoURL } }}
                            rightElement={
                                <this.renderRightElement userData={userData} i={i}/>
                            }
                        />
                    ))
                }
            </ScrollView>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});