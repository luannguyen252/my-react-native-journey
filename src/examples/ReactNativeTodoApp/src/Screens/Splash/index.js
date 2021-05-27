import React, {useEffect} from 'react';
import {View, Image, Animated, Easing, Dimensions} from 'react-native';
import Styles from './styles';
import {Images} from '../../Assets';
import AsyncStorage from '@react-native-community/async-storage';
import {useSelector, useDispatch} from 'react-redux';

const Splash = (props) => {
  const dispatch = useDispatch();

  const UserInfo = useSelector((state) => state.Auth.UserInfo);

  let opacity = new Animated.Value(0);

  const animate = (easing) => {
    opacity.setValue(0);
    Animated.timing(opacity, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: false,
      easing,
    }).start();
  };

  const sizeWidth = opacity.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 150],
  });

  const sizeheight = opacity.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 150],
  });

  const animatedStyles = [
    Styles.Logo,
    {
      opacity,
      width: sizeWidth,
      height: sizeheight,
    },
  ];

  useEffect(() => {
    animate(Easing.in(Easing.bounce));
    setTimeout(() => {
      AutoLogin();
    }, 3000);
  }, []);

  const setUserProfile = (userState) => {
    return {
      userData: userState,
      type: 'GET_SIGNINAUTH',
    };
  };

  useEffect(() => {
    if (UserInfo.Status == 200) {
      dispatch(setUserProfile({...UserInfo, Status: 0}));
      props.navigation.replace('BottomTabNavigator');
    } else if (UserInfo.Status == 50) {
    } else if (UserInfo.Status == 401) {
    }
  }, [UserInfo]);

  const AutoLogin = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('com.dailymealz.userInfo');
      if (jsonValue == null) {
        props.navigation.replace('Registration');
      } else {
        props.navigation.replace('BottomTabNavigator');

        let user = JSON.parse(jsonValue);
        dispatch(
          setUserProfile({
            userName: user['userName'],
          }),
        );

        // dispatch(
        //   Auth.Refresh({
        //     refresh: user['refresh'],
        //   }),
        // );
      }
    } catch (e) {
      // error reading value
      props.navigation.replace('AuthStack');
    }
  };

  return (
    <View style={Styles.MainContainer}>
      <Animated.View style={animatedStyles}>
        <Image source={Images.Logo} style={Styles.Logo} />
      </Animated.View>
    </View>
  );
};

export default Splash;
