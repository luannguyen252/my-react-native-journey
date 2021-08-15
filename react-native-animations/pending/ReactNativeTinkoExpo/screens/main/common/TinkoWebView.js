import React, {Component} from 'react';
import {WebView, View, Platform} from 'react-native';
import {ifIphoneX} from "react-native-iphone-x-helper";
import {Header} from 'react-native-elements';

export default class TinkoWebView extends Component {
    static navigationOptions = {header:null};
    render() {
        return (
            <View style={{flex:1}}>
                <Header
                    leftComponent={{ icon: 'chevron-left', color: '#fff', onPress:()=>this.props.navigation.goBack()}}
                    centerComponent={{ text: this.props.navigation.state.params.title, style: { fontSize:18, fontFamily:'regular', color: '#fff' } }}
                    outerContainerStyles={Platform.OS === 'android'? {height:68} : ifIphoneX({height:88})}
                />
                <WebView
                    source={{uri: this.props.navigation.state.params.uri}}
                />
            </View>
        );
    }
}