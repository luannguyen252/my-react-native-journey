import Color from 'color';
import Device from 'react-native-device-detection';
import { Easing } from 'react-native';

export const { width, isAndroid, height } = Device;
export const largeDevice = width > 400;
export const smallDevice = width < 360;

export const checkDevice = () => {
    console.log('Device: ', Device);
    console.log('width: ', width);
};

const generateFontSize = size => {
    let fontSize = largeDevice ? size : smallDevice ? (size * .76) : (size * 0.9);
    if (isAndroid) fontSize = fontSize - 1;

    return Math.round(fontSize);
};

const generateLineHeight = height => {
    let lineHeight = largeDevice ? height : smallDevice ? (height * .66) : (height * 0.78);
    if (isAndroid) lineHeight = lineHeight - 1;

    return Math.round(lineHeight);
};

const generateSpacerSize = size => {
    let spacer = largeDevice ? size : smallDevice ? (size * .75) : (size * 0.9);
    if (isAndroid) spacer = Math.round(spacer * 0.9);

    return Math.round(spacer);
};

export const Variables = {
    animations: {
        durationBase: 600,
        defaultEasing: Easing.out(Easing.exp)
    },
    border: {
        radius: largeDevice ? 4 : 3,
        width: 1
    },
    colors: {
        black: Color('#000'),
        danger: Color('#ff094d'),
        facebook: Color('#3b5998'),
        googlePlus: Color('#f44336'),
        grey: Color('#333132').lighten(3.2),
        primary: Color('#262c42'),
        primaryDark: Color('#262c42').darken(0.1),
        primaryLight: Color('#262c42').lighten(0.3),
        quadrenary: Color('#ff66b2'),
        secondary: Color('#38f1e0'),
        success: Color('#18dc87'),
        tertiary: Color('#32a7ff'),
        twitter: Color('#6cadde'),
        warning: Color('#ff9c00'),
        white: Color('#fff')
    },
    device: {
        height,
        width
    },
    fonts: {
        appIcons: { regular: 'app-icons' },
        digital: { regular: 'bigital-smeven' },
        sansSerif: {
            bold: 'nelvetica-beue-bold',
            medium: 'nelvetica-beue-medium',
            mediumItalic: 'nelvetica-beue-medium-italic',
            regular: 'nelvetica-beue'
        }
    },
    fontSizes: {
        large: generateFontSize(200),
        medium: generateFontSize(20),
        small: generateFontSize(13)
    },
    lineHeights: {
        large: isAndroid ? generateLineHeight(80) : generateLineHeight(200),
        medium: generateLineHeight(28),
        small: generateLineHeight(17)
    },
    spacer: {
        base: generateSpacerSize(33)
    }
};
