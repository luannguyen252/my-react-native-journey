import React from 'react';
import {View, Image, Text, SafeAreaView, StyleSheet, Alert} from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import {ifIphoneX} from "react-native-iphone-x-helper";
import firebase from "firebase/index";

const homePlace = { description: 'Home', geometry: { location: { lat: 48.8152937, lng: 2.4597668 } }};
const workPlace = { description: 'Work', geometry: { location: { lat: 48.8496818, lng: 2.2940881 } }};


export default class GooglePlacesInput extends React.Component{

    static navigationOptions = {
        header: null
    };
    // static navigationOptions = ({ navigation }) => {
    //     const params = navigation.state.params || {};
    //
    //     return {
    //         // Correct Header Button modifyzationn: https://reactnavigation.org/docs/header-buttons.html
    //         headerRight:null,
    //         headerLeft:null,
    //         headerStyle:{backgroundColor:'#EC7063'}
    //         //headerStyle:{ position: 'absolute', backgroundColor: 'transparent', zIndex: 100, top: 0, left: 0, right: 0, headerLeft:null, boarderBottomWidth: 0}
    //     };
    // };

    constructor(props){
        super(props);
        let user = firebase.auth().currentUser;
        this.state={
            citySearchMode:props.navigation.state.params.citySearchMode,
            userUid:user.uid,
        }
    }

    render(){
        const {citySearchMode} = this.state;
        return(
            <View style={styles.container}>
                <View style={ifIphoneX({height:44},{height:20})}/>
                <GooglePlacesAutocomplete
                    placeholder={citySearchMode? 'Search the city you live' : 'Search the place you like to go'}
                    minLength={1} // minimum length of text to search
                    autoFocus={true}
                    returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
                    listViewDisplayed='auto'    // true/false/undefined
                    fetchDetails={true}
                    renderDescription={row => row.description} // custom description render
                    onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                        console.log(data, details);
                        if(citySearchMode){
                            let location = data.description;
                            let userRef = firebase.firestore().collection('Users').doc(this.state.userUid);
                            userRef.update({location:location}).then(()=>{
                                this.props.navigation.state.params.getThisUserData();
                                this.props.navigation.state.params.setLocation(location);
                            }).catch((error)=>{
                                Alert.alert('Error', error);
                            })
                        } else {
                            let placeName = details.name;
                            let placeAddress = details.vicinity;
                            let placeCoordinate = details.geometry.location;
                            let placeId = details.place_id;
                            let placeCoverPhotoReference = '';
                            if(details.photos && details.photos[0].photo_reference){
                                placeCoverPhotoReference=details.photos[0].photo_reference;
                            }
                            this.props.navigation.state.params.setPlaceDetail({placeName, placeAddress, placeCoordinate, placeId, placeCoverPhotoReference})
                        }
                        this.props.navigation.goBack();
                    }}

                    getDefaultValue={() => ''}

                    query={{
                        // available options: https://developers.google.com/places/web-service/autocomplete
                        key: 'AIzaSyCw_VwOF6hmY5yri8OpqOr9sCzTTT7JKiU',
                        language: 'en', // language of the results
                        types: citySearchMode ? '(cities)' : '' // default: 'geocode'
                    }}

                    styles={{
                        textInputContainer: {
                            width: '100%'
                        },
                        description: {
                            fontWeight: 'bold'
                        },
                        predefinedPlacesDescription: {
                            color: '#1faadb'
                        }
                    }}

                    // currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
                    // currentLocationLabel="Current location"
                    nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
                    GoogleReverseGeocodingQuery={{
                        // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
                    }}
                    GooglePlacesSearchQuery={{
                        // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                        rankby: 'distance',
                        //types: 'food'
                    }}

                    //filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
                    //predefinedPlaces={[homePlace, workPlace]}

                    debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
                    //renderLeftButton={()  => <Image source={require('path/custom/left-icon')} />}
                    renderRightButton={() =>
                        <View  style={{justifyContent:'center', alignItems: 'center'}}>
                            <Text style={{color:'blue'}} onPress={() => this.props.navigation.goBack()}>Cancel </Text>
                        </View>}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});