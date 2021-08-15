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

export default class InvitationRangeScreen extends React.Component{

    static navigationOptions = ({ navigation }) => {
        const params = navigation.state.params || {};

        return {
            // Correct Header Button modifyzationn: https://reactnavigation.org/docs/header-buttons.html
            headerTitle:'Participants',
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
            meetId:props.navigation.state.params.meetId,
            userUid:uid,
            participatingUsersList:props.navigation.state.params.participatingUsersList(),
            participatingUsersData:[],
        };
        this.renderRightElement=this.renderRightElement.bind(this);
    }

    componentDidMount(){
        console.log(this.state.userUid);
        this.getParticipantsData();
        this.props.navigation.setParams({
            back:this.onBackButtonPressed.bind(this)
        });
    }

   async getParticipantsData(){
        const {participatingUsersList} = this.state;
        // participatingUsersList.map((uid) => {
        //     getUserData(uid).fork(
        //         (error) => {
        //             console.log(error);
        //         },
        //         (userData) => {
        //             this.setState((state)=>{
        //                 let listData=state.participatingUsersData;
        //                 listData.push(userData);
        //                 return {participatingUsersData:listData};
        //             })
        //         }
        //     );
        // })
        var participatingUsersData = [];
        await participatingUsersList.reduce((p,e,i) => p.then(async ()=> {
            //console.log(p, e, i);
            let userUid = e;

            await getUserDataFromDatabase(userUid,
                (userData) => {
                    //console.log(userData);
                    participatingUsersData.push(userData);
                },
                (error) => {
                    Alert.alert('Error', error);
                });
        }),Promise.resolve());

        this.setState({participatingUsersData});
    }


    onBackButtonPressed(){
        let bodyData ={meetId:this.state.meetId};
        getPostRequest('checkMeetStatus', bodyData,
            () => {
            },
            (error) => {
                console.log(error);
                Alert.alert('error', error);
            });

        this.props.navigation.goBack();
    }


    deleteUser(userData){
        let participatingUsersList = this.props.navigation.state.params.participatingUsersList();
        _.pull(participatingUsersList,userData.uid);
        let meetRef = firestoreDB().collection("Meets").doc(this.state.meetId);
        meetRef.update({
            [`participatingUsersList.${userData.uid}`]:firebase.firestore.FieldValue.delete(),
            participatingUsersArray:participatingUsersList
        }).then(()=>{
            this.setState((state)=>{
                let participatingUsersData = state.participatingUsersData;
                _.pull(participatingUsersData, userData);
                return {participatingUsersData, participatingUsersList}
            });
        }).catch((error)=>{
            Alert.alert('Error', error);
        });
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
        const {participatingUsersData, userUid} = this.state;
        console.log(participatingUsersData);
        return(
            <ScrollView style={styles.container}>
                {
                    participatingUsersData.map((userData, i) => (
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