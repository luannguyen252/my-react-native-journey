import React from 'react';
import {Alert, View, StyleSheet, Text, Keyboard, Platform} from "react-native";
import firebase from "firebase";
import {Avatar, Header, ListItem, Button} from 'react-native-elements';
import {ifIphoneX} from "react-native-iphone-x-helper";
import {firestoreDB} from "../../../modules/CommonUtility";
import TextInput from '../../../components/TextInput';

export default class UpdateUsernameScreen extends React.Component {
    static navigationOptions = ({
        header:null,
    });

    constructor(props){
        super(props);
        let user = firebase.auth().currentUser;
        this.state={
            userUid:user.uid,
            username:props.navigation.state.params.username,
            oldUsername:props.navigation.state.params.username,
            buttonRefreshing:false
        };

    }

    onSubmitButtonPressed(){
        this.setState({buttonRefreshing:true});
        const {userUid, username} = this.state;
        let userRef = firestoreDB().collection('Users').doc(userUid);
        userRef.update({username:username}).then(()=>{
            this.props.navigation.state.params.getThisUserData();
            this.props.navigation.state.params.setUsername(username);
            this.props.navigation.goBack();
        }).catch((error)=>{
            Alert.alert('Error', error);
        })
    }


    render() {
        const {username, oldUsername, buttonRefreshing} = this.state;
        console.log(username);
        return (
            <View style={styles.container}>
                <Header
                    leftComponent={{ icon: 'chevron-left', color: '#fff', onPress:()=>this.props.navigation.goBack()}}
                    centerComponent={{ text: 'Username', style: { fontSize:18, fontFamily:'regular', color: '#fff' } }}
                    outerContainerStyles={Platform.OS === 'android'? {height:68} : ifIphoneX({height:88})}
                />

                <TextInput
                    style={{borderBottomColor:'transparent', borderBottomWidth:0, backgroundColor:'white',marginTop:50, width:'100%', height:40}}
                    placeholder='Username'
                    //containerStyle={{marginTop:50, width:'100%', backgroundColor:'white'}}
                    onChangeText ={username => {
                        console.log('onChangeText',username);
                        this.setState({username});
                    }}
                    value={username}
                    returnKeyType={'done'}
                    onSubmitEditing={() => Keyboard.dismiss()}
                    autoFocus={true}
                    maxLength={30}
                />

                {username !== oldUsername &&
                <Button
                    title='Submit'
                    onPress={() => this.onSubmitButtonPressed()}
                    containerStyle={{marginTop:50}}
                    loading={buttonRefreshing}
                    loadingProps={{size: 'large', color: 'white'}}
                />
                }

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //backgroundColor: 'white',
    },
    // listStyle:{
    //     // borderTopWidth: 0,
    //     // borderBottomWidth:0,
    //     // borderBottomColor:'#F8F9F9',
    //     paddingLeft:0,
    //     paddingRight:0,
    // },
    titleStyle:{
        fontFamily:'regular',
        fontSize:20,
    }

});