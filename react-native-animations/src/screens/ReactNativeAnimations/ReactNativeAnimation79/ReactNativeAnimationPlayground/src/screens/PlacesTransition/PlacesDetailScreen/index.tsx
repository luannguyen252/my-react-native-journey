import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { SharedElement } from 'react-navigation-shared-element';

import { deviceHeight, deviceWidth } from '../../../constants';
import { avatars } from '../data';

import {
  Container,
  FullPlaceImage,
  PlaceName,
  Gradient,
  Footer,
  Users,
  User,
  UsersInfo,
  PlaceInfo,
  PlaceInfoTitle,
  PlaceInfoValue,
} from './styles';

const PlacesDetailScreen: React.FC = ({ route }) => {
  const {
    item: { name, poster, duration, rating },
  } = route.params;

  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 1300,
      useNativeDriver: true,
    }).start();
  }, [animatedValue]);

  const opacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <Container>
      <SharedElement
        id={`item.${name}.image`}
        style={{ width: deviceWidth, height: deviceHeight }}>
        <FullPlaceImage source={poster} resizeMode="cover" />
      </SharedElement>

      <Animated.View style={{ opacity }}>
        <Gradient />
      </Animated.View>

      <SharedElement id={`item.${name}.name`}>
        <PlaceName
          style={{
            textShadowColor: '#000',
            textShadowOffset: { width: 0, height: 3 },
            textShadowRadius: 15,
          }}>
          {name}
        </PlaceName>
      </SharedElement>

      <Footer as={Animated.View} style={{ opacity }}>
        <UsersInfo>
          <PlaceInfoTitle>Reviews</PlaceInfoTitle>
          <Users>
            {avatars.map((avatar, index) => (
              <User
                style={{
                  zIndex: avatars.length - index,
                  marginLeft: index === 0 ? 0 : -20,
                }}
                source={avatar}
                key={avatar}
              />
            ))}
          </Users>
        </UsersInfo>

        <PlaceInfo>
          <PlaceInfoTitle>Duration</PlaceInfoTitle>
          <PlaceInfoValue>{duration}</PlaceInfoValue>
        </PlaceInfo>

        <PlaceInfo>
          <PlaceInfoTitle>Rating</PlaceInfoTitle>
          <PlaceInfoValue>{rating}</PlaceInfoValue>
        </PlaceInfo>
      </Footer>
    </Container>
  );
};

PlacesDetailScreen.sharedElements = (route, otherRoute, showing) => {
  const {
    item: { name },
  } = route.params;

  return [
    {
      id: `item.${name}.image`,
    },
    {
      id: `item.${name}.name`,
    },
  ];
};

export default PlacesDetailScreen;
