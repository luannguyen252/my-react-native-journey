import React, { Component } from 'react'
import InstaFeed from '../screens/InstaFeed'; 
import ImagePicker from '../screens/ImagePicker';
import InstaDetails from "../screens/InstaDetails";
import Profile from '../screens/Profile';
import { createStackNavigator, createBottomTabNavigator, TabBarBottom } from 'react-navigation'
import config, { printLog } from '../config';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class BaseComponent extends Component {

    constructor(props){
        super(props) 
    }
    
    HomeStack = createStackNavigator({
        page1: InstaFeed,
        page2: InstaDetails,
    }, {
            navigationOptions: {
                headerTitleStyle: {
                    textAlign: 'center', alignSelf: 'center', fontStyle: config.constants.headerFontStyle,
                    fontSize: config.constants.headerFontSize, color: config.constants.headerFontColor, width: "105%",
                    fontFamily: config.constants.headerFontFamily, fontWeight: config.constants.headerFontWeight
                },
                headerStyle: { 
                    backgroundColor: config.colors.appColor, 
                },
            },
        });

    ImagePickerStack = createStackNavigator({
        page1: ImagePicker,
    }, {
            navigationOptions: {
                headerTitleStyle: {
                    textAlign: 'center', alignSelf: 'center', fontStyle: config.constants.headerFontStyle,
                    fontSize: config.constants.headerFontSize, color: config.constants.headerFontColor, width: "105%",
                    fontFamily: config.constants.headerFontFamily, fontWeight: config.constants.headerFontWeight
                },
                headerStyle: {
                    backgroundColor: config.colors.appColor,
                },
            },
        });

    ProfileStack = createStackNavigator({
        page1: Profile,
        page2: InstaDetails,
    }, {
            navigationOptions: {
                headerTitleStyle: {
                    textAlign: 'center', alignSelf: 'center', fontStyle: config.constants.headerFontStyle,
                    fontSize: config.constants.headerFontSize, color: config.constants.headerFontColor,flex: 1,
                    fontFamily: config.constants.headerFontFamily, fontWeight: config.constants.headerFontWeight
                },
                headerStyle: {
                    backgroundColor: config.colors.appColor,
                },
            },
        }); 

    TabStack = createBottomTabNavigator({
        home: this.HomeStack,
        camera: this.ImagePickerStack,
        profile: this.ProfileStack
    }, {
        navigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, tintColor }) => {
                const { routeName } = navigation.state;
                let iconName, droidName;
                if (routeName === 'home') {
                    iconName = `ios-flame${focused ? '' : '-outline'}`;
                    droidName = `md-flame`;
                } else if (routeName === 'camera') {
                    iconName = `ios-image${focused ? '' : '-outline'}`;
                    droidName = `md-image`;
                } else if (routeName === 'profile') {
                    iconName = `ios-contact${focused ? '' : '-outline'}`;
                    droidName = `md-contact`;
                }

                // You can return any component that you like here! We usually use an
                // icon component from react-native-vector-icons
                return <Ionicons name={droidName} size={35} color={tintColor} />;
            }
        }),
        tabBarPosition: 'bottom',
        tabBarOptions: {
            showLabel: false,
            activeTintColor: config.colors.appColor,
            inactiveTintColor: config.colors.tabInActiveColor,
            indicatorStyle: {
                backgroundColor: 'red',
                borderColor: 'red',
                borderWidth: 40
            },
            style: {
                backgroundColor: config.colors.tabBgColor,
                height: 55
            }
        },
        animationEnabled: true,
        swipeEnabled: true,
    }
    );
    

    
}