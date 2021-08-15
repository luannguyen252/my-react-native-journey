import { Notifications } from 'expo';
import React from 'react';
import { StackNavigator } from 'react-navigation';
import MeScreen from '../screens/main/MeScreen';
import CreateScreen from '../screens/main/CreateScreen';
import InvitationRangeScreen from '../screens/main/create/InvitationRangeScreen';
import ParticipantsManagementScreen from "../screens/main/create/ParticipantsManagementScreen";

export default CreateNavigator = StackNavigator(
    {
        Create: {
            screen: CreateScreen,
        },
        InvitationRange: {
            screen: InvitationRangeScreen,
        },
        ParticipantsManagement:{
            screen: ParticipantsManagementScreen,
        }
    },
    {
        initialRouteName: 'Create',
        headerMode:'none',
    },
);


