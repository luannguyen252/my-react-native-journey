import React from 'react';
import {StyleSheet, View, ScrollView, Platform, SafeAreaView, Text} from 'react-native';
import {Header, StackNavigator, TabBarBottom, TabNavigator} from 'react-navigation';
import ActionButton from 'react-native-action-button';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import Swiper from 'react-native-swiper';

import DiscoverScreen from '../screens/main/DiscoverScreen';
import TinkoScreen from '../screens/main/TinkoScreen'
import TinkoDetailScreen from "../screens/main/tinko/TinkoDetailScreen";
import LinksScreen from "../screens/main/LinksScreen";
import Colors from "../constants/Colors";
import IconBadge from '../modules/react-native-icon-badge'
import ExpressPostOverlay from "../screens/main/create/ExpressPostOverlay";


const TinkoTabNavigator = TabNavigator(
    {
        Tinko: {
            screen: TinkoScreen,
        },
        Discover: {
            screen: DiscoverScreen,
        },

    },
    {

        //tabBarOptions:{style:{height:0, bottom:-30}, showLabel:false, },
        tabBarComponent: () => null,
        //tabBarPosition: 'bottom',
        animationEnabled: true,
        swipeEnabled: true,
        headerMode: 'none',
        headerVisible: false,
        lazy:true
    }
);


export default class TinkoTabNavigatorScreen extends React.Component {

    constructor(props){
        super(props);
        //console.log(props);
        this.state = {
            headerTitlr:'Tinko',
            stateIndex:0,
        }
    }

    static navigationOptions = ({ navigation }) => {
        const params = navigation.state.params || {};

        return {

            title: 'Tinko',

            tabBarIcon: ({ tintColor, focused }) =>
                <IconBadge
                    MainElement={
                        <View style={{height:30, width:30, alignItems: 'center',
                            justifyContent: 'center',}}>
                            <Ionicons
                                name={focused ? 'ios-home' : 'ios-home-outline'}
                                size={30}
                                style={{ marginBottom: -3 }}
                                color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
                            />
                        </View>

                    }
                    IconBadgeStyle={
                        {width:10, height:10, backgroundColor: 'red'}
                    }
                    Hidden={params.badgeHidden}
                />,


            headerTitle:params.tinkoHeaderTitle,
            headerRight:(params.stateIndex===0?
                <MaterialIcons.Button
                    name="sort" size={20} color="black" style={{marginRight:26}} backgroundColor="transparent"
                    onPress = {() => params.sortButton()}/>
                    :null
            ),
            //headerRight:params.tinkoHeaderTitle,

            headerStyle:{ position: 'absolute',
                backgroundColor: 'transparent',
                zIndex: 10, top: 0, left: 0, right: 0,
                borderBottomWidth: 0,
                borderBottomColor: 'transparent',
                shadowColor: 'transparent',
                elevation:0,
                shadowOpacity: 0 }
        };
    };

    //static navigationOptions = {title:'Tinko'};
    //static  navigationOptions = {header:null};
    componentDidMount(){
        this.props.navigation.setParams({
            tinkoHeaderTitle:this.tinkoHeaderTitle.bind(this),
            sortButton:this.onSortButtonPressed.bind(this),
            stateIndex:this.state.stateIndex,
            badgeHidden:true
        });
    }

    componentWillUnmount(){
        console.log("componentWillUnmount");
    }

    // showBadge(){
    //     this.props.navigation.setParams({
    //         badgeHidden:false
    //     });
    // }

    onSortButtonPressed(){
        // console.log("onSortButtonPressed")
        // console.log(this.tinkoRef);
        this.tinkoRef.onSortButtonPressed();
    }

    tinkoHeaderTitle(){
        const {stateIndex}= this.state;
        if(stateIndex===0){
            return (
                <View style={{flexDirection:'row'}}>
                    <Text style={{color:'black', fontSize:22, fontFamily:'bold'}}>  TINKO </Text>
                    <Text  style={{color:'black', fontSize:20, fontFamily:'bold'}}> | </Text>
                    <Text
                        style={{color:'black', fontSize:20, fontFamily:'regular'}}
                        onPress={()=> this.tinkoRef.props.navigation.navigate('Discover')}
                    > Discover</Text>
                </View>
            );
        } else {
            return (
                <View style={{flexDirection:'row'}}>
                    <Text
                        style={{color:'black', fontSize:22, fontFamily:'regular'}}
                        onPress={()=>this.discoverRef.props.navigation.navigate('Tinko')}
                    >    TINKO </Text>
                    <Text  style={{color:'black', fontSize:20, fontFamily:'bold'}}> | </Text>
                    <Text  style={{color:'black', fontSize:22, fontFamily:'bold'}}> Discover</Text>
                </View>
            );
        }
    }

    onNavStateChnage(navState){
        let index = navState.index;
        this.setState({stateIndex: index}, () => {
            this.props.navigation.setParams({tinkoHeaderTitle:this.tinkoHeaderTitle.bind(this), stateIndex:this.state.stateIndex});
        });

    }

    getTinkoRef = ref => (this.tinkoRef = ref);
    getDiscoverRef = ref => (this.discoverRef = ref);

    openCreateModel(){
        this.props.navigation.navigate('Create',{tinkoGetMeets:this.tinkoRef.getMeets});
    }

    render() {
        return (
            <View style={styles.container}>

                <TinkoTabNavigator
                    //onRef={ref => (this.tinkoNav = ref)}
                    onNavigationStateChange={(prevState, newState) => this.onNavStateChnage(newState)}
                    screenProps={{getTinkoRef:this.getTinkoRef,getDiscoverRef:this.getDiscoverRef,openCreateModel:this.openCreateModel.bind(this),...this.props}}
                />

                <ActionButton buttonColor="#3498db">
                    <ActionButton.Item buttonColor='#9b59b6' title="Express Post" onPress={() => this.expressPostOverlay.showExpressPostOverlay()}>
                        <Ionicons name="md-done-all" style={styles.actionButtonIcon} />
                    </ActionButton.Item>
                    <ActionButton.Item buttonColor='#1abc9c' title="Create a Tinko" onPress={() => this.props.navigation.navigate('Create',{tinkoGetMeets:this.tinkoRef.getMeets})}>
                        <Ionicons name="md-create" style={styles.actionButtonIcon} />
                    </ActionButton.Item>
                </ActionButton>
                <ExpressPostOverlay
                    tinkoGetMeets={() => this.tinkoRef.getMeets()}
                    onRef={ref => this.expressPostOverlay = ref}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
    },
});

