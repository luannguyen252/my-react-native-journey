import { Dimensions, Platform } from 'react-native';

export const deviceWidth = Dimensions.get('window').width;
export const deviceHeight = Dimensions.get('window').height;
export const isIOS = Platform.OS === 'ios';
export const isIphoneX = isIOS && (deviceWidth === 812 || deviceHeight === 812);