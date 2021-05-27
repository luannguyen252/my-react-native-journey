import React from 'react';
import {
    StyleSheet,
    SafeAreaView,
    StatusBar,
    ScrollView,
    Alert,
    Share,
} from 'react-native';
import { AppearanceProvider, useColorScheme } from 'react-native-appearance';
import SwipeableCard from './components/SwipeableCard';

function App() {
    const colorScheme = useColorScheme();
    const themeStatusBarStyle =
        colorScheme === 'light' ? 'dark-content' : 'light-content';
    const secondaryBackgroundColorStyle =
        colorScheme === 'light'
            ? styles.light2Container
            : styles.dark2Container;

    const onBookmark = () => {
        Alert.alert(
            'Trip Bookmarked',
            'Easily go back and view this trip in the Bookmark section of the app.',
        );
    };

    const onShare = async () => {
        await Share.share({
            message: 'bouncie://trips/3301yayeet13370',
        });
    };

    const onPlay = () => {
        Alert.alert('Trip Playback', 'New feature coming soon!');
    };

    return (
        <SafeAreaView style={[styles.container, secondaryBackgroundColorStyle]}>
            <StatusBar barStyle={themeStatusBarStyle} />
            <ScrollView>
                <SwipeableCard
                    onButton1Press={onPlay}
                    onButton2Press={onBookmark}
                    onButton3Press={onShare}
                />
            </ScrollView>
        </SafeAreaView>
    );
}

export default function AppContainer() {
    return (
        <AppearanceProvider>
            <App />
        </AppearanceProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    light2Container: {
        backgroundColor: '#efefef',
    },
    dark2Container: {
        backgroundColor: '#222',
    },
});
