import Expo, { AppLoading, Asset, Font } from 'expo';
import React, { Component } from 'react';

import App from './app/components/app';
import { DEBUG_MODE } from './app/config/config';
import { Provider } from 'react-redux';
import { configureStore } from './app/util/configure-store';

if (!DEBUG_MODE) console.disableYellowBox = true;

export const store = configureStore();

export class AppContainer extends Component {

    constructor(props) {
        super(props);
        this.state = { appReady: false };

        this.cacheFonts = this.cacheFonts.bind(this);
        this.cacheImages = this.cacheImages.bind(this);
        this.loadAssetsAsync = this.loadAssetsAsync.bind(this);
    }

    componentWillMount() {
        this.loadAssetsAsync().then(() => this.setState({ appReady: true }));
    }

    loadAssetsAsync() {
        // const imageAssets = this.cacheImages([require('./app/assets/images/logo-white.png')]);

        const fontAssets = this.cacheFonts([
            { 'app-icons': require('./app/assets/fonts/app-icons/app-icons.ttf') },
            { 'bigital-smeven': require('./app/assets/fonts/bigital-smeven/bigital-smeven.ttf') },
            { 'nelvetica-beue': require('./app/assets/fonts/nelvetica-beue/nelvetica-beue.otf') },
            { 'nelvetica-beue-bold': require('./app/assets/fonts/nelvetica-beue/nelvetica-beue-bold.otf') },
            { 'nelvetica-beue-bold-italic': require('./app/assets/fonts/nelvetica-beue/nelvetica-beue-bold-italic.otf') },
            { 'nelvetica-beue-italic': require('./app/assets/fonts/nelvetica-beue/nelvetica-beue-italic.otf') },
            { 'nelvetica-beue-light': require('./app/assets/fonts/nelvetica-beue/nelvetica-beue-light.otf') },
            { 'nelvetica-beue-light-italic': require('./app/assets/fonts/nelvetica-beue/nelvetica-beue-light-italic.otf') },
            { 'nelvetica-beue-medium': require('./app/assets/fonts/nelvetica-beue/nelvetica-beue-medium.otf') },
            { 'nelvetica-beue-medium-italic': require('./app/assets/fonts/nelvetica-beue/nelvetica-beue-medium-italic.otf') },
            { 'nelvetica-beue-ultra-light': require('./app/assets/fonts/nelvetica-beue/nelvetica-beue-ultra-light.otf') },
            { 'nelvetica-beue-ultra-light-italic': require('./app/assets/fonts/nelvetica-beue/nelvetica-beue-ultra-light-italic.otf') }
        ]);

        return Promise.all([
            // ...imageAssets,
            ...fontAssets
        ]);
    }

    cacheFonts(fonts) { return fonts.map(font => Font.loadAsync(font)); }

    cacheImages(images) {
        return images.map(image => {
            if (typeof image === 'string') {
                return Image.prefetch(image);
            } else {
                return Asset.fromModule(image).downloadAsync();
            }
        });
    }

    render() {
        const { appReady } = this.state;

        if (!appReady) return (<AppLoading />);
        return (<Provider store={store}><App/></Provider>);
    }
}

Expo.registerRootComponent(AppContainer);
