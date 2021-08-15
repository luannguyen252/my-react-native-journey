import { Notifications } from 'expo';
import React from 'react';
import { StackNavigator } from 'react-navigation';
import SignInScreen from '../screens/login/SignInScreen';
import RegisterScreen from '../screens/login/RegisterScreen';
import TinkoWebView from "../screens/main/common/TinkoWebView";

export default LoginStackNavigator = StackNavigator(
    {
        SignIn: {
            screen:SignInScreen,
        },
        Register:{
            screen:RegisterScreen,
            mode:'modal'
        },
        TinkoWebView:{
            screen: TinkoWebView,
        },
    },{
        initialRouteName: 'SignIn',
        transitionConfig : () => ({
            transitionSpec: {
                duration: 0,
            },
        }),
    }, {
        headerMode:'screen',
        navigationOptions: {
            headerVisible: false,
        }
    }, {
    }
);

// export default class LoginNavigator extends React.Component {
//     constructor(props){
//         super(props);
//         console.log(props);
//     }
//     render() {
//         return <LoginStackNavigator />;
//     }
//
// }
