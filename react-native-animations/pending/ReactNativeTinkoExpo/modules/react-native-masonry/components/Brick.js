import React, { Component } from 'react';
import {Text, View, Image, TouchableHighlight, TouchableOpacity, StyleSheet, Dimensions} from 'react-native';
import {getAvatarPlaceholder, getImageSource} from "../../CommonUtility";
import { LinearGradient } from 'expo';
import {Image as CacheImage} from "react-native-expo-image-cache";

const SCREEN_WIDTH = Dimensions.get('window').width;

let topHeight = 0;
let botHeight = 0;

export default function Brick (props) {
	// Avoid margins for first element
	const image =_getTouchableUnit(props, props.gutter);
	//const footer = (props.renderFooter) ? props.renderFooter(props.data) : null;
	//const header = (props.renderHeader) ? props.renderHeader(props.data) : null;
    //console.log(props);
    const data = props.data;
	return (
		<View key={props.brickKey} >
            <TouchableOpacity
                key='brick-footer'
                style={styles.headerTop}
                onPress={data.onPress ? () => data.onPress() : () => props.navigateToDetail(data.meetId)}
                onLayout={(e)=> topHeight = e.nativeEvent.layout.height}
            >
                <LinearGradient
                    colors={['rgba(0,0,0,0.3)', 'transparent']}
                    style={{
                        borderRadius:10,
                        marginTop:props.gutter,
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        top: 0,
                        width:props.width,
                        height: topHeight,
                    }}
                />
                <CacheImage
                    //preview={getAvatarPlaceholder}
                    uri={data.creator.photoURL}
                    //source={{uri:data.creator.photoURL}}
                    style={styles.userPic}/>
                <View style={{marginTop: 5, width:SCREEN_WIDTH/2-10-50}}>
                    <Text style={styles.userName}>{data.creator.username}</Text>
                    <Text style={styles.postTime}>{data.postTime}</Text>
                </View>
            </TouchableOpacity>
		  {image}
            <TouchableOpacity key='brick-header' style={styles.footer}
                              onPress={data.onPress ? () => data.onPress() : () => props.navigateToDetail(data.meetId)}
                              onLayout = {(e) => botHeight = e.nativeEvent.layout.height}
            >
                <LinearGradient
                    colors={['transparent', 'rgba(0,0,0,0.3)']}
                    style={{
                        borderRadius:10,
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        bottom:0,
                        width:props.width,
                        height: botHeight,
                    }}
                />
                <Text style={styles.footerTitle}>{data.title}</Text>
                <Text style={styles.footerTime}>{data.startTime}</Text>
                <Text style={styles.footerPlaceName}>{data.placeName}</Text>
            </TouchableOpacity>
		</View>
	);
}

// _getImageTag :: Image, Gutter -> ImageTag
export function _getImageTag (image, gutter = 0) {
	// const imageProps = {
	// 	key: props.uri,
	// 	source: {
	// 		uri: props.uri
	// 	},
	// 	resizeMethod: 'auto',
	// 	style: {
	// 		width: props.width,
	// 		height: props.height,
	// 		marginTop: gutter,
	// 		...props.imageContainerStyle,
	// 	}
	// };


	//console.log(image);
    let coverImageUri = image.data.coverImageUri;
    if(coverImageUri){
        return (
            <Image
                key={image.data.meetId}
                resizeMethod={'auto'}
                source={{uri:coverImageUri}}
                style={{ borderRadius:10, width: image.width, height: image.height, marginTop: gutter, ...image.imageContainerStyle }}
            />
        )
    }else{
        let tag;
        if(image.data.tags){
            tag = image.data.tags[0];
        } else {
            tag='';
        }
        return (
            <Image
                key={image.data.meetId}
                resizeMethod={'auto'}
                source={getImageSource(tag)}
                style={{ borderRadius:10, width: image.width, height: image.height, marginTop: gutter, ...image.imageContainerStyle }}
            />
        )
    }


}

// _getTouchableUnit :: Image, Number -> TouchableTag
export function _getTouchableUnit (props, gutter = 0) {
    //console.log(props);
	return (
		<TouchableHighlight
          key={props.data.meetId}
          onPress={props.data.onPress ? () => props.data.onPress() : () => props.navigateToDetail(props.data.meetId)}>
          <View>
            { _getImageTag(props, gutter) }
          </View>
		</TouchableHighlight>
	);
}

const styles = StyleSheet.create({
    headerTop: {
        flexDirection: 'row',
        padding: 5,
        //alignItems: 'center',
        backgroundColor: 'transparent',
        position: 'absolute',
        zIndex: 50,
    },
    userPic: {
        height: 45,
        width: 45,
        borderRadius: 22,
        marginRight: 10,
        marginTop:10,
    },
    userName: {
        fontSize: 20,
        color:'white',
        fontWeight: 'bold',
    },
    postTime:{
        color:'white',
    },
    footerTitle:{
        fontSize: 25,
        color:'white',
        fontWeight:'bold',
    },
    footerTime:{
        fontSize:18,
        color:'white',
        fontWeight:'bold',
    },
    footerPlaceName:{
        fontSize:18,
        color:'white',
        fontWeight:'bold',
    },
    footer:{
        flex:1,
        backgroundColor: 'transparent',
        padding: 5,
        paddingRight: 9,
        paddingLeft: 9,
        zIndex: 50,
        position: 'absolute',
        bottom: 0

    }

});