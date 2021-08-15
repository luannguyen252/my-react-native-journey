import React from 'react';
import { Platform, View, Image, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TabNavigator, TabBarBottom, StackNavigator } from 'react-navigation';

import Colors from '../constants/Colors';

import LinksScreen from '../screens/main/LinksScreen';
import SettingsScreen from '../screens/main/second/SettingsScreen';
import TinkoTabNavigator from './TinkoTabNavigator';
import CreateScreen from '../screens/main/CreateScreen';
import GooglePlacesInputScreen from '../screens/main/create/GooglePlacesInput';
import CreateNavigator from './CreateNavigator';
import UserDetailScreen from '../screens/main/common/UserDetailOverlay';
import MeScreen from "../screens/main/MeScreen";
import PrivateChatScreen from '../screens/main/common/PrivateChatScreen';
import GroupChatScreen from '../screens/main/common/GroupChatScreen';
import IconBadge from '../modules/react-native-icon-badge';
import Setting from '../screens/main/second/SettingsScreen';
import TinkoWebView from '../screens/main/common/TinkoWebView';
import NewFriendsScreen from '../screens/main/second/NewFriendsScreen';
import TinkoDetailTabNavigator from './TinkoDetailTabNavigator'
import ParticipantsInviteScreen from "../screens/main/create/ParticipantsInviteScreen";
import ParticipantsManagementScreen from "../screens/main/create/ParticipantsManagementScreen";
import AvatarUploadScreen from "../screens/main/settings/AvatarUploadScreen";
import UpdateUsernameScreen from "../screens/main/settings/UpdateUsernameScreen";
import TinkoDetailScreen from '../screens/main/tinko/TinkoDetailScreen';
import MyTinkosScreen from "../screens/main/second/MyTinkosScreen";
import LinkPhoneNumber from "../screens/main/settings/LinkPhoneNumber";
import BlackListScreen from '../screens/main/settings/BlackListScreen';

const MainTabNavigator = TabNavigator(
  {
    Home: {
      screen: TinkoTabNavigator,
    },
    Links: {
      screen: LinksScreen,
        header: null,
    },
    Settings: {
      screen: MeScreen,
    },
  },
  {
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
    headerMode: 'none',
    headerVisible: false,
      lazy:false
  }
);




const MainTabNavigatorWithDetailScreens = StackNavigator(
    {
        Main:{
            screen: MainTabNavigator,
        },
        TinkoDetail:{
            screen: TinkoDetailTabNavigator,
        },
        PrivateChatPage: {
            screen: PrivateChatScreen,
        },
        GroupChatPage: {
            screen: GroupChatScreen,
        },
        Setting: {
            screen:Setting,
        },
        TinkoWebView:{
            screen: TinkoWebView,
        },
        NewFriends:{
            screen:NewFriendsScreen
        }
        ,
        AvatarUpload:{
            screen:AvatarUploadScreen
        },
        UpdateUsername:{
            screen:UpdateUsernameScreen
        },
        TheTinkoDetailScreen:{
            screen: TinkoDetailScreen,
        },
        MyTinkos:{
            screen:MyTinkosScreen,
        },
        LinkPhoneNumber:{
            screen: LinkPhoneNumber,
        },
        BlackListScreen:{
            screen:BlackListScreen,
        }
    },
    { headerMode: 'none' }
);

export default StackNavigator(
    {
        MainWithDetails: {
            screen: MainTabNavigatorWithDetailScreens,
        },
        Create: {
            screen: CreateNavigator,
        },
        GooglePlacesAutocomplete: {
            screen: GooglePlacesInputScreen,
        },
        ParticipantsInvite:{
            screen: ParticipantsInviteScreen,
        }
    },
    {
        mode: 'modal',
        headerMode:'screen'
    }
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});