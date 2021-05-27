import React from 'react';
import {
    View,
    Animated,
    Image,
    Dimensions,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import Card from './Card';

export default function SwipeableCard({
    onButton1Press,
    onButton2Press,
    onButton3Press,
}) {
    const screen = Dimensions.get('window');
    const halfScreenWidth = screen.width / 2;
    const animVal = new Animated.Value(0);
    const bubblesContainerWidth = halfScreenWidth;

    return (
        <View>
            <Animated.ScrollView
                style={styles.scrollView}
                horizontal
                showsHorizontalScrollIndicator={false}
                snapToInterval={halfScreenWidth - 20}
                decelerationRate="fast"
                scrollEventThrottle={1}
                onScroll={Animated.event(
                    [
                        {
                            nativeEvent: {
                                contentOffset: { x: animVal },
                            },
                        },
                    ],
                    { useNativeDriver: true },
                )}
            >
                <Animated.View
                    style={[
                        styles.bubblesContainer,
                        {
                            width: bubblesContainerWidth,
                            left: halfScreenWidth,
                            transform: [
                                {
                                    translateX: animVal.interpolate({
                                        inputRange: [0, halfScreenWidth],
                                        outputRange: [0, halfScreenWidth],
                                        extrapolate: 'clamp',
                                    }),
                                },
                            ],
                        },
                    ]}
                >
                    <TouchableOpacity onPress={onButton1Press}>
                        <Animated.View
                            style={[
                                styles.bubble,
                                {
                                    transform: [
                                        {
                                            scale: animVal.interpolate({
                                                inputRange: [120, 150],
                                                outputRange: [0, 1],
                                                extrapolate: 'clamp',
                                            }),
                                        },
                                    ],
                                },
                            ]}
                        >
                            <Image source={require('../assets/play.png')} />
                        </Animated.View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onButton2Press}>
                        <Animated.View
                            style={[
                                styles.bubble,
                                {
                                    backgroundColor: '#E411D8',
                                    transform: [
                                        {
                                            scale: animVal.interpolate({
                                                inputRange: [48, 96],
                                                outputRange: [0, 1],
                                                extrapolate: 'clamp',
                                            }),
                                        },
                                    ],
                                },
                            ]}
                        >
                            <Image source={require('../assets/bookmark.png')} />
                        </Animated.View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onButton3Press}>
                        <Animated.View
                            style={[
                                styles.bubble,
                                {
                                    backgroundColor: '#FF8D04',
                                    transform: [
                                        {
                                            scale: animVal.interpolate({
                                                inputRange: [0, 80],
                                                outputRange: [0, 1],
                                                extrapolate: 'clamp',
                                            }),
                                        },
                                    ],
                                },
                            ]}
                        >
                            <Image source={require('../assets/share.png')} />
                        </Animated.View>
                    </TouchableOpacity>
                </Animated.View>
                <Card />
                <View
                    pointerEvents="none"
                    style={{
                        width: halfScreenWidth - 20,
                        backgroundColor: 'transparent',
                    }}
                />
            </Animated.ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    scrollView: { paddingTop: 20 },
    bubblesContainer: {
        position: 'absolute',
        top: 0,
        height: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    bubble: {
        width: 52,
        height: 52,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 4,
        borderRadius: 32,
        backgroundColor: '#2069F2',
    },
});
