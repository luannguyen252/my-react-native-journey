import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import MapView, { Polyline, Marker } from 'react-native-maps';
import { useColorScheme } from 'react-native-appearance';

const { width } = Dimensions.get('window');

export default function Card() {
    const colorScheme = useColorScheme();
    const themeTextStyle =
        colorScheme === 'light' ? styles.lightThemeText : styles.darkThemeText;
    const backgroundColorStyle =
        colorScheme === 'light' ? styles.lightContainer : styles.darkContainer;

    return (
        <View
            style={[
                {
                    width: width - 40,
                    marginHorizontal: 20,
                    borderRadius: 20,
                    borderWidth: 4,
                    borderColor:
                        colorScheme === 'light'
                            ? 'rgba(0,0,0,0.15)'
                            : 'rgba(255,255,255,0.15)',
                },
                backgroundColorStyle,
            ]}
        >
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: 16,
                }}
            >
                <Image
                    source={require('../assets/ct.jpg')}
                    style={{
                        width: 64,
                        height: 64,
                        marginRight: 8,
                        borderRadius: 32,
                    }}
                />
                <View>
                    <Text
                        style={[
                            themeTextStyle,
                            {
                                fontSize: 18,
                                fontWeight: '600',
                            },
                        ]}
                    >
                        Elon Musk
                    </Text>
                    <Text
                        style={[
                            themeTextStyle,
                            {
                                fontSize: 15,
                            },
                        ]}
                    >
                        8:19 AM to 8:58 AM
                    </Text>
                </View>
            </View>
            <View
                style={{
                    overflow: 'hidden',
                    borderBottomLeftRadius: 16,
                    borderBottomRightRadius: 16,
                }}
            >
                <MapView
                    scrollEnabled={false}
                    initialRegion={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                    style={{ width: width - 40, height: 160 }}
                >
                    <Polyline
                        strokeColor="#E411D8"
                        strokeWidth={6}
                        coordinates={[
                            {
                                latitude: 37.7734153,
                                longitude: -122.4577787,
                            },
                            {
                                latitude: 37.7948605,
                                longitude: -122.4596065,
                            },
                            {
                                latitude: 37.8025259,
                                longitude: -122.4351431,
                            },
                        ]}
                    />
                    <Marker
                        pinColor="#2069F2"
                        coordinate={{
                            latitude: 37.7734153,
                            longitude: -122.4577787,
                        }}
                    />
                    <Marker
                        pinColor="#2069F2"
                        coordinate={{
                            latitude: 37.8025259,
                            longitude: -122.4351431,
                        }}
                    />
                </MapView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    lightContainer: {
        backgroundColor: '#fff',
    },
    darkContainer: {
        backgroundColor: '#111214',
    },

    lightThemeText: {
        color: '#242C40',
    },
    darkThemeText: {
        color: '#D0D0C0',
    },
});
